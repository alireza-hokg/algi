
export default class VariantController {
    constructor(variantService) {
        this.variantService = variantService;
    }

    // async getVariantById

    // Create product-variant
    async createVariant(req, res) {
        const { product_id, size, color, quantity, width, height, waist } = req.body;
        
        const formattedData = {
            product_id,
            size,
            color,
            quantity,
            width,
            height,
            waist
        }
        try {
            const result = await this.variantService.createVariant(formattedData);

            return res.created(result)
        } catch(err) {
            return res.error(err.message, err.statusCode || 500)
        }
    }

    // Update product-variant by id
    async updateVariant(req, res) {
        const { id } = req.params;
        const { product_id, size, color, quantity, width, height, waist } = req.body;
        const formattedData = { product_id, size, color, quantity, width, height, waist };
        try {
            await this.variantService.updateVariant(formattedData, id);
            return res.updated(formattedData);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }
}