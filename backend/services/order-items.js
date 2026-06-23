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

    async createMany(orderItemsBody) {
        const validationSchema = Joi.object().keys({
            order_id: Joi.number().required(),
            product_id: Joi.number().required(),
            quantity: Joi.number().required(),
            price: Joi.number().required()
        })
        let result;
        let values = [];
        try {
            orderItemsBody.forEach(item=> {
                result = validationSchema.validate(item);
                if (result.error) {
                    throw new ValidationError(result.error.message)
                }
                values.push(result.value)
            })
            return await this.orderItemRepo.createMany(values);
        } catch(err) {
            throw new DatabaseError(err.message)
        }
    }
}