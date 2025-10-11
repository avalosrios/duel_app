import React, { useCallback, useMemo } from 'react';
import type { ISetupStep } from '~/game/setup/SetupStep';
import { useSetupContext } from '~/game/state/setup.context';
import Flexbox from '~/common/Flexbox';
import Button from '~/common/Button';

interface SetupStepHeaderProps {
  step: ISetupStep;
  isNextDisabled?: boolean;
}

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

export default function SetupStepHeader({
  step,
  isNextDisabled = false,
}: SetupStepHeaderProps): React.ReactElement {
  const { setCurrentStep, stepHistory } = useSetupContext();
  const goBack = useGoBack();
  const isFirstStep = useMemo(() => {
    const index = stepHistory.indexOf(step.name);
    return index === 0;
  }, [step.name, stepHistory]);
  const hasNextStep = step.next != null;
  const handleNextStep = useCallback(() => {
    const nextStep = step.next;
    if (nextStep != null) {
      setCurrentStep(nextStep);
    }
  }, [step.next, setCurrentStep]);
  return (
    <Flexbox direction='row' justify='between' className={['mb-4', 'grow']}>
      <Flexbox direction='column'>
        <h1 className='text-xl font-bold mb-2'>{step.name}</h1>
      </Flexbox>
      <Flexbox direction='row'>
        {!isFirstStep && (
          <Flexbox direction='column'>
            <Button
              type='secondary'
              size='compact'
              label={'Back'}
              onClick={goBack}
            />
          </Flexbox>
        )}
        {hasNextStep && (
          <Flexbox direction='column'>
            <Button
              size='compact'
              label='Next'
              type='primary'
              isDisabled={isNextDisabled}
              onClick={handleNextStep}
            />
          </Flexbox>
        )}
      </Flexbox>
    </Flexbox>
  );
}
