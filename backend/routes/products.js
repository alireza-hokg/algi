import express from "express";

import ProductRepository from "../repository/products.js";
import ProductService from "../services/products.js";
import ProductController from "../controllers/products.js";
import db from "../models/index.cjs";

const productRepository = new ProductRepository(db.Product);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = express.Router();

router.get("/products", productController.getProducts.bind(productController));

router.get("/products/:id", productController.getProductById.bind(productController))

router.post("/products", productController.createProduct.bind(productController));

router.put("/products/:id", productController.updateProduct.bind(productController));

router.delete("/products/:id", productController.deleteProduct.bind(productController))

export default router;