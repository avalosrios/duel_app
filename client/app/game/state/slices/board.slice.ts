import { produce } from 'immer';
import type { BoardState, BoardAction } from '../types';
import * as TokenEngine from '~/game/engine/token.engine';

/**
 * Board state slice - manages board state (military context, progress tokens)
 * Migrated from state/board.reducer.ts with board/ prefixed action types
 * Uses token.engine.ts for initialization logic
 */

export const INITIAL_BOARD_STATE: BoardState = {
  militaryContext: {
    conflictPawnPosition: { x: null },
    militaryTokens: {
      start: [],
      end: [],
    },
  },
  progressTokens: [],
};

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'board/SET_CONFLICT_PAWN_POSITION': {
      return produce<BoardState>(state, draft => {
        draft.militaryContext.conflictPawnPosition.x = action.payload.position;
      });
    }

    case 'board/INIT_MILITARY_TOKENS': {
      return produce<BoardState>(state, draft => {
        const tokens = TokenEngine.initializeMilitaryTokens();
        draft.militaryContext.militaryTokens.start = tokens.start;
        draft.militaryContext.militaryTokens.end = tokens.end;
      });
    }

    case 'board/INIT_PROGRESS_TOKENS': {
      return produce<BoardState>(state, draft => {
        draft.progressTokens = TokenEngine.initializeProgressTokens();
      });
    }

    default:
      return state;
  }
}
