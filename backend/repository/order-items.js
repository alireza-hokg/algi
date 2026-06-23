import OrderItem from "../models/order-items.js";

export default class OrderItemRepo {
    async getAll() {
        return await OrderItem.findAll();
    }

    async get(id) {
        return await OrderItem.findByPk(id);
    }

    async create(orderItemsData) {
        return await OrderItem.bulkCreate(orderItemsData);
    }
}