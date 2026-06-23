import { DatabaseError } from "../utils/Error.js"

export default class orderItemService {
    constructor(orderItemRepo) {
        this.orderItemRepo = orderItemRepo
    }
    async getAll() {
        try {
            return await this.orderItemRepo.getAll();
        } catch(err) {
            throw new DatabaseError(err.message)
        }
    }
}