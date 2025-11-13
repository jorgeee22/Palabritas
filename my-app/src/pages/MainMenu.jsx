import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/MainMenu.css";

export default function MainMenu({username = "Usuario"}) {

    const navigate = useNavigate();

    return (
        <>
      <Navbar/>
  <div className="main-menu">
      <h2 className="main-menu__greeting">
        HOLA “{username.toUpperCase()}”,<br /> ESCOGE UN MODO DE JUEGO
      </h2>

      <div className="main-menu__modes">
        <button onClick={() => navigate("/")} className="mode-btn">
          LA PALABRA DEL DÍA
        </button>

        <button onClick={() => navigate("/GameThematic")} className="mode-btn">
          TEMÁTICO
        </button>

        <button onClick={() => navigate("/historia")} className="mode-btn">
          HISTORIA
        </button>
      </div>

      <div className="main-menu__bottom">
        <div className="bottom-row">
          <button onClick={() => navigate("/achievements")} className="secondary-btn">LOGROS</button>
          <button className="secondary-btn">AJUSTES</button>
        </div>

        <div className="bottom-row">
          <button className="secondary-btn">VER MI PERFIL</button>
          <button className="secondary-btn">CÓMO JUGAR</button>
        </div>
      </div>
    </div>
    </>
  );
}