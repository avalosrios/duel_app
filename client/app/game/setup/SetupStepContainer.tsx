import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Flexbox from '~/common/Flexbox';
import useGameSetupCurrentStep from '~/game/hooks/useGameSetupCurrentStep';
import SetupStepHeader from '~/game/setup/SetupStepHeader';
import SetupStep, { type SetupAction } from '~/game/setup/SetupStep';
import SetupStepContent from '~/game/setup/SetupStepContent';

export default function SetupStepContainer(): React.ReactElement | null {
  // get the current step from the context
  const currentStep = useGameSetupCurrentStep();
  const substeps = useMemo(
    () => currentStep?.substeps ?? [],
    [currentStep?.substeps]
  );

  const [stepPendingActions, setStepPendingActions] = useState<SetupAction[]>(
    []
  );

  const onCompleteAction = useCallback((action: SetupAction) => {
    setStepPendingActions(prevActions =>
      prevActions.filter(prevAction => prevAction !== action)
    );
  }, []);

  // TODO: This should be a reducer and stored in a context provider
  useEffect(() => {
    if (currentStep == null) {
      return;
    }
    const required = [currentStep.action]
      .concat(substeps.map(substep => substep.action))
      .filter(res => res != null);
    setStepPendingActions(required as SetupAction[]);
  }, [currentStep, substeps]);

  if (currentStep == null) {
    return null;
  }

  const hasPendingActions = stepPendingActions.length > 0;
  return (
    <Flexbox direction='column' gap='4' className={['mb-4', 'w-9/10']}>
      <SetupStepHeader step={currentStep} isNextDisabled={hasPendingActions} />
      <SetupStepContent
        step={currentStep}
        onClickAction={() =>
          currentStep.action != null && onCompleteAction(currentStep.action)
        }
      />
      {currentStep.substeps?.map(substep => (
        <SetupStep
          key={substep.name}
          step={substep}
          onCompleteAction={onCompleteAction}
        />
      ))}
    </Flexbox>
  );
}
