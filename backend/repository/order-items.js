import OrderItem from "../models/order-items.js";

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

    async createMany(orderItemsData) {
        return await OrderItem.bulkCreate(orderItemsData);
    }

    async remove(id) {
        return await OrderItem.destroy({
            where: {
                id
            }
        })
    }
}