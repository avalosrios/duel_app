import type { BoardContextState } from '~/game/state/board.context';
import { produce } from 'immer';
import React, { createContext, useContext } from 'react';
import type { MilitaryToken, ProgressToken } from '~/game/types';
import { PROGRESS_TOKENS } from '~/game/setup/constants';
import Board from '~/game/board/Board';
import { take } from 'lodash-es';

export type BoardContextAction =
  | {
      type: 'SET_CONFLICT_PAWN_POSITION';
      payload: { position: number };
    }
  | { type: 'INIT_MILITARY_TOKENS' }
  | {
      type: 'INIT_PROGRESS_TOKENS';
    };

const MILITARY_TOKEN_5: MilitaryToken = {
  coinPenalty: 5,
  position: 2, // Indicates the position from the center where the center is 0
  isSet: false,
};

const MILITARY_TOKEN_2: MilitaryToken = {
  coinPenalty: 2,
  position: 1, // Indicates the position from the center where the center is 0
  isSet: false,
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
    case 'INIT_MILITARY_TOKENS': {
      return produce<BoardContextState>(state, draft => {
        const boardStartTokens: MilitaryToken[] = [
          MILITARY_TOKEN_5,
          MILITARY_TOKEN_2,
        ].map(token => ({ ...token, isSet: true }));
        const boardEndTokens: MilitaryToken[] = [
          MILITARY_TOKEN_5,
          MILITARY_TOKEN_2,
        ].map(token => ({ ...token, isSet: true }));
        draft.militaryContext.militaryTokens.start = boardStartTokens;
        draft.militaryContext.militaryTokens.end = boardEndTokens;
      });
    }
    case 'INIT_PROGRESS_TOKENS': {
      return produce<BoardContextState>(state, draft => {
        const shuffledProgressTokens =
          Board.shuffleTokens<ProgressToken>(PROGRESS_TOKENS);
        draft.progressTokens = take(shuffledProgressTokens, 5).map(token => ({
          ...token,
          isSet: true,
        }));
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
