import Joi from "joi";
import { DatabaseError, ValidationError } from "../utils/Error.js"

export default class CartService {
    constructor(cartRepo, userService) {
        this.cartRepo = cartRepo
        this.userService = userService
    }

    async getAll() {
        try {
            return await this.cartRepo.getAll();
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getAllByUserId(userId) {
        // ایا کاربر وجود دارد
        await this.userService.getUser(userId);

        const numericUserId = Number(userId)
        try {
            return await this.cartRepo.getAllByUserId(numericUserId);
        }
        catch(err) {
            throw new DatabaseError(err.message);
        }
    }

    async add(body) {
        const cartValidationSchema = Joi.object().keys({
            user_id: Joi.number().required(),
            product_id: Joi.number().required(),
            quantity: Joi.number().required(),
            price: Joi.number().required(),
        })
        const {value: validateCart, error: cartError} = cartValidationSchema.validate({
            user_id: body.user_id,
            product_id: body.product_id,
            quantity: body.quantity,
            price: body.price
        })
        
        if (cartError) {
            throw new ValidationError(cartError?.message)
        }
        try {
            const result = await this.cartRepo.add(validateCart);
            return result.dataValues;
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }
}