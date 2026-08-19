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
}