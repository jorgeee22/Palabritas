import { useState } from "react";
import { checkWord, getTargetWord } from "../utils/wordLogic";
import LetterBox from "./LetterBox";
import Keyboard from "./Keyboard";



// Representa el tablero donde aparecen las letras
function GameGrid() {

const[target] = useState(getTargetWord());
const[guesses, setGuesses] = useState([]);
const [currentGuess, setCurrentGuess] = useState(""); 

 console.log(target);
//  console.log(checkWord("CASAS", "SOLAR"));

function handleEnter(){
  if (!currentGuess) return;
  const result = checkWord(currentGuess.toUpperCase(), target);
  setGuesses([...guesses, result]);
  setCurrentGuess("");
}

  function handleKeyPress(letter) {
    if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + letter);
    }
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