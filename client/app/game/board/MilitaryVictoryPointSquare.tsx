import React, { useMemo } from 'react';
import Flexbox from '~/common/Flexbox';
import type { IBoardSquare, MilitaryToken } from '~/game/types';
import { useBoardState } from '~/game/hooks/useGameStore';
import * as TokenEngine from '~/game/engine/token.engine';

interface Props {
  square: IBoardSquare;
}

export default function MilitaryVictoryPointSquare({
  square,
}: Props): React.ReactNode {
  const { militaryContext } = useBoardState();
  const { militaryTokens } = militaryContext;

  // Find military token for this square using engine module
  const militaryToken = useMemo(() => {
    const tokenList = militaryTokens[square.position];
    return TokenEngine.findMilitaryToken(tokenList, square.victoryPoints);
  }, [militaryTokens, square.position, square.victoryPoints]);

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
