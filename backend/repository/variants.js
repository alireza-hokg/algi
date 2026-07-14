import {Product, Variant} from "../models/index.js";

export default class VariantRepo {
    async getVariantsByProductId(productId) {
        const variants = await Variant.findAndCountAll({
            where: {
                product_id: productId
            },
            include: [
                {
                    model: Product,
                    attributes: ['name', 'sku'],
                    required: true
                }
            ],
            raw: true,
            nest: false
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

    async update(variantData, variantId) {
        return await Variant.update(
            variantData, {
            where: {
                id: variantId
            }
        })
    }
}