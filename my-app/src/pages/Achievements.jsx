import { useEffect, useState } from "react";
import { getUserAchievements } from "../utils/api";
import { ClassicAchievements } from "../components/ClassicAchievements";
import { ThematicAchievements } from "../components/ThematicAchievements";

export default function Achievements() {
  const [mode, setMode] = useState("classic");
  const [classicStats, setClassicStats] = useState(null);
  const [thematicStats, setThematicStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const token = localStorage.getItem("token");
        const data = await getUserAchievements(token);
        setClassicStats(data.classic);
        setThematicStats(data.thematic);
      } catch (err) {
        console.error("Error al obtener logros:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAchievements();
  }, []);

  if (loading) return <p>Cargando logros...</p>;

  return (
    <div className="achievements-container">
      <h1 className="title">Logros</h1>

      <div className="mode-selector">
        <button
          className={mode === "classic" ? "active" : ""}
          onClick={() => setMode("classic")}
        >
          Modo Clásico
        </button>
        <button
          className={mode === "thematic" ? "active" : ""}
          onClick={() => setMode("thematic")}
        >
          Modo Temático
        </button>
        <button
          className={mode === "story" ? "active" : ""}
          onClick={() => setMode("story")}
        >
          Modo Historia
        </button>
      </div>

      <div className="achievements-content">
        {mode === "classic" && <ClassicAchievements stats={classicStats} />}
        {mode === "thematic" && <ThematicAchievements stats={thematicStats} />}
        {mode === "story" && (
          <p className="coming-soon">✨ Próximamente: modo historia</p>
        )}
      </div>
    </div>
  );
}
