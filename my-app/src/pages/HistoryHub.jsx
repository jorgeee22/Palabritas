import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoriaNivel from "../components/HistoriaNivel.jsx";
import { getHistoriaLevels } from "../utils/api.js";
import ToastContainer from "../components/ToastContainer.jsx";
import Navbar from "../components/Navbar.jsx";
// import "../styles/HistoryMode.css"

export default function HistoriaHub() {
  const [levels, setLevels] = useState([]);
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

// Aplica los colores segun el tema (dark/light)
    useEffect(() => {
    document.body.classList.add("historia-mode");
    return () => document.body.classList.remove("historia-mode");
  }, []);

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
    <>
    <Navbar/>
    <div className="historia-hub container">
      <h2 className="mb-4">Modo Historia</h2>
      <div className="niveles-lista">
        {levels.map((level, i) => (
           <div key={level.id} className="historia-nivel" style={{ "--step": i }}>
          <HistoriaNivel
            key={level.id}
            level={level}
            onClick={() => handleLevelClick(level)}
          /> </div>
        ))}
      </div>

      {/* Toasts */}
      <ToastContainer
      className="toast-container-grid"
        toasts={toasts}
        removeToast={(id) =>
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }
      />
    </div> </>
  );
}

