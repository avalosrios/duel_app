# Testing

Tests cover the engine layer — pure business logic functions with no React dependencies. Jest is configured with `ts-jest` for TypeScript support and ESM compatibility.

## Running Tests

```bash
# Run all tests
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# With coverage report
npm run test:coverage
```

Coverage output is written to `coverage/` in text, HTML, and lcov formats.

## Configuration

`jest.config.mjs` at the root of `client/`:

- **Preset**: `ts-jest/presets/default-esm` (ESM + TypeScript)
- **Test match**: `**/__tests__/**/*.test.ts` and `**/*.spec.ts`
- **Module alias**: `~/` → `app/` (mirrors the TypeScript path alias)
- **Coverage scope**: `app/game/engine/**/*.ts` (engine modules only, constants excluded)

### Coverage Thresholds

| Metric     | Threshold |
| ---------- | --------- |
| Lines      | 80%       |
| Functions  | 80%       |
| Branches   | 70%       |
| Statements | 80%       |

Engines not yet covered (marked for a future phase): `setup.engine.ts`, `wonders.engine.ts`.

## File Organization

Tests live alongside the modules they cover:

```
app/game/engine/
├── __tests__/
│   ├── board.engine.test.ts
│   ├── token.engine.test.ts
│   ├── military.engine.test.ts
│   ├── common.test.ts
│   └── tsconfig.json        # test-specific TS config
├── board.engine.ts
├── token.engine.ts
├── military.engine.ts
└── common.ts
```

New test files go in `__tests__/` and follow the `<module>.test.ts` naming convention.

## Writing Tests

Engine functions are pure (no side effects, no React), so tests are straightforward.

```typescript
import { generateBoardLayout } from "../board.engine";

describe("generateBoardLayout", () => {
  it("returns exactly 9 board squares", () => {
    const layout = generateBoardLayout();
    expect(layout).toHaveLength(9);
  });

  it("outermost zones have 10 victory points", () => {
    const layout = generateBoardLayout();
    expect(layout[1].victoryPoints).toBe(10);
    expect(layout[7].victoryPoints).toBe(10);
  });
});
```

A few patterns used throughout:

- **`describe` blocks** group tests by function name
- **`it` descriptions** are plain English statements about expected behavior
- **Randomized functions** (shuffles, selections) are tested by asserting on output length, uniqueness, and subset membership — not on exact values
- **Edge cases** (empty arrays, boundary positions, invalid inputs) get their own `it` blocks

## What's Tested

| Module               | Coverage                                                    |
| -------------------- | ----------------------------------------------------------- |
| `board.engine.ts`    | Board layout generation, space positions, zone calculations |
| `token.engine.ts`    | Token shuffling, placement, initialization                  |
| `military.engine.ts` | Conflict pawn movement, victory conditions                  |
| `common.ts`          | Shared utility functions (shuffle, random selection)        |

## What's Not Tested Yet

- `setup.engine.ts` — setup flow validation and navigation
- `wonders.engine.ts` — wonder pool initialization
- React components and hooks
- Jotai atoms and state transitions

These are tracked as future work. When adding tests for new engine functions, follow the same pattern: one `describe` block per exported function, test each behavior independently.
