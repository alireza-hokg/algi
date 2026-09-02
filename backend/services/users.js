import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ConflictError, DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from "../utils/Error.js";
import { registerValidationSchema, updateValidationSchema } from "../schemas/user.js"

export default class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async getAll() {
        try {
            return await this.userRepo.getAll();
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getUser(userId) {
        const numericUserId = Number(userId);
        try {
            const user = await this.userRepo.get(numericUserId);
            if (!user) {
                throw new NotFoundError("کاربر یافت نشد.")
            }
            return user;
        } catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async register(user) {
        try {
            const { value: userValue, error: errorValue } = registerValidationSchema.validate({
                phoneNumber: user.phoneNumber,
                password: user.password
            });
            if (errorValue) {
                console.log('s')
                throw new ValidationError(errorValue.message)
            }

            const existingUser = await this.userRepo.findByPhone(userValue.phoneNumber);
            if (existingUser) {
                throw new ConflictError("این شماره قبلا ثبت شده");
            }
            
            // هش کردن پسورد
            const hashedPass = await bcrypt.hash(userValue.password, 10);

            // ساخت ابجکت کاربر برای ذخیره
            const newUser = {phoneNumber: userValue.phoneNumber, role: "customer", password: hashedPass}
            
            // ذخیره در دیتابیس
            const result = await this.userRepo.create(newUser);
            return result
        }
        catch(err) {
            if (err instanceof ValidationError || err instanceof ConflictError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    async login(userData) {
        const { phoneNumber, password } = userData;
        try {
            // Validation
            if (!phoneNumber || !password) {
                throw new ValidationError("شماره و رمز الزامی است")
            }
    
            // Find user
            const user = await this.userRepo.findByPhone(phoneNumber);
            // Validation for user
            if (!user) {
                throw new UnauthorizedError(".شماره یا رمز اشتباه است");
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedError(".شماره یا رمز اشتباه است.")
            }
            // ساخت token
            const token = jwt.sign(
                {
                    userId: user.id,
                    phoneNumber: user.phoneNumber,
                    role: user.role
                }, // payload
                process.env.JWT_SECRET_KEY,
                { expiresIn: "7d" }
            )
            const { password: _, ...userWithoutPassword } = user;
            return {
                token,
                user: {...userWithoutPassword}
            }
        }
        catch(err) {
            console.log(err.message)
            if (err instanceof ValidationError || err instanceof NotFoundError) {
                throw err;
            }
            throw new DatabaseError("کاربر یافت نشد." || "خطای سرور")
        }
    }

    async isLoggedIn(userId) {
        try {
            const user = this.userRepo.findByUserId(userId);
            if (!user) {
                throw new NotFoundError("کاربری یافت نشد.")
            }
            return user
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw err
            }
            throw new DatabaseError(`isLoggedIn error: ${err.message}`)
        }
    }

    // Update firstname and lastname
    async update(body, userId) {
        try {
            const { value: userValue, error: userError } = updateValidationSchema.validate({
                firstName: body.firstName,
                lastName: body.lastName
            })
            if (userError) {
                throw new ValidationError(userError);
            }
            const result = await this.userRepo.update(userValue, userId);
            return result
        }
        catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err)
        }
    }
}