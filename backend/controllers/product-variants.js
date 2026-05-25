import ProductVariant from "../models/product-variants.js";
import ProductVariantService from "../services/product-variants.js";

export default class ProductVariantController {

    // Get Product-variant by slug 
    static async getVariantsByProductSlug(req, res) {
        const { slug } = req.params;
        try {
           const product = await ProductVariantService.getVariantsByProductSlug(slug);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }

    // Create product-variant
    static async createPV(req, res) {
        const { product_id, size, color, quantity, width, height, waist, image_url } = req.body;
        if (!(product_id && size && color && quantity)) {
            return res.status(400).json({
                success: false,
                body: null,
                message: "Invalid request."
            })
        }

        const existingVariant = await ProductVariant.findOne({
            where: {product_id, size, color}
        })
        if (existingVariant) {
            return res.status(409).json({
                success: false,
                body: null,
                message: "A variant with this color and size already exists for this product."
            })
        }
        try {
            const result = await ProductVariant.create({
                product_id,
                size,
                color,
                quantity,
                price,
                width,
                height,
                waist
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

    // Update product-variant by id
    static async updatePV(req, res) {
        const { id } = req.params;
        const { product_id, size, color, quantity, width, height, waist, image_url } = req.body;
        const productVariant = await ProductVariant.findByPk(id);
        if (!productVariant) {
            return res.status(404).json({
                success: false,
                body: null,
                message: "product variant not found."
            })
        }
        if (!(product_id && size && color && quantity)) {
            return res.status(400).json({
                success: false,
                body: null,
                message: "Invalid request."
            })
        }

        const existingVariant = await ProductVariant.findOne({
            where: {product_id, size, color}
        })

        if (existingVariant) {
            return res.status(409).json({
                success: false,
                body: null,
                message: "A variant with this color and size already exists for this product."
            })
        }
        const result = await productVariant.update({
            product_id, size, color, quantity, width, height, waist, image_url
        },)
        res.json({
            success: true,
            body: result,
            message: "product variant updated."
        })
    }
}