// Casilla individual de una letra en el grid
function LetterBox({ letter = "", status = "default" }) {
  return <div className={`letter-box ${status}`}>{letter}</div>;
}

export default LetterBox;
