import { useParams } from "react-router-dom";
import { useHistoria } from "../hooks/useHistoria";
import GameGrid from "./GameGrid";

export default function HistoriaLevelPage() {
  const { id } = useParams();
  const { level, loading } = useHistoria(id);

  if (loading) return <p className="text-center mt-5">Cargando nivel...</p>;
  if (!level) return <p className="text-center mt-5">Nivel no encontrado.</p>;

  return (
    <div className="historia-nivel container text-center mt-5">
      {/* Pista del nivel */}
      <h2 className="fw-bold mb-3">Nivel {level.id}</h2>
      <p className="fst-italic mb-4">{level.hint}</p>

      {/* Tablero del juego */}
      <GameGrid
       mode="historia"
        target={level.answer}
        hint={level.hint}
        levelId={level.id}
        onWin={handleWin}
/>
    </div>
  );
}
