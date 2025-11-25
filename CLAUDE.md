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
│   │   ├── board/               # Board components (PlayerBoard, MilitaryGrid, etc.)
│   │   ├── hooks/               # Game-specific hooks
│   │   ├── setup/               # Setup phase components and logic
│   │   └── state/               # Context providers and reducers
│   ├── routes/                   # Route components
│   └── routes.ts                 # Route configuration
├── public/                       # Static assets
└── [config files]                # Various config files (tsconfig, vite, etc.)
```

### State Management Architecture

The application uses a **multi-context architecture** with separate concerns:

1. **GameContext** (`game.context.ts` + `game.reducer.ts`)
   - Manages player state (names, coins, current player)
   - Actions: `SET_PLAYER_COINS`, `INIT_ALL_PLAYER_COINS`, `SET_CURRENT_PLAYER`
   - Uses Immer for immutable updates

2. **BoardContext** (`board.context.ts` + `board.reducer.ts`)
   - Manages the game board state
   - Tracks conflict pawn position (x-axis: -9 to 9)
   - Manages military tokens (start/end positions)
   - Handles progress tokens (max 5)
   - Actions: `SET_CONFLICT_PAWN_POSITION`, `INIT_MILITARY_TOKENS`, `INIT_PROGRESS_TOKENS`

3. **SetupContext** (`setup.context.ts`)
   - Manages the multi-step game setup flow
   - Tracks step history and pending actions
   - Setup actions include: `setup_coins`, `place_conflict_pawn`, `place_military_tokens`, `place_progress_tokens`, `setup_wonders`, `setup_decks`, `setup_ages`

### Context Provider Pattern

- All context providers follow the pattern: `[Name]ContextProvider.tsx` wraps children with both state context and dispatch context
- Dispatch contexts use `useReducer` with dedicated reducer functions
- Custom hooks like `useGameDispatch()`, `useBoardDispatch()` provide typed access to dispatchers

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

The game setup is a multi-step process managed through `SetupContext`:
1. Board Setup (coins, conflict pawn, tokens)
2. Wonder selection
3. Deck preparation
4. Age setup

Each setup step can dispatch actions through `useGameDispatchSetup()` hook.

### Component Patterns

- Use functional components with TypeScript
- Common components in `app/common/` provide reusable UI (Button, Flexbox with extensive styling props, Page wrapper)
- Game-specific components organized by feature (board, setup, etc.)

### TypeScript

- Strict mode enabled
- Use explicit types for component props
- Interface naming: `I` prefix for public interfaces (e.g., `IBoardSquare`, `IBoardToken`)
- Enum-like types: use union types (e.g., `type VictoryPoints = 0 | 2 | 5 | 10`)

### Styling

- TailwindCSS v4 is configured
- Utility-first approach
- Style helpers available in `common/stylePadding.ts`
- PostCSS configured for processing

## Key Files to Understand

- `app/game/types.ts` - Core type definitions for board, tokens, and game entities
- `app/game/state/game.reducer.ts` - Main game state reducer
- `app/game/state/board.reducer.ts` - Board state reducer
- `app/game/hooks/useGameDispatchSetup.ts` - Setup action dispatcher
- `app/game/board/Board.ts` - Board logic and utilities

## Testing

No test files currently exist in the codebase. When adding tests, follow React Router testing patterns.

## Notes

- The backend service is commented out in `compose.yml` - currently frontend-only
- The application uses Traefik as a reverse proxy in Docker Compose
- ESLint configured to remove unused imports automatically
- Prettier integration for code formatting
