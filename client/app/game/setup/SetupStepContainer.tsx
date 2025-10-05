import React, { useCallback } from 'react';
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

export default function SetupStepContainer(): React.ReactElement | null {
  // get the current step from the context
  const { setCurrentStep, stepHistory } = useSetupContext();
  const goBack = useGoBack();
  const currentStep = useGameSetupCurrentStep();

  const isFirstStep = stepHistory.length <= 1;
  const handleNextStep = useCallback(() => {
    const nextStep = currentStep?.next;
    if (nextStep != null) {
      setCurrentStep(nextStep);
    }
  }, [currentStep?.next, setCurrentStep]);
  const hasNextStep = currentStep?.next != null;

  if (currentStep == null) {
    return null;
  }
  return (
    <Flexbox direction='row' gap='8' alignItems='baseline' justify='between'>
      <Flexbox>
        <h1>Current Step: {currentStep.name}</h1>
      </Flexbox>
      <Flexbox direction='row' gap='2'>
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
            onClick={handleNextStep}
          />
        )}
      </Flexbox>
    </Flexbox>
  );
}
