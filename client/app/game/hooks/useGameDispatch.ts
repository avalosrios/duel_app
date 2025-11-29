import { useSetAtom } from 'jotai';
import {
  setPlayerCoinsAtom,
  setCurrentPlayerAtom,
  setConflictPawnPositionAtom,
} from '~/game/state/atoms';
import type { GameStoreAction } from '~/game/state/types';
import {
  completeSetupActionAtom,
  initAllPlayerCoinsAtom,
  initMilitaryTokensAtom,
  initProgressTokensAtom,
  markSetupCompleteAtom,
  setCurrentSetupStepAtom,
} from '~/game/state/setupAtoms';

/**
 * Access the unified dispatch function
 * Handles all game/, board/, and setup/ actions
 * Updated to use Jotai atoms while maintaining backward-compatible API
 *
 * Replaces:
 * - useGameDispatch (from game.reducer.ts)
 * - useBoardDispatch (from board.reducer.ts)
 */
export default function useGameDispatch(): (action: GameStoreAction) => void {
  // Get all setter atoms
  const setPlayerCoins = useSetAtom(setPlayerCoinsAtom);
  const initAllPlayerCoins = useSetAtom(initAllPlayerCoinsAtom);
  const setCurrentPlayer = useSetAtom(setCurrentPlayerAtom);
  const setConflictPawnPosition = useSetAtom(setConflictPawnPositionAtom);
  const initMilitaryTokens = useSetAtom(initMilitaryTokensAtom);
  const initProgressTokens = useSetAtom(initProgressTokensAtom);
  const setCurrentSetupStep = useSetAtom(setCurrentSetupStepAtom);
  const completeSetupAction = useSetAtom(completeSetupActionAtom);
  const markSetupComplete = useSetAtom(markSetupCompleteAtom);

  // Return a dispatch-like function that routes actions to appropriate atoms
  return (action: GameStoreAction) => {
    switch (action.type) {
      // Game actions
      case 'game/SET_PLAYER_COINS':
        setPlayerCoins(action.payload);
        break;
      case 'game/INIT_ALL_PLAYER_COINS':
        initAllPlayerCoins(action.payload.coins);
        break;
      case 'game/SET_CURRENT_PLAYER':
        setCurrentPlayer(action.payload.playerID);
        break;

      // Board actions
      case 'board/SET_CONFLICT_PAWN_POSITION':
        setConflictPawnPosition(action.payload.position);
        break;
      case 'board/INIT_MILITARY_TOKENS':
        initMilitaryTokens();
        break;
      case 'board/INIT_PROGRESS_TOKENS':
        initProgressTokens();
        break;

      // Setup actions
      case 'setup/SET_CURRENT_STEP':
        setCurrentSetupStep(action.payload.step);
        break;
      case 'setup/COMPLETE_ACTION':
        completeSetupAction(action.payload.action);
        break;
      case 'setup/MARK_COMPLETE':
        markSetupComplete();
        break;

      default:
        console.warn('Unknown action type:', action);
    }
  };
}
