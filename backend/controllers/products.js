import { Op } from "@sequelize/core";
import slugify from "slugify";

import Product from "../models/products.js";

export default class ProductController {
    // Get All the products
    static async getProducts(req, res) {
        try {
            const result = await Product.findAndCountAll();
    
            return res.json({
                success: true,
                body: result.rows,
                message: "All products fetched"
            })

        } catch(err) {
            res.json({
                success: false,
                body: null,
                message: err.message
            })
        }
    }

    // Get Product by id
    static async getProductById(req, res) {
        let { id } = req.params;
        id = Number(id);
        if (id !== parseInt(id)) {
            return res.status(400).json({
                success: false,
                body: null,
                message: "id must be integer"
            })
        }
        try {
            const result = await Product.findByPk(id);
            return res.json({
                success: true,
                body: result,
                message: "Product fetched successfully"
            })
        } catch(err) {
            return res.status(404).json({
                success: false,
                body: null,
                message: "Product not found."
            })
        }
    }

    static async createProduct(req, res) {
        // PARAMETERS name, description, base_price, discount_percentage, sku
        const { name, price, sku } = req.body;
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                body: null,
                message: "Invalid request."
            })
        }
        try {
            const result = await Product.create({
                name,
                price,
                sku,
                slug: slugify(name, { lower: true }) + `-${sku}`
            })
            console.log(result)
            res.status(201).json({
                success: true,
                body: result,
                message: "Product created successfully"
            })
        } catch(err) {
            return res.status(500).json({
                success: false,
                body: null,
                message: err.message
            })
        }
    }

    static async updateProduct(req, res) {
        
    }
}