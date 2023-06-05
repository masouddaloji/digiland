import { Router } from "express";
import { getIndex } from "../controllers";

const router = Router();

//GET index page
router.get("/", getIndex);

export default router;
