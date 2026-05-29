import { UpdatedAt } from "@sequelize/core/decorators-legacy";
import UpdateVariantDto from "../dtos/product/updateProductDto.js";
import { NotFoundError, DatabaseError, ValidationError, ConflictError } from "../utils/Error.js";

export default class VariantService {
    constructor(variantRepo, productService) {
        this.variantRepo = variantRepo;
        this.productService = productService;
    }
    // fetch all the variants by product.slug
    async getVariantsBySlug(slug) {
        try {
            const product = await this.productService.getProductBySlug(slug);
            if (!product) {
                throw new NotFoundError('No product found by slug', 404)
            }
            const result = await this.variantRepo.getVariantsByProductId(product.id);
            console.log(result)
            return result;
        } catch(err) {
            if (err instanceof NotFoundError) {
                return err
            }
            throw new DatabaseError('services/variants');
        }
    }
    // Check if product_id, size and color is not the same
    async isVariantDuplicate(variantData) {
        const existing = await this.variantRepo.findOneByProductIdAndSizeAndColor(variantData);
        return existing !== null && Object.keys(existing).length > 0;
    }
    
    async createVariant(variantData) {
        
        const { product_id, size, color, quantity, width, height, waist, image_url } = variantData;
        try {
            if (!(product_id && size && color && quantity)) {
                throw new ValidationError("product_id, size, color, quantity is required.")
            }
            const isDuplicate = await this.isVariantDuplicate({product_id, size, color})
            if (isDuplicate) {
                throw new ConflictError("createVariant conflict error");
            }
            const allowedFields = {
                product_id,
                size,
                color,
                quantity,
                width,
                height,
                waist,
                image_url 
            };
            const cleanFields = Object.fromEntries(
                Object.entries(allowedFields).filter(([_, v])=> v !== undefined && v !== null)
            )
            const createdVariant = await this.variantRepo.create(cleanFields);
            return createdVariant.dataValues;
        } catch(err) {
            if (err instanceof ValidationError || err instanceof ConflictError) {
                throw err;
            }
            throw new DatabaseError("createVariant database error");
        }
    }

    async updateVariant(updateFields, id) {
        const { product_id, size, color, quantity, width, height, waist, image_url } = updateFields;
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