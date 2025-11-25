import type { ISetupStep } from '~/game/setup/SetupStep';
import type { SetupActionType } from '~/game/state/types';
import { SETUP_STEPS } from './constants';

/**
 * Gets a setup step by name
 * Extracted from hooks/useGameSetupStep.ts
 *
 * @param name Name of the setup step
 * @returns Setup step or null if not found
 */
export function getSetupStep(name: string): ISetupStep | null {
  return SETUP_STEPS.steps.find(step => step.name === name) ?? null;
}

/**
 * Gets the next step name from a given step
 *
 * @param currentStep The current setup step
 * @returns Name of the next step, or null if this is the last step
 */
export function getNextStep(currentStep: ISetupStep): string | null {
  return currentStep.next ?? null;
}

/**
 * Gets the previous step from history
 *
 * @param stepHistory Array of step names in order visited
 * @returns Name of the previous step, or null if at first step
 */
export function getPreviousStep(stepHistory: string[]): string | null {
  if (stepHistory.length <= 1) {
    return null;
  }
  return stepHistory[stepHistory.length - 2];
}

/**
 * Calculates new step history when navigating to a step
 * Extracted from state/GameSetupProvider.tsx (setCurrentStep logic, lines 14-25)
 *
 * If the target step exists in history, it slices to that point (going back)
 * Otherwise, it appends the new step (moving forward)
 *
 * @param targetStep Name of the step to navigate to
 * @param currentHistory Current step history
 * @returns New step history array
 */
export function calculateStepHistory(
  targetStep: string,
  currentHistory: string[]
): string[] {
  // Check if step exists in history (going back)
  const indexOfStep = currentHistory.indexOf(targetStep);

  if (indexOfStep >= 0) {
    // Going back to a previous step - slice history
    return currentHistory.slice(0, indexOfStep + 1);
  }

  // Moving forward to a new step
  return [...currentHistory, targetStep];
}

/**
 * Gets all required actions for a setup step (including substeps)
 * Extracted from setup/SetupStepContainer.tsx (lines 26-34)
 *
 * @param step The setup step to get actions from
 * @returns Array of required setup actions
 */
export function getRequiredActions(step: ISetupStep): SetupActionType[] {
  const actions: SetupActionType[] = [];

  // Add main step action if it exists
  if (step.action) {
    actions.push(step.action as SetupActionType);
  }

  // Add substep actions if they exist
  if (step.substeps) {
    step.substeps.forEach(substep => {
      if (substep.action) {
        actions.push(substep.action as SetupActionType);
      }
    });
  }

  return actions;
}

/**
 * Checks if setup is complete (reached final step with no next)
 *
 * @param stepHistory Array of step names visited
 * @returns True if setup is complete
 */
export function isSetupComplete(stepHistory: string[]): boolean {
  if (stepHistory.length === 0) {
    return false;
  }

  const currentStepName = stepHistory[stepHistory.length - 1];
  const currentStep = getSetupStep(currentStepName);

  return currentStep !== null && currentStep.next === undefined;
}

/**
 * Gets the first step name from the setup configuration
 *
 * @returns Name of the first setup step
 */
export function getFirstStep(): string {
  return SETUP_STEPS.steps[0].name;
}

/**
 * Checks if a step is the first step
 *
 * @param stepName Name of the step to check
 * @returns True if this is the first step
 */
export function isFirstStep(stepName: string): boolean {
  return stepName === getFirstStep();
}
