import React from 'react';
import type { Wonder, WonderEffect } from '~/game/types';
import Flexbox from '~/common/Flexbox';
import Button from '~/common/Button';

interface Props {
  wonder: Wonder;
  pickedBy: number | null;
  canPick: boolean;
  onPick: (wonderId: string) => void;
}

function formatEffect(effect: WonderEffect): string {
  switch (effect.type) {
    case 'gainCoins':
      return `+${effect.amount} coins (${effect.target === 'self' ? 'you' : 'opponent'})`;
    case 'discardOpponentCard':
      return `Discard opponent's ${effect.cardColor} card`;
    case 'playAgain':
      return 'Play again';
    case 'militaryShields':
      return `+${effect.shields} shield${effect.shields !== 1 ? 's' : ''}`;
    case 'victoryPoints':
      return `+${effect.points} VP`;
    case 'resourceProduction':
      return `Produces: ${effect.resources.join(' / ')}`;
    case 'progressTokenChoice':
      return `Draw ${effect.draw} progress tokens, keep ${effect.keep}`;
    case 'buildFromDiscard':
      return 'Build a discarded card for free';
    default:
      return '';
  }
}

export default function WonderCard({
  wonder,
  pickedBy,
  canPick,
  onPick,
}: Props): React.ReactNode {
  const isPicked = pickedBy != null;

  return (
    <Flexbox
      direction='column'
      gap='2'
      className={[
        'border rounded-lg p-3 w-44 min-h-48 relative',
        isPicked
          ? 'border-gray-400 bg-gray-100 opacity-70'
          : 'border-gray-600 bg-white',
      ].join(' ')}
    >
      {/* Wonder name */}
      <p className='font-bold text-sm leading-tight'>{wonder.name}</p>

      {/* Effects list */}
      <Flexbox direction='column' gap='1' className='flex-1'>
        {wonder.effects.map((effect, i) => (
          <p key={i} className='text-xs text-gray-600'>
            {formatEffect(effect)}
          </p>
        ))}
      </Flexbox>

      {/* Pick button or picked badge */}
      {isPicked ? (
        <p className='text-xs font-semibold text-center text-gray-500 mt-1'>
          Player {pickedBy}
        </p>
      ) : (
        <Button
          size='compact'
          type='primary'
          label='Pick'
          isDisabled={!canPick}
          onClick={() => onPick(wonder.id)}
        />
      )}
    </Flexbox>
  );
}
