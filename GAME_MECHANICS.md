# Game Mechanics

## TL;DR — 7 Wonders Duel

Two-player card drafting game. Players build a civilization by purchasing cards from a shared pyramid layout, earning resources, science, military strength, and victory points. Win by military supremacy, science monopoly, or most points at game end.

---

## Setup Flow

The game goes through a multi-step setup before play begins. Each step has one or more **setup actions** that must be completed before advancing.

```
board_setup → wonder_draft → deck_setup → age_setup → game_start
```

Steps are tracked in `setupAtoms.ts` via a **step history stack** (`stepHistoryAtom`). The current step is always the last entry in the stack. Each step stores its own pending/completed actions in `pendingActionsMapAtom`.

Available setup actions:

| Action                  | Step         |
| ----------------------- | ------------ |
| `setup_coins`           | board_setup  |
| `place_conflict_pawn`   | board_setup  |
| `place_military_tokens` | board_setup  |
| `place_progress_tokens` | board_setup  |
| `wonders_draft_1`       | wonder_draft |
| `wonders_draft_2`       | wonder_draft |
| `setup_decks`           | deck_setup   |
| `setup_ages`            | age_setup    |

Dispatching a setup action goes through `useDispatchSetupAction()` → `dispatchSetupActionAtom` → marks it complete via `completeSetupActionAtom`.

---

## Wonder Draft Feature

### Overview

Before gameplay, 8 wonders are randomly selected from the full pool and distributed between both players via a **two-round snake draft**:

- **Round 1**: 4 wonders shown, pick order `P1 → P2 → P2 → P1`
- **Round 2**: remaining 4 wonders shown, pick order `P2 → P1 → P1 → P2`

This is the standard snake draft pattern — the player who picked last in round 1 picks first in round 2.

### State

All draft state lives in `client/app/game/state/draftAtoms.ts`.

**`draftStateAtom`** (primitive) — the single source of truth for draft state:

```typescript
type DraftState = {
  visibleWonders: DraftPickEntry[]; // wonders shown in current round
  remainingWonders: Wonder[]; // held back for round 2
  pickOrder: number[]; // player IDs in pick sequence
  pickIndex: number; // current position in pickOrder
  activeRound: 1 | 2 | null;
};
```

**`draftCurrentPickerAtom`** (derived) — the playerID whose turn it currently is. Returns `null` if the draft is inactive or all picks are complete.

**`isDraftRoundCompleteAtom`** (derived) — factory atom; call with a round number to check if all picks for that round are done.

### Actions

| Atom                  | What it does                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `initDraftRound1Atom` | Sets up round 1 — splits 8 wonders into 4 visible + 4 remaining, sets pick order                                                                             |
| `initDraftRound2Atom` | Sets up round 2 — moves remaining wonders to visible, new pick order                                                                                         |
| `pickWonderAtom`      | Records a pick, assigns wonder to player's deck, advances `pickIndex`. Completes `wonders_draft_1` or `wonders_draft_2` setup action when all picks are done |
| `resetDraftAtom`      | Resets to initial state (useful for testing / restart)                                                                                                       |

### Wonder Pool Initialization

`wonders.engine.ts` → `initGameWonders()` selects 8 random wonders from the full `WONDERS` constant using `selectNShuffled`. This runs once when `wondersAtom` is first initialized in `atoms.ts`.

### UI Components

| Component         | Location                    | Purpose                                      |
| ----------------- | --------------------------- | -------------------------------------------- |
| `WonderDraftStep` | `setup/WonderDraftStep.tsx` | Orchestrates the full draft UI for a round   |
| `WonderCard`      | `setup/WonderCard.tsx`      | Single wonder card, handles pick interaction |
| `SetupStep`       | `setup/SetupStep.tsx`       | Generic step wrapper used by each setup step |

### Data Flow

```
initDraftRound1Atom
  → sets draftStateAtom (visibleWonders, pickOrder, round=1)

WonderDraftStep
  → reads draftCurrentPickerAtom (who picks next)
  → renders WonderCard list from draftStateAtom.visibleWonders

WonderCard (on pick)
  → dispatches pickWonderAtom({ wonderId, round })
    → updates draftStateAtom.visibleWonders (marks pickedBy)
    → updates playersAtom (appends wonder to player deck)
    → if round complete → completeSetupActionAtom('wonders_draft_1')

(round 2 mirrors round 1 via initDraftRound2Atom)
```

---

## Board Setup

Handled during `board_setup` step. Each action initializes a piece of the board:

- `setup_coins` → `initAllPlayerCoinsAtom` — sets starting coins for both players
- `place_conflict_pawn` → `setConflictPawnPositionAtom` — places pawn at position 0 (center)
- `place_military_tokens` → `initMilitaryTokensAtom` — places tokens at start/end zones
- `place_progress_tokens` → `initProgressTokensAtom` — randomly selects 5 progress tokens from the pool

---

## Military System

The conflict pawn lives on a 9-zone track (`-9` to `9`). Moving it toward a player's capital triggers military tokens and eventually military victory.

Logic lives in `client/app/game/engine/military.engine.ts`:

- Calculates pawn movement
- Checks victory conditions
- Handles token activation thresholds

Board layout (the 9 zones with their VP values) is generated by `board.engine.ts` → `generateBoardLayout()`.
