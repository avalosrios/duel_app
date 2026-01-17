import type { ISetupStep } from '~/game/setup/SetupStep';
import { SETUP_STEPS } from '~/game/engine/constants/steps';

export default function useGameSetupStep(): (
  name: string
) => ISetupStep | null {
  return (name: string) =>
    SETUP_STEPS.steps.find(step => step.name === name) ?? null;
}
