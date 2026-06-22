import ProductImage from "../models/product-images.js";
export default class ProductImageRepo {

    async getAll() {
        return await ProductImage.findAll();
    }

    async create(imageData) {
        return await ProductImage.create(imageData);
    }
}