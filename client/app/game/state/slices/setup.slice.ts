import { produce } from 'immer';
import type { SetupState, SetupAction } from '../types';
import * as SetupEngine from '~/game/engine/setup.engine';

/**
 * Setup state slice - manages setup flow (step history, pending actions, completion)
 * NEW - converts useState from GameSetupProvider.tsx to reducer pattern
 * Also manages pending actions that were in SetupStepContainer.tsx local state
 */

export const INITIAL_SETUP_STATE: SetupState = {
  stepHistory: [],
  pendingActions: [],
  isComplete: false,
};

export function setupReducer(state: SetupState, action: SetupAction): SetupState {
  switch (action.type) {
    case 'setup/SET_CURRENT_STEP': {
      return produce<SetupState>(state, draft => {
        // Use engine function for step history calculation
        draft.stepHistory = SetupEngine.calculateStepHistory(
          action.payload.step,
          state.stepHistory
        );

        // Calculate required actions for the new step
        const currentStep = SetupEngine.getSetupStep(action.payload.step);
        if (currentStep) {
          draft.pendingActions = SetupEngine.getRequiredActions(currentStep);
        }

        // Check if setup is complete
        draft.isComplete = SetupEngine.isSetupComplete(draft.stepHistory);
      });
    }

    case 'setup/COMPLETE_ACTION': {
      return produce<SetupState>(state, draft => {
        // Remove completed action from pending list
        draft.pendingActions = draft.pendingActions.filter(
          a => a !== action.payload.action
        );
      });
    }

    case 'setup/MARK_COMPLETE': {
      return produce<SetupState>(state, draft => {
        draft.isComplete = true;
      });
    }

    default:
      return state;
  }
}
