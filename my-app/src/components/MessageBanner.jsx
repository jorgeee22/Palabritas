// Muestra mensajes temporales ("Palabra incorrecta", "¡Victoria!", etc.)
function MessageBanner({gameOver, guesses, target}) {
 if (!gameOver) return null;
   const lastGuess = guesses[guesses.length -1];
   const isWin = lastGuess?.every((box) => box.status ==="correct");
    return(
      <div className="game-over">
        {isWin ? "¡Ganaste 🎉!" : `Perdiste. La palabra era: ${target}` }
      </div>
    );
}

export default MessageBanner;
