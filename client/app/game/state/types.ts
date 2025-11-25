import type { MilitaryToken, ProgressToken } from '~/game/types';

/**
 * Unified state and action types for the game store
 * Consolidates types from game.context.ts, board.context.ts, and setup.context.ts
 */

// ============================================
// PLAYER & GAME STATE TYPES
// ============================================

export interface Player {
  playerID: number;
  name?: string;
  coins: number;
}

export interface GameState {
  players: Player[]; // Max 2 players
  currentPlayer: Player | null;
}

// ============================================
// BOARD STATE TYPES
// ============================================

export interface BoardMilitaryState {
  conflictPawnPosition: { x: number | null }; // Range: -9 to 9
  militaryTokens: {
    start: MilitaryToken[]; // Military tokens at board start
    end: MilitaryToken[]; // Military tokens at board end
  };
}

export interface BoardState {
  militaryContext: BoardMilitaryState;
  progressTokens: ProgressToken[]; // Max 5 progress tokens
}

// ============================================
// SETUP STATE TYPES
// ============================================

export type SetupActionType =
  | 'setup_coins'
  | 'place_conflict_pawn'
  | 'place_military_tokens'
  | 'place_progress_tokens'
  | 'setup_wonders'
  | 'setup_decks'
  | 'setup_ages';

export interface SetupState {
  stepHistory: string[]; // Stack of visited step names
  pendingActions: SetupActionType[]; // Actions that need to be completed
  isComplete: boolean; // Whether setup is finished
}

// ============================================
// UNIFIED GAME STORE STATE
// ============================================

export interface GameStoreState {
  game: GameState;
  board: BoardState;
  setup: SetupState;
}

// ============================================
// GAME ACTION TYPES
// ============================================

export type GameAction =
  | {
      type: 'game/SET_PLAYER_COINS';
      payload: { playerID: number; coins: number };
    }
  | {
      type: 'game/INIT_ALL_PLAYER_COINS';
      payload: { coins: number };
    }
  | {
      type: 'game/SET_CURRENT_PLAYER';
      payload: { playerID: number };
    };

// ============================================
// BOARD ACTION TYPES
// ============================================

export type BoardAction =
  | {
      type: 'board/SET_CONFLICT_PAWN_POSITION';
      payload: { position: number };
    }
  | { type: 'board/INIT_MILITARY_TOKENS' }
  | { type: 'board/INIT_PROGRESS_TOKENS' };

// ============================================
// SETUP ACTION TYPES
// ============================================

export type SetupAction =
  | {
      type: 'setup/SET_CURRENT_STEP';
      payload: { step: string };
    }
  | {
      type: 'setup/COMPLETE_ACTION';
      payload: { action: SetupActionType };
    }
  | { type: 'setup/MARK_COMPLETE' };

// ============================================
// UNIFIED ACTION TYPE
// ============================================

export type GameStoreAction = GameAction | BoardAction | SetupAction;
