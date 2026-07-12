import Joi from "joi";
import { DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js"

export default class CartService {
    constructor(cartRepo, userService) {
        this.cartRepo = cartRepo
        this.userService = userService
    }

    async getCartById(id) {
        const numericId = Number(id)
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

    /**
     * گرفتن سبد خرید کاربر با status 
     * @param {string} body.string
     * @param {number} body.productId
     * @param {number} body.userId
     * @returns {Promise<Object>}
     */
    async getActiveCartByUserAndStatus(body) {
        try {
            return await this.cartRepo.findOneByUserAndStatus(body);
        }
        catch(err) {
            throw new DatabaseError(err.message);
        }
    }
    
    // اگر کالا در سبد خرید وجود نداشت اضافه کن
    async addToCart(body) {
        
        try {
            const result = await this.cartRepo.create(body);
            return result.dataValues;
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    /**
     * بروزرسانی تعداد محصول در سبد خرید اگر محصول وجود داشت
     * 
     * @param {Object} body 
     * @param {number} body.quantity تعداد برای اضافه یا کم کردن
     * @param {*} id - id سبد خرید برای بروزرسانی
     * @returns {Promise<Object|boolean>} Returns updated cart data or false if operation fails
     */
    async updateCart(validateCart, activeCart) {
        console.log(validateCart)
        console.log(activeCart)
        try {
            if (validateCart.quantity > 0) {
                activeCart.quantity += validateCart.quantity
            }
            else if (validateCart.quantity < 0 && Math.abs(validateCart.quantity) < activeCart.quantity) {
                activeCart.quantity += validateCart.quantity
            }
            activeCart.save();
            return activeCart.dataValues
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    // استفاده از addToCart و updateCart برای اضافه کردن محصول به سبد خرید
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
                return await this.updateCart(validateCart, activeCart);
            } else {
                return await this.addToCart(validateCart);
            }
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async adjustCartQuantity(body) {
        const adjustValidationSchema = Joi.object().keys({
            cartId: Joi.string().required(),
            quantity: Joi.number().required()
        })
        const { value: validateCart, error: errorCart } = adjustValidationSchema.validate({
            cartId: body.cartId,
            quantity: body.quantity
        })

        if (errorCart) {
            throw new ValidationError(errorCart.message)
        }
        const cart = await this.getCartById(validateCart.cartId);
        console.log(cart.dataValues)
        try {
            if (cart.quantity > 0) {
                cart.quantity = validateCart.quantity;
            } else {
                return
            }
            cart.save();
            return true
        }
        catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    // حذف محصول از سبد خرید
    async removeFromCart(id) {
        const cart = await this.getCartById(id);
        try {
            await cart.destroy();
            return true
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }
}