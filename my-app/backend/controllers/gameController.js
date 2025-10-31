import axios from "axios";

export const getRandomWord = async (req, res) => {
  try {
    // Petición a la API externa de palabras
    const { data } = await axios.get("https://random-word-api.herokuapp.com/word?lang=es&length=5");
    
    // La API devuelve un array, tomamos la primera palabra
   let word = data[0]?.toUpperCase();

     word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Enviamos la palabra al frontend
    res.json({ word });
  } catch (error) {
    console.error("Error al obtener palabra:", error.message);
    res.status(500).json({ message: "No se pudo obtener la palabra" });
  }
};