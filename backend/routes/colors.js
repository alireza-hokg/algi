import express from "express";

import ColorController from "../controllers/colors.js";
import ColorService from "../services/colors.js"
import ColorRepo from "../repository/colors.js";
import db from "../models/index.cjs";

const colorRepo = new ColorRepo(db.Color);
const colorService = new ColorService(colorRepo);
const colorController = new ColorController(colorService);

const router = express.Router();

router.get("/colors", colorController.getAll.bind(colorController));
router.post("/colors", colorController.create.bind(colorController));
router.put("/colors/:id", colorController.update.bind(colorController))

export default router;