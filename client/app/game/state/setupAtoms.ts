import { atom } from 'jotai';
import * as TokenEngine from '~/game/engine/token.engine';
import {
  militaryTokensAtom,
  playersAtom,
  progressTokensAtom,
  setConflictPawnPositionAtom,
} from '~/game/state/atoms';
import type { SetupActionType, SetupState } from '~/game/state/types';
import { GAME_CONFIG } from '~/game/engine/constants';
import * as SetupEngine from '~/game/engine/setup.engine';

// ============================================
// SETUP STATE ATOMS
// ============================================

/**
 * Step history - stack of visited step names
 */
export const stepHistoryAtom = atom<string[]>([]);

/**
 * Pending actions that need to be completed
 */
export const pendingActionsAtom = atom<
  SetupActionType[],
  [actions: SetupActionType[]],
  void
>(
  get => {
    return (
      get(pendingActionsMapAtom).get(get(currentStepAtom))?.pendingActions ?? []
    );
  },
  (get, set, actions: SetupActionType[]) => {
    const currentStep = get(currentStepAtom);
    set(pendingActionsMapAtom, prev => {
      const pending = prev.get(currentStep)?.pendingActions;
      const completed: SetupActionType[] =
        prev.get(currentStep)?.completedActions ?? [];
      if (
        pending != null &&
        pending.length > 0 &&
        actions.length < pending.length
      ) {
        // find the missing actions and mark them as completed
        const missing = pending.filter(action => !actions.includes(action));
        completed.push(...missing);
      }

      // Check if we have completed all the actions that we are trying to set
      const hasAllActionsCompleted =
        completed.length > 0 &&
        completed.every(action => actions.includes(action));

      if (hasAllActionsCompleted) {
        return new Map(prev).set(currentStep, {
          pendingActions: [],
          completedActions: completed,
        });
      }

      return new Map(prev).set(currentStep, {
        pendingActions: actions,
        completedActions: completed,
      });
    });
  }
);

interface IPendingActionsValue {
  pendingActions: SetupActionType[];
  completedActions: SetupActionType[];
}
/**
 * Map of pending actions grouped by step name
 */
// TODO: Figure out if we can use this approach instead
// 1) Init the map with all the names of the steps
// 2) Directly set the values to the pendingActionsAtom
// https://jotai.org/docs/guides/atoms-in-atom#storing-a-map-of-atom-configs-in-atom
export const pendingActionsMapAtom = atom<Map<string, IPendingActionsValue>>(
  new Map<string, IPendingActionsValue>()
);

// ============================================
// SETUP ACTION ATOMS (write-only)
// ============================================

/**
 * Sets current setup step and calculates derived state
 */
export const setCurrentSetupStepAtom = atom(
  null,
  (get, set, stepName: string) => {
    // Calculate new step history using engine
    const currentHistory = get(stepHistoryAtom);
    const newHistory = SetupEngine.calculateStepHistory(
      stepName,
      currentHistory
    );
    set(stepHistoryAtom, newHistory);

    // Calculate required actions for the new step
    const currentStep = SetupEngine.getSetupStep(stepName);
    if (currentStep != null) {
      const requiredActions = SetupEngine.getRequiredActions(currentStep);
      // This works when moving forward, but not backwards (e.g. from 'place_conflict_pawn' to 'setup_coins')
      // because we need to check if the step is complete before setting the pending actions
      set(pendingActionsAtom, requiredActions);
    }

    // Check if setup is complete
    // TODO: Also make sure that there are no pending actions left in the pendingActionsMap
    const isComplete = SetupEngine.isSetupComplete(newHistory);
    set(isSetupCompleteAtom, isComplete);
  }
);

/**
 * Initializes military tokens using engine logic
 */
export const initMilitaryTokensAtom = atom(null, (get, set) => {
  const tokens = TokenEngine.initializeMilitaryTokens();
  set(militaryTokensAtom, tokens);
});

/**
 * Initializes coins for all players
 */
export const initAllPlayerCoinsAtom = atom(null, (get, set, coins: number) => {
  const players = get(playersAtom);
  set(
    playersAtom,
    players.map(player => ({ ...player, coins }))
  );
});

export const currentStepAtom = atom(get => {
  const stepHistory = get(stepHistoryAtom);
  return stepHistory[stepHistory.length - 1];
});

/**
 * Marks a setup action as complete
 */
export const completeSetupActionAtom = atom(
  null,
  (get, set, action: SetupActionType) => {
    const pending = get(pendingActionsAtom);
    set(
      pendingActionsAtom,
      pending.filter(a => a !== action)
    );
  }
);

/**
 * Initializes progress tokens using engine logic
 */
export const initProgressTokensAtom = atom(null, (get, set) => {
  const tokens = TokenEngine.initializeProgressTokens();
  set(progressTokensAtom, tokens);
});

/**
 * Whether setup is complete
 */
export const isSetupCompleteAtom = atom<boolean>(false);

/**
 * Marks setup as complete
 */
export const markSetupCompleteAtom = atom(null, (get, set) => {
  set(isSetupCompleteAtom, true);
});

/**
 * Derived atom - gets full setup state (for compatibility)
 */
export const setupStateAtom = atom<SetupState>(
  get =>
    ({
      stepHistory: get(stepHistoryAtom),
      pendingActions: get(pendingActionsAtom),
      isComplete: get(isSetupCompleteAtom),
    }) as SetupState
);

// ============================================
// COMPOSITE SETUP ACTIONS
// ============================================

/**
 * Dispatches setup actions (coins, tokens, etc.)
 * Replaces useSetupFlow logic
 */
export const dispatchSetupActionAtom = atom(
  null,
  (get, set, action: SetupActionType) => {
    switch (action) {
      case 'setup_coins':
        set(initAllPlayerCoinsAtom, GAME_CONFIG.INITIAL_COINS);
        set(completeSetupActionAtom, action);
        break;
      case 'place_conflict_pawn':
        set(
          setConflictPawnPositionAtom,
          GAME_CONFIG.INITIAL_CONFLICT_PAWN_POSITION
        );
        set(completeSetupActionAtom, action);
        break;

      case 'place_military_tokens':
        set(initMilitaryTokensAtom);
        set(completeSetupActionAtom, action);
        break;

      case 'place_progress_tokens':
        set(initProgressTokensAtom);
        set(completeSetupActionAtom, action);
        break;

      case 'setup_wonders':
      case 'setup_decks':
      case 'setup_ages':
        // TODO: Implement these actions when ready
        set(completeSetupActionAtom, action);
        break;
    }
  }
);
