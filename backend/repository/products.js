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
    
    static async create(product) {
        return await Product.create(product);
    }

    static async update(product, productId) {
        return await Product.update(
            {
                name: product.name,
                price: product.price,
                sku: product.sku
            },
            {
                where: {
                    id: productId
                }
            }
        )
    }

    static async delete(productId) {
        return await Product.destroy({
            where: {
                id: productId
            },
        })
    }
}