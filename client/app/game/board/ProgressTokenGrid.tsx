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
    <div className='grid grid-cols-5'>
      {boardSpaces.map((token: ProgressToken, idx: number) => (
        <ProgressToken key={idx} token={token} />
      ))}
    </div>
  );
}

type ProgressTokenProps = {
  token: ProgressToken;
};
function ProgressToken({ token }: ProgressTokenProps) {
  return (
    <Flexbox className={stylePadding.horiz(4)}>
      {token.isSet ? token?.name : 'Empty'}
    </Flexbox>
  );
}
