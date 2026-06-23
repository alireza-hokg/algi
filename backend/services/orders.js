import { DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js"

export default class OrderService {
    constructor(orderRepo, userService) {
        this.orderRepo = orderRepo
        this.userService = userService;
    }

    async getAllOrders() {
        try {
            const result = await this.orderRepo.getAll();
            return result
        } catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getOrder(orderId) {
        const NumericOrderId = Number(orderId);
        try {
            const order = await this.orderRepo.get(NumericOrderId)
            if (!order) {
                throw new NotFoundError("سفارشی پیدا نشد.")
            }
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    async createOrder(initialOrderData) {
        const { user_id, total_price, status, address, phone } = initialOrderData;
        const orderData = { user_id, total_price, status, address, phone };

        // Check if user exists
        await this.userService.getUser(user_id);
        try {
            if (!user_id || !total_price || !status || !address) {
                throw new ValidationError("اطلاعات مورد نیاز را وارد کنید")
            }
            const result = await this.orderRepo.create(orderData)
            return result;
        } catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }
}