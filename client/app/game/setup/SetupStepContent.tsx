import React from 'react';
import type { ISetupStep } from '~/game/setup/SetupStep';
import Flexbox from '~/common/Flexbox';
import StepActionButton from '~/game/setup/StepActionButton';
import WonderDraftStep from '~/game/setup/WonderDraftStep';

interface Props {
  step: ISetupStep;
  onClickAction?: () => void;
}

export default function SetupStepContent({
  step,
  onClickAction,
}: Props): React.ReactNode {
  if (step.component === 'wonder_draft') {
    const round: 1 | 2 = step.action === 'wonders_draft_1' ? 1 : 2;
    return <WonderDraftStep step={step} round={round} />;
  }

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
