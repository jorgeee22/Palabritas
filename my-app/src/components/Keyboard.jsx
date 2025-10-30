// Teclado virtual que envía las letras al juego
function Keyboard({onKeyPress}) {
  const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  return (
    <div className="keyboard">
      {keys.map((key) => (
        <button key={key} onClick={() => onKeyPress(key)}>
          {key}
          </button>
      ))}
    </div>
  );
}

export default Keyboard;
