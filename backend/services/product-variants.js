export default class ProductVariantService {
    constructor(productService) {
        this.productService = productService
    }

    static async getVariantsByProductSlug(slug) {
        const product = await this.productService.getBySlug(slug);
    }
}