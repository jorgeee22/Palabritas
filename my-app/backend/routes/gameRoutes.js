import express from "express";
import { getRandomWord } from "../controllers/gameController.js";

const router = express.Router();
router.get("/word", getRandomWord);

export default router;
