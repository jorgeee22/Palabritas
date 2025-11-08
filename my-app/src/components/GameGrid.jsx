import { useState, useEffect } from "react";
import { checkWord } from "../utils/wordLogic";
import LetterBox from "./LetterBox";
import MessageBanner from "../components/MessageBanner";
import Keyboard from "./Keyboard";
import { getWordOfTheDay, saveScore } from "../utils/api";
import '../Styles/Board.css'
import {getLocalDateKey} from "../utils/localDate";

// Representa el tablero donde aparecen las letras
function GameGrid() {
  const [target, setTarget] = useState("");     // palabra a adivinar
  const [guesses, setGuesses] = useState([]);   // intentos realizados
  const [currentGuess, setCurrentGuess] = useState(""); // intento actual
  const [gameOver, setGameOver] = useState(false);


    useEffect(() => {
    try {
      const saved = localStorage.getItem("gameState");
      if (saved) {
        const parsed = JSON.parse(saved);
        const today = getLocalDateKey();

        // Si la palabra guardada es del día actual, restaurar el progreso
        if (parsed.dateKey === today) {
          setTarget(parsed.target);
          setGuesses(parsed.guesses);
          setGameOver(parsed.gameOver);
          console.log("Juego restaurado desde localStorage:", parsed.target);
          return; //  evita obtener una nueva palabra del backend
        }

        // Si la palabra guardada es vieja, borrar progreso anterior
        localStorage.removeItem("gameState");
      }
    } catch (error) {
      console.error("Error al restaurar juego:", error);
      localStorage.removeItem("gameState");
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
  }, []);

  useEffect(() => {
  if (target) {
    const gameState = {
      target,
      guesses,
      gameOver,
      dateKey: getLocalDateKey(),
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }
}, [target, guesses, gameOver]);



  // LISTENER DEL TECLADO FÍSICO
  useEffect(() => {
    function handlePhysicalKeyboard(e) {
      if (gameOver) return; // No hacer nada si el juego terminó

      const key = e.key.toUpperCase();

      // Enter
      if (key === "ENTER") {
        handleEnter();
      }
      // Backspace o Delete
      else if (key === "BACKSPACE" || key === "DELETE") {
        setCurrentGuess(prev => prev.slice(0, -1));
      }
      // Letras válidas
      else if (/^[A-ZÑÁÉÍÓÚ]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key);
      }
    }

    // Agregar el listener
    window.addEventListener("keydown", handlePhysicalKeyboard);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyboard);
    };
  }, [currentGuess, gameOver, target]); // Dependencias necesarias

  async function handleEnter() {
    if (currentGuess.length < 5) return;
    const result = checkWord(currentGuess.toUpperCase(), target);
    const newGuesses = ([...guesses, result]);
    setGuesses(newGuesses);
    setCurrentGuess("");

    const isCorrect = result.every((box) => box.status === "correct");

    if (isCorrect) {
      await handleGameEnd(true, newGuesses.length);
    } else if (newGuesses.length >= 6) {
      await handleGameEnd(false, newGuesses.length);
    }
  }

  function handleKeyPress(letter) {
    if (gameOver) return; // No hacer nada si el juego terminó

    if (letter === "ENTER") return handleEnter();
    if (letter === "DEL") return setCurrentGuess(currentGuess.slice(0, -1));

    if (/^[A-ZÑÁÉÍÓÚ]$/.test(letter) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + letter);
    }
  }

  async function handleGameEnd(isWin, attemptsUsed) {
    setGameOver(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await saveScore(isWin, attemptsUsed, token);
      console.log(
        `Resultado enviado: ${isWin ? "ganó" : "perdió"} en ${attemptsUsed} intentos`
      );
    } catch (err) {
      console.error("Error al guardar el resultado:", err);
    }
  }

  return (
    <div>
      <div className="grid">
        {/* 1. Mostrar los intentos ya realizados */}
        {guesses.map((guess, i) => (
          <div key={i} className="row">
            {guess.map((box, j) => (
              <LetterBox key={j} letter={box.letter} status={box.status} delay={j *150}/>
            ))}
          </div>
        ))}

        {/* 2. Mostrar la fila del intento actual con 5 cajas */}
        {guesses.length < 6 && !gameOver && (
          <div className="row">
            {[...Array(5)].map((_, j) => (
              <LetterBox
                key={j}
                letter={currentGuess[j] || ""}
                status="empty"
              />
            ))}
          </div>
        )}

        {/* 3. Mostrar las filas vacías restantes */}
        {[...Array(Math.max(0, 6 - guesses.length - 1))].map((_, i) => (
          <div key={`empty-${i}`} className="row">
            {[...Array(5)].map((_, j) => (
              <LetterBox key={j} letter="" status="empty" />
            ))}
          </div>
        ))}
      </div>

      {/* Teclado virtual sigue funcionando */}
      <Keyboard onKeyPress={handleKeyPress} />

       {/* Mensajes de acierto/error */}
      <MessageBanner
      gameOver={gameOver}      
      guesses={guesses}        
      target={target}         
/>
    </div>
  );
}

export default GameGrid;