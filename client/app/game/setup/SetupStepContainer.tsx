import React from 'react';
import Flexbox from '~/common/Flexbox';
import useGameSetupCurrentStep from '~/game/hooks/useGameSetupCurrentStep';
import SetupStepHeader from '~/game/setup/SetupStepHeader';

export default function SetupStepContainer(): React.ReactElement | null {
  // get the current step from the context
  const currentStep = useGameSetupCurrentStep();

  if (currentStep == null) {
    return null;
  }
  return (
    <Flexbox direction='column' gap='8' className={['mb-4', 'w-9/10']}>
      <SetupStepHeader step={currentStep} />
    </Flexbox>
  );
}
