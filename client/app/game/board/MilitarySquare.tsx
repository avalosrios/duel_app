import React from 'react';
import useBoardState from '~/game/hooks/useBoardState';
import type { BoardSpace } from '~/game/types';

interface Props {
  space: BoardSpace;
}

/**
 * A square on the military board, this can contain a military pawn token
 */
export default function MilitarySquare({ space }: Props): React.ReactNode {
  const { militaryContext } = useBoardState();
  const pawnPosition = militaryContext.conflictPawnPosition;
  const hasPawn = pawnPosition.x === space.position;
  const baseClass = 'flex flex-col self-center border-1 rounded-full';
  const hasPawnClass = hasPawn ? 'bg-red-500' : '';
  return (
    <div className={[baseClass, hasPawnClass].join(' ')}>{space.name}</div>
  );
}
