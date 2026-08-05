
import { ConflictError, DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js";
import { createValidationSchema } from "../schemas/product-image.js"

export default class ProductImageService {
    constructor(productImageRepo, productService) {
        this.productImageRepo = productImageRepo
        this.productService = productService
    }

    async getAllImages() {
        try {
            const productImages = await this.productImageRepo.getAll();
            return productImages
        } catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getImage(imageId) {
        const numericImageId = Number(imageId)
        try {
            const image = await this.productImageRepo.get(numericImageId)
            if (!image) {
                throw new NotFoundError("عکس پیدا نشد.")
            }
            return image;
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    async createImage(body, file) {
        try {
            const { value: productImageValue, error: productImageError } = 
            createValidationSchema.validate({
                product_id: body.product_id,
                image_url: file.path,
                image_text: body.image_text,
                is_main: body.is_main,
                size: file.size,
                mime_type: file.mimetype
            })
            console.log(productImageValue)
            if (productImageError) {
                throw new ValidationError(productImageError.message)
            }
            
            await this.productService.getProductById(body.product_id);
            return await this.productImageRepo.create(productImageValue);
        } catch(err) {
            if (err.name === "SequelizeUniqueConstraintError") {
                throw new ConflictError("این url قبلا ثبت شده است")
            }
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err)
        }
    }

    async deleteImage(imageId) {
        const NumericImageId = Number(imageId)

        await this.getImage(NumericImageId);

        try {
            const image = await this.productImageRepo.remove(NumericImageId);
            return image;
        } catch(err) {
            console.log(err)
            throw new DatabaseError(err.message)
        }
    }
}