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

// تمام سبد های خرید یک کاربر توسط userId and status
router.get("/carts", cartController.getCartsByUserAndStatus.bind(cartController));
// گرفتن سبد خرید با id
router.get("/carts/:id", cartController.getCartById.bind(cartController));
// اضافه کردن کالا به سبد خرید
router.post("/carts", cartController.addToCart.bind(cartController));

export default router