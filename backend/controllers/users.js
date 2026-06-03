

export default class UserController {
    constructor(userService) {
        this.userService = userService
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAll();
            console.log(users);
            return res.success(users, "Users successfully fetched", 200);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }

    async register(req, res) {
        try {
            const { phoneNumber, password, admin } = req.body;
            const initialData = {
                phoneNumber,
                password,
                admin
            }
            const user = await this.userService.register(initialData);
            return res.success(user, "user created successfully", 200);
        }
        catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }

    async login(req, res) {
        try {
            const { phoneNumber, password } = req.body;
            const initialData = { phoneNumber, password }
            const user = await this.userService.login(initialData);
            return res.success(user, "user login successfully", 200)
        } catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }
}