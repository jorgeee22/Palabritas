// src/pages/GameClassic.jsx
import { useState } from "react";
import Navbar from "../components/Navbar";
import GameGrid from "../components/GameGrid";
import InstructionsBanner from "../components/InstructionsBanner";

export default function GameClassic() {
  const [showInstructions, setShowInstructions] = useState(true); // se ve al entrar

  return (
    <>
      <Navbar />

      <main className="game-container">
        <InstructionsBanner
          isOpen={showInstructions}
          onClose={() => setShowInstructions(false)}
        />

        <GameGrid mode="classic" />
      </main>
    </>
  );
}
