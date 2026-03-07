import { createStore, useAtomValue } from 'jotai';
import { gameStateAtom, boardStateAtom } from '~/game/state/atoms';
import type {
  GameStoreState,
  GameState,
  BoardState,
  SetupState,
  DraftState,
} from '~/game/state/types';
import { setupStateAtom, stepHistoryAtom } from '~/game/state/setupAtoms';
import { draftStateAtom } from '~/game/state/draftAtoms';

/**
 * Access the complete unified game store
 * Use slice-specific selectors below for targeted access
 */
export const gameStore = createStore();
gameStore.set(stepHistoryAtom, []);
// init the store with default values
export default function useGameStore(): GameStoreState {
  const game = useAtomValue(gameStateAtom);
  const board = useAtomValue(boardStateAtom);
  const setup = useAtomValue(setupStateAtom);
  const draft = useAtomValue(draftStateAtom);
  return { game, board, setup, draft };
}

/**
 * Access only game state (players, coins, current player)
 * Replaces: old useGameState hook
 * Maintains backward-compatible API
 */
export function useGameState(): GameState {
  const { game } = useGameStore();
  return game;
}

/**
 * Access only board state (military context, progress tokens, board layout)
 */
export function useBoardState(): BoardState {
  const { board } = useGameStore();
  return board;
}

/**
 * Access only setup state (step history, pending actions, completion status)
 */
export function useSetupState(): SetupState {
  const { setup } = useGameStore();
  return setup;
}

/**
 * Access only draft state (visible wonders, pick order, pick index)
 */
export function useDraftState(): DraftState {
  const { draft } = useGameStore();
  return draft;
}
