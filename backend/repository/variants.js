export default class VariantRepo {
    constructor(Variant) {
        this.Variant = Variant;
    }

    async getById(id) {
        const result = await this.Variant.findByPk(id, {
            include: [
                {
                    association: "Product",
                    attributes: ["id", "price", "discount", "discount_price"]
                }
            ]
        });
        return result
    }

    async findByProductIdAndSize(uniqueValue) {
        return await this.Variant.findOne({
            where: uniqueValue
        })
    }

    async create(variantData) {
        console.log(variantData)
        const result = await this.Variant.create(variantData);
        console.log(result)
        return result
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