import sequelize from "../config/db.js";
import { DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js"
import Joi from "joi";

export default class OrderService {
    constructor(orderRepo, userService, orderItemService) {
        this.orderRepo = orderRepo
        this.userService = userService;
        this.orderItemService = orderItemService
    }

    async getAllOrders() {
        try {
            const result = await this.orderRepo.getAll();
            return result
        } catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getById(id) {
        const numericId = Number(id);
        try {
            const order = await this.orderRepo.getById(numericId)
            if (!order) {
                throw new NotFoundError("سفارشی پیدا نشد.")
            }
            return order.dataValues;
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    async getOrdersByUserId(userId) {
        const numericUserId = Number(userId);
        try {
            const orders = await this.orderRepo.getByUserId(numericUserId);
            return orders
        }
        catch(err) {
            
            throw new DatabaseError(err.message)
        }
    }

    async createOrder(body) {
        // Check if user exists
        const { user_id, orderItems, ...orderData } = body;
        await this.userService.getUser(user_id);

        const orderValidationSchema = Joi.object().keys({
            user_id: Joi.number().required(),
            total_price: Joi.number().required(),
            status: Joi.string().required(),
            address: Joi.string().required(),
            phone: Joi.string().required()
        })
        const { value: validateOrder, error: orderError } = orderValidationSchema.validate({
            user_id,
            total_price: body.total_price,
            status: body.status,
            address: body.address,
            phone: body.phone
        });

        if (orderError) {
            throw new ValidationError(error.message);
        }

        if (!orderItems && Array.isArray(orderItems) && orderItems.length === 0) {
            throw new ValidationError("حداقل باید شامل یک ایتم سفارش باشد")
        }

        try {
            await this.userService.getUser(user_id);

            const result = await sequelize.transaction(async (transaction) => {
                
                const orderResult = await this.orderRepo.create(validateOrder, transaction)

                const orderItemsResult = await this.orderItemService.createMany(
                    orderItems,
                    orderResult.id,
                    transaction
                );

                return {
                    ...orderResult.toJSON(),
                    orderItemsResult
                }
            })
            return result;
        } catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    async remove(orderId, transaction) {
        await this.getOrder(orderId);
        try {
            const deletedOrder = await this.orderRepo.remove(orderId, transaction);
            return deletedOrder
        } catch(err) {
            throw new DatabaseError(err.message)
        }
    }
}