import express from "express";

import CartController from "../controllers/carts.js";
import CartService from "../services/carts.js";
import CartRepo from "../repository/carts.js";
import UserRepo from "../repository/users.js";
import UserService from "../services/users.js";
import { models } from "../models/index.js";

const router = express.Router();

const cartRepo = new CartRepo(models.Cart);
const userRepo = new UserRepo(models.User);
const userService = new UserService(userRepo);
const cartService = new CartService(cartRepo, userService);
const cartController = new CartController(cartService);

// تمام سبد های خرید یک کاربر توسط userId and status
router.post("/carts", cartController.getCartsByUserAndStatus.bind(cartController));
// گرفتن سبد خرید با id
router.get("/carts/:id", cartController.getCartById.bind(cartController));
// اضافه کردن کالا به سبد خرید و مقدار مطلق
router.post("/carts/add", cartController.upsertCart.bind(cartController));
// تغییر تعداد کالا
router.put("/carts/adjust", cartController.adjustCartQuantity.bind(cartController))
// حذف کردن کالا با تغییر status
router.patch("/carts/:id", cartController.removeFromCart.bind(cartController))

export default router