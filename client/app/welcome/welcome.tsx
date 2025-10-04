import React from 'react';
import { NavLink } from 'react-router';

export function Welcome(): React.ReactNode {
  return (
    <main className='flex items-center justify-center pt-16 pb-4'>
      <div className='flex-1 flex flex-col items-center gap-16 min-h-0'>
        <header className='flex flex-col items-center gap-9'>Duel App</header>
        <div className='max-w-[300px] w-full space-y-6 px-4'>
          <nav className='rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4'>
            <p className='leading-6 text-gray-700 dark:text-gray-200 text-center'>
              What&apos;s next?
            </p>
            <NavLink
              to='/game'
              style={({ isActive, isPending, isTransitioning }) => {
                return {
                  fontWeight: isActive ? 'bold' : '',
                  color: isPending ? 'red' : 'green',
                  viewTransitionName: isTransitioning ? 'slide' : '',
                };
              }}
            >
              Game
            </NavLink>
          </nav>
        </div>
      </div>
    </main>
  );
}
