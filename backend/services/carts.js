import { DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js";
import { createCartSchema } from "../schemas/carts.js"
import db from "../models/index.cjs"

export default class CartService {
    constructor(cartRepo, cartItemService, variantService) {
        this.cartRepo = cartRepo;
        this.cartItemService = cartItemService;
        this.variantService = variantService
    }

    async exists(body, transaction) {
        try {
            const result = await this.cartRepo.exists(body, transaction)
            return result
        }
        catch(err) {
            throw new DatabaseError(err);
        }
    }

    async getCartByUserIdAndStatus(body) {
        try {
            const result = await this.cartRepo.getCartAndItems(body);
            return result
        }
        catch(err) {
            throw new DatabaseError(err)
        }
    }

    async addToCart(body, userId) {
        const transaction = await db.sequelize.transaction();
        try {
            const { value: cartValue, error: cartError } = createCartSchema.validate({
                variant_id: body.variant_id,
                quantity: body.quantity
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
            let cart = await this.getCartByUserIdAndStatus({
                user_id: userId,
                status: "active"
            }, transaction)

            // محاسبه قیمت کل, قیمت تخفیف خورده و قیمت نهایی
            let total_price = variant.Product.price * cartValue.quantity;
            let discount_price = variant.Product.discount_price * cartValue.quantity;
            let final_price = total_price - discount_price;
            
            if (!cart) {
                cart = await this.cartRepo.create({
                    user_id: userId,
                    status: "active",
                    total_price,
                    discount_price,
                    final_price,
                    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                }, transaction)
            }

            let cartItem = await this.cartItemService.getCartItems({
                cart_id: cart.id, 
                variant_id: cartValue.variant_id
            }, transaction);

            // ایتم در سبد وجود دارد و فقط مقدار ان رو زیاد میکنیم
            if (cartItem) {
                cartItem.quantity += cartValue.quantity;
                cartItem.total_price += total_price;
                cartItem.discount_price += discount_price;
                cartItem.final_price = final_price;
                await cartItem.save({ transaction })
            }
            // ایتم در سبد وجود ندارد
            else {
                cartItem = await this.cartItemService.create({
                    cart_id: cart.id,
                    variant_id: cartValue.variant_id,
                    quantity: cartValue.quantity,
                    unit_price: variant.Product.price,
                    total_price: total_price,
                    discount_price: discount_price,
                    final_price: final_price
                }, transaction);

                await transaction.commit();
                return {
                    cart,
                    cartItem
                }
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

    
}