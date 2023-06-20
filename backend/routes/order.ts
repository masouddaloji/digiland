import { Router } from "express";
import { getOrders, updateOrder } from "../controllers/order";
import verifyRole from "../middlewares/verifyRole";

const router = Router();

// GET ALL ORDERS
router.get("/", verifyRole("admin") as any, getOrders);
router.put("/", verifyRole("admin") as any, updateOrder);

export default router;
