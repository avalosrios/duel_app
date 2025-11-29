import React, { useCallback } from 'react';
import Button from '~/common/Button';
import type { SetupActionType } from '~/game/state/types';
import { toTitleCase } from '~/common/utils';
import useDispatchSetupAction from '~/game/hooks/useDispatchSetupAction';
import { useSetupState } from '~/game/hooks/useGameStore';

interface SetupActionProps {
  action: SetupActionType;
  onComplete?: () => void;
}
export default function StepActionButton({
  action,
  onComplete,
}: SetupActionProps): React.ReactNode {
  // Check from state if the step has an action to perform
  const { pendingActions } = useSetupState();
  const isPending = pendingActions.find(
    pendingAction => pendingAction === action
  );
  const executeSetupAction = useDispatchSetupAction();
  const handleDispatchAction = useCallback(() => {
    executeSetupAction(action);
    onComplete?.();
  }, [action, onComplete, executeSetupAction]);
  if (!isPending) {
    return <Button size='compact' label='DONE' isDisabled={true} />;
  }
  return (
    <Button
      size='compact'
      label={toTitleCase(action)}
      onClick={handleDispatchAction}
    />
  );
}
