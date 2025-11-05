import axios from "axios";
import Word from "../models/wordModel.js";

export const getWordOfTheDay = async (req, res) => {
  try {
     const dateKey = new Date().toISOString().split("T")[0];
      let daily = await Word.findOne({ dateKey });


    if (!daily) {

    // Petición a la API externa de palabras
    const { data } = await axios.get("https://random-word-api.herokuapp.com/word?lang=es&length=5");
    
    // La API devuelve un array, tomamos la primera palabra
    let word = data[0].toUpperCase();

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