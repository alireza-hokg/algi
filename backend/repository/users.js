
export default class UserRepo {
    constructor(User) {
        this.User = User;
    }

    async getAll() {
        return await this.User.findAll();
    }

    async get(id) {
        return await this.User.findByPk(id);
    }

    /**
     * create user
     * @param {phoneNumber, password, role} user
     * @returns user registered or null
     */
    async create(user) {
        return await this.User.create(user);
    }

    /**
     * find user by phoneNumber
     * @param {phoneNumber}
     * @returns user found or null
     */
    async findByPhone(phoneNumber) {
        return await this.User.findOne({
            where: {
                phoneNumber
            },
            attributes: ["id", "phoneNumber", "password", "role", "address"],
            raw: true
        })
    }

    async findByUserId(userId) {
        const user = await this.User.findByPk(userId, {
            attributes: {
                exclude: ["password"]
            }
        });
        return user;
    }
}