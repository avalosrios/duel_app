import type { ProgressToken } from '~/game/types';

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
 * Military token definitions
 * Extracted from state/board.reducer.ts (MILITARY_TOKEN_5, MILITARY_TOKEN_2)
 */
export const MILITARY_TOKENS = {
  TOKEN_2: { coinPenalty: 2, position: 1 as const },
  TOKEN_5: { coinPenalty: 5, position: 2 as const },
} as const;
