
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
            console.log("Error in ProductService.getAllProducts:", err);
            throw new DatabaseError(`Database error ${err.message}`)
        }
    }

    static async getProductById(id) {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            throw new ValidationError("Id must be integer")
        }
        try {
            const product = await ProductRepository.getProductById(id);
            if (!product) {
                throw new NotFoundError('Product not found.')
            }
            const formattedData = this._formatProduct(product);
            return formattedData;

        } catch(err) {
            throw new DatabaseError('Database error.')
        }
    }

    static async createProduct(product) {

    }

    static async updateProduct(product, productId) {

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