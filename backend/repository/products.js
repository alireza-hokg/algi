
export default class ProductRepository {
    constructor(Product) {
        this.Product = Product;
    }
    async getAllProducts() {
        const result = await this.Product.findAndCountAll({
            raw: true
        });
        return {
            rows: result.rows,
            count: result.count
        }
    }

    async getById(id) {
        return await this.Product.findByPk(id, {
            raw: true
        });
    }
    
    async create(product) {
        return await this.Product.create(product);
    }

    async update(product, productId) {
        return await this.Product.update({
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
        return await this.Product.destroy({
            where: {
                id: productId
            },
        })
    }

    async getBySlug(slug) {
        const product = await this.Product.findOne({
            where: {
                slug
            },
        })
        return product;
    }
}