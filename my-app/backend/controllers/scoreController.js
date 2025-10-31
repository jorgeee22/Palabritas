import Score from "../models/scoreModel.js";

export const saveScore = async (req, res) => {
  const { attempts } = req.body;
  const score = await Score.create({ user: req.user.id, attempts });
  res.status(201).json(score);
};

export const getScores = async (req, res) => {
  const scores = await Score.find({ user: req.user.id });
  res.json(scores);
};
