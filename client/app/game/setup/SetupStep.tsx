import React from 'react';
import Flexbox from '~/common/Flexbox';
import stylePadding from '~/common/stylePadding';
import { capitalize } from 'lodash-es';
import Button from '~/common/Button';
import useGameSetupPlayerCoins from '~/game/hooks/useGameSetupPlayerCoins';

type SetupAction =
  | 'setup_coins'
  | 'place_conflict_pawn'
  | 'setup_wonders'
  | 'setup_decks'
  | 'setup_ages';

export interface ISetupStep {
  name: string;
  description: string;
  next?: string; // Name of the next step
  action?: SetupAction; // This should be a dispatcheable action
  substeps?: ISetupStep[];
}

interface Props {
  step: ISetupStep;
  children?: React.ReactNode;
}

function toTitleCase(snakeCase: string): string {
  return capitalize(snakeCase.replace(/_/g, ' '));
}

export default function SetupStep({ step }: Props): React.ReactNode {
  const substeps = step.substeps ?? [];
  return (
    <Flexbox direction='column' className={[stylePadding.start(2), 'm-4']}>
      <Flexbox direction='column' gap='2' className={'ms-4'}>
        <h2 className='text-xl font-bold mb-2'>{step.name}</h2>
        <p className='mb-4'>{step.description}</p>
        {step.action != null && <StepActionButton action={step.action} />}
      </Flexbox>
      {substeps.map((substep: ISetupStep, idx: number) => (
        <Flexbox
          key={idx}
          direction='row'
          gap='4'
          className={stylePadding.all(8)}
        >
          <SetupStep step={substep} />
        </Flexbox>
      ))}
    </Flexbox>
  );
}

interface SetupActionProps {
  action: SetupAction;
}
function StepActionButton({ action }: SetupActionProps): React.ReactNode {
  const setupPlayerCoins = useGameSetupPlayerCoins();
  const handleDispatchAction = (action: SetupAction) => {
    if (action === 'setup_coins') {
      setupPlayerCoins();
    }
  };
  return (
    <Flexbox direction='row' gap='4'>
      <Button
        label={toTitleCase(action)}
        onClick={() => handleDispatchAction(action)}
      />
    </Flexbox>
  );
}
