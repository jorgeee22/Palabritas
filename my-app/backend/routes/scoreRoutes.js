import express from "express";
import { saveScore, getScores, getRanking } from "../controllers/scoreController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ruta para guardar el puntaje
router.post("/", protect, saveScore);


router.get("/", protect, getScores);

router.get("/ranking", getRanking );


export default router;
