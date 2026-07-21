/**
 * @class UserController
 * @description Handles HTTP requests for user-related operations
 * @description Provides CRUD operations, authentication, and user management endpoints
 */
export default class UserController {
    constructor(userService) {
        this.userService = userService
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAll();
            return res.success(users, "کاربران با موفقیت گرفته شدند.", 200);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }

    async register(req, res) {
        try {
            const { phoneNumber, password, role } = req.body;
            const initialData = {
                phoneNumber,
                password,
                role
            }
            const user = await this.userService.register(initialData);
            return res.success(user, "کاربر با موفقیت ساخته شد.", 200);
        }
        catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }

    async login(req, res) {
        try {
            const { phoneNumber, password } = req.body;
            const initialData = { phoneNumber, password }
            const response = await this.userService.login(initialData);
            // ارسال token در کوکی
            res.cookie('token', response.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
            });

            res.success(response, "با موفقیت وارد شدید.", 200)
        } catch(err) {
            console.log(err)
            res.error(err.message, err.statusCode || 500);
        }
    }

    async logout(req, res) {
        
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        res.success(null, "با موفقیت logged out شد");
    }

    
    async isLoggedIn(req, res) {
        try {
            const { userId } = req
            const user = await this.userService.isLoggedIn(userId)
            res.success(user, "توکن معتبر است")
        } catch(err) {
            res.error(err.message, err.statusCode || 500)
        }
    }
}