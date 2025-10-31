import Word from "../models/wordModel.js";

export const getRandomWord = async (req, res) => {
  const count = await Word.countDocuments();
  const random = Math.floor(Math.random() * count);
  const word = await Word.findOne().skip(random);
  res.json({ word: word.word });
};
