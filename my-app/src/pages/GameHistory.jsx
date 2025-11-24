import { useParams, useNavigate } from "react-router-dom";
import { useHistoria } from "../utils/hooks/useHistoria.js";
import { checkHistoriaAnswer } from "../utils/api.js"; // asegúrate de importar esta función
import GameGrid from "../components/GameGrid";
import Navbar from "../components/Navbar";

export default function GameHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { level, loading } = useHistoria(id);

  // 👇 define handleWin aquí
  const handleWin = async (levelId) => {
    try {
      await checkHistoriaAnswer(levelId, level.answer); // marca nivel como completado
      // mostrar toast de éxito si tienes sistema de toasts
      navigate("/historia"); // redirige al hub
    } catch (error) {
      console.error("Error al actualizar nivel:", error);
      // también podrías mostrar un toast de error
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando nivel...</p>;
  if (!level) return <p className="text-center mt-5">Nivel no encontrado.</p>;

  return (
   <>
     <Navbar/>


    <div className="historia-nivel container text-center mt-5">
      {/* Pista del nivel */}
      <h2 className="fw-bold mb-4">Nivel {level.id}</h2>
      <p className="fst-italic mb-4">{level.hint}</p>

      {/* Tablero del juego */}
      <GameGrid
        mode="historia"
        target={level.answer}
        levelId={level.id}
        onWin={handleWin}
      />
    </div>

    </>
  );
}
