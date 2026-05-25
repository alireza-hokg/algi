import slugify from "slugify";

import Product from "../models/products.js";
import { NotFoundError, ValidationError, DatabaseError } from "../utils/Error.js";

// Service just received the data and process it
// Logic and validation happens here
export default class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async getAllProducts() {
        try {
            const results = await this.productRepository.getAllProducts();
            // No data
            if (results.rows.length === 0) {
                throw new NotFoundError("no product found.");
            }
            const formattedData = this._formatProducts(results.rows);
            return formattedData;
        } catch(err) {
            if (err instanceof NotFoundError) {
                return err
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
            const product = await this.productRepository.getById(id);
            if (!product) {
                throw new NotFoundError("product not found.")
            }
            const formattedData = this._formatProduct(product);
            return formattedData;
            
        } catch(err) {
            if (err instanceof NotFoundError || err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError('Database error.', 500)
        }
    }

    async createProduct(product) {
        const { name, price, sku, category_id, slug } = product;
        if (!name || !price || !sku || !slug) {
            throw new ValidationError("invalid data", 400);
        }
        const formattedData = {
            name,
            price,
            sku,
            category_id,
            slug
        }
        try {
            const result = await this.productRepository.create(formattedData)
            return result.dataValues
        } catch(err) {
            if (err instanceof ValidationError) {
                return err;
            }
            throw new DatabaseError(err.message, 500);
        }
    }

    async updateProduct(product, productId) {
        const numericProductId = Number(productId);
        if (isNaN(numericProductId)) {
            throw new ValidationError("productId must be integer");
        }
        const currentProduct = await this.productRepository.getById(numericProductId);
        if (!currentProduct) {
            throw new NotFoundError("No product found.")
        }
        try {
            const [isUpdated] = await this.productRepository.update(product, productId);
            if (isUpdated) {
                return product
            }
        } catch(err) {
            if (err instanceof ValidationError || err instanceof NotFoundError) {
                return err;
            }
            throw new DatabaseError(err.message, err.statusCode || 500)
        }
    }

    async deleteProduct(productId) {
        const numericProductId = Number(productId);
        if (!numericProductId) {
            throw new NotFoundError("No product found.")
        }
        const product = await this.getProductById(productId);
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
    
    _formatProduct(product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            sku: product.sku
        }
    }

    _formatProducts(products) {
        return products.map(product=> this._formatProduct(product))
    }

    async getProductBySlug(slug) {
        try {
            const product = await this.productRepository.getBySlug(slug);
            console.log(product)
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