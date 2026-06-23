import { DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js"
import Joi from "joi";

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

    async createOrder(body) {
        // Check if user exists
        const { user_id } = body;
        await this.userService.getUser(user_id);
        
        try {
            const orderValidationSchema = Joi.object().keys({
                user_id: Joi.number().required(),
                total_price: Joi.number().required(),
                status: Joi.string().required(),
                address: Joi.string().required(),
                phone: Joi.string().required()
            })
            const { value, error } = orderValidationSchema.validate(body)
            if (error) {
                throw new ValidationError(err.message);
            }
            const result = await this.orderRepo.create(value)
            return result;
        } catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }
}