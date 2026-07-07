import { Op, where } from "@sequelize/core";
import Cart from "../models/carts.js";

export default class CartRepo {
    async findById(id) {
        return await Cart.findByPk(id);
    }

    async findOneByUserAndStatus(cartBody) {
        return await Cart.findOne({
            where: {
                [Op.and]: [
                    { user_id: cartBody.user_id },
                    { status: cartBody.status },
                    { product_id: cartBody.product_id}
                ]
            }
        })
    }

    // تمام سبد ها بر اساس وضعیت
    async findCartsByUserAndStatus(cartBody) {
        const carts = await Cart.findAll({
            where: {
                [Op.and]: [
                    { user_id: cartBody.user_id }, 
                    { status: cartBody.status }
                ]
            }
        });
        return carts;
    }
    
    async create(cartData) {
        return await Cart.create(cartData)
    }

    async update(cartData) {
        return await Cart.update(
            cartData, {
                where: {
                    id: cartData.id
                }
            }
        )
    }
}