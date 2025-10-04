import type { ISetupStep } from '~/game/setup/SetupStep';
import { useSetupContext } from '~/game/state/setup.context';
import useGameSetupStep from '~/game/hooks/useGameSetupStep';

export default function useGameSetupCurrentStep(): ISetupStep | null {
  const { currentStep } = useSetupContext();
  const getStep = useGameSetupStep();
  if (currentStep == null) {
    return null;
  }
  return getStep(currentStep);
}
