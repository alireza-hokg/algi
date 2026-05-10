import { Op } from "@sequelize/core";

import User from "../models/users.js";

export default class UserController {
    static async getUser(req, res) {
        try {
            const { phoneNumber } = req.body;
            const phoneOne = new RegExp(/^09[0-9]{9}/g)
            const phoneTwo = new RegExp(/^98[0-9]{10}/g)
            // Check phone number is sent
            if (phoneNumber === undefined || phoneNumber === null) {
                return  res.status(400).json({
                    success: false,
                    body: null,
                    message: "شماره موبایل الزامی است"
                })
            }
            // Check phone number is valid
            if (phoneNumber.length === 11) {
                if (!phoneOne.test(phoneNumber)) {
                    return res.status(400).json({
                        success: false,
                        body: null,
                        message: "شماره موبایل باید با 98 یا 09 شروع شود"
                    })
                }
            } else if (phoneNumber.length === 12) {
                if (!phoneTwo.test(phoneNumber)) {
                    return res.status(400).json({
                        success: false,
                        body: null,
                        message: "شماره موبایل باید با 98 یا 09 شروع شود"
                    })
                }
            } else {
                return res.status(400).json({
                    success: false,
                    body: null,
                    message: "شماره اشتباه است"
                })
            }
            // Check user is registered 
            let isRegistered;
            if (phoneNumber) {
                isRegistered = await User.findOne({
                    where: {
                        phoneNumber: {
                            [Op.eq]: phoneNumber
                        }
                    },
                    raw: true
                })
            }
            
            // If user is registered, ask him for his password.
            // Else send him a code for register
            if (!!isRegistered) {
                const { password } = req.body;
                const user = await User.findOne({
                    where: {
                        password: {
                            [Op.eq]: password
                        }
                    },
                    raw: true
                })
                console.log(user);

                if (!!user) {
                    return res.status(200).json({
                        success: true,
                        body: null,
                        message: "کاربر با موفقیت وارد شد"
                    })
                }
            } else {
                return res.status(200).json({
                    success: true,
                    body: '1234',
                    message: "OTP has been sent successfully"
                })
            }
        } catch(err) {
            res.status(500).json({
                success: false,
                body: null,
                message: "خطای سرور"
            })
        }
    }

    static async createUser(req, res) {

    }
}