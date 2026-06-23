import { DatabaseError, NotFoundError } from "../utils/Error.js"

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

    async get(orderItemId) {
        const numericOrderItemId = Number(orderItemId);
        try {
            const orderItem = await this.orderItemRepo.get(numericOrderItemId);
            if (!orderItem) {
                throw new NotFoundError("ایتم سفارش داده شده پیدا نشد.")
            }
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    async create(orderItemsData) {
        
    }
}