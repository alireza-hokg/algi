import { DatabaseError } from "../utils/Error.js";

export default class ProductImageController {
    constructor(productImageService) {
        this.productImageService = productImageService
    }

    async getAllImages(req, res) {
        try {
            const result = await this.productImageService.getAllImages();
            res.success(result)
        } catch(err) {
            console.log(err.message)
            res.error(err.message)
        }
    }

    async getImage(req, res) {
        const { id } = req.params;
        try {
            const result = await this.productImageService.getImage(id)
            res.success(result, "عکس با موفقیت گرفته شد.")
        } catch(err) {
            res.error(err.message)
        }
    }

    async createImage(req, res) {
        try {
            const result = await this.productImageService.createImage(req.body, req.file);
            return res.created(result, "product-images created successfully.")
        } catch(err) {
            res.error(err.message);
        }
    }

    async deleteImage(req, res) {
        const {id} = req.params;
        try {
            const result = await this.productImageService.deleteImage(id);
            console.log(result)
            res.deleted(result, "عکس با موفقیت حذف شد.");
        } catch(err) {
            res.error(err.message)
        }
    }
}