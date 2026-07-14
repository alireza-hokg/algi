
import { ConflictError, DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js";

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

    async createImage(initialImageData) {
        const { product_id, image_url, image_text, is_main, size, mime_type } = initialImageData;
        try {
            if (!product_id || !image_url) {
                throw new ValidationError("product_id & image_url لازم هست")
            }

            const product = await this.productService.getProductById(product_id);
            if (!product) {
                throw new NotFoundError("product وجود ندارد")
            }

            const result = await this.productImageRepo.create(initialImageData);
            return result
        } catch(err) {
            if (err.name === "SequelizeUniqueConstraintError") {
                throw new ConflictError("این url قبلا ثبت شده است")
            }
            if (err instanceof ValidationError && err instanceof NotFoundError) {
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