import React, { createContext } from 'react';

interface Player {
  name?: string;
}

interface GameState {
  players: Player[]; // Max 2
  currentPlayer?: Player | null;
}

export const INITIAL_GAME_STATE: GameState = {
  players: [],
  currentPlayer: null,
};

const gameContext: React.Context<GameState> =
  createContext<GameState>(INITIAL_GAME_STATE);

export default gameContext;
