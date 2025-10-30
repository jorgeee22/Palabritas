/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 */

import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
import MessageBanner from "./components/MessageBanner";
import './App.css'

function App() {
  
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
    </>
  );
}


export default App
