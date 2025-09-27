import type { Route } from '~router/app/+types/root';
import { Outlet } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Duel App Game' },
    { name: 'description', content: 'Actual game of Duel App!' },
  ];
}

export default function Game() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1>Duel Game</h1>
      {/* Outlet will render the child route */}
      <Outlet />
    </div>
  );
}
