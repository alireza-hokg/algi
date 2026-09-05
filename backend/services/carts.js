import { ConflictError, DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js";
import { createCartSchema } from "../schemas/carts.js"
import db from "../models/index.cjs"

export default class CartService {
    constructor(cartRepo, cartItemService, variantService) {
        this.cartRepo = cartRepo;
        this.cartItemService = cartItemService;
        this.variantService = variantService
    }

    async getByUserIdAndStatus(body, transaction) {
        try {
            const result = await this.cartRepo.getCartAndDetails(body, transaction)
            return result
        }
        catch(err) {
            throw new DatabaseError(err);
        }
    }

    async addToCart(body, userId) {
        const transaction = await db.sequelize.transaction();
        try {
            const { value: cartValue, error: cartError } = createCartSchema.validate({
                variant_id: body.variant_id,
                quantity: body.quantity,
                color_id: body.color_id
            })
            if (cartError) {
                throw new ValidationError(cartError)
            }

            // Get variant and product data
            const variant = await this.variantService.getById(cartValue.variant_id);
            if (!variant) {
                throw new NotFoundError("variant not found.");
            }

            // Check cart exists
            let cart = await this.cartRepo.getCartAndDetails({
                user_id: userId,
                status: "active"
            }, transaction)
            
            // محاسبه قیمت کل, قیمت تخفیف خورده و قیمت نهایی
            // باید عدد جدید رو به عدد دیتا بیس اضافه کنیم
            let addedTotalPrice = Number(variant.Product.price) * Number(cartValue.quantity);
            let addedDiscountPrice = Number(variant.Product.discount_price) * Number(cartValue.quantity);
            let addedFinalPrice = Number(addedTotalPrice) - Number(addedDiscountPrice);
            // سبد وجود ندارد و سبد ساخته میشود
            if (!cart) {
                cart = await this.cartRepo.create({
                    user_id: userId,
                    status: "active",
                    total_price: addedTotalPrice,
                    discount_price: addedDiscountPrice,
                    final_price: addedFinalPrice,
                    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                }, transaction)
            } else {
                let newTotalPrice = Number(cart.total_price) + Number(addedTotalPrice);
                let newDiscountPrice = Number(cart.discount_price) + Number(addedDiscountPrice);
                let newFinalPrice = Number(cart.final_price) + Number(addedFinalPrice);

                cart.total_price = newTotalPrice;
                cart.discount_price = newDiscountPrice;
                cart.final_price = newFinalPrice;
                cart.expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                await cart.save({ transaction })
            }

            // Check cartItem exists
            let cartItem = await this.cartItemService.getCartItem({
                cart_id: cart.id,
                variant_id: cartValue.variant_id,
                color_id: cartValue.color_id
            }, transaction);

            // ایتم در سبد وجود دارد و فقط مقدار ان رو زیاد میکنیم
            // مقدار جدید رو محاسبه میکنیم و جای مقدار قبلی میگذاریم
            if (cartItem) {
                let newQuantity = Number(cartItem.quantity) + Number(cartValue.quantity);
                let newTotalPrice = Number(newQuantity) * Number(cartItem.unit_price);
                let newDiscountPrice = Number(newQuantity) * Number(variant.Product.discount_price);
                let newFinalPrice = Number(newTotalPrice) - Number(newDiscountPrice);

                cartItem.quantity = newQuantity;
                cartItem.total_price = newTotalPrice;
                cartItem.discount_price = newDiscountPrice;
                cartItem.final_price = newFinalPrice;
                await cartItem.save({ transaction })
            }
            // ایتم در سبد وجود ندارد
            else {
                cartItem = await this.cartItemService.create({
                    cart_id: cart.id,
                    variant_id: cartValue.variant_id,
                    color_id: cartValue.color_id,
                    quantity: cartValue.quantity,
                    unit_price: variant.Product.price,
                    total_price: addedTotalPrice,
                    discount_price: addedDiscountPrice,
                    final_price: addedFinalPrice
                }, transaction);
            }

            await transaction.commit();
            return {
                cart,
                cartItem
            }
        }
        catch(err) {
            await transaction.rollback();
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err)
        }
    }

    // ids => cartId, itemId and userId
    async deleteCartAndItem(ids) {
        const transaction = await db.sequelize.transaction()
        try {
            // Check cart exists
            let cart = await this.cartRepo.getCart({
                user_id: ids.userId,
                status: "active"
            }, transaction)
            if (!cart || cart.id != ids.cartId) {
                throw new NotFoundError("No cart exists.")
            }

            // Check cartItem exists
            let cartItem = await this.cartItemService.getById(ids.itemId, transaction)
            if (!cartItem) {
                throw new NotFoundError("No cartItem exists.")
            }

            if (cartItem.length > 1) {
                await this.cartItemService.removeById(ids.itemId, transaction);
            } else {
                await this.cartItemService.removeById(ids.itemId, transaction);
                cart.status = "abandoned";
                await cart.save({ transaction });
            }
            transaction.commit();
            return true;
        }
        catch(err) {
            transaction.rollback();
            throw new DatabaseError(err)
        }
    }

    async deleteAllCart(cartId) {
        const numericCartId = Number(cartId);
        if (!numericCartId) {
            throw new ValidationError("cartId must be integer")
        }
        try {
            const result = await this.cartRepo.deleteById(cartId)
            return result
        }
        catch(err) {
            console.log(err)
        }
    }
}