import React from 'react';
import Flexbox from '~/common/Flexbox';
import useGameSetupCurrentStep from '~/game/hooks/useGameSetupCurrentStep';
import Button from '~/common/Button';
import { useSetupContext } from '~/game/state/setup.context';

function useGoBack(): () => void {
  const { setCurrentStep, stepHistory } = useSetupContext();
  return () => {
    if (stepHistory.length > 1) {
      // Go back to the previous step
      const previousStepName = stepHistory[stepHistory.length - 2];
      setCurrentStep(previousStepName);
    }
  };
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
  const hasNextStep = currentStep?.next != null;

  if (currentStep == null) {
    return null;
  }
  return (
    <Flexbox direction='row' gap='4'>
      <h1>Current Step: {currentStep.name}</h1>
      <Flexbox direction='column' gap='2'>
        {!isFirstStep && (
          <Button
            type='secondary'
            size='compact'
            label={'Back'}
            onClick={goBack}
          />
        )}
        {hasNextStep && (
          <Button
            size='compact'
            label='Next'
            type='primary'
            onClick={() => handleNextStep(currentStep.next)}
          />
        )}
      </Flexbox>
    </Flexbox>
  );
}
