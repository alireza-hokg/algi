export default class VariantColorController {
    constructor(variant_colorService) {
        this.variant_colorService = variant_colorService
    }

    async create(req, res) {
        try {
            const result = await this.variant_colorService.create(req.body)
            res.success(result)
        }
        catch(err) {
            console.log(err.message)
        }
    }
}