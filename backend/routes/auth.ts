import { Router } from "express";
import { register, social, login, refresh, logout } from "../controllers/auth";
import loginLimiter from "../middlewares/loginLimiter";

const router = Router();

//Register a new user
router.route("/register").post(loginLimiter, register);

//Create or login user via social networks
router.route("/social").post(social);

//Login user
router.route("/login").post(loginLimiter, login);

//Get a new access token 
router.route("/refresh").get(refresh);

//Logout user
router.route("/logout").post(logout);

export default router;
