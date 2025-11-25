import type { GameStoreState, GameStoreAction, GameAction, BoardAction, SetupAction } from './types';
import { gameReducer, INITIAL_GAME_STATE } from './slices/game.slice';
import { boardReducer, INITIAL_BOARD_STATE } from './slices/board.slice';
import { setupReducer, INITIAL_SETUP_STATE } from './slices/setup.slice';

/**
 * Root reducer that combines all slices
 * Routes actions to appropriate slice based on type prefix (game/, board/, setup/)
 */

export const INITIAL_STORE_STATE: GameStoreState = {
  game: INITIAL_GAME_STATE,
  board: INITIAL_BOARD_STATE,
  setup: INITIAL_SETUP_STATE,
};

export function rootReducer(
  state: GameStoreState,
  action: GameStoreAction
): GameStoreState {
  // Route to game slice
  if (action.type.startsWith('game/')) {
    return {
      ...state,
      game: gameReducer(state.game, action as GameAction),
    };
  }

  // Route to board slice
  if (action.type.startsWith('board/')) {
    return {
      ...state,
      board: boardReducer(state.board, action as BoardAction),
    };
  }

  // Route to setup slice
  if (action.type.startsWith('setup/')) {
    return {
      ...state,
      setup: setupReducer(state.setup, action as SetupAction),
    };
  }

  // Unknown action - return unchanged state
  return state;
}
