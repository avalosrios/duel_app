import { GAME_CONFIG } from './constants';

/**
 * Moves the conflict pawn based on shield delta
 * Pawn moves toward the player with fewer shields
 *
 * @param currentPosition Current pawn position (-9 to 9)
 * @param shields Number of shields to move (positive = right, negative = left)
 * @returns New pawn position (clamped to board bounds)
 */
export function movePawn(currentPosition: number, shields: number): number {
  const newPosition = currentPosition + shields;
  return Math.max(
    GAME_CONFIG.MIN_PAWN_POSITION,
    Math.min(GAME_CONFIG.MAX_PAWN_POSITION, newPosition)
  );
}

/**
 * Checks if pawn is in a player's capital (immediate military victory)
 *
 * @param position Current pawn position (-9 to 9)
 * @param playerSide Which player's capital to check
 * @returns True if pawn is in the specified player's capital
 */
export function isPawnInCapital(
  position: number,
  playerSide: 'start' | 'end'
): boolean {
  if (playerSide === 'start') {
    return position === GAME_CONFIG.MIN_PAWN_POSITION; // -9
  }
  return position === GAME_CONFIG.MAX_PAWN_POSITION; // 9
}

/**
 * Calculates military victory conditions
 *
 * @param pawnPosition Current pawn position (-9 to 9)
 * @returns Object with winner (player 1 or 2) and immediate flag
 */
export function calculateMilitaryVictory(pawnPosition: number): {
  winner: number | null;
  immediate: boolean;
} {
  // Pawn at -9: Player 2 wins (pawn invaded Player 1's capital)
  if (pawnPosition === GAME_CONFIG.MIN_PAWN_POSITION) {
    return { winner: 2, immediate: true };
  }

  // Pawn at 9: Player 1 wins (pawn invaded Player 2's capital)
  if (pawnPosition === GAME_CONFIG.MAX_PAWN_POSITION) {
    return { winner: 1, immediate: true };
  }

  // No immediate military victory
  return { winner: null, immediate: false };
}

/**
 * Calculates the shield delta between two players
 * Positive result means first player has more shields
 *
 * @param playerShields Number of shields for the current player
 * @param opponentShields Number of shields for the opponent
 * @returns Shield difference (positive or negative)
 */
export function getShieldDelta(
  playerShields: number,
  opponentShields: number
): number {
  return playerShields - opponentShields;
}

/**
 * Determines which player is on the weaker side militarily
 * Used for choosing who starts the next Age
 *
 * @param pawnPosition Current pawn position (-9 to 9)
 * @returns The player on the weaker side (1 or 2), or null if tied
 */
export function getWeakerPlayer(pawnPosition: number): number | null {
  if (pawnPosition === 0) {
    return null; // Perfectly balanced
  }
  // Pawn on negative side → Player 1 is weaker
  // Pawn on positive side → Player 2 is weaker
  return pawnPosition < 0 ? 1 : 2;
}
