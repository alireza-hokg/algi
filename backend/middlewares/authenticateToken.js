import { UnauthorizedError } from "../utils/Error.js";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res) => {
    const token = req.cookie.token;

    if (!token) {
        throw new UnauthorizedError("token نامعتبر")
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = verified.userId;
        next();
    } catch(err) {
        if (err instanceof UnauthorizedError) {
            throw err
        }
    }
}