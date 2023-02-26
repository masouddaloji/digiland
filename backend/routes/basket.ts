import { Router } from "express";
import {
  addToCart,
  removeFromCartSingle,
  removeFromCartMulti,
  clearCart,
  getCart,
} from "../controllers/basket";

const router = Router();

// GET CART
router.get("/", getCart);

// CLEAR CART
router.delete("/", clearCart);

// ADD PRODUCT TO CART
router.put("/:id", addToCart);

// REMOVE PRODUCT FROM CART SINGLE
router.delete("/:id", removeFromCartSingle);

// REMOVE PRODUCT FROM CART MULTI
router.delete("/multi/:id", removeFromCartMulti);

export default router;
