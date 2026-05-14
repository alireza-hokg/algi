import express from "express";

import TaskController from "../controllers/products.js"

const router = express.Router();

router.get("/products", TaskController.getProducts);

// router.get("/products/:id", TaskController.getProductById)

router.post("/products", TaskController.createProduct)

router.delete("/products/:id", TaskController.deleteProduct)

export default router;