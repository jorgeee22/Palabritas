// Teclado virtual que envía las letras al juego
import "../styles/keyboard.css";

function Keyboard({ onKeyPress }) {
  const ROWS = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["ENTER","Z","X","C","V","B","N","M","DEL"],
  ];

  const isWide = (k) => k === "ENTER" || k === "DEL";

  return (
    <div className="keyboard" aria-label="Teclado del juego">
      {ROWS.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((k) => (
            <button
              key={k}
              type="button"
              className={`key ${isWide(k) ? "wide" : ""}`}
              onMouseDown={(e) => e.preventDefault()} // evita “focus/drag” en móvil
              onClick={() => onKeyPress(k)}
              aria-label={k}
            >
              {k === "DEL" ? "⌫" : k}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
