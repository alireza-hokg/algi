import express from "express";

import ProductImageController from "../controllers/product-images.js";
import ProductImageService from "../services/product-images.js";
import ProductImageRepo from "../repository/product-images.js";
import ProductService from "../services/products.js";
import ProductRepository from "../repository/products.js";

const router = express.Router();

const productImageRepo = new ProductImageRepo();
const productRepo = new ProductRepository();
const productService = new ProductService(productRepo);
const productImageService = new ProductImageService(productImageRepo, productService)
const productImageController = new ProductImageController(productImageService);

router.get("/product-images", productImageController.getAllImages.bind(productImageController));

router.post("/product-images", productImageController.createImage.bind(productImageController))

export default router;