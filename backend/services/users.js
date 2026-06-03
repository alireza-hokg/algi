import { DatabaseError, NotFoundError, UnauthorizedError, ValidationError } from "../utils/Error.js";
import bcrypt from "bcrypt";

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
        const { phoneNumber, password, admin } = user;
        if (!phoneNumber || !password) {
            throw new ValidationError("شماره موبایل و رمز الزامی است")
        }
        try {
            const hashedPass = await bcrypt.hash(password, 10);
            const hashedUser = {phoneNumber, admin, password: hashedPass}
            const result = await this.userRepo.create(hashedUser);
            return result
        }
        catch(err) {
            if (err instanceof ValidationError) {
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
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword
        }
        catch(err) {
            console.log(err.message)
            if (err instanceof ValidationError || err instanceof NotFoundError) {
                throw err;
            }
            throw new DatabaseError("خطای سرور")
        }
    }
}