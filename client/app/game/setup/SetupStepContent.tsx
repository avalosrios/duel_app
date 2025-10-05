import React from 'react';
import type { ISetupStep } from '~/game/setup/SetupStep';
import Flexbox from '~/common/Flexbox';
import StepActionButton from '~/game/setup/StepActionButton';

interface Props {
  step: ISetupStep;
  onClickAction?: () => void;
}

export default function SetupStepContent({
  step,
  onClickAction,
}: Props): React.ReactNode {
  return (
    <Flexbox>
      <p className='mb-4'>{step.description}</p>
      {step.action != null && (
        <StepActionButton action={step.action} onComplete={onClickAction} />
      )}
    </Flexbox>
  );
}
