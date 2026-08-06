import express from "express";

import ProductImageController from "../controllers/product-images.js";
import ProductImageService from "../services/product-images.js";
import ProductImageRepo from "../repository/product-images.js";
import ProductService from "../services/products.js";
import ProductRepository from "../repository/products.js";
import db from "../models/index.cjs";
import { upload_files } from "../middlewares/uploadFiles.js";

const router = express.Router();

const productImageRepo = new ProductImageRepo(db.Product_Image);
const productRepo = new ProductRepository(db.Product);
const productService = new ProductService(productRepo);
const productImageService = new ProductImageService(productImageRepo, productService)
const productImageController = new ProductImageController(productImageService);


router.get("/product-images", productImageController.getAllImages.bind(productImageController));
router.get("/product-images/:id", productImageController.getImage.bind(productImageController))
router.post("/product-images", upload_files, productImageController.createImage.bind(productImageController))
router.delete("/product-images/:id", productImageController.deleteImage.bind(productImageController))

export default router;