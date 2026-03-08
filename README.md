# Duel App

A web-based implementation of 7 Wonders Duel built with React Router v7, TypeScript, and Jotai for atomic state management.

## Tech Stack

| Layer     | Tool                  | Version |
| --------- | --------------------- | ------- |
| Framework | React Router v7 (SSR) | 7.7.1   |
| Language  | TypeScript (strict)   | 5.9.3   |
| State     | Jotai                 | 2.15.1  |
| Styling   | TailwindCSS v4        | 4.2.1   |
| Build     | Vite                  | 7.3.1   |
| Testing   | Jest + ts-jest        | 29.7.0  |
| Runtime   | Node.js               | 24.3.0  |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server → http://localhost:5173
npm run dev
```

Or with Docker (proxied at `http://localhost`):

```bash
docker compose up

# With hot-reload file watching
docker compose watch
```

## Available Scripts

```bash
npm run dev           # Dev server
npm run build         # Production build
npm start             # Serve production build
npm run typecheck     # Generate types + run tsc
npm run lint          # ESLint
npm run format        # Prettier
npm test              # Run test suite
npm run test:watch    # Watch mode
npm run test:coverage # Tests with coverage report
```

## Project Structure

```
duel_app/
├── client/
│   ├── app/
│   │   ├── common/          # Reusable UI components (Button, Flexbox, Page)
│   │   ├── game/
│   │   │   ├── board/       # Board UI components
│   │   │   ├── engine/      # Pure business logic (no React)
│   │   │   │   ├── __tests__/
│   │   │   │   ├── constants/
│   │   │   │   ├── board.engine.ts
│   │   │   │   ├── token.engine.ts
│   │   │   │   ├── military.engine.ts
│   │   │   │   ├── setup.engine.ts
│   │   │   │   └── wonders.engine.ts
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   ├── setup/       # Setup phase components
│   │   │   └── state/       # Jotai atoms
│   │   └── routes/          # Route components
│   └── [config files]
├── CLAUDE.md                # Detailed architecture reference
├── SETUP_GUIDE.md           # Local development setup
├── TESTING.md               # Testing guide
├── GAME_MECHANICS.md        # Game flow & feature docs
├── CONTRIBUTING.md          # Contributor guide
└── ARCHITECTURE_OVERVIEW.md # Architecture deep-dive
```

## Current Features

- Game board setup (coins, conflict pawn, tokens)
- Progress token placement
- Wonder draft system (two-round snake draft)
- Setup step flow with per-step action tracking
- Military conflict pawn logic

## Documentation

| Doc                                                    | Description                                |
| ------------------------------------------------------ | ------------------------------------------ |
| [CLAUDE.md](./CLAUDE.md)                               | Architecture reference for AI-assisted dev |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md)                     | Local dev setup and Docker                 |
| [TESTING.md](./TESTING.md)                             | Writing and running tests                  |
| [GAME_MECHANICS.md](./GAME_MECHANICS.md)               | Game flow and feature implementation       |
| [CONTRIBUTING.md](./CONTRIBUTING.md)                   | Contributor workflow and conventions       |
| [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) | State management and code organization     |
