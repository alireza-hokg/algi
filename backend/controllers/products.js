import slugify from "slugify";

// Controller just recieves the request and responses
export default class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    async getAllProductsAndImages(req, res) {
        try {
            const result = await this.productService.getAllProductsAndImages();
            return res.success(result, "Products fetched Successfully");
            
        } catch(err) {
            res.error(err.message, err.statusCode);
        }
    }

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
    
    async getProductAndDetailsBySlug(req, res) {
        const { slug } = req.params;
        try {
            const result = await this.productService.getProductAndDetailsBySlug(slug);
            res.success(result);
        }
        catch(err) {
            res.error(err.message)
        }
    }

    async createProduct(req, res) {
        try {
            const result = await this.productService.createProduct(req.body);
            return res.created(result, 201);
        } catch(err) {
            res.error(err.message, err.statusCode || 500);
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        try {
            const result = await this.productService.updateProduct(req.body, id);
            return res.updated(result, "Product updated successfully.");
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