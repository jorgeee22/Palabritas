/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' */

import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
import Keyboard from "./components/Keyboard";
import MessageBanner from "./components/MessageBanner";


function App() {
  
  return (
    <>
      {/* Barra superior con título o menú */}
      <Navbar />

      {/* Contenedor principal del juego */}
      <main className="game-container">
        <GameGrid />
        <Keyboard />
      </main>

      {/* Mensajes de acierto/error */}
      <MessageBanner />
    </>
  );
}


export default App
