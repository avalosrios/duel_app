import type { ProgressToken } from '~/game/types';
import type { ISetupStep } from '~/game/setup/SetupStep';

/**
 * Core game configuration constants
 * Consolidated from:
 * - hooks/useGameDispatchSetup.ts (INITIAL_COINS, INITIAL_CONFLICT_PAWN_POSITION)
 * - board/ProgressTokenGrid.tsx (PROGRESS_TOKEN_COUNT)
 */
export const GAME_CONFIG = {
  INITIAL_COINS: 7,
  INITIAL_CONFLICT_PAWN_POSITION: 0,
  MAX_PLAYERS: 2,
  MAX_PROGRESS_TOKENS: 5,
  TOTAL_WONDERS: 7,
  MIN_PAWN_POSITION: -9,
  MAX_PAWN_POSITION: 9,
} as const;

/**
 * Military token definitions
 * Extracted from state/board.reducer.ts (MILITARY_TOKEN_5, MILITARY_TOKEN_2)
 */
export const MILITARY_TOKENS = {
  TOKEN_2: { coinPenalty: 2, position: 1 as const },
  TOKEN_5: { coinPenalty: 5, position: 2 as const },
} as const;

/**
 * All 10 progress tokens (5 will be randomly selected during setup)
 * Extracted from setup/constants.ts
 */
export const PROGRESS_TOKENS: ProgressToken[] = [
  {
    name: 'Agriculture',
    effects: [
      'Immediately take 6 coins from the Bank',
      'Worth 4 victory points',
    ],
    isSet: false,
  },
  {
    name: 'Architecture',
    effects: [
      'Future Wonders cost 2 fewer resources',
      'Player may choose which resources the discount applies to at each construction',
    ],
    isSet: false,
  },
  {
    name: 'Economy',
    effects: [
      'Gain the money your opponent spends when trading for resources',
      'Only applies to money spent on resource purchases, not coin costs in building construction',
    ],
    isSet: false,
  },
  {
    name: 'Law',
    effects: ['Grants one scientific symbol'],
    isSet: false,
  },
  {
    name: 'Masonry',
    effects: [
      'Future Civilian Buildings (blue cards) cost 2 fewer resources',
      'Player may choose which resources the discount applies to at each construction',
    ],
    isSet: false,
  },
  {
    name: 'Mathematics',
    effects: [
      'At the end of the game, gain 3 victory points for each Progress token owned, including itself',
    ],
    isSet: false,
  },
  {
    name: 'Philosophy',
    effects: ['Worth 7 victory points'],
    isSet: false,
  },
  {
    name: 'Strategy',
    effects: [
      'All future Military Buildings (red cards) gain +1 Shield',
      'Does not affect Wonders with Shield symbols or military cards built before obtaining this token',
    ],
    isSet: false,
  },
  {
    name: 'Theology',
    effects: [
      "All future Wonders you build gain the 'Play Again' effect",
      'Wonders that already have this effect are unaffected',
    ],
    isSet: false,
  },
  {
    name: 'Urbanism',
    effects: [
      'Immediately take 6 coins from the Bank',
      'Each time you construct a Building for free via linking (chain), gain 4 coins',
    ],
    isSet: false,
  },
];

/**
 * Complete setup step configuration (8 main steps with substeps)
 * Extracted from setup/constants.ts
 */
export const SETUP_STEPS: {
  steps: ISetupStep[];
} = {
  steps: [
    {
      name: 'Board Setup',
      description:
        'Place the board between players, conflict pawn in the middle, military tokens face up, and 5 random progress tokens face up.',
      next: 'Starting Coins',
      substeps: [
        {
          name: 'Conflict Pawn Tokens',
          description: 'Place the conflict pawn in the middle of the board.',
          action: 'place_conflict_pawn',
          next: 'Military Tokens',
        },
        {
          name: 'Military Tokens',
          description: 'Place the tokens face up on the board.',
          action: 'place_military_tokens',
          next: 'Progress Tokens',
        },
        {
          name: 'Progress Tokens',
          description: 'Place 5 random progress tokens face up on the board.',
          action: 'place_progress_tokens',
        },
      ],
    },
    {
      name: 'Starting Coins',
      description: 'Each player begins with 7 coins.',
      action: 'setup_coins',
      next: 'Wonders Selection',
    },
    {
      name: 'Wonders Selection',
      description:
        'Players alternately draft 4 Wonders each, using two drafting rounds (first starts with Player 1, second with Player 2).',
      next: 'Prepare Decks',
      substeps: [
        {
          name: 'Wonder Drafting: Round 1',
          description:
            'Player 1 drafts 1 Wonder. Player 2 drafts 2 Wonders. Player 1 picks the remaining Wonder.',
          next: 'Wonder Drafting: Round 2',
        },
        {
          name: 'Wonder Drafting: Round 2',
          description:
            'Player 2 drafts 1 Wonder. Player 1 drafts 2 Wonders. Player 2 picks the remaining Wonder.',
        },
      ],
    },
    {
      name: 'Prepare Decks',
      description:
        'From each Age deck, remove 3 random cards unseen. Shuffle 3 random Guild cards into the Age III deck.',
      next: 'Age Structure Setup',
    },
    {
      name: 'Age Structure Setup',
      description:
        "At the start of each Age, arrange the 20 cards in the Age's specific pyramid-like layout with some face up and others face down.",
      next: 'Turn Sequence',
    },
    {
      name: 'Turn Sequence',
      description:
        'On your turn, take an accessible card and either construct it, discard it for coins, or use it to build a Wonder.',
      next: 'Wonder Construction Limit',
    },
    {
      name: 'Wonder Construction Limit',
      description:
        'Only 7 Wonders total can be built during the game. Once the 7th is built, the last unbuilt Wonder is discarded.',
      next: 'End of an Age',
    },
    {
      name: 'End of an Age',
      description:
        'An Age ends when all cards are played. The player with the weaker military (conflict pawn on their side) chooses who starts the next Age.',
    },
  ],
};
