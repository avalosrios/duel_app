import type { ISetupStep } from '~/game/setup/SetupStep';
import { useSetupState } from '~/game/hooks/useGameStore';
import useGameSetupStep from '~/game/hooks/useGameSetupStep';

export default function useGameSetupCurrentStep(): ISetupStep | null {
  const { stepHistory } = useSetupState();
  const getStep = useGameSetupStep();

  if (stepHistory.length === 0) {
    return null;
  }

  const currentStepName = stepHistory[stepHistory.length - 1];
  return getStep(currentStepName);
}
