import express from "express";
import UserController from "../controllers/users";

const router = express.Router();

router.get("/users");

router.post("/users")

export default router;