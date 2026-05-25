import slugify from "slugify";

import Product from "../models/products.js";
import ProductRepository from "../repository/products.js";
import { NotFoundError, ValidationError, DatabaseError } from "../utils/Error.js";

// Service just received the data and process it
// Logic and validation happens here
export default class ProductService {

    static async getAllProducts() {
        try {
            const results = await ProductRepository.getAllProducts();
            // No data
            if (results.rows.length === 0) {
                throw new NotFoundError("no product found.");
            }
            const formattedData = this._formatProducts(results.rows);
            return formattedData;
        } catch(err) {
            throw new DatabaseError(`Database error ${err.message}`)
        }
    }

    static async getProductById(id) {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            throw new ValidationError("Id must be integer", 400)
        }
        try {
            const product = await ProductRepository.getProductById(id);
            if (!product) {
                throw new NotFoundError('Product not found.', 404)
            }
            const formattedData = this._formatProduct(product);
            return formattedData;

        } catch(err) {
            throw new DatabaseError('Database error.', 500)
        }
    }

    static async createProduct(product) {
        const { name, price, sku } = product;
        if (!name || !price) {
            throw new ValidationError("invalid data", 400);
        }
        try {
            const result = await Product.create({
                name,
                price,
                sku,
                slug: slugify(name, { lower: true }) + `-${sku}`
            })
            return result.dataValues
        } catch(err) {
            console.log(err)
            throw new DatabaseError(err.message, 500);
        }
    }

    static async updateProduct(product, productId) {
        const numericProductId = Number(productId);
        if (isNaN(numericProductId)) {
            throw new ValidationError("productId must be integer");
        }
        try {
            const [updatedCount] = await Product.update({
                name: product.name,
                price: product.price,
                category_id: product.category_id,
                sku: product.sku,
                slug: slugify(product.name, { lower: true }) + `-${product.sku}`
            }, {
                where: { id: productId }
            })
            if (updatedCount === 1) {
                return product
            }
        } catch(err) {
            throw new Error(err.message, err.statusCode || 500)
        }
    }

    static async deleteProduct(productId) {
        const product = await this.getProductById(productId);
        try {
            const result = await ProductRepository.delete(productId); 
            return result;
        } catch(err) {
            throw new DatabaseError(err.message, 500)
        }
    }
    
    static _formatProduct(product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            sku: product.sku
        }
    }

    static _formatProducts(products) {
        return products.map(product=> this._formatProduct(product))
    }
}