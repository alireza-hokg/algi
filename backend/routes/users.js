import express from "express";

import UserRepo from "../repository/users.js";
import UserService from "../services/users.js";
import UserController from "../controllers/users.js";

const userRepo = new UserRepo();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const router = express.Router();

router.get("/auth/users", userController.getAllUsers.bind(userController));

router.get("/auth/login", userController.login.bind(userController));

router.post("/auth/register", userController.register.bind(userController));

export default router;