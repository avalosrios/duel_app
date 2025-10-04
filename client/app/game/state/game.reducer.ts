import type { GameState } from '~/game/state/game.context';
import React, { createContext } from 'react';
import { produce } from 'immer';

export type GameContextAction =
  | {
      type: 'SET_PLAYER_COINS';
      payload: { playerID: number; coins: number };
    }
  | {
      type: 'SET_CURRENT_PLAYER';
      payload: { playerID: number };
    };

export function gameReducer(
  state: GameState,
  action: GameContextAction
): GameState {
  switch (action.type) {
    case 'SET_PLAYER_COINS': {
      return produce<GameState>(state, draft => {
        draft.players = draft.players.map(player => {
          if (player.playerID === action.payload.playerID) {
            player.coins = action.payload.coins;
          }
          return player;
        });
      });
    }
    case 'SET_CURRENT_PLAYER': {
      return produce<GameState>(state, draft => {
        draft.currentPlayer = draft.players.find(
          p => p.playerID === action.payload.playerID
        );
      });
    }
    default:
      return state;
  }
}

const DEFAULT_DISPATCH: React.ActionDispatch<
  [action: GameContextAction]
> = () => {};

export const GameDispatchContext = createContext(DEFAULT_DISPATCH);
