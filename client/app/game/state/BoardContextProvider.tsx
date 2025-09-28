import React, { type ReactNode, useMemo } from 'react';
import BoardContext, { DEFAULT_BOARD_STATE } from '~/game/state/board.context';

interface Props {
  children: ReactNode;
}

export default function BoardContextProvider({ children }: Props): ReactNode {
  const initialValue = useMemo(() => {
    return DEFAULT_BOARD_STATE;
  }, []);
  return (
    <BoardContext.Provider value={initialValue}>
      {children}
    </BoardContext.Provider>
  );
}
