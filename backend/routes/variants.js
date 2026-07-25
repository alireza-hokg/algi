import express from "express";

import VariantController from "../controllers/variants.js";
import VariantRepo from "../repository/variants.js";
import VariantService from "../services/variants.js";
import ProductService from "../services/products.js";
import ProductRepository from "../repository/products.js";
import db from "../models/index.cjs";

const productRepo = new ProductRepository(db.Product);
const variantRepo = new VariantRepo(db.Variant, db.Product);
const productService = new ProductService(productRepo);
const variantService = new VariantService(variantRepo, productService);
const variantController = new VariantController(variantService);

// Define a router using express
const router = express.Router();

router.get("/products/:slug/variants", variantController.getVariantsBySlug.bind(variantController));

router.post("/variants/", variantController.createVariant.bind(variantController));

router.put("/variants/:id", variantController.updateVariant.bind(variantController));

export default router;