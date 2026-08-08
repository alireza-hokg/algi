export default class ProductImageRepo {
    constructor(ProductImage, Product) {
        this.ProductImage = ProductImage;
        this.Product = Product
    }
    async getAll() {
        return await this.ProductImage.findAll();
    }

    async get(id) {
        return await this.ProductImage.findByPk(id);
    }

    async getProductById(product_id) {
        return await this.Product.findByPk(product_id, {
            include: {
                model: this.ProductImage,
                required: false
            }
        })
    }

    async create(imageData) {
        return await this.ProductImage.create(imageData);
    }

    async remove(id) {
        return await this.ProductImage.destroy({
            where: {
                id
            }
        })
    }
}