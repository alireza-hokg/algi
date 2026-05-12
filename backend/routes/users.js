import express from "express";
import UserController from "../controllers/users.js";

const router = express.Router();

router.post("/auth/send-otp", UserController.sendOTP);

router.post("/auth/login", UserController.login);

router.post("/auth/register", UserController.register);

export default router;