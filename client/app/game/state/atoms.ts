import { atom } from 'jotai';
import type { Player, GameState, BoardState } from './types';
import type { IBoardSquare, MilitaryToken, ProgressToken } from '~/game/types';
import * as BoardEngine from '~/game/engine/board.engine';

/**
 * Jotai atoms for game state management
 */

// ============================================
// HELPER FUNCTIONS
// ============================================

function getInitialPlayer(id: number): Player {
  return {
    playerID: id,
    coins: 0,
    name: `Player ${id}`,
  };
}

// ============================================
// GAME STATE ATOMS
// ============================================

/**
 * Players array - max 2 players
 */
export const playersAtom = atom<Player[]>([
  getInitialPlayer(1),
  getInitialPlayer(2),
]);

/**
 * Current player - derived from players array based on playerID
 */
export const currentPlayerIdAtom = atom<number | null>(null);

/**
 * Derived atom - gets the current player object
 */
export const currentPlayerAtom = atom(get => {
  const playerId = get(currentPlayerIdAtom);
  const players = get(playersAtom);
  return players.find(p => p.playerID === playerId) ?? null;
});

/**
 * Derived atom - gets full game state (for compatibility)
 */
export const gameStateAtom = atom<GameState>(
  get =>
    ({
      players: get(playersAtom),
      currentPlayer: get(currentPlayerAtom),
    }) as GameState
);

// ============================================
// GAME ACTION ATOMS (write-only)
// ============================================

/**
 * Sets coins for a specific player
 */
export const setPlayerCoinsAtom = atom(
  null,
  (get, set, payload: { playerID: number; coins: number }) => {
    const players = get(playersAtom);
    set(
      playersAtom,
      players.map(player =>
        player.playerID === payload.playerID
          ? { ...player, coins: payload.coins }
          : player
      )
    );
  }
);

/**
 * Sets the current player by ID
 */
export const setCurrentPlayerAtom = atom(null, (get, set, playerID: number) => {
  set(currentPlayerIdAtom, playerID);
});

// ============================================
// BOARD STATE ATOMS
// ============================================

/**
 * Conflict pawn position on x-axis (-9 to 9)
 */
export const conflictPawnPositionAtom = atom<number | null>(null);

/**
 * Military tokens at board start and end
 */
export const militaryTokensAtom = atom<{
  start: MilitaryToken[];
  end: MilitaryToken[];
}>({
  start: [],
  end: [],
});

/**
 * Progress tokens (max 5)
 */
export const progressTokensAtom = atom<ProgressToken[]>([]);

/**
 * Board layout - 9 squares with spaces, victory points, and positions
 */
const boardLayoutDefault = BoardEngine.generateBoardLayout();
export const boardLayoutAtom = atom<IBoardSquare[]>(boardLayoutDefault);

/**
 * Derived atom - gets full board state (for compatibility)
 */
export const boardStateAtom = atom<BoardState>(get => ({
  militaryContext: {
    conflictPawnPosition: { x: get(conflictPawnPositionAtom) },
    militaryTokens: get(militaryTokensAtom),
  },
  progressTokens: get(progressTokensAtom),
  boardLayout: get(boardLayoutAtom),
}));

// ============================================
// BOARD ACTION ATOMS (write-only)
// ============================================

/**
 * Sets conflict pawn position
 */
export const setConflictPawnPositionAtom = atom(
  null,
  (get, set, position: number) => {
    set(conflictPawnPositionAtom, position);
  }
);
