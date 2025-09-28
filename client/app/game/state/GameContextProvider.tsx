import React, { type ReactNode, useMemo } from 'react';
import GameContext, { INITIAL_GAME_STATE } from '~/game/state/game.context';

interface Props {
  children: ReactNode;
}

export default function GameContextProvider({ children }: Props): ReactNode {
  const initialValue = useMemo(() => {
    return INITIAL_GAME_STATE;
  }, []);
  return <GameContext value={initialValue}>{children}</GameContext>;
}
