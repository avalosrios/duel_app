import React, { useCallback } from 'react';
import Button from '~/common/Button';
import type { SetupAction } from '~/game/setup/SetupStep';
import { toTitleCase } from '~/common/utils';
import useGameDispatchSetup from '~/game/hooks/useGameDispatchSetup';

interface SetupActionProps {
  action: SetupAction;
  onComplete?: () => void;
}
export default function StepActionButton({
  action,
  onComplete,
}: SetupActionProps): React.ReactNode {
  const setupDispatch = useGameDispatchSetup();
  const handleDispatchAction = useCallback(() => {
    setupDispatch(action);
    onComplete?.();
  }, [action, onComplete, setupDispatch]);
  return (
    <Button
      size='compact'
      label={toTitleCase(action)}
      onClick={handleDispatchAction}
    />
  );
}
