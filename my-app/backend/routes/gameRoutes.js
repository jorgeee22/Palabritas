import express from "express";
import { getWordOfTheDay} from "../controllers/gameController.js";

const router = express.Router();
router.get("/word", getWordOfTheDay);

export default router;
