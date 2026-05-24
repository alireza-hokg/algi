import Product from "../models/products.js";
import ProductRepository from "../repository/products.js";

// Service just received the data and process it
// Logic and validation happens here
export default class ProductService {

    static async getAllProducts() {
        try {
            const results = await ProductRepository.getAllProducts();
            // No data
            if (results.rows.length === 0) {
                return {
                    success: false,
                    body: [],
                    message: "No product found.",
                    count: 0
                }
            }
            const formattedData = this._formatProducts(results.rows);
            
            return this._buildResponse(true, formattedData, "All products fetched successfully", results.count)
        } catch(err) {
            console.log("Error in ProductService.getAllProducts:", err);
            throw new Error(`Database error ${err.message}`)
        }
    }

    static async getProductById(id) {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            throw new Error("Id must be integer")
        }
        try {
            const product = await ProductRepository.getProductById(id);
            if (!product) {
                throw new Error('Product not found.')
            }
            const formattedData = this._formatProduct(product);
            return this._buildResponse(true, formattedData, "Product fetched  successfully")

        } catch(err) {
            this._handleError(err, "services:getProductById")
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

    static _buildResponse(success, body, message, count) {
        return {
            success,
            body,
            message,
            count
        }
    }

    static async _handleError(err, methodName) {
        console.log(`Error in ${methodName}: `, err);
        throw new Error(`Database error ${err.message}`)
    }
}