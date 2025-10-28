// Aquí irá la lógica de validación de palabras y comparación de letras
export function checkWord(input, target) {
  // Ejemplo: retorna array con estados de letras (correcta, posición, incorrecta)
  return input.split("").map((letter, i) => {
    if (letter === target[i]) return "correct";
    if (target.includes(letter)) return "present";
    return "absent";
  });
}
