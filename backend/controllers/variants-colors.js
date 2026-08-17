export default class VariantColorController {
    constructor(variant_colorService) {
        this.variant_colorService = variant_colorService
    }

    async create(req, res) {
        try {
            const result = await this.variant_colorService.create(req.body);
            console.log(result)
            return res.success(result)
        }
        catch(err) {
            return res.error(err.message)
        }
    }
}