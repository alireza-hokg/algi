import { NotFoundError } from "../utils/Error.js";

export default class OrderController {
    constructor(orderService) {
        this.orderService = orderService
    }

    async getAllOrders(req, res) {
        try {
            const result = await this.orderService.getAllOrders();
            console.log(result)
            res.success(result, "سفارشات با موفقیت گرفته شد.")
        } catch(err) {
            res.error(err.message)
        }
    }

    async getOrder(req, res) {
        const { id } = req.params
        try {
            const result = await this.orderService.getOrder(id)
            res.success(result);
        } catch(err) {
            res.error(err.message);
        }
    }

    async createOrder(req, res) {
        const orderData = req.body;
        try {
            const result = await this.orderService.createOrder(orderData)
            res.created(result);
        } catch(err) {
            res.error(err.message)
        }
    }
}