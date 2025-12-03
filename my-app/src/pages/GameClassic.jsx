// src/pages/GameClassic.jsx (o donde esté)
import { useState } from "react";
import Navbar from "../components/Navbar";
import GameGrid from "../components/GameGrid";
import InstructionsBanner from "../components/InstructionsBanner";

export default function GameClassic() {
  const [showInstructions, setShowInstructions] = useState(true); // siempre true al entrar

  return (
    <>
      <Navbar />

      <main className="game-container">
        {showInstructions && (
          <InstructionsBanner onClose={() => setShowInstructions(false)} />
        )}

        <GameGrid mode="classic" />
      </main>
    </>
  );
}
