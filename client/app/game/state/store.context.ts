import { createContext } from 'react';
import type { GameStoreState, GameStoreAction } from './types';
import { INITIAL_STORE_STATE } from './store.reducer';

/**
 * Unified game store contexts
 * Replaces: GameContext, BoardContext, SetupContext
 */

export const GameStoreContext = createContext<GameStoreState>(INITIAL_STORE_STATE);

export const GameStoreDispatchContext = createContext<
  React.Dispatch<GameStoreAction>
>(() => {
  console.warn('GameStoreDispatchContext used outside of provider');
});
