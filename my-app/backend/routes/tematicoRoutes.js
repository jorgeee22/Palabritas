// routes/tematicoRoutes.js
import express from "express";
import { getRandomWordByTheme, updateUserProgress } from "../controllers/thematicController.js";
const router = express.Router();

router.get("/", getRandomWordByTheme);
router.post("/progreso", updateUserProgress);

export default router;