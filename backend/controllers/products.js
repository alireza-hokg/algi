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
        if (!name || !price) {
            return res.error("invalid request.", 400)
        }
        try {
            const result = await Product.create({
                name,
                price,
                sku,
                slug: slugify(name, { lower: true }) + `-${sku}`
            })
            return res.create(result);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500)
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