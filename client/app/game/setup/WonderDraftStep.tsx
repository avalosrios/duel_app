import React, { useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import type { ISetupStep } from '~/game/setup/SetupStep';
import type { SetupActionType } from '~/game/state/types';
import {
  draftStateAtom,
  draftCurrentPickerAtom,
  isDraftRoundCompleteAtom,
  pickWonderAtom,
} from '~/game/state/draftAtoms';
import Flexbox from '~/common/Flexbox';
import Button from '~/common/Button';
import WonderCard from '~/game/setup/WonderCard';
import useDispatchSetupAction from '~/game/hooks/useDispatchSetupAction';

interface Props {
  step: ISetupStep;
  round: 1 | 2;
}

export default function WonderDraftStep({
  step,
  round,
}: Props): React.ReactNode {
  const draftState = useAtomValue(draftStateAtom);
  const currentPicker = useAtomValue(draftCurrentPickerAtom);
  const isRoundComplete = useAtomValue(isDraftRoundCompleteAtom)(round);
  const pickWonder = useSetAtom(pickWonderAtom);
  const executeSetupAction = useDispatchSetupAction();

  const action = step.action as SetupActionType;

  const handleStartDraft = useCallback(() => {
    executeSetupAction(action);
  }, [executeSetupAction, action]);

  const handlePick = useCallback(
    (wonderId: string) => {
      pickWonder({ wonderId, round });
    },
    [pickWonder, round]
  );

  // Show "Start Draft" button until this round is the active one
  if (draftState.activeRound !== round) {
    return (
      <Flexbox direction='column' gap='4'>
        <p className='text-sm text-gray-600'>{step.description}</p>
        <Button label='Start Draft' type='primary' onClick={handleStartDraft} />
      </Flexbox>
    );
  }

  return (
    <Flexbox direction='column' gap='4'>
      {/* Status bar */}
      {isRoundComplete ? (
        <p className='text-sm font-semibold text-green-700'>
          Round {round} complete!
        </p>
      ) : (
        <p className='text-sm font-semibold'>
          Player {currentPicker}&apos;s turn to pick
          {' '}
          <span className='text-gray-500 font-normal'>
            (pick {draftState.pickIndex + 1} of {draftState.pickOrder.length})
          </span>
        </p>
      )}

      {/* Wonder cards */}
      <Flexbox direction='row' gap='3' wrap='wrap'>
        {draftState.visibleWonders.map(entry => (
          <WonderCard
            key={entry.wonder.id}
            wonder={entry.wonder}
            pickedBy={entry.pickedBy}
            canPick={!isRoundComplete && entry.pickedBy == null}
            onPick={handlePick}
          />
        ))}
      </Flexbox>
    </Flexbox>
  );
}
