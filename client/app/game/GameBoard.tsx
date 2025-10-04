import React from 'react';
import Flexbox from '~/common/Flexbox';
import ProgressTokenGrid from '~/game/board/ProgressTokenGrid';
import MilitaryGrid from '~/game/board/MilitaryGrid';
import stylePadding from '~/common/stylePadding';
import PlayerBoard from '~/game/board/PlayerBoard';
import GameStateDebug from '~/game/GameStateDebug';

export default function GameBoard(): React.ReactNode {
  return (
    <div className='container'>
      <GameStateDebug />
      <Flexbox direction='row' justify='center' className={stylePadding.all(4)}>
        <ProgressTokenGrid />
      </Flexbox>
      <Flexbox direction='row' justify='center'>
        <MilitaryGrid />
      </Flexbox>
      <Flexbox direction='row' justify='center'>
        <PlayerBoard />
      </Flexbox>
    </div>
  );
}
