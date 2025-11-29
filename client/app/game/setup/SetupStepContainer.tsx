import React from 'react';
import useGameSetupCurrentStep from '~/game/hooks/useGameSetupCurrentStep';
import { useSetupState } from '~/game/hooks/useGameStore';
import useDispatchSetupAction from '~/game/hooks/useDispatchSetupAction';
import SetupStepHeader from '~/game/setup/SetupStepHeader';
import SetupStep from '~/game/setup/SetupStep';
import SetupStepContent from '~/game/setup/SetupStepContent';
import type { SetupActionType } from '~/game/state/types';

export default function SetupStepContainer(): React.ReactElement | null {
  // Get the current step from the context
  const currentStep = useGameSetupCurrentStep();
  const { pendingActions, isComplete, stepHistory } = useSetupState();
  console.log('setup sate debug', { isComplete, stepHistory });
  const executeSetupAction = useDispatchSetupAction();

  const onCompleteAction = (action: SetupActionType) => {
    executeSetupAction(action);
  };

  if (currentStep == null) {
    return null;
  }

  const hasPendingActions = pendingActions.length > 0;
  return (
    <>
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
    </>
  );
}
