export default class ProductImageRepo {
    constructor(ProductImage) {
        this.ProductImage = ProductImage;
    }
    async getAll() {
        return await this.ProductImage.findAll();
    }

    async get(id) {
        return await this.ProductImage.findByPk(id);
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