import type { ISetupStep } from '~/game/setup/SetupStep';
import { useSetupContext } from '~/game/state/setup.context';
import useGameSetupStep from '~/game/hooks/useGameSetupStep';

export default function useGameSetupCurrentStep(): ISetupStep | null {
  const { stepHistory } = useSetupContext();
  const getStep = useGameSetupStep();

  if (stepHistory.length === 0) {
    return null;
  }

  const currentStepName = stepHistory[stepHistory.length - 1];
  return getStep(currentStepName);
}
