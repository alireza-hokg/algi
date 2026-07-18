import express from "express";

import UserRepo from "../repository/users.js";
import UserService from "../services/users.js";
import UserController from "../controllers/users.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { models } from "../models/index.js";

const userRepo = new UserRepo(models.User);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const router = express.Router();

router.get("/auth/users", userController.getAllUsers.bind(userController));

router.post("/auth/login", userController.login.bind(userController));

router.post("/auth/register", userController.register.bind(userController));

router.post("/auth/logout", userController.logout.bind(userController));

router.get("/auth/me", authenticateToken, userController.isLoggedIn.bind(userController))



export default router;