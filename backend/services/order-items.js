import Joi from "joi";

import { DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js"

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
                    console.log('vaval', error.message)
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
}