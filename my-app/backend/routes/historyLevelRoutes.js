import express from "express";
import HistoryLevel from "../models/historyModel.js";

const router = express.Router();

// Obtener todos los niveles
router.get("/", async (req, res) => {
  try {
    const levels = await HistoryLevel.find().sort({ id: 1 });
    res.json(levels);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los niveles" });
  }
});

// Validar intento del jugador
router.post("/:id/check", async (req, res) => {
  try {
    const { id } = req.params;
    const { userAnswer } = req.body;

    const level = await HistoryLevel.findOne({ id });
    if (!level) return res.status(404).json({ message: "Nivel no encontrado" });

    // Verificar cooldown activo
    if (level.cooldownUntil && new Date(level.cooldownUntil) > new Date()) {
      return res.status(403).json({
        message: "Nivel bloqueado temporalmente",
        cooldownUntil: level.cooldownUntil,
      });
    }

    // Verificar respuesta
    if (userAnswer.toUpperCase() === level.answer.toUpperCase()) {
      level.status = "completed";
      await level.save();
      // Desbloquear siguiente nivel
      await HistoryLevel.findOneAndUpdate(
        { id: level.id + 1 },
        { status: "unlocked" }
      );
      return res.json({ correct: true, message: "¡Correcto!" });
    } else {
      // Bloqueo de 24 horas
      const cooldown = new Date();
      cooldown.setHours(cooldown.getHours() + 24);
      level.cooldownUntil = cooldown;
      await level.save();
      return res.json({
        correct: false,
        message: "Incorrecto. Intenta de nuevo en 24 horas.",
        cooldownUntil: cooldown,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al validar respuesta" });
  }
});

export default router;
