import express from "express";

import OrderItemRepo from "../repository/order-items.js";
import OrderItemService from "../services/order-items.js";
import OrderItemController from "../controllers/order-items.js";

const orderItemRepo = new OrderItemRepo();
const orderItemService = new OrderItemService(orderItemRepo);
const orderItemController = new OrderItemController(orderItemService);

const router = express.Router();

router.get("/order-items", orderItemController.getAll.bind(orderItemController))

export default router;