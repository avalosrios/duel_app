import React, { createContext } from 'react';

interface Player {
  playerID: number;
  name?: string;
  coins: number;
}

export interface GameState {
  players: Player[]; // Max 2
  currentPlayer?: Player | null;
}

function getInitialPlayer(id: number): Player {
  return {
    playerID: id,
    coins: 0,
    name: `Player ${id}`,
  };
}

export const INITIAL_GAME_STATE: GameState = {
  players: [getInitialPlayer(1), getInitialPlayer(2)],
  currentPlayer: null,
};

const gameContext: React.Context<GameState> =
  createContext<GameState>(INITIAL_GAME_STATE);

export default gameContext;
