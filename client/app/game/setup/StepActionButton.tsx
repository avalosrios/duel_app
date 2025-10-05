import React, { useCallback } from 'react';
import useGameSetupPlayerCoins from '~/game/hooks/useGameSetupPlayerCoins';
import Flexbox from '~/common/Flexbox';
import Button from '~/common/Button';
import type { SetupAction } from '~/game/setup/SetupStep';
import { toTitleCase } from '~/common/utils';

interface SetupActionProps {
  action: SetupAction;
  onComplete?: () => void;
}
export default function StepActionButton({
  action,
  onComplete,
}: SetupActionProps): React.ReactNode {
  const setupPlayerCoins = useGameSetupPlayerCoins();
  const handleDispatchAction = useCallback(() => {
    if (action === 'setup_coins') {
      setupPlayerCoins();
    }
    onComplete?.();
  }, [action, onComplete, setupPlayerCoins]);
  return (
    <Flexbox direction='row' gap='4'>
      <Button label={toTitleCase(action)} onClick={handleDispatchAction} />
    </Flexbox>
  );
}
