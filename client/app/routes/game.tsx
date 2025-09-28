import { Outlet } from 'react-router';
import React from 'react';
import GameStateDebug from '~/game/GameStateDebug';
import GameBoard from '~/game/GameBoard';
import Flexbox from '~/common/Flexbox';

// {}: Route.MetaArgs
export function meta() {
  return [
    { title: 'Duel App Game' },
    { name: 'description', content: 'Actual game of Duel App!' },
  ];
}

export default function Game(): React.ReactNode {
  return (
    <div className='@container/main flex-row gap-8'>
      <div
        className='flex flex-col
align-items: baseline; px-8 py-8 mx-auto gap-8'
      >
        <Flexbox direction='row'>
          <h1>Duel Game</h1>
        </Flexbox>
        <Flexbox direction='row'>
          <GameStateDebug />
        </Flexbox>
        <Flexbox direction='row'>
          <GameBoard />
        </Flexbox>
        <Flexbox direction='row'>
          {/* Outlet will render the child route */}
          <Outlet />
        </Flexbox>
      </div>
    </div>
  );
}
