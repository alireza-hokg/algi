import express from "express";

import CategoryController from "../controllers/categories.js";
import CategoryService from "../services/categories.js";
import CategoryRepo from "../repository/categories.js";
import db from "../models/index.cjs";

const router = express.Router();

const categoryRepo = new CategoryRepo(db.Category);
const categoryService = new CategoryService(categoryRepo, db.sequelize);
const categoryController = new CategoryController(categoryService)

router.get("/categories", categoryController.getAll.bind(categoryController))
router.get("/categories/:id", categoryController.getById.bind(categoryController))
router.post("/categories", categoryController.create.bind(categoryController))
router.put("/categories/:id", categoryController.update.bind(categoryController))
router.delete("/categories/:id", categoryController.remove.bind(categoryController))

export default router;