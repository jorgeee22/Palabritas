import { useNavigate } from "react-router-dom";
// import "../styles/TematicoHub.css";
import Navbar from "./Navbar";

function TematicoHub(){
    const navigate = useNavigate();

    const temas = [
    { id: "deportes", label: "🏀 Deportes" },
    { id: "ciencia", label: "🔬 Ciencia" },
    { id: "peliculas", label: "🎬 Peliculas" },
    { id: "animales", label: "🐾 Animales" },
    { id: "comida", label: "🍎 Comida" },
    { id: "nombres", label: "Nombres" },
    { id: "paises", label: "Paises" },
    { id: "historia", label: "Historia" },
  ];

  return(
    <>
    <Navbar/>
   <div className="tematico-hub">
      <h2 className="tematico-title">ESCOGE UN TEMA</h2>

      <div className="temas-grid">
        {temas.map((t) => (
          <button
            key={t.id}
            className="tema-btn"
            onClick={() => navigate(`/GameThematic/${t.id}`)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <button className="volver-btn" onClick={() => navigate("/MainMenu")}>
        ← VOLVER AL MENÚ
      </button>
    </div>
    </>
  );
}

export default TematicoHub;