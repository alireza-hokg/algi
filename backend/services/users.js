import { ConflictError, DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from "../utils/Error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export default class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async getAll() {
        try {
            return await this.userRepo.getAll();
        }
        catch(err) {
            throw new DatabaseError("Database cant fetch users")
        }
    }

    async register(user) {
        const { phoneNumber, password, role } = user;
        if (!phoneNumber || !password) {
            throw new ValidationError("شماره موبایل و رمز الزامی است")
        }
        try {
            const existingUser = await this.userRepo.findByPhone(phoneNumber);
            if (existingUser) {
                throw new ConflictError("این شماره قبلا ثبت شده");
            }
            
            // هش کردن پسورد
            const hashedPass = await bcrypt.hash(password, 10);

            // ساخت ابجکت کاربر برای ذخیره
            const newUser = {phoneNumber, role, password: hashedPass}
            
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
            throw new DatabaseError(err.message || "خطای سرور")
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
}