import express from "express";
import ProductVariantController from "../controllers/product-variants.js";

// Define a router using express
const router = express.Router();

router.get("/products/:productId/product-variants/", ProductVariantController.getPV);

router.get("/products/:productId/product-variants/", ProductVariantController.getPVByProductId);

router.post("/product-variants/", ProductVariantController.createPV);

router.put("/product-variants/", ProductVariantController.updatePV);

export default router;