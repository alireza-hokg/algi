import express from "express";

import CartController from "../controllers/carts.js";
import CartService from "../services/carts.js";
import CartRepo from "../repository/carts.js";
import UserRepo from "../repository/users.js";
import UserService from "../services/users.js";

const router = express.Router();

const cartRepo = new CartRepo();
const userRepo = new UserRepo();
const userService = new UserService(userRepo);
const cartService = new CartService(cartRepo, userService);
const cartController = new CartController(cartService);

router.get("/carts", cartController.getAll.bind(cartController));
router.get("/carts/:userId", cartController.getAllByUserId.bind(cartController));

export default router