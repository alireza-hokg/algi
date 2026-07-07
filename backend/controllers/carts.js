import jwt from "jsonwebtoken";

export default class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }

    // گرفتن سبد با id
    async getCartById(req, res) {
        const { id } = req.params;
        try {
            const result = await this.cartService.getCartById(id);
            res.success(result, "گرفتن سبد خرید با id")
        }
        catch(err) {
            res.error(err)
        }
    }

    // تمام سبد ها بر اساس وضعیت
    async getCartsByUserAndStatus(req, res) {
        const body = req.body;
        const { token } = req.cookies;
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        body.user_id = user.userId

        try {
            const carts = await this.cartService.getCartsByUserAndStatus(body);
            res.success(carts, "سبدهای خرید با موفقیت گرفته شد.");
        }
        catch(err) {
            res.error(err.message)
        }
    }

    // اضافه کردن به سبد خرید
    async addToCart(req, res) {
        const {token} = req.cookies;
        const {userId} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const {body} = req;
        body.user_id = userId;
        try {
            const result = await this.cartService.upsertCart(body);
            res.created(result, "کالا به سبد خرید اضافه شد.");
        }
        catch(err) {
            res.error(err.message)
        }
    }

    async removeFromCart(req, res) {

    }
}