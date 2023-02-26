import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product";
import {
  addProductReview,
  getProductsReviews,
  deleteProductReview,
  getReviewsByProductId,
} from "../controllers/review";
import verifyJWT from "../middlewares/verifyJWT";
import verifyRole from "../middlewares/verifyRole";

const router = Router();

//CREATE PRODUCT

router.post("/", verifyJWT, verifyRole("admin") as any, createProduct);

//UPDATE PRODUCT
router.put("/:id", verifyJWT, verifyRole("admin") as any, updateProduct);

//DELETE PRODUCT
router.delete("/:id", verifyJWT, verifyRole("admin") as any, deleteProduct);

//GET PRODUCT
router.get("/find/:id", getProduct);

//GET ALL PRODUCTS
router.get("/", getProducts);

// GET ALL PRODUCTS REVIEWS
router.get(
  "/reviews",
  verifyJWT,
  verifyRole("admin") as any,
  getProductsReviews
);

//ADD PRODUCT REVIEW
router.post(
  "/reviews/:id",
  verifyJWT,
  verifyRole("user") as any,
  addProductReview
);

//DELETE PRODUCT REVIEW
router.delete(
  "/:pid/reviews/:id",
  verifyJWT,
  verifyRole("user") as any,
  deleteProductReview
);

// GET REVIEWS BY PRODUCT ID
router.get("/reviews/:pid", getReviewsByProductId);

export default router;
