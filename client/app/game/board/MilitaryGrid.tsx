import React from 'react';
import MilitarySquare from '~/game/board/MilitarySquare';
import MilitaryVictoryPointSquare from '~/game/board/MilitaryVictoryPointSquare';
import type { BoardSpace, IBoardSquare, VictoryPoints } from '~/game/types';

const EMPTY_BOARD_SPACE: BoardSpace = {
  name: '',
  description: '',
  colSize: 1,
  position: 0,
};

interface Row {
  size: number;
  points: VictoryPoints;
}

export default function MilitaryGrid(): React.ReactNode {
  // 2 rows
  // Upper row with 19 columns
  // Lower row with 9 columns
  /**
   * The board should look like this:
   * Where C is the capital city and the middle is a single space.
   * VP = Victory Points (value)
   *
   * | C | Zone 1 (3 spaces) | Zone 2 (3 spaces) | Zone 3 (2 spaces) | Middle | Zone 4 (2 spaces) | Zone 5 (3 spaces) | Zone 6 (3 spaces) | C |
   * | X | TOKEN / VP        | TOKEN / VP       | TOKEN / VP         | SPACE  | TOKEN / VP       | TOKEN / VP       | TOKEN / VP       | X |
   *
   */
  const bottomRowSizes: Row[] = [
    { size: 1, points: 0 },
    { size: 3, points: 10 },
    { size: 3, points: 5 },
    { size: 2, points: 2 },
    { size: 1, points: 0 },
    { size: 2, points: 2 },
    { size: 3, points: 5 },
    { size: 3, points: 10 },
    { size: 1, points: 0 },
  ];
  let totalSpaces =
    (bottomRowSizes.reduce<number>(
      (acc: number, { size }) => acc + size,
      -1 // because we don't want to count the middle space
    ) *
      -1) /
    2;
  const linearBoard: IBoardSquare[] = bottomRowSizes.map(({ size, points }) => {
    const spaces: BoardSpace[] = Array(size)
      .fill(EMPTY_BOARD_SPACE)
      .map((space: BoardSpace, idx: number) => {
        return {
          name: `N-${size + 1}`,
          description: `Space ${idx + 1}`,
          colSize: 1,
          position: totalSpaces++,
        };
      });
    return {
      spaces,
      id: `Square ${size}`,
      victoryPoints: points,
      position: totalSpaces < 0 ? 'start' : 'end',
    };
  });
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
