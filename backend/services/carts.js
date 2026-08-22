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
                throw new ValidationError(cartError.message)
            }

            // Check cart exists
            let cart = await this.getCartByUserIdAndStatus({
                user_id: userId,
                status: "active"
            }, transaction)

            if (!cart) {
                cart = await this.cartRepo.create({
                    user_id: userId,
                    status: "active",
                    total_price: 0,
                    discount_price: 0,
                    final_price: 0,
                    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                }, transaction)
            }

            let cartItem = await this.cartItemService.getCartItems({
                cart_id: cart.id, 
                variant_id: cartValue.variant_id
            }, transaction);

            if (cartItem) {
                
                cartItem.quantity += cartValue.quantity;
                await cartItem.save({ transaction })
            }
            else {
                const variant = await this.variantService.getById(cartValue.variant_id);
                if (!variant) {
                    throw new NotFoundError("variant not found.");
                }
                
                cartItem = await this.cartItemService.create({
                    cart_id: cart.id,
                    variant_id: cartValue.variant_id,
                    quantity: cartValue.quantity,
                    unit_price: variant.Product.price,
                    total_price: variant.Product.price * cartValue.quantity,
                    discount_price: variant.Product.discount,
                    final_price: variant.Product.discount_price * cartValue.quantity
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