import Navbar from "../components/Navbar";
import GameGrid from "../components/GameGrid";

// import '../App.css'


export default function GameClassic() {
  return (
    <>
      {/* Barra superior con título o menú */}
      <Navbar />

      {/* Contenedor principal del juego */}
      <main className="game-container">
        <GameGrid mode="classic"/>
      </main>

  
    </>
  );
}
