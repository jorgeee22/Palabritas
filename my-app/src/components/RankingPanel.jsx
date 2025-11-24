import { useEffect, useState } from "react";
import "../Styles/RankingPanel.css";
import { getGlobalScores } from "../utils/api";

export default function RankingPanel({ isOpen, onClose }) {
  const [scores, setScores] = useState([]);

  // Obtener puntajes desde tu backend
  useEffect(() => {
    if (!isOpen) return;
    async function fetchScores() {
      try {
        const data = await getGlobalScores(); // Ajusta la ruta según tu server
        // Ordenar por puntos de mayor a menor
        const sorted = data.sort((a, b) => b.points - a.points);
        setScores(sorted);
      } catch (err) {
        console.error("Error al cargar ranking:", err);
      }
    }
    fetchScores();
  }, [isOpen]);

  return (
    <div className={`ranking-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="ranking-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ranking-header">
          <h2>🏆 Palabra del dia</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <ul className="ranking-list">
          {scores.map((user, index) => (
            <li key={user._id || index}>
              <span className="rank">#{index + 1}</span>
              <span className="name">{user.username}</span>
              <span className="points">{user.points} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
