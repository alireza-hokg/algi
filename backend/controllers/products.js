import slugify from "slugify";

// Controller just recieves the request and responses
export default class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    // Get All the products
    async getProducts(req, res) {
        try {
            const result = await this.productService.getAllProducts();
            return res.success(result, "Products fetched Successfully");
            
        } catch(err) {
            res.error(err.message, err.code);
        }
    }

    // Get Product by id
    async getProductById(req, res) {
        let { id } = req.params;
        try {
            const result = await this.productService.getProductById(id);
            if (!result) {
                return res.notFound("Product not found.")
            }
            return res.success(result, "Product fetched successfully.", 200);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500)
        }
    }

    async createProduct(req, res) {
        // PARAMETERS name, price, sku
        const { name, price, sku, category_id } = req.body;
        const initialData = {
            name,
            price,
            sku,
            category_id,
            slug: slugify(name, { lower: true }) + `-${sku}`
        };
        try {
            const result = await this.productService.createProduct(initialData);
            return res.success(result, 201);
        } catch(err) {
            res.error(err.message, err.statusCode || 500);
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const { name, price, category_id, sku } = req.body;
        const formattedData = {
            name,
            price,
            category_id,
            sku,
            slug: slugify(name, { lower: true }) + `-${sku}`
        }
        try {
            const result = await this.productService.updateProduct(formattedData, id);
            return res.updated(result, "Product updated.");
        } catch(err) {
            res.error(err.message, err.statusCode || 500)
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        
        try {
            const result = await this.productService.deleteProduct(id);
            return res.success("product deleted successfully", 200);
        } catch(err) {
            return res.error(err.message, err.statusCode || 500);
        }
    }
}