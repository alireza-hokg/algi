import User from "../models/users.js";

export default class Users {
    async getAll() {
        const users = await User.findAll({
            raw: true
        });
        return users
    }

    /**
     * create user
     * @param {phoneNumber, password, role} user
     * @returns user registered or null
     */
    async create(user) {
        return await User.create(user);
    }

    /**
     * find user by phoneNumber
     * @param {phoneNumber}
     * @returns user found or null
     */
    async findByPhone(phoneNumber) {
        return await User.findOne({
            where: {
                phoneNumber
            },
            attributes: ["id", "phoneNumber", "password", "role", "address"],
            raw: true
        })
    }
}