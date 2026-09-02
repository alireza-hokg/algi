import express from "express";

import UserRepo from "../repository/users.js";
import UserService from "../services/users.js";
import UserController from "../controllers/users.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import db from "../models/index.cjs";

const userRepo = new UserRepo(db.User);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const router = express.Router();

router.get("/auth/users", userController.getAllUsers.bind(userController));

router.post("/auth/login", userController.login.bind(userController));

router.post("/auth/register", userController.register.bind(userController));

router.post("/auth/logout", userController.logout.bind(userController));

router.put("/auth/me/update/:userId", authenticateToken, userController.update.bind(userController))
router.put("/auth/role-update", authenticateToken, userController.updateRole.bind(userController))

router.get("/auth/me", authenticateToken, userController.isLoggedIn.bind(userController))



export default router;