import Order from "../models/orders.js"

export default class OrderRepo {
    async getAll() {
        return await Order.findAll();
    }

    async get(orderId) {
        return await Order.findByPk(orderId);
    }

    async create(orderData, transaction = null) {
        const options = transaction ? { transaction } : {}
        return await Order.create(orderData, options)
    }

    async remove(id, transaction = null) {
        const options = transaction ? { transaction } : {}
        return await Order.destroy({
            where: {
                id
            },
            transaction: options.transaction
        })
    }
}