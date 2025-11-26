import { useSetAtom } from 'jotai';
import { dispatchSetupActionAtom } from '~/game/state/atoms';
import type { SetupActionType } from '~/game/state/types';

/**
 * Hook for executing setup actions
 * Replaces: useGameDispatchSetup
 * Updated to use Jotai atoms
 *
 * Dispatches actions to both game and board atoms, then marks action complete in setup atom
 */
export default function useSetupFlow(): (action: SetupActionType) => void {
  return useSetAtom(dispatchSetupActionAtom);
}
