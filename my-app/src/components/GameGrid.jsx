import { useState, useEffect } from "react";
import { checkWord} from "../utils/wordLogic";
import LetterBox from "./LetterBox";
import Keyboard from "./Keyboard";
import { getWordOfTheDay } from "../utils/api";

// Representa el tablero donde aparecen las letras
function GameGrid() {

const [target, setTarget] = useState("");     // palabra a adivinar
  const [guesses, setGuesses] = useState([]);   // intentos realizados
  const [currentGuess, setCurrentGuess] = useState(""); // intento actual

  // Se ejecuta una sola vez al montar el componente
  useEffect(() => {
    async function fetchWord() {
      try {
        const word = await getWordOfTheDay();     // llama a tu backend
        setTarget(word);                  // guarda la palabra en el estado
        console.log("Palabra objetivo:", word);
      } catch (error) {
        console.error("Error al obtener palabra:", error);
      }
    }
    fetchWord();
  }, []);

function handleEnter(){
  if (currentGuess.length < 5) return;
  const result = checkWord(currentGuess.toUpperCase(), target);
  setGuesses([...guesses, result]);
  setCurrentGuess("");
}

  function handleKeyPress(letter) {
    if (letter === "ENTER") return handleEnter();
    if (letter === "DEL") return setCurrentGuess(currentGuess.slice(0, -1));
    if (currentGuess.length < 5) setCurrentGuess(currentGuess + letter);
  }

return (
    <div>
      <div className="grid">
        {guesses.map((guess, i) => (
          <div key={i} className="row">
            {guess.map((box, j) => (
              <LetterBox key={j} letter={box.letter} status={box.status} />
            ))}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleEnter()}
        maxLength={5}
      />

       <Keyboard onKeyPress={handleKeyPress} /> {/* ✅ conexión correcta */}
    </div>
  );
}

export default GameGrid;