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
    <Flexbox alignItems='baseline' direction='row' gap='4' justify='between'>
      <Flexbox direction='column' className={['w-3/4']}>
        <p>{step.description}</p>
      </Flexbox>
      {step.action != null && (
        <StepActionButton action={step.action} onComplete={onClickAction} />
      )}
    </Flexbox>
  );
}
