import type {
  IBoardToken,
  MilitaryToken,
  ProgressToken,
  VictoryPoints,
} from '~/game/types';
import { GAME_CONFIG, MILITARY_TOKENS, PROGRESS_TOKENS } from './constants';

/**
 * Shuffles an array of tokens using Fisher-Yates algorithm
 * Extracted from board/Board.ts
 *
 * @param tokens Array of tokens to shuffle
 * @returns New array with shuffled tokens
 */
export function shuffleTokens<T extends IBoardToken>(tokens: T[]): T[] {
  const shuffled = [...tokens];
  for (let i = 0; i < shuffled.length; i++) {
    const randomPos = Math.floor(Math.random() * tokens.length);
    // Swap tokens using array destructuring
    [shuffled[i], shuffled[randomPos]] = [shuffled[randomPos], shuffled[i]];
  }
  return shuffled;
}

/**
 * Selects N random tokens from a list
 *
 * @param tokens Array of tokens to select from
 * @param count Number of tokens to select
 * @returns Array of randomly selected tokens
 */
export function selectRandomTokens<T extends IBoardToken>(
  tokens: T[],
  count: number
): T[] {
  const shuffled = shuffleTokens(tokens);
  return shuffled.slice(0, count);
}

/**
 * Finds the military token for a given victory point square
 * Extracted from board/MilitaryVictoryPointSquare.tsx (lines 10-21)
 *
 * Rule: VP 10 → position 2, VP 5 → position 1
 *
 * @param tokens Array of military tokens to search
 * @param victoryPoints Victory points of the square
 * @returns Matching military token or null
 */
export function findMilitaryToken(
  tokens: MilitaryToken[],
  victoryPoints: VictoryPoints
): MilitaryToken | null {
  // Only 5 and 10 VP squares have military tokens
  if (victoryPoints === 0 || victoryPoints % 5 !== 0) {
    return null;
  }

  // Convert VP to token position: 10 VP → position 2, 5 VP → position 1
  const position = victoryPoints / 5;
  return tokens.find(token => token.position === position) ?? null;
}

/**
 * Initializes military tokens for both start and end of the board
 * Extracted from state/board.reducer.ts (INIT_MILITARY_TOKENS case)
 *
 * Each side gets:
 * - 1 token with coin penalty 5 at position 2 (10 VP square)
 * - 1 token with coin penalty 2 at position 1 (5 VP square)
 *
 * @returns Object with start and end military token arrays
 */
export function initializeMilitaryTokens(): {
  start: MilitaryToken[];
  end: MilitaryToken[];
} {
  const boardStartTokens: MilitaryToken[] = [
    { ...MILITARY_TOKENS.TOKEN_5, isSet: true },
    { ...MILITARY_TOKENS.TOKEN_2, isSet: true },
  ];

  const boardEndTokens: MilitaryToken[] = [
    { ...MILITARY_TOKENS.TOKEN_5, isSet: true },
    { ...MILITARY_TOKENS.TOKEN_2, isSet: true },
  ];

  return { start: boardStartTokens, end: boardEndTokens };
}

/**
 * Initializes 5 random progress tokens from the pool of 10
 * Extracted from state/board.reducer.ts (INIT_PROGRESS_TOKENS case)
 *
 * @returns Array of 5 randomly selected progress tokens with isSet = true
 */
export function initializeProgressTokens(): ProgressToken[] {
  return selectRandomTokens(
    PROGRESS_TOKENS,
    GAME_CONFIG.MAX_PROGRESS_TOKENS
  ).map(token => ({
    ...token,
    isSet: true,
  }));
}
