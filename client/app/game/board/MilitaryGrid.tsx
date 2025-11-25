import React from 'react';
import MilitarySquare from '~/game/board/MilitarySquare';
import MilitaryVictoryPointSquare from '~/game/board/MilitaryVictoryPointSquare';
import type { IBoardSquare } from '~/game/types';
import * as BoardEngine from '~/game/engine/board.engine';

export default function MilitaryGrid(): React.ReactNode {
  // Generate board layout using engine module
  const linearBoard: IBoardSquare[] = BoardEngine.generateBoardLayout();

  return (
    <div className='flex flex-row w-full justify-center'>
      {linearBoard.map((square, idx) => (
        <BoardSquare key={idx} square={square} />
      ))}
    </div>
  );
}

interface BoardSquareProps {
  square: IBoardSquare;
}

function BoardSquare({ square }: BoardSquareProps): React.ReactNode {
  return (
    <div className='flex flex-col gap-8 border-2 bg-amber-600'>
      <div className='flex flex-row self-center'>
        {square.spaces.map((space, idx) => (
          <MilitarySquare key={idx} space={space} />
        ))}
      </div>
      <MilitaryVictoryPointSquare square={square} />
    </div>
  );
}
