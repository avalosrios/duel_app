import { produce } from 'immer';
import type { GameState, GameAction, Player } from '../types';

/**
 * Game state slice - manages player state (coins, names, current player)
 * Migrated from state/game.reducer.ts with game/ prefixed action types
 */

function getInitialPlayer(id: number): Player {
  return {
    playerID: id,
    coins: 0,
    name: `Player ${id}`,
  };
}

export const INITIAL_GAME_STATE: GameState = {
  players: [getInitialPlayer(1), getInitialPlayer(2)],
  currentPlayer: null,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'game/SET_PLAYER_COINS': {
      return produce<GameState>(state, draft => {
        draft.players = draft.players.map(player => {
          if (player.playerID === action.payload.playerID) {
            player.coins = action.payload.coins;
          }
          return player;
        });
      });
    }

    case 'game/INIT_ALL_PLAYER_COINS': {
      return produce<GameState>(state, draft => {
        draft.players = draft.players.map(player => {
          player.coins = action.payload.coins;
          return player;
        });
      });
    }

    case 'game/SET_CURRENT_PLAYER': {
      return produce<GameState>(state, draft => {
        draft.currentPlayer =
          draft.players.find(p => p.playerID === action.payload.playerID) ?? null;
      });
    }

    default:
      return state;
  }
}
