// routes/tematicoRoutes.js
import express from "express";
import { getWordByTheme, updateUserProgress } from "../controllers/thematicController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.get("/", getWordByTheme);
router.post("/progreso",protect, updateUserProgress);

export default router;