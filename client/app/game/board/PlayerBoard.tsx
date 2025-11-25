import React from 'react';
import { useGameState } from '~/game/hooks/useGameStore';
import Flexbox from '~/common/Flexbox';
import type { Player } from '~/game/state/types';

export default function PlayerBoard(): React.ReactNode {
  const { players } = useGameState();
  return (
    <Flexbox direction='row' justify='around' gap='2' className='w-full'>
      {players.map((player: Player, idx: number) => (
        <Flexbox key={idx} direction='column'>
          Coins: {player.coins}
        </Flexbox>
      ))}
    </Flexbox>
  );
}
