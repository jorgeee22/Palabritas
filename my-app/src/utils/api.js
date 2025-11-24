
// Conexión al backend con Axios (cuando se integre con Node/Express)
import axios from "axios";

const API_URL_GAMES = "https://backend-palabritas.onrender.com/api/games";
const API_URL_USERS = "https://backend-palabritas.onrender.com/api/users";
const API_URL_SCORES = "https://backend-palabritas.onrender.com/api/scores";
const API_URL_THEMATIC = "https://backend-palabritas.onrender.com/api/tematico";
const API_URL_HISTORY = "https://backend-palabritas.onrender.com/api/historia";

// GAMES
export async function getWordOfTheDay() {
  const res = await axios.get(`${API_URL_GAMES}/word`);
  return res.data.word;
}

// USERS

//  Login
export async function loginUser(email, password) {
  const res = await axios.post(`${API_URL_USERS}/login`, { email, password });
  return res.data; // devuelve usuario + token
}

//  Registro
export async function registerUser(name, email, password) {
  const res = await axios.post(`${API_URL_USERS}/register`, { name, email, password });
  return res.data;
}

export async function getProfile(token) {
  const res = await axios.get(`${API_URL_USERS}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// SCORES

export async function saveScore(isWin,attempts, token) {
  const res = await axios.post(API_URL_SCORES,
    { isWin, attempts},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

//  Obtener puntajes del usuario
export async function getUserScores(token) {
  const res = await axios.get(API_SCORES, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}


export async function getWordByTheme(tema) {
  try {
    const res = await axios.get(`${API_URL_THEMATIC}?tema=${tema}`);
    return res.data.word;
  } catch (error) {
    console.error("Error al obtener palabra temática:", error);
    throw error;
  }
}

export async function updateThemeProgress(tema, word, token) {
try {
    const res = await axios.post(
      `${API_URL_THEMATIC}/progreso`,
      { tema, word },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error al actualizar progreso:", error);
    throw error;
  }
}

export async function updateClassicStreak(won, token) {
  try {
    const res = await axios.patch(
      `${API_URL_USERS}/streak`,
      { won },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error al actualizar racha:", error);
    throw error;
  }
}

export async function getUserAchievements(token) {
  const res = await axios.get(`${API_URL_USERS}/achievements`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Obtener ranking global de la base de datos
export async function getGlobalScores() {
  try {
    const res = await axios.get(`${API_URL_SCORES}/ranking`); // tu endpoint del backend
    return res.data; // el backend debería devolver una lista de objetos con { username, points }
  } catch (error) {
    console.error("Error al obtener el ranking global:", error);
    throw error;
  }
}

export async function getHistoriaLevels(){
   try {
    const response = await axios.get(API_URL_HISTORY);
   return response.data;
  } catch (error) {
    console.error("Error al obtener niveles:", error.response?.data || error.message);
    throw new Error("Error al obtener niveles");
  }
}

export async function checkHistoriaAnswer(id, userAnswer) {
 try {
    const response = await axios.post(`${API_URL_HISTORY}/${id}/check`, {
      userAnswer,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al verificar respuesta:", error.response?.data || error.message);
    throw new Error("Error al verificar respuesta");
  }
}