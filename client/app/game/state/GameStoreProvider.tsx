import React, { type ReactNode, useMemo, useReducer } from 'react';
import { GameStoreContext, GameStoreDispatchContext } from './store.context';
import { rootReducer, INITIAL_STORE_STATE } from './store.reducer';

/**
 * Unified game store provider
 * Replaces: GameContextProvider, BoardContextProvider, GameSetupProvider
 */

interface Props {
  children: ReactNode;
  initialSetupStep?: string; // For initializing setup flow on /game/setup route
}

export default function GameStoreProvider({
  children,
  initialSetupStep,
}: Props): ReactNode {
  // Initialize store with optional setup step
  const initialValue = useMemo(() => {
    if (initialSetupStep) {
      return {
        ...INITIAL_STORE_STATE,
        setup: {
          ...INITIAL_STORE_STATE.setup,
          stepHistory: [initialSetupStep],
        },
      };
    }
    return INITIAL_STORE_STATE;
  }, [initialSetupStep]);

  const [state, dispatch] = useReducer(rootReducer, initialValue);

  return (
    <GameStoreContext.Provider value={state}>
      <GameStoreDispatchContext.Provider value={dispatch}>
        {children}
      </GameStoreDispatchContext.Provider>
    </GameStoreContext.Provider>
  );
}
