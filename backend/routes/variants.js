import express from "express";

import VariantController from "../controllers/variants.js";
import VariantRepo from "../repository/variants.js";
import VariantService from "../services/variants.js";
import ProductService from "../services/products.js";
import ProductRepository from "../repository/products.js";
import db from "../models/index.cjs";

const productRepo = new ProductRepository(db.Product, db.Product_Image, db.Variant, db.Color);
const variantRepo = new VariantRepo(db.Variant);

const productService = new ProductService(productRepo);
const variantService = new VariantService(variantRepo, productService);

const variantController = new VariantController(variantService);

// Define a router using express
const router = express.Router();

router.post("/variants/", variantController.createVariant.bind(variantController));
router.put("/variants/:id", variantController.updateVariant.bind(variantController));

export default router;