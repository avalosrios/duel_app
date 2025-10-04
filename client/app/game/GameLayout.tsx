import React from 'react';
import { Outlet } from 'react-router';
import GameContextProvider from '~/game/state/GameContextProvider';
import BoardContextProvider from '~/game/state/BoardContextProvider';
import Page from '~/common/Page';
import Flexbox from '~/common/Flexbox';
import GameBoard from '~/game/GameBoard';

export default function GameLayout(): React.ReactNode {
  return (
    <GameContextProvider>
      <BoardContextProvider>
        <Page>
          {/* Parent Container */}
          <Flexbox
            direction='column'
            overflow='hidden'
            className={['h-full', 'rounded-lg', 'shadow-lg']}
          >
            {/* Sticky Top Section */}
            <div className='sticky top-0 p-6 shadow-md z-10'>
              <h1 className='text-2xl font-bold'>Duel Game</h1>
              <GameBoard />
            </div>
            {/* Scrollable Bottom Section */}
            <div className='flex-1 overflow-y-auto p-6'>
              <Outlet />
            </div>
          </Flexbox>
        </Page>
      </BoardContextProvider>
    </GameContextProvider>
  );
}
