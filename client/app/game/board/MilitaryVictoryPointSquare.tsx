import React, { useMemo } from 'react';
import Flexbox from '~/common/Flexbox';
import type { IBoardSquare } from '~/game/types';
import useBoardState from '~/game/hooks/useBoardState';
import type { MilitaryToken } from '~/game/state/board.context';

interface Props {
  square: IBoardSquare;
}

function findTargetToken(
  tokens: MilitaryToken[],
  square: IBoardSquare
): MilitaryToken | null {
  if (square.victoryPoints === 0 || square.victoryPoints % 5 !== 0) {
    return null;
  }
  // for the victory points == 10, it should set the Military Token in position 2
  // for the victory points == 5, it should set the Military Token in position 1
  const position = square.victoryPoints / 5;
  return tokens.find(token => token.position === position) ?? null;
}

export default function MilitaryVictoryPointSquare({
  square,
}: Props): React.ReactNode {
  // for the victory points == 10, it should set the Military Token in position 2
  // for the victory points == 5, it should set the Military Token in position 1
  const { militaryContext } = useBoardState();
  const { militaryTokens } = militaryContext;
  // now we need to know if the square is on the start or end of the board
  const militaryToken = useMemo(() => {
    const tokenList = militaryTokens[square.position];
    return findTargetToken(tokenList, square);
  }, [militaryTokens, square]);
  const hasMilitaryToken = militaryToken != null;
  return (
    <>
      <div className='flex flex-row self-center'>{square.id}</div>
      {hasMilitaryToken ? (
        <MilitaryTokenPiece token={militaryToken} />
      ) : (
        <VictoryPointSquare square={square} />
      )}
    </>
  );
}
interface VictoryPointSquareProps {
  square: IBoardSquare;
}
function VictoryPointSquare({
  square,
}: VictoryPointSquareProps): React.ReactNode {
  if (square.victoryPoints === 0) {
    return null;
  }
  return (
    <Flexbox
      alignItems='center'
      className={['bg-emerald-500', 'self-center', 'w-1/2']}
    >
      {square.victoryPoints}
    </Flexbox>
  );
}

interface MilitaryTokenProps {
  token: MilitaryToken;
}
function MilitaryTokenPiece({ token }: MilitaryTokenProps): React.ReactNode {
  if (!token.isSet) {
    return null;
  }
  return <Flexbox className={['bg-red-600']}>{token.coinPenalty}</Flexbox>;
}
