import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../utils/Error.js";

const authorizeAdmin = (req, res) => {
    try {
        const token = req.cookie?.token;
        
        if (!token) {
            throw new UnauthorizedError("توکن یافت نشد.")
        }

        const decodedUser = jwt.verify(token, process.env.SECRET_JWT_KEY);
        if (decodedUser.role !== "admin") {
            throw new UnauthorizedError("دسترسی ادمین لازم است")
        }
        req.role = decodedUser.role;
        req.userId = decodedUser.userId
        next();
    } catch(err) {
        if (err instanceof jwt.JsonWebTokenError) {
            next(new UnauthorizedError("توکن نامعتبر است"))
        }
        next(err);
    }
}
export default authorizeAdmin