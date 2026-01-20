import express from "express";
import { register, login, getProfile } from "../controllers/authController.mjs";
import { validation } from "../middlewares/validation.mjs";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", validation, getProfile);

export default router;
