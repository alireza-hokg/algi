import { DatabaseError, ValidationError } from "../utils/Error.js"

export default class CartService {
    constructor(cartRepo, userService) {
        this.cartRepo = cartRepo
        this.userService = userService
    }

    async getAll() {
        try {
            return await this.cartRepo.getAll();
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getAllByUserId(userId) {
        // ایا کاربر وجود دارد
        await this.userService.getUser(userId);

        const numericUserId = Number(userId)
        try {
            return await this.cartRepo.getAllByUserId(numericUserId);
        }
        catch(err) {
            throw new DatabaseError(err.message);
        }
    }
}