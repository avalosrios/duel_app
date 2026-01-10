import { useSetAtom } from 'jotai';
import { dispatchSetupActionAtom } from '~/game/state/setupAtoms';
import type { SetupActionType } from '~/game/state/types';

/**
 * Hook for executing setup actions
 *
 * Dispatches actions to both game and board atoms, then marks action complete in setup atom
 */
export default function useDispatchSetupAction(): (
  action: SetupActionType
) => void {
  return useSetAtom(dispatchSetupActionAtom);
}
