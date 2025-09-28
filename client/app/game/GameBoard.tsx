import React from 'react';
import Flexbox from '~/common/Flexbox';
import useBoardState from '~/game/hooks/useBoardState';
import ProgressTokenGrid from '~/game/board/ProgressTokenGrid';
import MilitaryGrid from '~/game/board/MilitaryGrid';
import stylePadding from '~/common/stylePadding';

export default function GameBoard(): React.ReactNode {
  const board = useBoardState();
  // TODO use the baord values to render the board
  return (
    <div className='@container/board flex flex-col gap-8 wrap-normal'>
      <Flexbox direction='row'>Game Board</Flexbox>
      <Flexbox direction='row'>
        <Flexbox justify='center' className={stylePadding.all(4)}>
          <ProgressTokenGrid />
        </Flexbox>
        <Flexbox justify='center'>
          <MilitaryGrid />
        </Flexbox>
      </Flexbox>
    </div>
  );
}
