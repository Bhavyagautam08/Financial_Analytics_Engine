import express from "express";
import { register, login, getProfile, updateAvatar } from "../controllers/authController.mjs";
import { validation } from "../middlewares/validation.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", validation, getProfile);
router.patch("/avatar", validation, updateAvatar);

export default router;
