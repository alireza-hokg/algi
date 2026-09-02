import { UnauthorizedError } from "../utils/Error.js";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token)
    try {
        if (!token) {
            throw new UnauthorizedError("token نامعتبر")
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = verified.userId;
        req.userRole = verified.role;
        next();
    } catch(err) {
        if (err instanceof UnauthorizedError) {
            throw err
        }
        throw err
    }
}