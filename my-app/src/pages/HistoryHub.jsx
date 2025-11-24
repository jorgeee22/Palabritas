import React, { useEffect, useState } from "react";
import HistoriaNivel from "../components/HistoriaNivel.jsx";
import { getHistoriaLevels } from "../utils/api.js";

export default function HistoriaHub() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
  getHistoriaLevels()
    .then((data) => setLevels(data))
    .catch((err) => console.error(err));
}, []);

  const handleLevelClick = (level) => {
    if (level.status === "locked") return alert("🔒 Nivel bloqueado.");
    if (level.cooldownUntil && new Date(level.cooldownUntil) > new Date()) {
      const diff = Math.ceil(
        (new Date(level.cooldownUntil) - new Date()) / (1000 * 60 * 60)
      );
      return alert(`Inténtalo en ${diff} horas.`);
    }
    alert(`Pista: ${level.hint}`);
  };

  return (
    <div className="historia-hub container text-center mt-5">
      <h2 className="mb-4">Modo Historia</h2>
      <div className="d-flex flex-column align-items-center gap-4">
        {levels.map((level) => (
          <HistoriaNivel
            key={level.id}
            level={level}
            onClick={() => handleLevelClick(level)}
          />
        ))}
      </div>
    </div>
  );
}
