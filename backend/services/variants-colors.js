import { DatabaseError, ValidationError } from "../utils/Error.js";
import { createValidationSchema } from "../schemas/variant-color.js";

export default class VariantColorService {
    constructor(variant_colorRepo) {
        this.variant_colorRepo = variant_colorRepo;
    }

    async create(body) {
        try {
            const { value: variant_colorValue, error: variant_colorError } =
            createValidationSchema.validate({
                color_id: body.color_id,
                variant_id: body.variant_id,
                stock_quantity: body.stock_quantity
            })
            if (variant_colorError) {
                throw new ValidationError(variant_colorError.message)
            }
            const result = await this.variant_colorRepo.create(variant_colorValue);
            return result
        }
        catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err)
        }
    }
}