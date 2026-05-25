import Product from "../models/products.js";

export default class ProductRepository {
    async getAllProducts() {
        return await Product.findAndCountAll({
            raw: true
        });
    }

    async getById(id) {
        return await Product.findByPk(id, {
            raw: true
        });
    }
    
    async create(product) {
        return await Product.create(product);
    }

    async update(product, productId) {
        return await Product.update({
            name: product.name,
            price: product.price,
            category_id: product.category_id,
            sku: product.sku,
            slug: product.slug
        }, {
            where: { id: productId }
        })
    }

    async delete(productId) {
        return await Product.destroy({
            where: {
                id: productId
            },
        })
    }

    async getBySlug(slug) {
        const product = await Product.findOne({
            where: {
                slug
            },
        })
        return product;
    }
}