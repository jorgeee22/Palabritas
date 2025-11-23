import { useState, useEffect, useRef } from "react";
import { checkWord } from "../utils/wordLogic";
import LetterBox from "./LetterBox";
import MessageBanner from "../components/MessageBanner";
import Keyboard from "./Keyboard";
import { getWordOfTheDay, saveScore, updateClassicStreak } from "../utils/api";
import "../Styles/Board.css";
import "../Styles/Gamegrid.css";
import { getLocalDateKey } from "../utils/localDate";

function GameGrid({ mode = "classic", target: externalTarget = "", onWin }) {
  const [target, setTarget] = useState(externalTarget);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(Array(5).fill("")); // ← array fijo
  const [activeIndex, setActiveIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const storageKey = mode === "classic" ? "gameStateClassic" : `gameState_${mode}`;

  // Foco automático en el grid para capturar teclado físico
  useEffect(() => {
    const grid = document.querySelector(".grid");
    grid?.focus();
  }, []);

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
      setCurrentGuess(Array(5).fill(""));
      setGameOver(false);
      setActiveIndex(0);
    }
  }, [externalTarget, mode]);

  // Guardar progreso localmente
  useEffect(() => {
    if (!target || mode !== "classic") return;
    const gameState = {
      target,
      guesses,
      gameOver,
      dateKey: getLocalDateKey(),
    };
    localStorage.setItem(storageKey, JSON.stringify(gameState));
  }, [target, guesses, gameOver, mode]);

  //  Manejo de teclado físico directamente en el grid
  function handlePhysicalKeyboard(e) {
    if (gameOver) return;

    const key = e.key.toUpperCase();

    if (key === "ENTER") {
      handleEnter();
    } else if (key === "BACKSPACE" || key === "DELETE") {
      setCurrentGuess(prevGuess => {
        const chars = [...prevGuess];

        // Si hay letra, bórrala sin moverte
        if (chars[activeIndex] !== "") {
          chars[activeIndex] = "";
          return chars;
        }

        // Si está vacía, retrocede una y bórrala
        const newIndex = Math.max(activeIndex - 1, 0);
        chars[newIndex] = "";
        setActiveIndex(newIndex);
        return chars;
      });
    } else if (/^[A-ZÑÁÉÍÓÚ]$/.test(key)) {
      setCurrentGuess(prevGuess => {
        const chars = [...prevGuess];
        chars[activeIndex] = key;
        return chars;
      });
      setActiveIndex(prev => Math.min(prev + 1, 4));
    }
  }

  //  Teclado virtual
  function handleKeyPress(letter) {
    if (gameOver) return;

    if (letter === "ENTER") return handleEnter();

    if (letter === "DEL") {
      setCurrentGuess(prevGuess => {
        const chars = [...prevGuess];

        if (chars[activeIndex] !== "") {
          chars[activeIndex] = "";
          return chars;
        }

        const newIndex = Math.max(activeIndex - 1, 0);
        chars[newIndex] = "";
        setActiveIndex(newIndex);
        return chars;
      });
      return;
    }

    if (/^[A-ZÑÁÉÍÓÚ]$/.test(letter)) {
      setCurrentGuess(prevGuess => {
        const chars = [...prevGuess];
        chars[activeIndex] = letter;
        return chars;
      });
      setActiveIndex(prev => Math.min(prev + 1, 4));
    }
  }

  // ✅ Enter
  async function handleEnter() {
    const guess = currentGuess.join("").toUpperCase();

    if (currentGuess.some(c => c === "")) {
      console.log("Error: palabra incompleta");
      return;
    }

    const result = checkWord(guess, target);
    const newGuesses = [...guesses, result];
    setGuesses(newGuesses);
    setCurrentGuess(Array(5).fill(""));
    setActiveIndex(0);

    const isCorrect = result.every(box => box.status === "correct");

    if (isCorrect) {
      await handleGameEnd(true, newGuesses.length);
    } else if (newGuesses.length >= 6) {
      await handleGameEnd(false, newGuesses.length);
    }
  }

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

  //  Renderizado
  return (
    <div>
      <div
        className="grid"
        tabIndex={0}               // permite capturar teclas
        onKeyDown={handlePhysicalKeyboard} // escucha teclas físicas
      >
        {/* 1. Mostrar los intentos ya realizados */}
        {guesses.map((guess, i) => (
          <div key={i} className="row">
            {guess.map((box, j) => (
              <LetterBox key={j} letter={box.letter} status={box.status} delay={j * 150} />
            ))}
          </div>
        ))}

        {/* 2. Fila actual */}
        {guesses.length < 6 && !gameOver && (
          <div className="row">
            {currentGuess.map((letter, j) => (
              <LetterBox
                key={j}
                letter={letter}
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
