import express from "express";
import UserController from "../controllers/users.js";

const router = express.Router();

router.post("/auth", UserController.getUser);

// router.post("/auth", UserController.p);

export default router;