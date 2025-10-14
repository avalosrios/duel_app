import type { IBoardToken } from '~/game/types';

class Board {
  // TODO: Add a test
  /**
   * Shuffles the tokens and returns the shuffled array
   * @param tokens
   */
  public static shuffleTokens<T extends IBoardToken>(tokens: T[]): T[] {
    // randomly shuffle the tokens
    const shuffled = [...tokens];
    for (let i = 0; i < shuffled.length; i++) {
      const randomPos = Math.floor(Math.random() * tokens.length);
      // swap the tokens
      // this is the same as:
      // const temp = shuffled[i];
      // shuffled[i] = shuffled[randomPos];
      // shuffled[randomPos] = temp;
      [shuffled[i], shuffled[randomPos]] = [shuffled[randomPos], shuffled[i]];
    }
    return shuffled;
  }
}

export default Board;
