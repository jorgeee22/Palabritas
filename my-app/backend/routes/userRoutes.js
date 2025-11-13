import express from "express";
import { registerUser, loginUser, getUserProfile, updateClassicStreak, getUserAchievements} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.patch("/streak", protect, updateClassicStreak);
router.get("/achievements", protect, getUserAchievements);

export default router;
