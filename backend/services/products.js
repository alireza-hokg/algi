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

    async getAllProducts() {
        try {
            const {rows, count} = await this.productRepository.getAllProducts();
            
            const normalizedProducts = this.#normalizeProducts(rows);
            return normalizedProducts;
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
            const normalizedProduct = this.#normalizeProduct(product);
            return normalizedProduct;
            
        } catch(err) {
            if (err instanceof NotFoundError || err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError('Database error.', 500)
        }
    }

    async createProduct(body) {
        const { value: productValue, error: productError } = createValidationSchema.validate({
            name: body.name,
            price: body.price,
            sku: body.sku,
            category_id: body.category_id,
            slug: slugify(body.name, { lower: true }) + `-${body.sku}`,
        }, {
            abortEarly: false
        })
        if (productError) {
            throw new ValidationError(productError.message)
        }

        try {
            const result = await this.productRepository.create(productValue)
            return {
                id: result.id,
                name: result.name,
                price: result.price,
                sku: result.sku,
                category_id: result.category_id,
                slug: result.slug
            }
        } catch(err) {
            if (err instanceof ValidationError) {
                throw err;
            }
            throw new DatabaseError(err.message, 500);
        }
    }

    async updateProduct(body, productId) {
        const numericProductId = Number(productId);
        if (isNaN(numericProductId)) {
            throw new ValidationError("productId must be integer");
        }
        await this.productRepository.getById(numericProductId);
        
        const { value: categoryValue, error: categoryError } = updateValidationSchema.validate({
            id: numericProductId,
            name: body.name,
            price: body.price,
            sku: body.sku,
            category_id: body.category_id,
            slug: slugify(body.name, { lower: true }) + `-${body.sku}`,
        })
        if (categoryError) {
            throw new ValidationError(categoryError.message)
        }

        try {
            const [isUpdated] = await this.productRepository.update(categoryValue);
            if (isUpdated) {
                return categoryValue
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
    
    #normalizeProduct(product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            sku: product.sku,
            slug: product.slug
        }
    }

    #normalizeProducts(products) {
        return products.map(product=> this.#normalizeProduct(product))
    }

    async getProductBySlug(slug) {
        try {
            const product = await this.productRepository.getBySlug(slug);
            if (!product) {
                throw new NotFoundError("No product found.")
            }
            return product
        } catch(err) {
            if (err instanceof NotFoundError) {
                return err
            }
            throw new DatabaseError("Internal server error.")
        }
    }
}