export default class VariantColorRepo {
    constructor(Variant_Color) {
        this.Variant_Color = Variant_Color;
    }

    async create(body) {
        return await this.Variant_Color.create(body)
    }
}