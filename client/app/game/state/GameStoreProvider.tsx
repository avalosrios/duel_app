import React, { type ReactNode, useEffect } from 'react';
import { Provider, useSetAtom } from 'jotai';
import { stepHistoryAtom } from './atoms';

/**
 * Unified game store provider using Jotai
 * Replaces: GameContextProvider, BoardContextProvider, GameSetupProvider
 * Updated to use Jotai's Provider for atomic state management
 */

interface Props {
  children: ReactNode;
  initialSetupStep?: string; // For initializing setup flow on /game/setup route
}

/**
 * Internal component to initialize atoms on mount
 */
function AtomInitializer({ initialSetupStep }: { initialSetupStep?: string }) {
  const setStepHistory = useSetAtom(stepHistoryAtom);

  useEffect(() => {
    if (initialSetupStep) {
      setStepHistory([initialSetupStep]);
    }
  }, [initialSetupStep, setStepHistory]);

  return null;
}

export default function GameStoreProvider({
  children,
  initialSetupStep,
}: Props): ReactNode {
  return (
    <Provider>
      {initialSetupStep && <AtomInitializer initialSetupStep={initialSetupStep} />}
      {children}
    </Provider>
  );
}
