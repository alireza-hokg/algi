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

    async getById(id) {
        return await this.cartItemRepo.getByPk(id);
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