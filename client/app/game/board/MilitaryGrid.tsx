import React from 'react';

interface BoardSpace {
  name: string;
  description: string;
  colSize: number;
}

interface BoardSquare {
  spaces: BoardSpace[];
  id: string;
}

const EMPTY_BOARD_SPACE: BoardSpace = {
  name: '',
  description: '',
  colSize: 1,
};

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
  const bottomRowSizes = [1, 3, 3, 2, 1, 2, 3, 3, 1];
  const linearBoard: BoardSquare[] = bottomRowSizes.map(item => {
    const spaces: BoardSpace[] = Array(item)
      .fill(EMPTY_BOARD_SPACE)
      .map((space: BoardSpace, idx: number) => {
        return {
          name: `N-${item + 1}`,
          description: `Space ${idx + 1}`,
          colSize: 1,
        };
      });
    return {
      spaces,
      id: `Square ${item}`,
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
  square: BoardSquare;
}

function BoardSquare({ square }: BoardSquareProps): React.ReactNode {
  // this should be a square with 2 rows
  return (
    <div className='flex flex-col gap-8 border-2 bg-amber-600'>
      <div className='flex flex-row gap-2 self-center'>
        {square.spaces.map((space, idx) => (
          <div
            key={idx}
            className='flex flex-col self-center border-1 rounded-full'
          >
            {space.name}
          </div>
        ))}
      </div>
      <div className='flex flex-row self-center'>{square.id}</div>
    </div>
  );
}
