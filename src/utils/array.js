/**
 * Array Utilities
 * Funções reutilizáveis para manipulação de arrays
 */

/**
 * Embaralha um array usando Fisher-Yates
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Embaralha até que seja diferente do original
 * Útil para evitar que a ordem embaralhada seja igual à correta
 */
export function shuffleUntilDifferent(array) {
  const original = JSON.stringify(array.map(i => i.id));
  let shuffled = shuffleArray(array);
  let attempts = 0;
  while (JSON.stringify(shuffled.map(i => i.id)) === original && attempts < 10) {
    shuffled = shuffleArray(array);
    attempts++;
  }
  return shuffled;
}
