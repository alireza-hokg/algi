import Joi from "joi";
import { DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js"

export default class CartService {
    constructor(cartRepo, userService) {
        this.cartRepo = cartRepo
        this.userService = userService
    }

    async getCartById(id) {
        const numericId = Number(id);
        try {
            const cart = await this.cartRepo.findById(numericId);
            if (!cart) {
                throw new NotFoundError("سبد خرید پیدا نشد.")
            }
            return cart;
        }
        catch(err) {
            throw new DatabaseError(err.message);
        }
    }

    // تمامی سبد های خرید با user, status
    async getCartsByUserAndStatus(body) {
        const cartValidationSchema = Joi.object().keys({
            user_id: Joi.number().required(),
            status: Joi.string().required().valid("active", "removed", "purchased")
        })
        const { value: validateCart, error: cartError } = cartValidationSchema.validate({
            user_id: body.user_id,
            status: body.status
        })
        
        if (cartError) {
            throw new ValidationError(error.message);
        }
        
        try {
            return await this.cartRepo.findCartsByUserAndStatus(validateCart);
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    // گرفتن یک سبد خرید فعال
    async getActiveCartByUserAndStatus(body) {
        try {
            return await this.cartRepo.findOneByUserAndStatus(body);
        }
        catch(err) {
            throw new DatabaseError(err.message);
        }
    }

    async addToCart(body) {
        
        try {
            const result = await this.cartRepo.create(body);
            return result.dataValues;
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async updateCart(body, id) {
        const cart = await this.getCartById(id);
        try {
            cart.quantity += body.quantity
            cart.save();
            return cart.dataValues
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async upsertCart(body) {
        const cartValidationSchema = Joi.object().keys({
            user_id: Joi.number().required(),
            product_id: Joi.number().required(),
            quantity: Joi.number().required(),
            price: Joi.number().required(),
            status: Joi.string().valid("active")
        })
        // چک کردن سبد
        // true => validateCart
        // false => cartError
        const {value: validateCart, error: cartError} = cartValidationSchema.validate({
            user_id: body.user_id,
            product_id: body.product_id,
            quantity: body.quantity,
            price: body.price,
            status: body?.status
        })

        if (cartError) {
            throw new ValidationError(cartError?.message)
        }
        
        const activeCart = await this.getActiveCartByUserAndStatus(validateCart);
        // اگر کالا در سبد خرید وجود داشت بهش اضافه کن
        // اگر کالا در سبد خرید وجود نداشت یکی بساز
        try {
            if (activeCart?.id) {
                return await this.updateCart(validateCart, activeCart.id);
            } else {
                return await this.addToCart(validateCart);
            }
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }
}