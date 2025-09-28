import React, { createContext } from 'react';

interface MilitaryToken {
  coinPenalty: number;
  position: 1 | 2;
  isSet: boolean; // Indicates that the token is set on the board
}

interface ProgressToken {
  isSet: boolean; // Indicates that the token is set on the board
  // TODO: There may be more properties here
}

interface BoardMilitaryContextState {
  conflictPawnPosition: { x: number }; // Conflict pawn moves right or left
  militaryTokens: {
    start: MilitaryToken[]; // Military tokens at the start of the board
    end: MilitaryToken[]; // Military tokens at the end of the board
  };
}

// The board represents the military rivalry between the two cities (players).
// It is divided into zones (9) and spaces (19). The last space on each end
// represents the players capital.
// It also holds the Military tokens and the progress tokens for the game
interface BoardContextState {
  militaryContext: BoardMilitaryContextState;
  progressTokens: ProgressToken[];
}

export const DEFAULT_BOARD_STATE: BoardContextState = {
  militaryContext: {
    conflictPawnPosition: { x: 0 }, // Can move between -9 to 9
    militaryTokens: {
      start: [], // No need to set them up as the board is empty before the setup
      end: [], // No need to set them up as the board is empty before the setup
    },
  },
  progressTokens: [], // A maximum of 5 progress tokens can be placed on the board
};

const boardContext: React.Context<BoardContextState> =
  createContext<BoardContextState>(DEFAULT_BOARD_STATE);

export default boardContext;
