import { useCallback } from 'react';
import useGameDispatch from './useGameDispatch';
import { GAME_CONFIG } from '~/game/engine/constants';
import type { SetupActionType } from '~/game/state/types';

/**
 * Hook for executing setup actions
 * Replaces: useGameDispatchSetup
 *
 * Dispatches actions to both game and board slices, then marks action complete in setup slice
 */
export default function useSetupFlow() {
  const dispatch = useGameDispatch();

  const executeSetupAction = useCallback(
    (action: SetupActionType) => {
      switch (action) {
        case 'setup_coins':
          dispatch({
            type: 'game/INIT_ALL_PLAYER_COINS',
            payload: { coins: GAME_CONFIG.INITIAL_COINS },
          });
          dispatch({
            type: 'setup/COMPLETE_ACTION',
            payload: { action },
          });
          break;

        case 'place_conflict_pawn':
          dispatch({
            type: 'board/SET_CONFLICT_PAWN_POSITION',
            payload: { position: GAME_CONFIG.INITIAL_CONFLICT_PAWN_POSITION },
          });
          dispatch({
            type: 'setup/COMPLETE_ACTION',
            payload: { action },
          });
          break;

        case 'place_military_tokens':
          dispatch({ type: 'board/INIT_MILITARY_TOKENS' });
          dispatch({
            type: 'setup/COMPLETE_ACTION',
            payload: { action },
          });
          break;

        case 'place_progress_tokens':
          dispatch({ type: 'board/INIT_PROGRESS_TOKENS' });
          dispatch({
            type: 'setup/COMPLETE_ACTION',
            payload: { action },
          });
          break;

        case 'setup_wonders':
        case 'setup_decks':
        case 'setup_ages':
          // Not yet implemented
          console.warn(`Setup action not yet implemented: ${action}`);
          break;

        default:
          console.warn(`Unknown setup action: ${action}`);
          break;
      }
    },
    [dispatch]
  );

  return executeSetupAction;
}
