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
        const { userId } = req.params;
        try {
            const cart = await this.cartService.getAllByUserId(userId);
            res.success(cart, "سبد خرید با موفقیت بارگذاری شد.")
        }
        catch(err) {
            res.error(err.message);
        }
    }
}