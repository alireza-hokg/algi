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
            const createdVariant = await this.variantRepo.create(variantData);
            return createdVariant.dataValues;
        } catch(err) {
            if (err instanceof ValidationError || err instanceof ConflictError) {
                throw err;
            }
            throw new DatabaseError("createVariant database error");
        }
    }

    async updateVariant(variantData, id) {
        const { product_id, size, color, quantity, width, height, waist, image_url } = variantData;
        const numericId = Number(id);
        if (Number.isNaN(numericId)) {
            throw new NotFoundError("id must be integer.")
        }
        try {
            if (!(product_id && size && color && quantity)) {
                throw new ValidationError("product_id, size, color, quantity is required.")
            }
            const isDuplicate = await this.isVariantDuplicate({product_id, size, color})
            if (isDuplicate) {
                throw new ConflictError("createVariant conflict error");
            }
            const [isUpdated] = await this.variantRepo.update(variantData, numericId);
            return isUpdated;
        } catch(err) {
            throw new DatabaseError("update variantService database error.")
        }
    }
}