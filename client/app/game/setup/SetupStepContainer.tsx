import React from 'react';
import Flexbox from '~/common/Flexbox';
import useGameSetupCurrentStep from '~/game/hooks/useGameSetupCurrentStep';
import SetupStepHeader from '~/game/setup/SetupStepHeader';
import SetupStep from '~/game/setup/SetupStep';

export default function SetupStepContainer(): React.ReactElement | null {
  // get the current step from the context
  const currentStep = useGameSetupCurrentStep();

  if (currentStep == null) {
    return null;
  }
  return (
    <Flexbox direction='column' gap='4' className={['mb-4', 'w-9/10']}>
      <SetupStepHeader step={currentStep} />
      <p className='mb-4'>{currentStep.description}</p>
      {currentStep.substeps?.map(substep => (
        <SetupStep key={substep.name} step={substep} />
      ))}
    </Flexbox>
  );
}
