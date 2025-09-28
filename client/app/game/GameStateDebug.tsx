import React from 'react';
import useGameState from '~/game/hooks/useGameState';

export default function GameStateDebug(): React.ReactNode {
  const { currentPlayer, players } = useGameState();
  return (
    <div className='flex flex-col px-4'>
      <div className='flex flex-row'>
        <b>Game State Debug</b>
      </div>
      <div className='flex flex-col p-4'>
        <div className='flex flex-row'>
          Current Player: {currentPlayer?.name}
        </div>
        <div className='flex flex-row'>
          Players: {players.map(player => player.name).join(', ')}
        </div>
      </div>
    </div>
  );
}
