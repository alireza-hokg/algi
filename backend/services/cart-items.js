import { DatabaseError } from "../utils/Error.js";

export default class CartItemService {
    constructor(cartItemRepo) {
        this.cartItemRepo = cartItemRepo;
    }

    async getCartItem(body, transaction) {
        try {
            const result = await this.cartItemRepo.getOne(body, transaction);
            return result
        }
        catch(err) {
            throw new DatabaseError(err)
        }
    }

    async getById(id, transaction) {
        return await this.cartItemRepo.getById(id, transaction);
    }

    async create(body, transaction) {
        try {
            const result = await this.cartItemRepo.create(
                body,
                transaction
            );
            return result
        }
        catch(err) {
            throw new DatabaseError(err)
        }
    }

    async removeById(id, transaction) {
        try {
            const deletedItem = await this.cartItemRepo.removeById(id, transaction);
            return deletedItem
        }
        catch(err) {
            throw new DatabaseError(err)
        }
    }
}