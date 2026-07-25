import Joi from "joi";

import { DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js"

export default class orderItemService {
    constructor(orderItemRepo, orderService, sequelize) {
        this.orderItemRepo = orderItemRepo
        this.orderService = orderService;
        this.sequelize = sequelize
    }

    async getAll() {
        try {
            return await this.orderItemRepo.getAll();
        } catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getAllByOrderId(orderId) {
        const numericOrderId = Number(orderId)
        try {
            const orderItems = await this.orderItemRepo.getAllByOrderId(numericOrderId);
            return orderItems
        } catch(err) {
            throw new DatabaseError(err)
        }
    }

    async get(orderItemId) {
        const numericOrderItemId = Number(orderItemId);
        try {
            const orderItem = await this.orderItemRepo.get(numericOrderItemId);
            if (!orderItem) {
                throw new NotFoundError("ایتم سفارش داده شده پیدا نشد.")
            }
            return orderItem.dataValues;
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    async createMany(orderItemsBody, orderId) {
        const validationSchema = Joi.object().keys({
            product_id: Joi.number().required(),
            quantity: Joi.number().required(),
            price: Joi.number().required()
        })
        let values = [];
        try {
            orderItemsBody.forEach(item=> {
                const {value, error} = validationSchema.validate(item);
                value.order_id = orderId
                if (error) {
                    throw new ValidationError(error.message)
                }
                values.push(value)
            })
            return await this.orderItemRepo.createMany(values);
        } catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    // Remove order-item and if order has one order-item remove the order too
    async remove(orderItemId) {
        // Check if orderItem exists
        const orderItem = await this.get(orderItemId);

        const orderItemList = await this.getAllByOrderId(orderItemId);
        
        try {
            const result = await this.sequelize.transaction(async (transaction) => {
                const orderItemDeleted = await this.orderItemRepo.remove(orderItemId, transaction);
                // If there is only one orderItem then remove the order
                if (orderItemList.length === 1) {
                    await this.orderService.remove(orderItem.order_id, transaction)
                }
                return orderItemDeleted;
            })
            return result
        } catch(err) {
            throw new DatabaseError(err.message)
        }
    }
}