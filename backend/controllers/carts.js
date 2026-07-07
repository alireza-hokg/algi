import jwt from "jsonwebtoken";

export default class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }

    // تمام کالاها در جدول سبد خرید
    async getAll(req, res) {
        try {
            const carts = await this.cartService.getAll();
            res.success(carts, "سبدهای خرید با موفقیت گرفته شد.");
        }
        catch(err) {
            res.error(err.message)
        }
    }

    // تمام کالاهای یک مشتری
    async getAllByUserId(req, res) {
        const token = req.cookies.token;
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        try {
            const cart = await this.cartService.getAllByUserId(user.userId);
            res.success(cart, "سبد خرید با موفقیت بارگذاری شد.")
        }
        catch(err) {
            res.error(err.message);
        }
    }

    async add(req, res) {
        const {body} = req
        try {
            return await this.cartService.add(body);
        }
        catch(err) {
            res.error(err.message)
        }
    }
}