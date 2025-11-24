import Score from "../models/scoreModel.js";

export const saveScore = async (req, res) => {
  const { isWin, attempts } = req.body;

  // Calculo de puntaje (manteniendo tu sistema)
  let points = 0;
  if (isWin) {
    if (attempts === 1) points = 500;
    else if (attempts === 2) points = 400;
    else if (attempts === 3) points = 300;
    else if (attempts === 4) points = 150;
    else if (attempts === 5) points = 50;
    else if (attempts === 6) points = 50;
  }

  try {
    // Buscar el puntaje del usuario autenticado usando su _id
    let score = await Score.findOne({ user: req.user._id });

    if (score) {
      // Si ya existe, sumar puntos
      score.points += points;
      await score.save();
      return res.status(200).json({
        message: "¡Puntaje actualizado exitosamente!",
        totalPoints: score.points,
      });
    } else {
      // Si no existe, crear un nuevo registro
      score = await Score.create({
        user: req.user._id, //  guarda el ObjectId, no el nombre
        points,
      });
      return res.status(201).json({
        message: "Puntaje inicial creado exitosamente",
        totalPoints: score.points,
      });
    }
  } catch (error) {
    console.error("Error al guardar el puntaje:", error);
    res.status(500).json({
      message: "Error al guardar el puntaje",
      error,
    });
  }
};

export const getScores = async (req, res) => {
 try {
    const scores = await Score.find({ user: req.user.name}).sort({ date: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los puntajes" });
  }
};

export async function getRanking(req, res) {
  try {
    console.log(" Entrando a /api/scores/ranking...");

    const scores = await Score.find()
      .populate("user", "name")
      .sort({ points: -1 })
      .limit(10);

    console.log("🔹 Puntuaciones obtenidas:", scores.length);

    const ranking = scores.map((s) => ({
      username: s.user?.name || "Jugador",
      points: s.points,
    }));

    console.log("Ranking generado:", ranking);
    res.json(ranking);
  } catch (error) {
    console.error("Error al obtener el ranking global:", error);
    res.status(500).json({ message: "Error al obtener el ranking global" });
  }
}


