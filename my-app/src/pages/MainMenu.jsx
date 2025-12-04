import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
// import "../styles/MainMenu.css";
import RankingPanel from "../components/RankingPanel";
import { useState } from "react";
import InstructionsBanner from "../components/InstructionsBanner";
import SettingsPopover from "../components/SettingsUI";

export default function MainMenu() {

    const navigate = useNavigate();
    const [showRanking, setShowRanking] = useState(false);
    const [showInstructions, setShowInstructions]= useState(false);
    const [showSettings, setShowSettings]= useState(false);


   function AuthenticatedUser(){
    const token = localStorage.getItem("token");
    if (!token){
      alert("Inicia sesión o Registrate para guardar progreso");
      navigate("/");}
      else{
        navigate("/achievements")
      }
   }


   return (
  <>
    <Navbar/>
    <div className="main-menu">
      <h1 className="main-menu__greeting">
        ESCOGE UN MODO DE JUEGO
      </h1>

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
          <button onClick={() => AuthenticatedUser()} className="secondary-btn">LOGROS</button>
            <div className="settings-wrapper">
          <button onClick={() => setShowSettings(true)} className="secondary-btn">
                  AJUSTES
           </button>

    <SettingsPopover 
      isOpen={showSettings} 
      onClose={() => setShowSettings(false)} 
    />
  </div>
        </div>

        <div className="bottom-row">
          <button onClick={() => navigate("/profile")} className="secondary-btn">VER MI PERFIL</button>
          <button  onClick={() => setShowInstructions(true)} className="secondary-btn">CÓMO JUGAR</button>
          <button className="secondary-btn" onClick={() => setShowRanking(true)}>
            🏆 RANKING GLOBAL
          </button>
        </div>
      </div>
    </div>

    {/* Popover lateral del ranking */}
    <RankingPanel isOpen={showRanking} onClose={() => setShowRanking(false)} />
       <InstructionsBanner isOpen={showInstructions} onClose={() => setShowInstructions(false)} />
        
  </>
);

}