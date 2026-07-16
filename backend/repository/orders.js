import {Order} from "../models/index.cjs"

export default class OrderRepo {
    async getAll() {
        return await Order.findAll();
    }

    async getById(orderId) {
        return await Order.findByPk(orderId);
    }

    async getByUserId(userId) {
        return await Order.findAll({
            where: {
                userId
            }
        })
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