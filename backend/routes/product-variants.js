import express from "express";
import ProductVariantController from "../controllers/product-variants.js";

// Define a router using express
const router = express.Router();

router.get("/products/:slug/product-variants", ProductVariantController.getPVByslug);

router.post("/product-variants/", ProductVariantController.createPV);

router.put("/product-variants/", ProductVariantController.updatePV);

export default router;