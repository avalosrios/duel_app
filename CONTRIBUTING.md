# Contributing

## Branch Conventions

Branch names follow the pattern `<type>/<short-description>`:

| Type        | When to use                                 |
| ----------- | ------------------------------------------- |
| `feat/`     | New feature                                 |
| `fix/`      | Bug fix                                     |
| `refactor/` | Code refactor with no behavior change       |
| `chore/`    | Dependency updates, config changes, tooling |
| `docs/`     | Documentation only                          |

Examples: `feat/wonder-draft`, `fix/pawn-boundary`, `chore/update-deps`

## Development Workflow

1. Branch off `main`
2. Make changes — keep commits focused and descriptive
3. Run the checks below before opening a PR
4. Open a PR against `main`

### Before Opening a PR

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Tests
npm test

# Coverage (must meet thresholds)
npm run test:coverage
```

All four must pass. The coverage thresholds are enforced by Jest — see [TESTING.md](./TESTING.md) for details.

## Code Style

- TypeScript strict mode — no `any` unless there's a very good reason
- Interface names get an `I` prefix: `IBoard`, `IBoardSquare`
- Union types over enums: `type VictoryPoints = 0 | 2 | 5 | 10`
- Explicit null checks: `value != null` not `!value`, `!array.length` not `array.length === 0`
- Always use the `~/` path alias — no relative imports that traverse more than one directory
- Never mutate state directly — Jotai atoms are immutable; always return new objects/arrays

For formatting, Prettier handles it:

```bash
npm run format
```

ESLint is configured to auto-remove unused imports.

## Adding New Engine Logic

Engine modules (`app/game/engine/`) are pure functions with no React dependencies. When adding new logic:

1. Write the function in the appropriate engine file (or create a new one if it's a distinct domain)
2. Add tests in `app/game/engine/__tests__/<module>.test.ts`
3. Keep coverage above the thresholds defined in `jest.config.mjs`

## Adding New State

Atoms live in `app/game/state/`. Follow the existing pattern:

- Primitive atoms for base state
- Derived atoms for computed values
- Write-only action atoms for complex updates that touch multiple atoms

Expose new atoms through the relevant hook (`useGameStore`, `useGameDispatch`, etc.) rather than importing atoms directly in components.

## PR Guidelines

- Keep PRs focused — one feature or fix per PR
- Reference any related issues in the PR description
- Include a brief summary of what changed and why
- Tests are required for new engine logic
- UI-only changes don't require tests but must pass typecheck and lint

## Commit Messages

Plain English, present tense, imperative mood:

```
Add wonder draft round 2 initialization
Fix conflict pawn boundary at position -9
Refactor setup atoms to use per-step action map
```
