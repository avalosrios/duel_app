import React from 'react';
import Flexbox from '~/common/Flexbox';
import ProgressTokenGrid from '~/game/board/ProgressTokenGrid';
import MilitaryGrid from '~/game/board/MilitaryGrid';
import stylePadding from '~/common/stylePadding';

export default function GameBoard(): React.ReactNode {
  return (
    <div className='container flex flex-col gap-8 wrap-normal'>
      <Flexbox direction='row'>Game Board</Flexbox>
      <Flexbox direction='column'>
        <Flexbox
          direction='row'
          justify='center'
          className={stylePadding.all(4)}
        >
          <ProgressTokenGrid />
        </Flexbox>
        <Flexbox direction='row' justify='center'>
          <MilitaryGrid />
        </Flexbox>
      </Flexbox>
    </div>
  );
}
