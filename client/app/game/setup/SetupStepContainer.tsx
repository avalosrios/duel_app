import React from 'react';
import Flexbox from '~/common/Flexbox';
import useGameSetupCurrentStep from '~/game/hooks/useGameSetupCurrentStep';
import Button from '~/common/Button';
import { useSetupContext } from '~/game/state/setup.context';

function useGoBack(): () => void {
  const { setCurrentStep: goToPreviousStepOf, currentStep } = useSetupContext();
  // get the index of the current step and go back one
  if (currentStep == null) {
    return () => {};
  }
  return () => goToPreviousStepOf(currentStep);
}

export default function SetupStepContainer(): React.ReactNode {
  // get the current step from the context
  const { setCurrentStep, stepHistory } = useSetupContext();
  const goBack = useGoBack();
  const currentStep = useGameSetupCurrentStep();

  const isFirstStep = stepHistory.length <= 1;
  const handleNextStep = (nextStep: string | null | undefined) => {
    if (nextStep != null) {
      setCurrentStep(nextStep);
    }
    return;
  };

  if (currentStep == null) {
    return null;
  }
  return (
    <Flexbox direction='row' gap='4'>
      <h1>Current Step: {currentStep.name}</h1>
      <Flexbox direction='column' gap='2'>
        {!isFirstStep && <Button label={'Back'} onClick={goBack} />}
        <Button
          label={'Next'}
          onClick={() => handleNextStep(currentStep.next)}
        />
      </Flexbox>
    </Flexbox>
  );
}
