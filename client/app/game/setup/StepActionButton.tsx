import React, { useCallback } from 'react';
import Button from '~/common/Button';
import type { SetupActionType } from '~/game/state/types';
import { toTitleCase } from '~/common/utils';
import useSetupFlow from '~/game/hooks/useSetupFlow';

interface SetupActionProps {
  action: SetupActionType;
  onComplete?: () => void;
}
export default function StepActionButton({
  action,
  onComplete,
}: SetupActionProps): React.ReactNode {
  const executeSetupAction = useSetupFlow();
  const handleDispatchAction = useCallback(() => {
    executeSetupAction(action);
    onComplete?.();
  }, [action, onComplete, executeSetupAction]);
  return (
    <Button
      size='compact'
      label={toTitleCase(action)}
      onClick={handleDispatchAction}
    />
  );
}
