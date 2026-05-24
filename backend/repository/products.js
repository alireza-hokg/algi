import Product from "../models/products.js";

export default class ProductRepository {
    static async getAllProducts() {
        return await Product.findAndCountAll({
            raw: true
        });
    }

    static async getProductById(id) {
        return await Product.findByPk(id, {
            raw: true
        });
    }
    
}