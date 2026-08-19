import { DatabaseError } from "../utils/Error.js";

export default class CartItemService {
    constructor(cartItemRepo) {
        this.cartItemRepo = cartItemRepo;
    }

    async getCartItems(body, transaction) {
        try {
            const result = await this.cartItemRepo.exists(body, transaction);
            return result
        }
        catch(err) {
            throw new DatabaseError(err)
        }
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
}