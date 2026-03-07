import { atom } from 'jotai';
import type { DraftPickEntry, DraftState } from '~/game/state/types';
import type { Wonder } from '~/game/types';
import { playersAtom, wondersAtom } from '~/game/state/atoms';
import { completeSetupActionAtom } from '~/game/state/setupAtoms';

// ============================================
// DRAFT CONSTANTS
// ============================================

const DRAFT_ROUND_SIZE = 4;

// Snake draft pick orders: who picks at each index (playerID)
const PICK_ORDER_ROUND_1: number[] = [1, 2, 2, 1];
const PICK_ORDER_ROUND_2: number[] = [2, 1, 1, 2];

// ============================================
// DRAFT STATE ATOM
// ============================================

const INITIAL_DRAFT_STATE: DraftState = {
  visibleWonders: [],
  remainingWonders: [],
  pickOrder: [],
  pickIndex: 0,
  activeRound: null,
};

export const draftStateAtom = atom<DraftState>(INITIAL_DRAFT_STATE);

// ============================================
// DERIVED ATOMS (read-only)
// ============================================

/**
 * The playerID whose turn it is to pick in the current draft round.
 * Returns null if the draft is not active or all picks are done.
 */
export const draftCurrentPickerAtom = atom<number | null>(get => {
  const { pickOrder, pickIndex, activeRound } = get(draftStateAtom);
  if (activeRound == null || pickIndex >= pickOrder.length) return null;
  return pickOrder[pickIndex];
});

/**
 * Whether all picks in the current draft round are complete.
 * Requires a round argument to check against the active round.
 */
export const isDraftRoundCompleteAtom = atom<(round: 1 | 2) => boolean>(
  get => (round: 1 | 2) => {
    const { pickOrder, pickIndex, activeRound } = get(draftStateAtom);
    return activeRound === round && pickIndex >= pickOrder.length;
  }
);

// ============================================
// DRAFT ACTION ATOMS (write-only)
// ============================================

/**
 * Initializes Draft Round 1.
 * Splits the 8-wonder pool: first 4 go to visibleWonders, last 4 held as remainingWonders.
 * Pick order: P1 → P2 → P2 → P1.
 */
export const initDraftRound1Atom = atom(null, (get, set) => {
  const wonders = get(wondersAtom);
  const visible: DraftPickEntry[] = wonders
    .slice(0, DRAFT_ROUND_SIZE)
    .map(wonder => ({ wonder, pickedBy: null }));
  const remaining: Wonder[] = wonders.slice(DRAFT_ROUND_SIZE);

  set(draftStateAtom, {
    visibleWonders: visible,
    remainingWonders: remaining,
    pickOrder: PICK_ORDER_ROUND_1,
    pickIndex: 0,
    activeRound: 1,
  });
});

/**
 * Initializes Draft Round 2.
 * Moves the remaining 4 wonders to visibleWonders.
 * Pick order: P2 → P1 → P1 → P2.
 */
export const initDraftRound2Atom = atom(null, (get, set) => {
  const { remainingWonders } = get(draftStateAtom);
  const visible: DraftPickEntry[] = remainingWonders.map(wonder => ({
    wonder,
    pickedBy: null,
  }));

  set(draftStateAtom, {
    visibleWonders: visible,
    remainingWonders: [],
    pickOrder: PICK_ORDER_ROUND_2,
    pickIndex: 0,
    activeRound: 2,
  });
});

/**
 * Records a wonder pick for the current picker.
 * Assigns the wonder to the player's deck and advances the pick index.
 * When all picks in a round are done, completes the corresponding setup action.
 *
 * @param payload - { wonderId: string; round: 1 | 2 }
 */
export const pickWonderAtom = atom(
  null,
  (get, set, payload: { wonderId: string; round: 1 | 2 }) => {
    const draft = get(draftStateAtom);
    const { pickOrder, pickIndex, visibleWonders, activeRound } = draft;

    // Guard: only process picks for the currently active round
    if (activeRound !== payload.round) return;
    if (pickIndex >= pickOrder.length) return;

    const currentPickerID = pickOrder[pickIndex];
    const entryIndex = visibleWonders.findIndex(
      e => e.wonder.id === payload.wonderId && e.pickedBy == null
    );
    if (entryIndex === -1) return;

    // Mark the wonder as picked in the visible list
    const updatedVisible: DraftPickEntry[] = visibleWonders.map((e, i) =>
      i === entryIndex ? { ...e, pickedBy: currentPickerID } : e
    );

    const newPickIndex = pickIndex + 1;

    set(draftStateAtom, {
      ...draft,
      visibleWonders: updatedVisible,
      pickIndex: newPickIndex,
    });

    // Append the picked wonder to the player's deck
    const players = get(playersAtom);
    set(
      playersAtom,
      players.map(player => {
        if (player.playerID === currentPickerID) {
          return {
            ...player,
            deck: {
              ...player.deck,
              wonders: [
                ...player.deck.wonders,
                visibleWonders[entryIndex].wonder,
              ],
            },
          };
        }
        return player;
      })
    );

    // Complete the setup action when all picks for this round are done
    if (newPickIndex >= pickOrder.length) {
      const action =
        payload.round === 1 ? 'wonders_draft_1' : 'wonders_draft_2';
      set(completeSetupActionAtom, action);
    }
  }
);

/**
 * Resets draft state back to initial (useful for testing / restart).
 */
export const resetDraftAtom = atom(null, (_get, set) => {
  set(draftStateAtom, INITIAL_DRAFT_STATE);
});
