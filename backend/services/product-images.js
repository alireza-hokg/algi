
import { ConflictError, DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js";
import { createValidationSchema } from "../schemas/product-image.js"

import path from "path";
import process from "process";
import fs from "fs"

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

    async getAllByProductId(product_id) {
        try {
            const productWithImage = await this.productImageRepo.getProductById(product_id)
            return productWithImage
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async createImage(body, file) {
        try {
            await this.productService.getProductById(body.product_id);

            const { value: productImageValue, error: productImageError } = 
            createValidationSchema.validate({
                product_id: body.product_id,
                image_url: file.filename,
                image_text: body.image_text,
                is_main: body.is_main,
                size: file.size,
                mime_type: file.mimetype
            })
            
            if (productImageError) {
                throw new ValidationError(productImageError.message)
            }
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

        const image = await this.getImage(NumericImageId);
        try {
            const deletedImage = await this.productImageRepo.remove(NumericImageId);
            const filePath = path.join(
                process.cwd(),
                "uploads",
                image.image_url
            )
            if (deletedImage) {
                await fs.promises.unlink(filePath);
                return deletedImage;
            }
        } catch(err) {
            console.log(err)
            throw new DatabaseError(err.message)
        }
    }
}