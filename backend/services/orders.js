import { TransactionNestMode } from "@sequelize/core";
import sequelize from "../utils/db.js";
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
            const result = await sequelize.transaction(async (parentTransaction) => {
                const orderBody = {
                    user_id: body.user_id,
                    total_price: body.total_price,
                    status: body.status,
                    address: body.address,
                    phone: body.phone
                }
                const orderValidationSchema = Joi.object().keys({
                    user_id: Joi.number().required(),
                    total_price: Joi.number().required(),
                    status: Joi.string().required(),
                    address: Joi.string().required(),
                    phone: Joi.string().required()
                })
                const { value, error } = orderValidationSchema.validate(orderBody);
                if (error) {
                    throw new ValidationError(error.message);
                }
                
                const orderResult = await this.orderRepo.create(value)
                const orderResultRaw = orderResult.dataValues;
                const orderItemsResult = await sequelize.transaction({
                    nestMode: TransactionNestMode.savepoint,
                    transaction: parentTransaction
                },
                async () => {
                    const orderItemsBody = body.orderItems
                    const itemData = await this.orderItemService.createMany(orderItemsBody,orderResultRaw.id);
                    return itemData
                })

                return {
                    ...orderResultRaw,
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
}