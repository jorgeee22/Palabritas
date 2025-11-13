import Word from "../models/wordModel.js";
import OpenAI from "openai";
import dotenv from "dotenv"; 

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export const getWordOfTheDay = async (req, res) => {
  try {
     const dateKey = new Date().toISOString().split("T")[0];
      let daily = await Word.findOne({ dateKey });


    if (!daily) {

    // Petición a la API de OpenAI
   const prompt = `Dame una palabra en español de exactamente 5 letras, sin acentos ni caracteres especiales. Solo responde con la palabra, sin explicaciones ni puntuación.`;
    
     const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // o "gpt-4-turbo"
        messages: [{ role: "user", content: prompt }],
        temperature: 1.1,
      });

    // La API devuelve un array, tomamos la primera palabra
    let word = completion.choices[0].message.content.trim().toUpperCase();

     word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      daily = await Word.create({ dateKey, word });
      console.log("Nueva palabra del día:", word);
    }
    // Enviamos la palabra al frontend
    res.json({ word: daily.word });
  } catch (error) {
    console.error("Error al obtener palabra:", error.message);
    res.status(500).json({ message: "No se pudo obtener la palabra" });
  }
};

