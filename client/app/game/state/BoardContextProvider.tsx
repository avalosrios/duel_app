import React, { type ReactNode, useMemo, useReducer } from 'react';
import BoardContext, { DEFAULT_BOARD_STATE } from '~/game/state/board.context';
import { BoardDispatchContext, boardReducer } from '~/game/state/board.reducer';

interface Props {
  children: ReactNode;
}

export default function BoardContextProvider({ children }: Props): ReactNode {
  const initialValue = useMemo(() => {
    return DEFAULT_BOARD_STATE;
  }, []);
  const [state, dispatch] = useReducer(boardReducer, initialValue);
  return (
    <BoardContext.Provider value={state}>
      <BoardDispatchContext value={dispatch}>{children}</BoardDispatchContext>
    </BoardContext.Provider>
  );
}
