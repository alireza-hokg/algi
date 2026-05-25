import { Op } from "@sequelize/core";

import Product from "../models/products.js";
import ProductService from "../services/products.js";

// Controller just recieves the request and responses
export default class ProductController {
    // Get All the products
    static async getProducts(req, res) {
        try {
            const result = await ProductService.getAllProducts();
            return res.success(result, "Products fetched Successfully");
            
        } catch(err) {
            res.error(err.message, err.code);
        }
    }

    // Get Product by id
    static async getProductById(req, res) {
        let { id } = req.params;
        try {
            const result = await ProductService.getProductById(id);
            if (!result) {
                return res.notFound("Product not found.")
            }
            return res.success(result, "Product fetched successfully.", 200);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500)
        }
    }

    static async createProduct(req, res) {
        // PARAMETERS name, price, sku
        const { name, price, sku } = req.body;
        const initialData = {
            name,
            price,
            sku
        };
        try {
            const result = await ProductService.createProduct(initialData);
            return res.success(result, 201);
        } catch(err) {
            res.error(err.message, err.statusCode || 500);
        }
    }

    static async updateProduct(req, res) {
        const { id } = req.params;
        const { name, price, category_id, sku } = req.body;
        const formattedData = { 
            name,
            price,
            category_id,
            sku
        }
        try {
            const result = await ProductService.updateProduct(formattedData, id);
            
            return res.updated(result, "Product updated.");
        } catch(err) {
            res.error(err.message, err.statusCode || 500)
        }
    }

    static async deleteProduct(req, res) {
        const { id } = req.params;
        
        try {
            const result = await ProductService.deleteProduct(id);
            return res.success("product deleted successfully", 200);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }
}