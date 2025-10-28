
// Conexión al backend con Axios (cuando se integre con Node/Express)
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export async function getWordOfTheDay() {
  const res = await axios.get(`${API_URL}/word`);
  return res.data;
}


