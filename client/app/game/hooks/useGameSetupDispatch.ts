import type { SetupAction } from '~/game/state/types';
import { useSetAtom } from 'jotai';
import {
  completeSetupActionAtom,
  markSetupCompleteAtom,
  setCurrentSetupStepAtom,
} from '~/game/state/setupAtoms';

export default function useGameSetupDispatch(): (action: SetupAction) => void {
  const setCurrentSetupStep = useSetAtom(setCurrentSetupStepAtom);
  const completeSetupAction = useSetAtom(completeSetupActionAtom);
  const markSetupComplete = useSetAtom(markSetupCompleteAtom);
  return (action: SetupAction) => {
    switch (action.type) {
      case 'setup/SET_CURRENT_STEP':
        setCurrentSetupStep(action.payload.step);
        break;
      case 'setup/COMPLETE_ACTION':
        completeSetupAction(action.payload.action);
        break;
      case 'setup/MARK_COMPLETE':
        markSetupComplete();
        break;
    }
  };
}
