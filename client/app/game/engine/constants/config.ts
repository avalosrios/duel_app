/**
 * Core game configuration constants
 * Consolidated from:
 * - hooks/useGameDispatchSetup.ts (INITIAL_COINS, INITIAL_CONFLICT_PAWN_POSITION)
 * - board/ProgressTokenGrid.tsx (PROGRESS_TOKEN_COUNT)
 */
export const GAME_CONFIG = {
  INITIAL_COINS: 7,
  INITIAL_CONFLICT_PAWN_POSITION: 0,
  MAX_PLAYERS: 2,
  MAX_PROGRESS_TOKENS: 5,
  TOTAL_WONDERS: 7,
  MIN_PAWN_POSITION: -9,
  MAX_PAWN_POSITION: 9,
} as const;
