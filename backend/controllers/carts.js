export default class CartController {
    constructor(cartService) {
        this.cartService = cartService
    }

    async getCartAndItems(req, res) {
        const { status } = req.query;
        const { userId } = req
        try {
            const result = await this.cartService.getCartByUserIdAndStatus({
                status,
                user_id: userId
            })
            res.success(result);
        }
        catch(err) {
            res.error(err.message)
        }
    }

    async addToCart(req, res) {
        const { userId } = req
        try {
            const result = await this.cartService.addToCart(req.body, userId);
            return res.created(result)
        }
        catch(err) {
            console.log(err.message)
            res.error(err.message)
        }
    }

    // async updateCartItem(req, res) {
    //     const { cartId, itemId } = req.params;
    //     const { userId } = req;
    //     const ids = {
    //         cartId,
    //         itemId,
    //         userId
    //     }
    //     try {
    //         const result = await this.cartService.updateCartItem(body, ids)
    //         res.update(result)
    //     }
    //     catch(err) {
    //         console.log(err.message);
    //         res.error(err.message)
    //     }
    // }

    async deleteAllCart(req, res) {
        const { cartId } = req.params
        try {
            const result = await this.cartService.deleteAllCart(cartId);
            res.deleted(result, "cart deleted successfully");
        }
        catch(err) {
            console.log(err.message)
            res.error(err.message)
        }
    }
}