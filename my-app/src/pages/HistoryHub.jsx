import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoriaNivel from "../components/HistoriaNivel.jsx";
import { getHistoriaLevels } from "../utils/api.js";
import ToastContainer from "../components/ToastContainer.jsx";

export default function HistoriaHub() {
  const [levels, setLevels] = useState([]);
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

  // Mostrar toast
  const showToast = (message, duration = 2500) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  // Cargar niveles al iniciar
  useEffect(() => {
    getHistoriaLevels()
      .then((data) => setLevels(data))
      .catch(() => showToast("Error al cargar niveles"));
  }, []);

  const handleLevelClick = (level) => {
    if (level.status === "locked") {
      showToast("🔒 Nivel bloqueado");
      return;
    }

    if (level.cooldownUntil && new Date(level.cooldownUntil) > new Date()) {
      const diff = Math.ceil(
        (new Date(level.cooldownUntil) - new Date()) / (1000 * 60 * 60)
      );
      showToast(`⏳ Inténtalo de nuevo en ${diff} horas`);
      return;
    }

    // Redirige al nivel con el GameGrid y la pista
    navigate(`/historia/${level.id}`);
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

      {/* Toasts */}
      <ToastContainer
        toasts={toasts}
        removeToast={(id) =>
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }
      />
    </div>
  );
}

