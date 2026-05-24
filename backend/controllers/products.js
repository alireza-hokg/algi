import { Op } from "@sequelize/core";
import slugify from "slugify";

import Product from "../models/products.js";
import ProductService from "../services/products.js";

// Controller just recieves the request and responses
export default class ProductController {
    // Get All the products
    static async getProducts(req, res) {
        try {
            const result = await ProductService.getAllProducts();
            console.log(result)
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
            return res.json(result)
        } catch(err) {
            return res.status(404).json({
                success: false,
                body: null,
                message: "Product not found."
            })
        }
    }

    static async createProduct(req, res) {
        // PARAMETERS name, price, sku
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

    static async deleteProduct(req, res) {
        const { id } = req.params;
        const product = await Product.findOne({
            where: {
                id
            },
            raw: true
        })
        // Product do not exists
        if (!product) {
            return res.status(404).json({
                success: false,
                body: null,
                message: "محصول پیدا نشد."
            })
        }
        try {
            await Product.destroy({
                where: {
                    id
                }
            })
        } catch(err) {
            return res.status(500).json({
                success: false,
                body: null,
                message: "خطای سرور"
            })
        }
    }
}