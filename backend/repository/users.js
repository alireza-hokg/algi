import {User} from "../modeltest/index.cjs";

export default class UserRepo {
    async getAll() {
        const users = await User.findAll({
            raw: true
        });
        return users
    }

    async get(id) {
        return await User.findByPk(id);
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

    async findByUserId(userId) {
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ["password"]
            }
        });
        return user;
    }
}