import ProductVariant from "../models/products.js";


export default class ProductVariantController {
    // Get all product-variants
    static async getProductVariants(req, res) {
        try {
            const result = await ProductVariant.findAndCountAll();
            return res.status(200).json({
                success: true,
                body: result.rows,
                message: "Product-variants fetched successfully"
            })
        } catch(err) {
            res.json({
                success: false,
                body: null,
                message: err.message
            })
        }
    }

    // Get Product-variant by id 
    static async getProductVariantsById(req, res) {
        let { id } = req.params;
        id = Number(id);
        if (id !== parseInt(id)) {
            return res.json({
                success: false,
                body: null,
                message: "id must be integer."
            })
        }
        try {
            const result = await ProductVariant.findByPk(id);
            return res.json({
                success: true,
                body: result.rows,
                message: "Product-variant fetched successfully"
            })
        } catch(err) {
            res.json({
                success: false,
                body: null,
                message: err.message
            })
        }
    }

    // Create product-variant
    static async createProductVariant(req, res) {
        const { product_id, size, color, quantity, price, image_url } = req.body;
        if (product_id, size, color, quantity, price) {
            return res.status(400).json({
                success: false,
                body: null,
                message: "Invalid request."
            })
        }
        try {
            const result = await ProductVariant.create({
                product_id,
                size,
                color,
                quantity,
                price
            })
            return res.status(201).json({
                success: true,
                body: result,
                message: "Product-variant created successfully"
            })
        } catch(err) {
            return res.status(500).json({
                success: false,
                body: null,
                message: "Internal server error."
            })
        }
    }

}