
export default class ProductRepository {
    constructor(Product, Product_Image, Variant, Color) {
        this.Product = Product;
        this.Product_Image = Product_Image;
        this.Variant = Variant;
        this.Color = Color
    }

    async getAllProductsAndImages() {
        const result = await this.Product.findAndCountAll({
            include: [
                {
                    model: this.Product_Image,
                    required: false
                },
                { 
                    model: this.Variant,
                    required: false
                }
            ]
        });
        return {
            rows: result.rows,
            count: result.count
        }
    }

    async getById(id) {
        try {
            const result = await this.Product.findByPk(id);
            return result
        }
        catch(err) {
            console.log(err)
            throw err
        }
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
            include: [
                { 
                    model: this.Product_Image,
                    required: false
                },
                {
                    model: this.Variant,
                    required: false,
                    include: [
                        {
                            model: this.Color,
                            required: false
                        }
                    ]
                },
            ]
        })
        return product;
    }

    async getProductAndDetailsById(id) {
        const result = await this.Product.findByPk(id, {
            include: [
                {
                    model: this.Product_Image,
                    required: false
                }
            ]
        })
        return result
    }
}