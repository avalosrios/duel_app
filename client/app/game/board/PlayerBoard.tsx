import React from 'react';
import useGameState from '~/game/hooks/useGameState';
import Flexbox from '~/common/Flexbox';

export default function PlayerBoard(): React.ReactNode {
  const { players } = useGameState();
  return (
    <Flexbox direction='row' justify='around' gap='2' className='w-full'>
      {players.map((player, idx) => (
        <Flexbox key={idx} direction='column'>
          Coins: {player.coins}
        </Flexbox>
      ))}
    </Flexbox>
  );
}
