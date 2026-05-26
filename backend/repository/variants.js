import Variant from "../models/variants.js";

export default class VariantRepo {
    async getVariantsByProductId(productId) {
        const variants = await Variant.findAndCountAll({
            where: {
                product_id: productId
            }
        },
        )
        return variants
    }

    async findOneByProductIdAndSizeAndColor(uniqueValue) {
        return await Variant.findOne({
            where: uniqueValue
        })
    }

    async create(variantData) {
        return await Variant.create(variantData);
    }
}