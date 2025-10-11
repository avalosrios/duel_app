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
    <>
      {/* Outlet will render the child route */}
      <Outlet />
    </>
  );
}
