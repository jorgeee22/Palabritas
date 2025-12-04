// src/components/InstructionsBanner.jsx
import "../styles/Banner.css";


export default function InstructionsBanner({ isOpen, onClose }) {
    if (!isOpen) return null; 
    return (
      <div className="instructions-overlay">
        <div className="instructions-modal">
          <button
            className="instructions-close"
            onClick={onClose}
            aria-label="Cerrar instrucciones"
          >
            ×
          </button>
  
          <h2 className="instructions-title">Cómo jugar</h2>
          <p className="instructions-subtitle">
            Adivina la palabra de <strong>Palabritas</strong> en 6 intentos.
          </p>
  
          <ul className="instructions-list">
            <li>Cada intento debe ser una palabra válida de 5 letras en español.</li>
            <li>
              Después de cada intento, las casillas cambian de color para mostrar qué tan cerca
              estuviste de la palabra.
            </li>
          </ul>
  
          <h3 className="instructions-examples-title">Ejemplos</h3>
  
          {/* Ejemplo 1 */}
          <div className="instructions-row">
            <div className="tile tile--correct">C</div>
            <div className="tile">A</div>
            <div className="tile">S</div>
            <div className="tile">A</div>
            <div className="tile">S</div>
          </div>
          <p>
            <strong>C</strong> está en la palabra y en la posición correcta.
          </p>
  
          {/* Ejemplo 2 */}
          <div className="instructions-row">
            <div className="tile">L</div>
            <div className="tile tile--present">U</div>
            <div className="tile">N</div>
            <div className="tile">A</div>
            <div className="tile">S</div>
          </div>
          <p>
            <strong>U</strong> está en la palabra pero en otra posición.
          </p>
  
          {/* Ejemplo 3 */}
          <div className="instructions-row">
            <div className="tile">R</div>
            <div className="tile">E</div>
            <div className="tile tile--absent">G</div>
            <div className="tile">A</div>
            <div className="tile">L</div>
          </div>
          <p>
            <strong>G</strong> no aparece en la palabra en ninguna posición.
          </p>
  
          <p className="instructions-footer">
            Recibirás una nueva palabra cada vez que juegues el modo clásico. 
            ¡Usa los colores para deducir la palabra oculta!
          </p>
        </div>
      </div>
    );
  }
  