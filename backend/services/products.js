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

            const formattedData = results.rows.map(product=> ({
                id: product.id,
                name: product.name,
                price: product.name,
                sku: product.sku
            }));

            return {
                success: true,
                body: formattedData,
                count: results.count,
                message: "All products fetched"
            }
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

        const product = await ProductRepository.getProductById(id);
        if (!product) {
            throw new Error('Product not found.')
        }
        return product;
    }
}