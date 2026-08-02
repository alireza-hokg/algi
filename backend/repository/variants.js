import { where } from "sequelize";

export default class VariantRepo {
    constructor(Variant, Product) {
        this.Variant = Variant;
        this.Product = Product;
    }
    
    async getVariantsByProductId(productId) {
        const variants = await this.Variant.findAndCountAll({
            where: {
                product_id: productId
            },
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"]},
            include: [
                {
                    model: this.Product,
                    attributes: ['name', 'sku'],
                    required: true
                }
            ],
            nest: false
        })
        return variants
    }

    async findOneByProductIdAndSizeAndColor(uniqueValue) {
        return await this.Variant.findOne({
            where: uniqueValue
        })
    }

    async create(variantData) {
        return await this.Variant.create(variantData);
    }

    async update(variantData, variantId) {
        return await this.Variant.update(
            variantData, {
            where: {
                id: variantId
            }
        })
    }
}