import { Op } from "@sequelize/core";
import bcrypt from "bcrypt";
import crypto from "crypto";

import User from "../models/users.js";
import otpSchema from "../models/otp.js";

export default class UserController {
    // Check phone is registered or not 
    // If not registered send otp
    static async sendOTP(req, res) {
        const { phoneNumber } = req.body;
        // Check phone number is sent
        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                body: null,
                message: "شماره موبایل الزامی است"
            })
        }

        const phoneRegex = new RegExp(/^(09|98)[0-9]{9}$/g)
        const cleanPhone = phoneNumber.toString().trim();
        // normalize phone number
        let normalizedPhone = cleanPhone;
        if (normalizedPhone.startsWith("98")) {
            normalizedPhone = "0" + normalizedPhone.slice(2);
        }
        // Check phone number is valid
        if (!phoneRegex.test(normalizedPhone)) {
            return res.status(400).json({
                success: false,
                body: null,
                message: "شماره موبایل باید 11 یا 12 رقمی باشد و با 09 یا 98 شروع شود"
            })
        }

        // Check phoneNumber is registered
        let user = await User.findOne({
            where: {
                phoneNumber: {
                    [Op.eq]: normalizedPhone
                }
            },
            raw: true
        })
        if (user && Object.keys(user)?.length > 0) {
            return res.status(200).json({
                success: true,
                flow: "login",
                body: {
                    phoneNumber: normalizedPhone
                },
                message: "این شماره ثبت نام کرده است."
            })
        }
        try {
            await otpSchema.destroy({
                where: {
                    phoneNumber: normalizedPhone
                }
            })
        } catch(err) {
            return res.status(404).json({
                success: false,
                body: null,
                message: "این شماره کد یک بار مصرف نداشته"
            })
        }
        const generateSecuredOTP = () => {
            return crypto.randomInt(100000, 999999).toString();
        }

        const otpCode = generateSecuredOTP();
        const expiresAt = new Date(Date.now()+ 2*60*1000);

        await otpSchema.create({
            phoneNumber,
            code: otpCode,
            expiresAt
        })

        return res.status(201).json({
            success: true,
            flow: "register",
            body: {
                phoneNumber,
                code: otpCode
            },
            expiresAt,
            message: "شماره ثبت نام نشده"
        })
    }

    // Ask for phoneNumber and password
    static async login(req, res) {
        try {
            const { phoneNumber, password: plainPassword } = req.body;
            const user = await User.findOne({
                where: {
                    phoneNumber: {
                        [Op.eq]: phoneNumber
                    }
                }
            })
            // Check password is correct
            let isPasswordCorrect = await bcrypt.compare(plainPassword, user.password)
            if (isPasswordCorrect) {
                return res.status(201).json({
                    success: true,
                    body: {
                        phoneNumber,
                        password: user.password,
                        role: user.role
                    },
                    message: "Welcome"
                })
            } else {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "Password is not valid"
                })
            }
        } catch(err) {
            return res.status(500).json({
                success: false,
                body: null,
                message: "خطای سرور"
            })
        }
    }

    static async register(req, res) {
        const {phoneNumber, password, code} = req.body;
        try {
            const otpRecord = await otpSchema.findOne({
                where: {
                    phoneNumber,
                    code,
                    expiresAt: {
                        [Op.gt]: Date.now()
                    }
                },
                raw: true
            })
            if (otpRecord && Object.keys(otpRecord)?.length === 0) {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "کد نامعتبر یا منقضی شده است"
                })
            } else {
                return res.status(201).json({
                    success: true,
                    body: {
                        phoneNumber
                    },
                    message: "شماره با موفقیت ثبت شد."
                })
            }
        } catch(err) {
            return res.status(500).json({
                success: false,
                body: null,
                message: "خطای سرور"
            })
        }
        
    }
}