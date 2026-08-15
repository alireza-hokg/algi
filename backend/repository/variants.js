import { where } from "sequelize";

export default class VariantRepo {
    constructor(Variant, Product) {
        this.Variant = Variant;
        this.Product = Product;
    }

    async findByProductIdAndSize(uniqueValue) {
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