// Teclado virtual que envía las letras al juego
function Keyboard() {
  const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  return (
    <div className="keyboard">
      {keys.map((key) => (
        <button key={key}>{key}</button>
      ))}
    </div>
  );
}

export default Keyboard;
