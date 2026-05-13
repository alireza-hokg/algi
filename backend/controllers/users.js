import { Op } from "@sequelize/core";
import bcrypt from "bcrypt";
import crypto from "crypto";
import cryptoRandomString from "crypto-random-string";
import jwt from "jsonwebtoken";

import User from "../models/users.js";
import otpSchema from "../models/otp.js";
import { normalizePhone, phoneRegex } from "../utils/userAuth.js"

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
        const cleanPhone = normalizePhone(phoneNumber);
        // Check phone number is valid
        if (!phoneRegex.test(cleanPhone)) {
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
                    [Op.eq]: cleanPhone
                }
            },
            raw: true
        })
        if (user && Object.keys(user)?.length > 0) {
            return res.status(200).json({
                success: true,
                flow: "login",
                body: {
                    phoneNumber: cleanPhone
                },
                message: "این شماره ثبت نام کرده است."
            })
        }
        try {
            await otpSchema.destroy({
                where: {
                    phoneNumber: cleanPhone
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
            phoneNumber: cleanPhone,
            code: otpCode,
            expiresAt
        })

        return res.status(201).json({
            success: true,
            flow: "register",
            body: {
                phoneNumber: cleanPhone,
                code: otpCode
            },
            expiresAt,
            message: "شماره ثبت نام نشده"
        })
    }

    // Ask for the password
    static async login(req, res) {
        try {
            const { phoneNumber, password: plainPassword } = req.body;
            let normalize = normalizePhone(phoneNumber);
            // find user with phone
            const user = await User.findOne({
                where: {
                    phoneNumber: {
                        [Op.eq]: normalize
                    }
                },
                raw: true
            })
            // There is no phone in database
            if (!user) {
                return res.status(404).json({
                    success: false,
                    body: null,
                    message: "این شماره ثبت نشده است"
                })
            }
            // Check password is correct
            let isPasswordCorrect = await bcrypt.compare(plainPassword, user.password)
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "Password is not valid"
                })
            }
            const secret = cryptoRandomString({ length: 64, type: "hex" });
            let token = jwt.sign({
                id: user.id,
                phoneNumber: user.phoneNumber,
                password: user.password,
                role: user.role
            }, secret, { expiresIn: "7d"})
            return res.status(200).json({
                success: true,
                token,
                body: {
                    phoneNumber: normalize,
                    password: user.password,
                    role: user.role
                },
                message: "Welcome"
            })
        } catch(err) {
            return res.status(500).json({
                success: false,
                body: null,
                message: "خطای سرور"
            })
        }
    }

    // Ask for OTP code and a password
    static async register(req, res) {
        const {phoneNumber, password, code} = req.body;
        let cleanPhone = normalizePhone(phoneNumber);
        try {
            const otpRecord = await otpSchema.findOne({
                where: {
                    phoneNumber: cleanPhone,
                    code,
                    // expiresAt: {
                    //     [Op.gt]: Date.now()
                    // }
                },
                raw: true
            })
            if (!otpRecord) {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "کد نامعتبر یا منقضی شده است"
                })
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(password, salt);
                await User.create({
                    phoneNumber: cleanPhone,
                    password: hashedPass,
                    role: "customer"
                })
            
                const secret = cryptoRandomString({ length: 64, type: "hex" });
                const token = jwt.sign({
                    phoneNumber: cleanPhone,
                    role: "customer"
                }, secret, { expiresIn: "7d"})
                return res.status(201).json({
                    success: true,
                    token,
                    body: {
                        phoneNumber: cleanPhone,
                        code
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