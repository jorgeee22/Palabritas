import Score from "../models/scoreModel.js";

export const saveScore = async (req, res) => {
  const { isWin, attempts } = req.body;


  // Calculo de puntaje
  let points = 0;
  if (isWin){
    if (attempts === 1) points = 500;
    else if (attempts === 2) points = 400;
    else if (attempts === 3) points = 300;
    else if (attempts === 4) points = 150;
    else if (attempts === 5) points = 50;
    else if (attempts === 6) points = 50;
    else points = 0;
  }
  
  try {
    let score = await Score.findOne({user: req.user.name, }); // viene del middleware protect

   if (score){
    score.points += points;
    await score.save();
    res.status(200).json({
       message: "¡Puntaje actualizado exitosamente!", 
       totalPoints: score.points,}); 
  
  } else {
    score = await Score.create({
      user : req.user.name, 
      points, 
    });
    return res.status(201).json({
      message: "Puntaje inicial creado exitosamente",
      totalPoints : score.points,
    });
  }
 } catch (error) {
    res.status(500).json({ message: "Error al guardar el puntaje", error});
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
