
/**
 * @class UserController
 * @description Handles HTTP requests for user-related operations
 * @description Provides CRUD operations, authentication, and user management endpoints
 */
export default class UserController {
    constructor(userService) {
        this.userService = userService
    }

    /**
     * UserController#getAllUsers
     */
    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAll();
            console.log(users);
            return res.success(users, "Users successfully fetched", 200);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }

    /**
     * ثبت نام کاربر
     * UserController#register
     * 
     * @param {Object} req - درخواست Express
     * @param {Object} req.body - بدنه درخواست
     * @param {string} req.body.phoneNumber - شماره موبایل کاربر
     * @param {string} req.body.password - رمز کاربر
     * @param {string} [req.body.role=customer] - نقش کاربر
     * 
     * @param {Object} res - پاسخ Express
     * 
     * @returns {Object} پاسخ JSON
     * 
     * @returns  ثبت نام کاربر با موفقیت انجام شد
     * 
     * @throws {400} شماره موبایل و رمز الزامی است
     * @throws {409} این شماره قبلا ثبت شده
     * @throws {500} خطای سرور
     */
    async register(req, res) {
        try {
            const { phoneNumber, password, role } = req.body;
            const initialData = {
                phoneNumber,
                password,
                role
            }
            const user = await this.userService.register(initialData);
            return res.success(user, "user created successfully", 200);
        }
        catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }

    /**
     * ورود کاربر
     * UserController#login
     * 
     * @async
     * @function login
     * @memberof UserController
     * 
     * @param {Object} req - درخواست Express
     * @param {string} req.body.phoneNumber - شماره تلفن کاربر (required)
     * @param {string} req.body.password - رمز عبور کاربر (required)
     * 
    * @param {Object} res - پاسخ Express
    * @returns {Promise<void>} - 
    * 
    * @description
    * پاسخ موفق 200
    * {
    *   "success": true,
    *   "body": {},
    *   "message": "user login successfully"}
    * 
    * @throws {400} - اطلاعات مورد نیاز را وارد کنید
    * @throws {401} - اطلاعات نادرست
    */
    async login(req, res) {
        try {
            const { phoneNumber, password } = req.body;
            const initialData = { phoneNumber, password }
            const response = await this.userService.login(initialData);
            // ارسال token در کوکی
            res.cookie('token', response.token, {
                httpOnly: true,      // ✅ امنیت در برابر XSS
                secure: process.env.NODE_ENV === "production",
                sameSite: 'strict',  // ✅ امنیت در برابر CSRF  
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
            });

            res.success(response, "user login successfully", 200)
        } catch(err) {
            res.error(err.message, err.statusCode || 500);
        }
    }

    async logout(req, res) {
        res.cookie('token', response.token, {
            httpOnly: true,      // ✅ امنیت در برابر XSS
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',  // ✅ امنیت در برابر CSRF  
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/'
        });
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        res.success("token با موفقیت حذف شد.");
    }

    async isLoggedIn(req, authenticateToken, res) {
        
    }
}