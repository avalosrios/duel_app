# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based implementation of a board game (appears to be 7 Wonders Duel) built with React Router v7. The application is structured as a single-page application with server-side rendering capabilities, featuring a game setup phase followed by gameplay.

## Technology Stack

- **Framework**: React Router v7 (with SSR)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: TailwindCSS v4
- **State Management**: React Context + useReducer with Immer for immutable updates
- **Build Tool**: Vite
- **Runtime**: Node.js 24.3.0
- **Package Manager**: npm 11.4.2

## Common Commands

### Development
```bash
# Start development server (available at http://localhost:5173)
npm run dev

# Start with Docker Compose (includes proxy at http://localhost)
docker compose up

# Watch mode for auto-reload
docker compose watch
```

### Build & Deploy
```bash
# Production build
npm run build

# Start production server
npm start

# Type checking (generates types + runs tsc)
npm run typecheck

# Linting
npm run lint
```

### Docker
```bash
# Development with Docker
docker compose up

# Build production image
docker build -t duel-app .

# Run production container
docker run -p 3000:3000 duel-app
```

## Architecture

### Directory Structure

```
client/
├── app/                          # Application code
│   ├── common/                   # Shared components (Button, Flexbox, Page)
│   ├── game/                     # Game-specific modules
│   │   ├── board/               # Board UI components (PlayerBoard, MilitaryGrid, etc.)
│   │   ├── engine/              # Pure business logic modules
│   │   │   ├── constants.ts     # All game constants
│   │   │   ├── board.engine.ts  # Board layout & calculations
│   │   │   ├── token.engine.ts  # Token logic & placement
│   │   │   ├── military.engine.ts # Conflict pawn & victory logic
│   │   │   └── setup.engine.ts  # Setup flow & validation
│   │   ├── hooks/               # Custom React hooks
│   │   ├── setup/               # Setup phase UI components
│   │   └── state/               # Unified state management
│   │       ├── types.ts         # All state & action types
│   │       ├── store.reducer.ts # Root reducer
│   │       ├── store.context.ts # Unified contexts
│   │       ├── GameStoreProvider.tsx # Single provider
│   │       └── slices/          # Domain-specific reducers
│   ├── routes/                   # Route components
│   └── routes.ts                 # Route configuration
├── public/                       # Static assets
└── [config files]                # Various config files (tsconfig, vite, etc.)
```

### State Management Architecture

The application uses a **unified state store** with clean separation between business logic and UI:

#### Unified Store (`GameStoreProvider`)
Single provider that manages all game state through a root reducer with domain slices:

1. **Game Slice** (`state/slices/game.slice.ts`)
   - Manages player state (names, coins, current player)
   - Actions: `game/SET_PLAYER_COINS`, `game/INIT_ALL_PLAYER_COINS`, `game/SET_CURRENT_PLAYER`

2. **Board Slice** (`state/slices/board.slice.ts`)
   - Manages board state (conflict pawn, military tokens, progress tokens)
   - Tracks conflict pawn position (x-axis: -9 to 9)
   - Actions: `board/SET_CONFLICT_PAWN_POSITION`, `board/INIT_MILITARY_TOKENS`, `board/INIT_PROGRESS_TOKENS`

3. **Setup Slice** (`state/slices/setup.slice.ts`)
   - Manages multi-step setup flow (step history, pending actions, completion status)
   - Actions: `setup/SET_CURRENT_STEP`, `setup/COMPLETE_ACTION`, `setup/MARK_COMPLETE`

#### State Access Hooks
- `useGameStore()` - Access complete unified state
- `useGameState()` - Access game slice (players, current player)
- `useBoardState()` - Access board slice (military, tokens)
- `useSetupState()` - Access setup slice (step history, pending actions)
- `useGameDispatch()` - Unified dispatch for all actions
- `useSetupFlow()` - High-level setup action dispatcher

