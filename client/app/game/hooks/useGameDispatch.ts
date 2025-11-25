import { useContext } from 'react';
import { GameStoreDispatchContext } from '~/game/state/store.context';
import type { GameStoreAction } from '~/game/state/types';

/**
 * Access the unified dispatch function
 * Handles all game/, board/, and setup/ actions
 *
 * Replaces:
 * - useGameDispatch (from game.reducer.ts)
 * - useBoardDispatch (from board.reducer.ts)
 */
export default function useGameDispatch(): React.Dispatch<GameStoreAction> {
  return useContext(GameStoreDispatchContext);
}
