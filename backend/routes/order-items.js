import express from "express";

import OrderItemRepo from "../repository/order-items.js";
import OrderRepo from "../repository/orders.js";
import OrderItemService from "../services/order-items.js";
import OrderService from "../services/orders.js";
import OrderItemController from "../controllers/order-items.js";
import db from "../models/index.cjs";

const orderRepo = new OrderRepo(db.Order);
const orderItemRepo = new OrderItemRepo(db.OrderItem);
const orderService = new OrderService(orderRepo);
const orderItemService = new OrderItemService(orderItemRepo, orderService, db.sequelize);
const orderItemController = new OrderItemController(orderItemService);

const router = express.Router();

router.get("/order-items", orderItemController.getAll.bind(orderItemController))
router.get("/order-items/:id", orderItemController.get.bind(orderItemController))
router.post("/order-items", orderItemController.create.bind(orderItemController))
router.delete("/order-items/:id", orderItemController.remove.bind(orderItemController))

export default router;