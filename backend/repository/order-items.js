import { OrderItem } from "../modeltest/index.cjs";

export default class OrderItemRepo {
    async getAll() {
        return await OrderItem.findAll();
    }

    async get(id) {
        return await OrderItem.findByPk(id);
    }

    async getAllByOrderId(orderId) {
        
        return await OrderItem.findAll({
            where: {
                order_id: orderId
            }
        })
    }

    async createMany(orderItemsData, transaction) {
        const options = transaction ? { transaction } : {}
        return await OrderItem.bulkCreate(orderItemsData, options);
    }

    async remove(id, transaction) {
        const options = transaction ? { transaction } : {}
        return await OrderItem.destroy({
            where: {
                id
            },
            transaction: options.transaction
        })
    }
}