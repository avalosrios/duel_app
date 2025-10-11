import type { ISetupStep } from '~/game/setup/SetupStep';

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
