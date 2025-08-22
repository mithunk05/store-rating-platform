import express from "express";
import { register, login, updatePassword, getProfile } from "../controllers/user.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getProfile);
router.put("/update-password", authenticate, updatePassword);

export default router;