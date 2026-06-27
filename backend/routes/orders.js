import express from "express";

import OrderRepo from "../repository/orders.js";
import OrderItemRepo from "../repository/order-items.js";
import UserRepo from "../repository/users.js";
import OrderService from "../services/orders.js";
import OrderItemService from "../services/order-items.js";
import UserService from "../services/users.js";
import OrderController from "../controllers/orders.js";

const router = express.Router();

const orderRepo = new OrderRepo();
const userRepo = new UserRepo();
const orderItemRepo = new OrderItemRepo();
const orderItemService = new OrderItemService(orderItemRepo)
const userService = new UserService(userRepo);
const orderService = new OrderService(orderRepo, userService, orderItemService);
const orderController = new OrderController(orderService)

router.get("/orders", orderController.getAllOrders.bind(orderController))
router.get("/orders/:id", orderController.getOrder.bind(orderController))
router.post("/orders", orderController.createOrder.bind(orderController))

export default router;