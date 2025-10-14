import React from 'react';
import Flexbox from '~/common/Flexbox';
import stylePadding from '~/common/stylePadding';
import type { TokenBoardSpace } from '~/game/types';
import useBoardState from '~/game/hooks/useBoardState';

const PROGRESS_TOKEN_COUNT = 5;
const BOARD_BASE: TokenBoardSpace[] = Array<TokenBoardSpace>(
  PROGRESS_TOKEN_COUNT
).fill({ type: 'progress', token: null });

export default function ProgressTokenGrid(): React.ReactNode {
  // draw the progress token count as it is default on the board
  return (
    <div className='flex gap-2 bg-emerald-700'>
      {BOARD_BASE.map((tokenSpace: TokenBoardSpace, idx: number) => (
        <ProgressTokenSpace key={idx} position={idx} />
      ))}
    </div>
  );
}

type ProgressTokenProps = {
  // tokenSpace: TokenBoardSpace;
  position: number;
};
function ProgressTokenSpace({ position }: ProgressTokenProps): React.ReactNode {
  const { progressTokens } = useBoardState();
  const targetToken = progressTokens[position] ?? null;
  const isTokenSet = targetToken?.isSet ?? false;
  return (
    <Flexbox
      className={[
        stylePadding.horiz['4'],
        'bg-emerald-500',
        'border-emerald-200',
        'rounded-full',
      ].join(' ')}
    >
      {isTokenSet ? targetToken.name : 'Empty'}
    </Flexbox>
  );
}
