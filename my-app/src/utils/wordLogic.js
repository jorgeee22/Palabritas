// Aquí irá la lógica de validación de palabras y comparación de letras



// Valida la palabra ingresada con la palabra correcta
export function checkWord(guess, target) {
  const result = Array(guess.length).fill({ letter: "", status: "absent" });
  const targetLetters = target.split("");
  const guessLetters = guess.split("");
  // Paso 1: marcar letras correctas (verdes)
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = { letter: guessLetters[i], status: "correct" };
      targetLetters[i] = null; // eliminar esa letra del target
      guessLetters[i] = null; // evitar volver a contarla
    }
  }

  // Paso 2: marcar letras presentes (amarillas)
  for (let i = 0; i < guessLetters.length; i++) {
    const letter = guessLetters[i];
    if (letter && targetLetters.includes(letter)) {
      result[i] = { letter, status: "present" };
      targetLetters[targetLetters.indexOf(letter)] = null; // elimina una instancia
    } else if (letter) {
      result[i] = { letter, status: "absent" };
    }
  }

  return result;
}


export function isValid(word) {
  return words.includes(word.toUpperCase());
} 
  

 