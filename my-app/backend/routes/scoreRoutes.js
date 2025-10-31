import express from "express";
import { saveScore, getScores } from "../controllers/scoreController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveScore);
router.get("/", protect, getScores);

export default router;
