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

    async get(req, res) {
        const { id } = req.params;
        try {
            const result = await this.orderItemService.get(id);
            res.success(result, "محصول سفارش داده شده گرفته شد.")
        } catch(err) {
            res.error(err.message);
        }
    }

    async create(req, res) {
        const { body } = req;
        try {
            const result = await this.orderItemService.createMany(body);
            res.created(result);
        } catch(err) {
            res.error(err.message);
        }
    }

    async remove(req, res) {
        const { id } = req.params;
        try {
            const result = await this.orderItemService.remove(id);
            res.deleted(result, 'سفارش حذف شد.');
        } catch(err) {
            res.error(err.message)
        }
    }
}