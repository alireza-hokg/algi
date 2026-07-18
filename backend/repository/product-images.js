export default class ProductImageRepo {
    constructor(ProductImage) {
        this.ProductImage = ProductImage;
    }
    async getAll() {
        return await ProductImage.findAll();
    }

    async get(id) {
        return await ProductImage.findByPk(id);
    }

    async create(imageData) {
        return await ProductImage.create(imageData);
    }

    async remove(id) {
        return await ProductImage.destroy({
            where: {
                id
            }
        })
    }
}