import React, { useCallback } from 'react';
import Flexbox from '~/common/Flexbox';
import stylePadding from '~/common/stylePadding';
import SetupStepContent from '~/game/setup/SetupStepContent';

export type SetupAction =
  | 'setup_coins'
  | 'place_conflict_pawn'
  | 'setup_wonders'
  | 'setup_decks'
  | 'setup_ages';

export interface ISetupStep {
  name: string;
  description: string;
  next?: string; // Name of the next step
  action?: SetupAction; // This should be a dispatcher action
  substeps?: ISetupStep[];
}

interface Props {
  step: ISetupStep;
  children?: React.ReactNode;
  onCompleteAction?: (action: SetupAction) => void;
}

export default function SetupStep({
  step,
  onCompleteAction,
}: Props): React.ReactNode {
  const substeps = step.substeps ?? [];
  const handleOnComplete = useCallback(() => {
    if (step.action != null) {
      onCompleteAction?.(step.action);
    }
  }, [onCompleteAction, step.action]);
  return (
    <Flexbox direction='column' className={[stylePadding.all['4']]}>
      <Flexbox direction='column' className={'ms-4'}>
        <h2 className='text font-bold mb-2'>{step.name}</h2>
        <SetupStepContent step={step} onClickAction={handleOnComplete} />
      </Flexbox>
      {substeps.map((substep: ISetupStep, idx: number) => (
        <Flexbox
          key={idx}
          direction='row'
          gap='4'
          className={stylePadding.all['4']}
        >
          <SetupStep step={substep} />
        </Flexbox>
      ))}
    </Flexbox>
  );
}
