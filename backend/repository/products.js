
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
        const result = await this.Product.findByPk(id);
        console.log(result);
        return result
    }
    
    async create(product) {
        return await this.Product.create(product);
    }

    async update(product) {
        return await this.Product.update({
            name: product.name,
            price: product.price,
            category_id: product.category_id,
            sku: product.sku,
            slug: product.slug
        }, {
            where: { id: product.id }
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