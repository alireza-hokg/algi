import Product from "../models/products.js";
import ProductVariant from "../models/product-variants.js";


export default class ProductVariantController {

    // Get Product-variant by slug 
    static async getPVByslug(req, res) {
        // Get params
        let { slug } = req.params;
        // Check product exists
        const product = await Product.findOne({
            where: {
                slug
            }
        })
        if (!product) {
            return res.status(404).json({
                success: false,
                body: null,
                message: "Product not found."
            })
        }
        // Get all product-variants by productId exists
        try {
            const products = await ProductVariant.findAndCountAll({
                where: {
                    product_id: product.id
                },
                raw: true
            });
            return res.status(200).json({
                success: true,
                count: products.count,
                body: {
                    products: products.rows,
                },
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

    // Create product-variant
    static async createPV(req, res) {
        const { product_id, size, colors, quantity, image_url } = req.body;
        if (!(product_id && size && colors && quantity)) {
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
                colors,
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

    // Update product-variant by id
    static async updatePV(req, res) {
        const { id } = req.params;
        const { product_id, size, colors, quantity, image_url } = req.body;
        const productVariant = await ProductVariant.findByPk(id);
        if (!productVariant) {
            return res.status(404).json({
                success: false,
                body: null,
                message: "product variant not found."
            })
        }
        if (!(product_id && size && colors && quantity)) {
            return res.status(400).json({
                success: false,
                body: null,
                message: "Invalid request."
            })
        }

        const existingVariant = await ProductVariant.findOne({
            where: {product_id, size, colors}
        })

        if (existingVariant) {
            return res.status(409).json({
                success: false,
                body: null,
                message: "A variant with this color and size already exists for this product."
            })
        }
        const result = await productVariant.update({
            product_id, size, colors, quantity, image_url
        },)
        res.json({
            success: true,
            body: result,
            message: "product variant updated."
        })
    }
}