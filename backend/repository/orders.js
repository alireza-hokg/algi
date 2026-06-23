import Order from "../models/orders.js"

export default class OrderRepo {
    async getAll() {
        return await Order.findAll();
    }

    async get(orderId) {
        return await Order.findByPk(orderId);
    }

    async create(orderData) {
        return await Order.create(orderData)
    }
}