import { Router } from "express";
import {createArticle, deleteArticle, getArticle, getArticles, updateArticle} from '../controllers/article'
import {addArticleReview, getArticlesReviews, deleteArticleReview, getReviewsByArticleId} from '../controllers/review'
import verifyJWT from "../middlewares/verifyJWT";
import verifyRole from "../middlewares/verifyRole";

const router = Router();


//CREATE ARTICLE
router.post("/",verifyJWT, verifyRole('admin') as any, createArticle);

//UPDATE ARTICLE
router.put("/:id",verifyJWT, verifyRole('admin') as any, updateArticle);

//DELETE ARTICLE
router.delete("/:id",verifyJWT, verifyRole('admin') as any, deleteArticle);

//GET ARTICLE
router.get("/find/:id", getArticle);

//GET ALL ARTICLES
router.get("/", getArticles);

// GET ALL ARTICLES REVIEWS
router.get("/reviews",verifyJWT, verifyRole('admin') as any, getArticlesReviews);


//ADD ARTICLE REVIEW
router.post(
  "/reviews/:id",
  verifyJWT,
  verifyRole('user') as any,
  addArticleReview
);

//DELETE ARTICLE REVIEW
router.delete("/:aid/reviews/:id",verifyJWT, verifyRole('user') as any, deleteArticleReview);

// GET REVIEWS BY ARTICLE ID
router.get("/reviews/:aid", getReviewsByArticleId);

export default router;
