import { Router } from "express";
import {createAdmin, updateAdmin, deleteAdmin, getAdmin, getAdmins} from '../controllers/admin'
import verifyRole from "../middlewares/verifyRole";
import {favorate, unfavorate, getFavorates} from '../controllers/favorate'
import {addOrder, deleteOrder, getOrdersByUserId} from '../controllers/order'

const router = Router();


// CREATE ADMIN
router.post("/", verifyRole('superAdmin') as any, createAdmin);

//UPDATE ADMIN
router.put("/:id", updateAdmin);

//DELETE ADMIN
router.delete("/:id", verifyRole('superAdmin') as any, deleteAdmin);

// GET wishlist
router.get("/favorate", getFavorates);

//GET ADMIN
router.get("/:id", getAdmin);

//GET ALL ADMINS
router.get("/", verifyRole('superAdmin') as any, getAdmins);

// GET ORDERS BY USER ID
router.get("/my-orders/:uid", getOrdersByUserId);

// ADD ORDER
router.post("/order", addOrder);

// DELETE ORDER
router.delete("/orders/:oid", deleteOrder);

// ADD product to wishlist
router.post("/favorate/:productId", favorate);

// DELETE a product from wishlist
router.delete("/favorate/:productId", unfavorate);

export default router;
