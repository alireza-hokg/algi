import { UnauthorizedError } from "../utils/Error.js";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return next(new UnauthorizedError("وارد حساب کاربری خود شوید."))
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = verified.userId;
        req.userRole = verified.role;
        next();
    } catch(err) {
        return next(new UnauthorizedError("توکن نامعتبر یا متقاضی شده است."))
    }
}