
// Conexión al backend con Axios (cuando se integre con Node/Express)
import axios from "axios";

const API_URL_GAMES = "http://localhost:5000/api/games";
const API_URL_USERS = "http://localhost:5000/api/users";
const API_URL_SCORES = "http://localhost:5000/api/scores";

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