import type { BoardContextState } from '~/game/state/board.context';
import { produce } from 'immer';
import React, { createContext, useContext } from 'react';

export type BoardContextAction = {
  type: 'SET_CONFLICT_PAWN_POSITION';
  payload: { position: number };
};

export function boardReducer(
  state: BoardContextState,
  action: BoardContextAction
): BoardContextState {
  switch (action.type) {
    case 'SET_CONFLICT_PAWN_POSITION': {
      return produce<BoardContextState>(state, draft => {
        draft.militaryContext.conflictPawnPosition.x = action.payload.position;
      });
    }
    default:
      return state;
  }
}

const DEFAULT_DISPATCH: React.ActionDispatch<
  [action: BoardContextAction]
> = () => {};

export const BoardDispatchContext = createContext(DEFAULT_DISPATCH);

export function useBoardDispatch() {
  return useContext(BoardDispatchContext);
}
