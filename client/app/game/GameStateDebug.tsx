import React from 'react';
import useGameState from '~/game/hooks/useGameState';
import Flexbox from '~/common/Flexbox';

export default function GameStateDebug(): React.ReactNode {
  const { currentPlayer, players } = useGameState();
  return (
    <div className='container'>
      <Flexbox direction='row'>
        <b>Game State Debug</b>
      </Flexbox>
      <Flexbox direction='row' justify='around' gap='2' className='w-full'>
        <Flexbox direction='column'>
          Current Player: {currentPlayer?.name ?? 'None'}
        </Flexbox>
        <Flexbox direction='column'>
          Players: {players.map(player => player.name).join(', ')}
        </Flexbox>
      </Flexbox>
    </div>
  );
}
