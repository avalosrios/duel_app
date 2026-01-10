import React, { type ReactNode } from 'react';
import { Provider } from 'jotai';
import { gameStore } from '~/game/hooks/useGameStore';

interface Props {
  children: ReactNode;
}

export default function GameStoreProvider({ children }: Props): ReactNode {
  return <Provider store={gameStore}>{children}</Provider>;
}
