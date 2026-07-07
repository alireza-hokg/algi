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
        const {token} = req.cookies;
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
        const {token} = req.cookies;
        const {userId} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const {body} = req;
        body.user_id = userId;
        try {
            const result = await this.cartService.add(body);
            res.created(result, "کالا به سبد خرید اضافه شد.");
        }
        catch(err) {
            res.error(err.message)
        }
    }
}