import React from 'react';
import useBoardState from '~/game/hooks/useBoardState';
import type { ProgressToken } from '~/game/state/board.context';
import Flexbox from '~/common/Flexbox';
import stylePadding from '~/common/stylePadding';

const PROGRESS_TOKEN_COUNT = 5;
const BOARD_BASE: ProgressToken[] = Array<ProgressToken>(
  PROGRESS_TOKEN_COUNT
).fill({ isSet: false });

export default function ProgressTokenGrid(): React.ReactNode {
  const { progressTokens } = useBoardState();
  const boardSpaces = BOARD_BASE.map(
    (defaultToken: ProgressToken, idx: number) => {
      return progressTokens[idx] ?? defaultToken;
    }
  );
  // draw the progress token count as it is default on the board
  return (
    <div className='flex gap-2 bg-emerald-700'>
      {boardSpaces.map((token: ProgressToken, idx: number) => (
        <ProgressToken key={idx} token={token} />
      ))}
    </div>
  );
}

type ProgressTokenProps = {
  token: ProgressToken;
};
function ProgressToken({ token }: ProgressTokenProps): React.ReactNode {
  return (
    <Flexbox
      className={[
        stylePadding.horiz['4'],
        'bg-emerald-500',
        'border-emerald-200',
        'rounded-full',
      ].join(' ')}
    >
      {token.isSet ? token?.name : 'Empty'}
    </Flexbox>
  );
}
