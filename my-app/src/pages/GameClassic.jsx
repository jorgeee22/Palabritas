import Navbar from "../components/Navbar";
import GameGrid from "../components/GameGrid";
import MessageBanner from "../components/MessageBanner";
import '../App.css'


export default function GameClassic() {
  return (
    <>
      {/* Barra superior con título o menú */}
      <Navbar />

      {/* Contenedor principal del juego */}
      <main className="game-container">
        <GameGrid />
      </main>

      {/* Mensajes de acierto/error */}
      <MessageBanner />

     <a href="/login">Inicia sesión aquí</a>
     <a href="/register"> Registrate aquí</a>
    </>
  );
}
