import { useContext } from 'react';
import { GameStoreContext } from '~/game/state/store.context';
import type {
  GameStoreState,
  GameState,
  BoardState,
  SetupState,
} from '~/game/state/types';

/**
 * Access the complete unified game store
 * Use slice-specific selectors below for targeted access
 */
export default function useGameStore(): GameStoreState {
  return useContext(GameStoreContext);
}

/**
 * Access only game state (players, coins, current player)
 * Replaces: old useGameState hook
 * Maintains backward-compatible API
 */
export function useGameState(): GameState {
  const store = useGameStore();
  return store.game;
}

/**
 * Access only board state (military context, progress tokens)
 * Replaces: old useBoardState hook
 * Maintains backward-compatible API
 */
export function useBoardState(): BoardState {
  const store = useGameStore();
  return store.board;
}

/**
 * Access only setup state (step history, pending actions, completion status)
 * NEW - provides setup state access
 */
export function useSetupState(): SetupState {
  const store = useGameStore();
  return store.setup;
}
