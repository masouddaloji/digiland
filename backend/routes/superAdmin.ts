import { Router } from "express";
import {favorate, unfavorate, getFavorates} from '../controllers/favorate'
import {addOrder, deleteOrder, getOrdersByUserId} from '../controllers/order'

const router = Router();

// GET ORDERS BY USER ID
router.get("/my-orders/:uid", getOrdersByUserId);

// ADD ORDER
router.post("/order", addOrder);

// DELETE ORDER
router.delete("/order/:oid", deleteOrder);

// ADD product to favorate
router.post("/favorate/:productId", favorate);

// DELETE a product from favorate
router.delete("/favorate/:productId", unfavorate);

// GET favorate
router.get("/favorate", getFavorates);

export default router;
