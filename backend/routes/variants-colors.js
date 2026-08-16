import express from "express";

import db from "../models/index.cjs";
import VariantColorController from "../controllers/variants-colors.js";
import VariantColorService from "../services/variants-colors.js"
import VariantColorRepo from "../repository/variants-colors.js";

const variantColorRepo = new VariantColorRepo(db.Variant_Color);
const variantColorService = new VariantColorService(variantColorRepo)
const variantColorController = new VariantColorController(variantColorService);

const router = express.Router();

router.post("/variants-colors", variantColorController.create.bind(variantColorController));

export default router;