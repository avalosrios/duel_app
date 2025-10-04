import React, { type ReactNode, useMemo, useReducer } from 'react';
import GameContext, { INITIAL_GAME_STATE } from '~/game/state/game.context';
import { GameDispatchContext, gameReducer } from '~/game/state/game.reducer';

interface Props {
  children: ReactNode;
}
export default function GameContextProvider({ children }: Props): ReactNode {
  const initialValue = useMemo(() => {
    return INITIAL_GAME_STATE;
  }, []);
  const [state, dispatch] = useReducer(gameReducer, initialValue);
  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}
