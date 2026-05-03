import express from "express";
import ProductVariantController from "../controllers/product-variants.js";

// Define a router using express
const router = express.Router();

router.get("/product-variants", ProductVariantController.getProductVariants);

router.get("/product-variants/:id", ProductVariantController.getProductVariantsById);

router.post("/product-variants", ProductVariantController.createProductVariant);

export default router;