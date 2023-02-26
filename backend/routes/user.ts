import { Router } from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user";
import verifyRole from "../middlewares/verifyRole";
import { favorate, unfavorate, getFavorates } from "../controllers/favorate";
import { addOrder, deleteOrder, getOrdersByUserId } from "../controllers/order";

const router = Router();

//UPDATE USER
router.put("/:id", updateUser);

//DELETE USER
router.delete("/:id", verifyRole("admin") as any, deleteUser);

// GET favorate
router.get("/favorate", getFavorates);

//GET USER
router.get("/:id", getUser);

//GET ALL USERS
router.get("/", verifyRole("admin") as any, getUsers);

// GET ORDERS BY USER ID
router.get("/my-orders/:uid", getOrdersByUserId);

// ADD ORDER
router.post("/order", addOrder);

// DELETE ORDER
router.delete("/orders/:oid", deleteOrder);

// ADD product to favorate
router.post("/favorate/:productId", favorate);

// DELETE a product from favorate
router.delete("/favorate/:productId", unfavorate);

export default router;
