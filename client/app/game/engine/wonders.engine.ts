// TODO: Implement the drafting system
// 1) we want to shuffle the wonders
// 2) Take 8 cards   -> Move to game state
// 3) Track player that is picking -> game state
// 4) Move the selected card to each player hand -> game state

// We should probably implement this as part of the action in the
// steps

// export function draftWonders<T extends Wonder>(
//   wonders: T[],
// ): T[] {
//   const daftPool selectRandomShuffled(wonders, count);
// }

import { selectNShuffled } from '~/game/engine/common';
import { WONDERS } from '~/game/engine/constants/wonders';

const MAX_WONDERS = 8;

export function initGameWonders() {
  return selectNShuffled(WONDERS, MAX_WONDERS);
}
