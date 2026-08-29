import slugify from "slugify";

import {
    NotFoundError,
    ValidationError,
    DatabaseError
} from "../utils/Error.js";
import {
    createValidationSchema,
    updateValidationSchema
} from "../schemas/product.js"

// Service just received the data and process it
// Logic and validation happens here
export default class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async getAllProductsAndImages() {
        try {
            const result = await this.productRepository.getAllProductsAndImages();
            return result
        } catch(err) {
            if (err instanceof NotFoundError) {
                throw err
            }
            throw new DatabaseError(`Database error ${err.message}`)
        }
    }

    async getProductById(id) {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            throw new ValidationError("Id must be integer", 400)
        }
        try {
            const product = await this.productRepository.getById(numericId);
            if (!product) {
                throw new NotFoundError("product not found.")
            }
            return product
            // const normalizedProduct = this.#normalizeProduct(product);
            // return normalizedProduct;
            
        } catch(err) {
            if (err instanceof NotFoundError || err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message, 500)
        }
    }

    async getProductAndDetailsBySlug(slug) {
        try {
            const productAndDetails = await this.productRepository.getBySlug(slug);
            if (!productAndDetails) {
                throw new NotFoundError("محصول مورد نظر پیدا نشد.")
            }
            return productAndDetails;
        }
        catch(err) {
            throw new DatabaseError(err)
        }
    }

    async getProductAndDetailsById(id) {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            throw new ValidationError("id must be integer")
        }
        try {
            const product = await this.productRepository.getProductAndDetailsById(numericId);
            if (!product) {
                throw new NotFoundError("Product not exist.")
            }
            return product;
        }
        catch(err) {
            console.log(err.message);
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err)
        }
    }

    async createProduct(body) {
        const { value: productValue, error: productError } = createValidationSchema.validate({
            name: body.name,
            price: Number(body.price),
            discount: Number(body.discount),
            sku: body.sku,
            category_id: body.category_id,
            slug: slugify(body.name, { lower: true }) + `-${body.sku}`,
        }, {
            abortEarly: false
        })
        if (productError) {
            throw new ValidationError(productError.message)
        }

        // محاسبه قیمت تخفیف خورده
        const price = Number(productValue.price);
        const discount = Number(productValue.discount || 0);
        const discount_price = price - (price * discount/100);
        productValue.discount_price = discount_price;
        try {
            const result = await this.productRepository.create(productValue)
            return result
        } catch(err) {
            if (err instanceof ValidationError) {
                throw err;
            }
            throw new DatabaseError(err.message);
        }
    }

    async updateProduct(body, productId) {
        await this.productRepository.getById(productId);
        const { value: productValue, error: productError } = updateValidationSchema.validate({
            id: productId,
            name: body.name,
            price: body.price,
            discount: body.discount,
            sku: body.sku,
            category_id: body.category_id,
            slug: slugify(body.name, { lower: true }) + `-${body.sku}`,
        })
        if (productError) {
            throw new ValidationError(productError)
        }
        const discount_price = Number(productValue.price) - (productValue.price * productValue.discount/100);
        productValue.discount_price = discount_price;
        try {
            const [isUpdated] = await this.productRepository.update(productValue);
            if (isUpdated) {
                return productValue
            }
        } catch(err) {
            if (err instanceof ValidationError || err instanceof NotFoundError) {
                throw err;
            }
            throw new DatabaseError(err.message, err.statusCode || 500)
        }
    }

    async deleteProduct(productId) {
        const numericProductId = Number(productId);
        if (!numericProductId) {
            throw new NotFoundError("productId must be integer")
        }
        const product = await this.getProductById(productId);
        if (!product) {
            throw new NotFoundError("No product found.")
        }
        try {
            const result = await this.productRepository.delete(productId); 
            return result;
        } catch(err) {
            if (err instanceof NotFoundError) {
                return err;
            }
            throw new DatabaseError(err.message, 500)
        }
    }

    async getProductBySlug(slug) {
        try {
            const product = await this.productRepository.getBySlug(slug);
            console.log(product)
            return product
        } catch(err) {
            if (err instanceof NotFoundError) {
                return err
            }
            throw new DatabaseError(err.message || "Database error.")
        }
    }
}