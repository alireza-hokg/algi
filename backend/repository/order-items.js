import OrderItem from "../models/order-items.js";

export default class OrderItemRepo {
    async getAll() {
        return await OrderItem.findAll();
    }

    
}