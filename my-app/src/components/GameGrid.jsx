import { useState, useEffect } from "react";
import { checkWord } from "../utils/wordLogic";
import LetterBox from "./LetterBox";
import MessageBanner from "../components/MessageBanner";
import Keyboard from "./Keyboard";
import { getWordOfTheDay, saveScore, updateClassicStreak } from "../utils/api";
import '../Styles/Board.css';
import '../Styles/Gamegrid.css';
import { getLocalDateKey } from "../utils/localDate";

// Representa el tablero donde aparecen las letras
function GameGrid({ mode = "classic", target: externalTarget = "", onWin }) {
  const [target, setTarget] = useState(externalTarget); // palabra a adivinar
  const [guesses, setGuesses] = useState([]); // intentos realizados
  const [currentGuess, setCurrentGuess] = useState(""); // intento actual
  const [activeIndex, setActiveIndex] = useState(0); // índice de la celda activa (0–4)
  const [gameOver, setGameOver] = useState(false);
  const storageKey = mode === "classic" ? "gameStateClassic" : `gameState_${mode}`;

  // Restaurar partida o pedir palabra nueva
  useEffect(() => {
    async function restoreGame() {
      if (externalTarget) {
        setTarget(externalTarget);
        return;
      }

      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          const today = await getLocalDateKey();

          if (parsed.dateKey === today) {
            setTarget(parsed.target);
            setGuesses(parsed.guesses);
            setGameOver(parsed.gameOver);
            console.log("Juego restaurado:", parsed.target);
            return;
          }

          localStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.error("Error al restaurar juego:", error);
        localStorage.removeItem(storageKey);
      }

      // Si no hay partida guardada, pedir la palabra del día
      async function fetchWord() {
        try {
          const word = await getWordOfTheDay();
          setTarget(word);
          console.log("Palabra objetivo nueva:", word);
        } catch (error) {
          console.error("Error al obtener palabra:", error);
        }
      }

      fetchWord();
    }

    restoreGame();
  }, [externalTarget, mode]);

  // Reset cuando se cambia de modo
  useEffect(() => {
    if (mode !== "classic") {
      setGuesses([]);
      setCurrentGuess("");
      setGameOver(false);
      setActiveIndex(0);
    }
  }, [externalTarget, mode]);

  // Guardar progreso localmente
  useEffect(() => {
    if (!target || mode !== "classic") return; // guarda solo el modo clásico

    const gameState = {
      target,
      guesses,
      gameOver,
      dateKey: getLocalDateKey(),
    };
    localStorage.setItem(storageKey, JSON.stringify(gameState));
  }, [target, guesses, gameOver, mode]);

  // Listener de teclado físico
  useEffect(() => {
    function handlePhysicalKeyboard(e) {
      if (gameOver) return;

      const key = e.key.toUpperCase();

      // Enter
      if (key === "ENTER") {
        handleEnter();
      }
      // Backspace o Delete
      else if (key === "BACKSPACE" || key === "DELETE") {
        setCurrentGuess(prev => {
          const chars = prev.split("");
          chars[activeIndex] = "";
          return chars.join("");
        });
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
      // Letras válidas
      else if (/^[A-ZÑÁÉÍÓÚ]$/.test(key)) {
        setCurrentGuess(prev => {
          const chars = prev.split("");
          chars[activeIndex] = key;
          return chars.join("");
        });
        setActiveIndex(prev => Math.min(prev + 1, 4));
      }
    }

    window.addEventListener("keydown", handlePhysicalKeyboard);
    return () => window.removeEventListener("keydown", handlePhysicalKeyboard);
  }, [activeIndex, currentGuess, gameOver, target]);

  // Manejar tecla Enter
  async function handleEnter() {
    if (currentGuess.length < 5 || currentGuess.includes("")) return;

    const result = checkWord(currentGuess.toUpperCase(), target);
    const newGuesses = [...guesses, result];
    setGuesses(newGuesses);
    setCurrentGuess("");
    setActiveIndex(0);

    const isCorrect = result.every((box) => box.status === "correct");

    if (isCorrect) {
      await handleGameEnd(true, newGuesses.length);
    } else if (newGuesses.length >= 6) {
      await handleGameEnd(false, newGuesses.length);
    }
  }

  // Manejar teclado virtual
  function handleKeyPress(letter) {
    if (gameOver) return;

    if (letter === "ENTER") return handleEnter();
    if (letter === "DEL") {
      setCurrentGuess(prev => {
        const chars = prev.split("");
        chars[activeIndex] = "";
        return chars.join("");
      });
      setActiveIndex(prev => Math.max(prev - 1, 0));
      return;
    }

    if (/^[A-ZÑÁÉÍÓÚ]$/.test(letter)) {
      setCurrentGuess(prev => {
        const chars = prev.split("");
        chars[activeIndex] = letter;
        return chars.join("");
      });
      setActiveIndex(prev => Math.min(prev + 1, 4));
    }
  }

  // Fin del juego
  async function handleGameEnd(isWin, attemptsUsed) {
    setGameOver(true);

    if (isWin && onWin) onWin();

    if (!externalTarget) {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await saveScore(isWin, attemptsUsed, token);
        await updateClassicStreak(isWin, token);
        console.log(`Resultado enviado: ${isWin ? "ganó" : "perdió"} en ${attemptsUsed} intentos`);
      } catch (err) {
        console.error("Error al guardar el resultado:", err);
      }
    }
  }

  // Renderizado
  return (
    <div>
      <div className="grid">
        {/* 1. Intentos ya realizados */}
        {guesses.map((guess, i) => (
          <div key={i} className="row">
            {guess.map((box, j) => (
              <LetterBox key={j} letter={box.letter} status={box.status} delay={j * 150} />
            ))}
          </div>
        ))}

        {/* 2. Fila actual (activa) */}
        {guesses.length < 6 && !gameOver && (
          <div className="row">
            {[...Array(5)].map((_, j) => (
              <LetterBox
                key={j}
                letter={currentGuess[j] || ""}
                status="empty"
                isActive={activeIndex === j}
                onClick={() => setActiveIndex(j)}
              />
            ))}
          </div>
        )}

        {/* 3. Filas vacías restantes */}
        {[...Array(Math.max(0, 6 - guesses.length - 1))].map((_, i) => (
          <div key={`empty-${i}`} className="row">
            {[...Array(5)].map((_, j) => (
              <LetterBox key={j} letter="" status="empty" />
            ))}
          </div>
        ))}
      </div>

      {/* Teclado virtual */}
      <Keyboard onKeyPress={handleKeyPress} />

      {/* Mensaje final */}
      <MessageBanner gameOver={gameOver} guesses={guesses} target={target} />
    </div>
  );
}

export default GameGrid;
