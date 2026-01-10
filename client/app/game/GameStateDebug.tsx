import React from 'react';
import { useGameState } from '~/game/hooks/useGameStore';
import Flexbox from '~/common/Flexbox';
import type { Player } from '~/game/state/types';

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
          Players: {players.map((player: Player) => player.name).join(', ')}
        </Flexbox>
      </Flexbox>
    </div>
  );
}
