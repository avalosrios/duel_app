import { atom } from 'jotai';
import type {
  Player,
  GameState,
  BoardState,
  SetupState,
  SetupActionType,
} from './types';
import type { MilitaryToken, ProgressToken } from '~/game/types';
import * as TokenEngine from '~/game/engine/token.engine';
import * as SetupEngine from '~/game/engine/setup.engine';
import { GAME_CONFIG } from '~/game/engine/constants';

/**
 * Jotai atoms for game state management
 * Replaces Redux-style slices with atomic state for better performance
 */

// ============================================
// HELPER FUNCTIONS
// ============================================

function getInitialPlayer(id: number): Player {
  return {
    playerID: id,
    coins: 0,
    name: `Player ${id}`,
  };
}

// ============================================
// GAME STATE ATOMS
// ============================================

/**
 * Players array - max 2 players
 */
export const playersAtom = atom<Player[]>([
  getInitialPlayer(1),
  getInitialPlayer(2),
]);

/**
 * Current player - derived from players array based on playerID
 */
export const currentPlayerIdAtom = atom<number | null>(null);

/**
 * Derived atom - gets the current player object
 */
export const currentPlayerAtom = atom(get => {
  const playerId = get(currentPlayerIdAtom);
  const players = get(playersAtom);
  return players.find(p => p.playerID === playerId) ?? null;
});

/**
 * Derived atom - gets full game state (for compatibility)
 */
export const gameStateAtom = atom<GameState>(get => ({
  players: get(playersAtom),
  currentPlayer: get(currentPlayerAtom),
}));

// ============================================
// GAME ACTION ATOMS (write-only)
// ============================================

/**
 * Sets coins for a specific player
 */
export const setPlayerCoinsAtom = atom(
  null,
  (get, set, payload: { playerID: number; coins: number }) => {
    const players = get(playersAtom);
    set(
      playersAtom,
      players.map(player =>
        player.playerID === payload.playerID
          ? { ...player, coins: payload.coins }
          : player
      )
    );
  }
);

/**
 * Initializes coins for all players
 */
export const initAllPlayerCoinsAtom = atom(
  null,
  (get, set, coins: number) => {
    const players = get(playersAtom);
    set(
      playersAtom,
      players.map(player => ({ ...player, coins }))
    );
  }
);

/**
 * Sets the current player by ID
 */
export const setCurrentPlayerAtom = atom(
  null,
  (get, set, playerID: number) => {
    set(currentPlayerIdAtom, playerID);
  }
);

// ============================================
// BOARD STATE ATOMS
// ============================================

/**
 * Conflict pawn position on x-axis (-9 to 9)
 */
export const conflictPawnPositionAtom = atom<number | null>(null);

/**
 * Military tokens at board start and end
 */
export const militaryTokensAtom = atom<{
  start: MilitaryToken[];
  end: MilitaryToken[];
}>({
  start: [],
  end: [],
});

/**
 * Progress tokens (max 5)
 */
export const progressTokensAtom = atom<ProgressToken[]>([]);

/**
 * Derived atom - gets full board state (for compatibility)
 */
export const boardStateAtom = atom<BoardState>(get => ({
  militaryContext: {
    conflictPawnPosition: { x: get(conflictPawnPositionAtom) },
    militaryTokens: get(militaryTokensAtom),
  },
  progressTokens: get(progressTokensAtom),
}));

// ============================================
// BOARD ACTION ATOMS (write-only)
// ============================================

/**
 * Sets conflict pawn position
 */
export const setConflictPawnPositionAtom = atom(
  null,
  (get, set, position: number) => {
    set(conflictPawnPositionAtom, position);
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
 * Initializes progress tokens using engine logic
 */
export const initProgressTokensAtom = atom(null, (get, set) => {
  const tokens = TokenEngine.initializeProgressTokens();
  set(progressTokensAtom, tokens);
});

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
export const pendingActionsAtom = atom<SetupActionType[]>([]);

/**
 * Whether setup is complete
 */
export const isSetupCompleteAtom = atom<boolean>(false);

/**
 * Derived atom - gets full setup state (for compatibility)
 */
export const setupStateAtom = atom<SetupState>(get => ({
  stepHistory: get(stepHistoryAtom),
  pendingActions: get(pendingActionsAtom),
  isComplete: get(isSetupCompleteAtom),
}));

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
    if (currentStep) {
      const requiredActions = SetupEngine.getRequiredActions(currentStep);
      set(pendingActionsAtom, requiredActions);
    }

    // Check if setup is complete
    const isComplete = SetupEngine.isSetupComplete(newHistory);
    set(isSetupCompleteAtom, isComplete);
  }
);

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
 * Marks setup as complete
 */
export const markSetupCompleteAtom = atom(null, (get, set) => {
  set(isSetupCompleteAtom, true);
});

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
