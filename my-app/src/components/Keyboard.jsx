// Teclado virtual que envía las letras al juego
function Keyboard({onKeyPress}) {
    const row1 = "QWERTYUIOP".split("");
    const row2 = "ASDFGHJKLÑ".split("");
    const row3 = ["ENTER", ..."ZXCVBNM", "DEL"];

 
 

  return (
    <div className="keyboard">
      {[row1, row2, row3].map((row, i) => (
        <div key={i} className ="keyboard-row">
          {row.map((key) => (
          <button 
          key = {key}
          className={`key ${key === "ENTER" || key === "DEL" ? "key-wide" : ""}`}
           onClick={() => onKeyPress(key)}
           >
            {key}
           </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