#### Engine Modules (Pure Business Logic)
All game logic separated into pure, testable functions:
- `engine/board.engine.ts` - Board layout generation, space calculations
- `engine/token.engine.ts` - Token shuffling, placement rules, initialization
- `engine/military.engine.ts` - Conflict pawn movement, victory conditions
- `engine/setup.engine.ts` - Setup flow navigation, validation
- `engine/constants.ts` - All game constants (initial values, token definitions, setup steps)

#### Architecture Pattern
```
UI Components → Hooks → Unified Store → Slices → Engine Modules
```
- UI components use hooks to access state and dispatch actions
- Hooks provide clean API (e.g., `useSetupFlow()` for setup actions)
- Unified store routes actions to appropriate slices (by prefix: `game/`, `board/`, `setup/`)
- Slices manage state updates using Immer
- Engine modules provide pure business logic functions

### Routing

Defined in `app/routes.ts` using React Router's file-based routing:
```
/ (home)
/game (layout with nested routes)
  /game (index - GameHome)
  /game/setup (Setup phase)
```

### Path Aliases

TypeScript is configured with path aliases:
- `~/` maps to `./app/`
- `~router/` maps to `.react-router/types/`

Always use these aliases instead of relative imports.

## Development Guidelines

### State Updates

- Always use Immer's `produce()` for state updates in reducers
- Never mutate state directly
- Keep reducer logic pure and side-effect free

### Setup Flow

The game setup is a multi-step process managed through the unified setup slice:
1. Board Setup (coins, conflict pawn, tokens)
2. Wonder selection
3. Deck preparation
4. Age setup

Setup actions are dispatched through `useSetupFlow()` hook, which:
- Dispatches game/board actions to initialize state
- Tracks pending actions in setup state
- Marks actions complete when executed

Available setup actions: `setup_coins`, `place_conflict_pawn`, `place_military_tokens`, `place_progress_tokens`, `setup_wonders`, `setup_decks`, `setup_ages`

### Component Patterns

- Use functional components with TypeScript
- Common components in `app/common/` provide reusable UI (Button, Flexbox with extensive styling props, Page wrapper)
- Game-specific components organized by feature (board, setup, etc.)

### TypeScript

- Strict mode enabled
- Use explicit types for component props
- Interface naming: `I` prefix for public interfaces (e.g., `IBoardSquare`, `IBoardToken`)
- Enum-like types: use union types (e.g., `type VictoryPoints = 0 | 2 | 5 | 10`)
- Prefer explicit non empty checks (`!array.length` vs `array.length > 0`) and `value != null` vs `!value`

### Styling

- TailwindCSS v4 is configured
- Utility-first approach
- Style helpers available in `common/stylePadding.ts`
- PostCSS configured for processing

## Key Files to Understand

### Core Architecture
- `app/game/types.ts` - Domain type definitions (board, tokens, game entities)
- `app/game/state/types.ts` - State and action type definitions
- `app/game/state/store.reducer.ts` - Root reducer combining all slices
- `app/game/state/GameStoreProvider.tsx` - Unified state provider

### State Slices
- `app/game/state/slices/game.slice.ts` - Player state management
- `app/game/state/slices/board.slice.ts` - Board state management
- `app/game/state/slices/setup.slice.ts` - Setup flow management

### Engine Modules (Business Logic)
- `app/game/engine/constants.ts` - All game constants and configurations
- `app/game/engine/board.engine.ts` - Board layout generation and calculations
- `app/game/engine/token.engine.ts` - Token logic and placement rules
- `app/game/engine/military.engine.ts` - Conflict pawn and victory logic
- `app/game/engine/setup.engine.ts` - Setup flow validation and navigation

### Hooks
- `app/game/hooks/useGameStore.ts` - Unified state access with selectors
- `app/game/hooks/useGameDispatch.ts` - Unified action dispatcher
- `app/game/hooks/useSetupFlow.ts` - Setup action dispatcher

## Testing

No test files currently exist in the codebase. When adding tests, follow React Router testing patterns.

## Notes

- The backend service is commented out in `compose.yml` - currently frontend-only
- The application uses Traefik as a reverse proxy in Docker Compose
- ESLint configured to remove unused imports automatically
- Prettier integration for code formatting
