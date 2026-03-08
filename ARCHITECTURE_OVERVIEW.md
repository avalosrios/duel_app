# Architecture Overview

For the full reference including all atom names and hook APIs, see [CLAUDE.md](./CLAUDE.md).

---

## Core Principle

Business logic is separated from UI. Engine modules are pure TypeScript functions. React components only talk to state through hooks and atoms — never to engine modules directly.

```
UI Components → Hooks → Jotai Atoms → Engine Modules
```

---

## Layer Breakdown

### Engine (Pure Logic)

`app/game/engine/` — no React, no Jotai, fully testable in isolation.

| Module               | Responsibility                                                    |
| -------------------- | ----------------------------------------------------------------- |
| `board.engine.ts`    | Board layout generation, zone calculations                        |
| `token.engine.ts`    | Token shuffling, placement, initialization                        |
| `military.engine.ts` | Conflict pawn movement, victory conditions                        |
| `setup.engine.ts`    | Setup flow validation and step navigation                         |
| `wonders.engine.ts`  | Wonder pool selection                                             |
| `common.ts`          | Shared utilities (shuffle, random selection)                      |
| `constants/`         | All game constants — token definitions, wonder data, step configs |

### State (Jotai Atoms)

`app/game/state/` — atomic state split by domain.

| File                    | Contains                                                                     |
| ----------------------- | ---------------------------------------------------------------------------- |
| `atoms.ts`              | Game atoms (players, wonders) + board atoms (military, tokens, board layout) |
| `setupAtoms.ts`         | Setup step history, per-step pending actions, setup completion flag          |
| `draftAtoms.ts`         | Wonder draft state — visible wonders, pick order, round tracking             |
| `types.ts`              | All state and action type definitions                                        |
| `GameStoreProvider.tsx` | Jotai `Provider` wrapper — wraps the app at the router level                 |

Three kinds of atoms:

- **Primitive** — base state, updated directly: `playersAtom`, `draftStateAtom`
- **Derived** — computed from other atoms, read-only: `currentPlayerAtom`, `draftCurrentPickerAtom`
- **Action** — write-only, encapsulate complex multi-atom updates: `pickWonderAtom`, `dispatchSetupActionAtom`

### Hooks

`app/game/hooks/` — the interface between components and state.

| Hook                       | Use it when you need                             |
| -------------------------- | ------------------------------------------------ |
| `useGameStore()`           | Full unified state slice (game + board + setup)  |
| `useGameState()`           | Players, current player                          |
| `useBoardState()`          | Military tokens, progress tokens, board layout   |
| `useSetupState()`          | Current setup step, pending actions              |
| `useGameDispatch()`        | Redux-style unified dispatcher (backward compat) |
| `useDispatchSetupAction()` | Preferred hook for dispatching setup actions     |

Components should consume state through hooks, not by importing atoms directly.

### UI Components

Two categories:

- `app/common/` — generic reusable components (Button, Flexbox, Page wrapper, stylePadding helpers)
- `app/game/` — game-specific components, organized by feature:
  - `board/` — PlayerBoard, MilitaryGrid, ProgressTokenGrid
  - `setup/` — SetupStep, WonderDraftStep, WonderCard, step containers

---

## State Flow Example — Wonder Pick

```
User clicks WonderCard
  → WonderCard calls useSetAtom(pickWonderAtom)({ wonderId, round })
    → pickWonderAtom (action atom):
        reads draftStateAtom → validates it's the right round and picker
        updates draftStateAtom → marks wonder as pickedBy
        updates playersAtom → appends wonder to player's deck
        if round complete → calls completeSetupActionAtom(action)
          → setupAtoms updates pendingActionsMapAtom for current step
```

No component knows about the draft logic internals. The action atom owns all the coordination.

---

## Routing

Defined in `app/routes.ts`:

```
/           → Home
/game       → GameLayout (wraps game routes)
  /game     → GameHome
  /game/setup → Setup phase
```

React Router v7 with SSR enabled. Route components are thin — they set up providers and delegate to feature components.

---

## TypeScript Conventions

- Strict mode on
- `I` prefix for public interfaces: `IBoardSquare`, `IBoardToken`
- Union types instead of enums: `type VictoryPoints = 0 | 2 | 5 | 10`
- `value != null` for null/undefined checks
- `!array.length` for empty array checks
- `~/` alias for all app imports — no deep relative paths

---

## Key Design Decisions

**Why Jotai over Redux/Context?**
Fine-grained atom subscriptions — components only re-render when the specific atom they subscribe to changes. No wasted renders from broad context updates.

**Why action atoms?**
Complex state updates that touch multiple atoms are encapsulated in write-only action atoms. This keeps components thin and the logic testable (in theory — atom tests not yet implemented).

**Why separate engine modules?**
Pure functions are easy to unit test and reason about in isolation. The engine never needs to know about React or Jotai's internals.
