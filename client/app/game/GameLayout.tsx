import React from 'react';
import { Outlet } from 'react-router';
import GameContextProvider from '~/game/state/GameContextProvider';
import BoardContextProvider from '~/game/state/BoardContextProvider';

export default function GameLayout(): React.ReactNode {
  return (
    <GameContextProvider>
      <BoardContextProvider>
        <Outlet />
      </BoardContextProvider>
    </GameContextProvider>
  );
}
