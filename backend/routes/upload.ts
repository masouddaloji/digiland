import { Router } from "express";
import {profileImage, productImage, productGallery, articleImage} from '../controllers/upload'

const router = Router();

//Upload a profile image
router.post("/profile", profileImage);

//Upload the main product image
router.post("/prodimg", productImage);

//Upload a gallery for a specific product
router.post("/prodgallery", productGallery);

//Upload an article image
router.post("/articleimg", articleImage);

export default router