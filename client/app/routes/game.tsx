import { Outlet } from 'react-router';
import React from 'react';

// {}: Route.MetaArgs
export function meta() {
  return [
    { title: 'Duel App Game' },
    { name: 'description', content: 'Actual game of Duel App!' },
  ];
}

export default function Game(): React.ReactNode {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1>Duel Game</h1>
      {/* Outlet will render the child route */}
      <Outlet />
    </div>
  );
}
