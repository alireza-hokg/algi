import UpdateVariantDto from "../dtos/variant/updateVariant.js";
import { NotFoundError, DatabaseError, ValidationError, ConflictError } from "../utils/Error.js";
import { createValidationSchema } from "../schemas/variant.js";

export default class VariantService {
    constructor(variantRepo, productService) {
        this.variantRepo = variantRepo;
        this.productService = productService;
    }
    
    // Check if product_id, size and color is not the same
    async isVariantDuplicate(variantData) {
        const existing = await this.variantRepo.findOneByProductIdAndSizeAndColor(variantData);
        return existing !== null && Object.keys(existing).length > 0;
    }

    // get variant by id
    async getById(id) {
        try {
            const result = await this.variantRepo.getById(id);
            return result
        }
        catch(err) {
            throw new DatabaseError(err)
        }
    }
    
    async createVariant(body) {
        try {
            const { value: variantValue, error: variantError } = createValidationSchema.validate({
                product_id: body.product_id,
                size: body.size,
                quantity: body.quantity,
                height: body.height,
                width: body.width,
                waist: body.waist
            })
            if (variantError) {
                throw new ValidationError(variantError.message)
            }

            const createdVariant = await this.variantRepo.create(variantValue);
            return createdVariant;
        } catch(err) {
            if (err instanceof ValidationError) {
                throw err;
            }
            throw new DatabaseError("createVariant database error");
        }
    }

    async updateVariant(updateFields, id) {
        const { product_id, size, color, quantity, width, height, waist } = updateFields;
        const numericId = Number(id);
        if (Number.isNaN(numericId)) {
            throw new NotFoundError("id must be integer.")
        }
        try {
            const updateDto = new UpdateVariantDto(updateFields);
            // Is there any fields for update
            if (!updateDto.hasAnyFieldToUpdate()) {
                throw new ValidationError("No valid fields updated.")
            }
            // validation
            UpdateVariantDto.validateForUpdate(updateFields);
            // Remove null and undefiend fields and get the clean fields
            const cleanData = updateDto.getCleanData();
            
            const isDuplicate = await this.isVariantDuplicate({product_id, size, color})
            if (isDuplicate) {
                throw new ConflictError("UpdateVariant conflict error");
            }

            const [rowsAffected] = await this.variantRepo.update(cleanData, numericId);
            return rowsAffected;
        } catch(err) {
            if (err instanceof NotFoundError || err instanceof ConflictError || err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError("Update variantService database error.")
        }
    }

}