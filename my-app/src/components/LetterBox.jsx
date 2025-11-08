// Casilla individual de una letra en el grid
import { useState, useEffect } from "react";


function LetterBox({ letter, status, delay=0 }) {

  const[animate, setAnimate] = useState(false);

  useEffect(() => {
  if (["correct", "present", "absent"].includes(status)) {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer); // limpia el timeout
  }
}, [status, delay]);

 return (
    <div
      className={`letter-box ${status} ${animate ? "reveal" : ""}`}
      style={{
        "--target-color":
          status === "correct"
            ? "#6aaa64"
            : status === "present"
            ? "#E7C45A"
            : status === "absent"
            ? "#787c7e"
            : "#fff",
      }}
    >
      {letter}
    </div>
  );
}

 


export default LetterBox;
