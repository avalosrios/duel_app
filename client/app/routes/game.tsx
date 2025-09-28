import { Outlet } from 'react-router';
import React from 'react';
import GameStateDebug from '~/game/GameStateDebug';

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
        className='flex-col
align-items: baseline; px-8 py-8 mx-auto gap-8'
      >
        <div className='flex flex-row'>
          <h1>Duel Game</h1>
        </div>
        <div className='flex flex-row'>
          <GameStateDebug />
        </div>
        <div className='flex flex-row'>
          {/* Outlet will render the child route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
