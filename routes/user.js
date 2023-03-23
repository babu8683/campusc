import express from 'express'
import { loginUser, registerUsers, getMyProfile, logoutUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/new", registerUsers);
router.post("/login", loginUser);
router.get("/me",isAuthenticated, getMyProfile);
router.get("/logout", logoutUser);

export default router