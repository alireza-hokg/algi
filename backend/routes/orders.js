import express from "express";

import OrderRepo from "../repository/orders.js";
import OrderItemRepo from "../repository/order-items.js";
import UserRepo from "../repository/users.js";
import OrderService from "../services/orders.js";
import OrderItemService from "../services/order-items.js";
import UserService from "../services/users.js";
import OrderController from "../controllers/orders.js";
import db from "../models/index.cjs";

const router = express.Router();

const orderRepo = new OrderRepo(db.Order);
const userRepo = new UserRepo(db.User);
const orderItemRepo = new OrderItemRepo(db.OrderItem);
const orderItemService = new OrderItemService(orderItemRepo)
const userService = new UserService(userRepo);
const orderService = new OrderService(orderRepo, userService, orderItemService, db.sequelize);
const orderController = new OrderController(orderService)

router.get("/orders", orderController.getAllOrders.bind(orderController))
router.get("/orders/:id", orderController.getById.bind(orderController))
router.post("/orders", orderController.createOrder.bind(orderController))

export default router;