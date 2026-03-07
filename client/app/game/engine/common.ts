/**
 * Shuffles an array of elements using Fisher-Yates algorithm
 *
 * @param array Array of tokens to shuffle
 * @returns New array with shuffled tokens
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i >= 1; i--) {
    const randomPos = Math.floor(Math.random() * (i + 1));
    // swap the random Roll element with the current element in i
    const temp = shuffled[randomPos];
    shuffled[randomPos] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled;
}

export function selectNShuffled<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}
