import { Outlet } from 'react-router';
import React from 'react';
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
    <Flexbox direction='row'>
      {/* Outlet will render the child route */}
      <Outlet />
    </Flexbox>
  );
}
