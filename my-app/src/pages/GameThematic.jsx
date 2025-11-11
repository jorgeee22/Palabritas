import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameGrid from "../components/GameGrid";
import { getWordByTheme, updateThemeProgress } from "../utils/api";
//import "./TematicoGame.css";

export default function GameThematic({user}) {

  const { tema } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState(null);
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
  async function fetchWord() {
    const word = await getWordByTheme(tema);
    setWord(word);
  }
  fetchWord();
}, [tema]);

 console.log(word);

 async function handleWin() {
  if (user?._id) {
    await updateThemeProgress(user._id, tema);
  }
  setProgress(p => p + 1);
  setFinished(true);
}

  function handleNext() {
    fetchWord();
    setFinished(false);
  }

  if (!word) return <p>Cargando palabra...</p>;

  return (
    <>
    <Navbar/>
    <div className="tematico-game">
      <h2>Tema: {tema.toUpperCase()}</h2>

      {!finished ? (
        <GameGrid target={word} onWin={handleWin} />
      ) : (
        <div className="tematico-finish">
          <h3>¡Correcto! 🎉</h3>
          <p>Palabras adivinadas en {tema}: {progress}</p>
          <div className="finish-buttons">
            <button onClick={handleNext}>Siguiente palabra</button>
            <button onClick={() => navigate("/GameThematic")}>Volver al Hub</button>
          </div>
        </div>
      )}
    </div>
   </>
  );
}