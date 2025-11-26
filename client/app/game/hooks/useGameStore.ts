import { useAtomValue } from 'jotai';
import {
  gameStateAtom,
  boardStateAtom,
  setupStateAtom,
} from '~/game/state/atoms';
import type {
  GameStoreState,
  GameState,
  BoardState,
  SetupState,
} from '~/game/state/types';

/**
 * Access the complete unified game store
 * Use slice-specific selectors below for targeted access
 * Updated to use Jotai atoms
 */
export default function useGameStore(): GameStoreState {
  const game = useAtomValue(gameStateAtom);
  const board = useAtomValue(boardStateAtom);
  const setup = useAtomValue(setupStateAtom);

  return { game, board, setup };
}

/**
 * Access only game state (players, coins, current player)
 * Replaces: old useGameState hook
 * Maintains backward-compatible API
 */
export function useGameState(): GameState {
  return useAtomValue(gameStateAtom);
}

/**
 * Access only board state (military context, progress tokens)
 * Replaces: old useBoardState hook
 * Maintains backward-compatible API
 */
export function useBoardState(): BoardState {
  return useAtomValue(boardStateAtom);
}

/**
 * Access only setup state (step history, pending actions, completion status)
 * NEW - provides setup state access
 */
export function useSetupState(): SetupState {
  return useAtomValue(setupStateAtom);
}
