import Cart from "../models/carts.js";

export default class CartRepo {
    async getAll() {
        const carts = await Cart.findAll();
        return carts;
    }
    
    async getAllByUserId(userId) {
        return await Cart.findAll({
            where: {
                user_id: userId
            }
        })
    }

    async add(cartData) {
        return await Cart.create(cartData)
        
    }
}