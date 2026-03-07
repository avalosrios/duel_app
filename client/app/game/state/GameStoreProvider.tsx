import React, { type ReactNode } from 'react';
import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import css from 'jotai-devtools/styles.css?inline';
import { gameStore } from '~/game/hooks/useGameStore';

interface Props {
  children: ReactNode;
}

const JotaiDevTools = ({ store }: { store: typeof gameStore }) =>
  process.env.NODE_ENV !== 'production' ? (
    <>
      <style>{css}</style>
      <DevTools store={store} />
    </>
  ) : null;

export default function GameStoreProvider({ children }: Props): ReactNode {
  return (
    <Provider store={gameStore}>
      {children}
      <JotaiDevTools store={gameStore} />
    </Provider>
  );
}
