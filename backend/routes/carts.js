import express from "express";

import CartController from "../controllers/carts.js";
import CartService from "../services/carts.js";
import CartRepo from "../repository/carts.js";
import db from "../models/index.cjs";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import CartItemService from "../services/cart-items.js";
import VariantService from "../services/variants.js";
import VariantRepo from "../repository/variants.js";
import CartItemRepo from "../repository/cart-items.js";

const router = express.Router();

const cartRepo = new CartRepo(db.Cart, db.Variant, db.Cart_Item);
const variantRepo = new VariantRepo(db.Variant);
const cartItemRepo = new CartItemRepo(db.Cart_Item);

const cartItemService = new CartItemService(cartItemRepo)
const variantService = new VariantService(variantRepo)
const cartService = new CartService(cartRepo, cartItemService, variantService);

const cartController = new CartController(cartService);

router.post("/carts/items", authenticateToken, cartController.addToCart.bind(cartController));
router.get("/carts/items", authenticateToken, cartController.getCartAndItems.bind(cartController))

export default router;