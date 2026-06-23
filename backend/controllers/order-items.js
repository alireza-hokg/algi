export default class OrderItemController {
    constructor(orderItemService) {
        this.orderItemService = orderItemService;
    }

    async getAll(req, res) {
        try {
            const result = await this.orderItemService.getAll();
            res.success(result, "ایتم های سفارش با موفقیت گرفته شد.");
        } catch(err) {
            res.error(err.message)
        }
    }
}