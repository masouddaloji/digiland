import { Router } from "express";
import { getOrders } from "../controllers/order";
import verifyRole from "../middlewares/verifyRole";

const router = Router();

// GET ALL ORDERS
router.get("/", verifyRole("admin") as any, getOrders);

export default router;
