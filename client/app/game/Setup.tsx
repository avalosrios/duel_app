import type { Route } from '~router/app/+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Setup - Duel App' },
    { name: 'description', content: 'Setup your Duel Game' },
  ];
}

interface SetupStep {
  name: string;
  description: string;
  substeps?: SetupStep[];
}

const SETUP_STEPS: {
  steps: SetupStep[];
} = {
  steps: [
    {
      name: 'Board Setup',
      description:
        'Place the board between players, conflict pawn in the middle, military tokens face up, and 5 random progress tokens face up.',
      substeps: [
        {
          name: 'Conflict Pawn Tokens',
          description: 'Place the conflict pawn in the middle of the board.',
        },
        {
          name: 'Military Tokens',
          description: 'Place the tokens face up on the board.',
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
    },
    {
      name: 'Wonders Selection',
      description:
        'Players alternately draft 4 Wonders each, using two drafting rounds (first starts with Player 1, second with Player 2).',
      substeps: [
        {
          name: 'Wonder Drafting: Round 1',
          description:
            'Player 1 drafts 1 Wonder. Player 2 drafts 2 Wonders. Player 1 picks the remaining Wonder.',
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
    },
    {
      name: 'Age Structure Setup',
      description:
        'At the start of each Age, arrange the 20 cards in the Age’s specific pyramid-like layout with some face up and others face down.',
    },
    {
      name: 'Turn Sequence',
      description:
        'On your turn, take an accessible card and either construct it, discard it for coins, or use it to build a Wonder.',
    },
    {
      name: 'Wonder Construction Limit',
      description:
        'Only 7 Wonders total can be built during the game. Once the 7th is built, the last unbuilt Wonder is discarded.',
    },
    {
      name: 'End of an Age',
      description:
        'An Age ends when all cards are played. The player with the weaker military (conflict pawn on their side) chooses who starts the next Age.',
    },
  ],
};

// TODO: Add a draft page that does the drafting and shows the cards in the deck

export default function Setup() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Setup</h1>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row'>Setup Content</div>
        <div className='flex flex-col'>
          {SETUP_STEPS.steps.map((step: SetupStep) => (
            <div key={step.name} className='flex flex-col'>
              <h2 className='text-xl font-bold mb-2'>{step.name}</h2>
              <p className='mb-4'>{step.description}</p>
              {step.substeps && (
                <ul className='list-disc list-inside'>
                  {step.substeps.map((substep: SetupStep) => (
                    <li key={substep.name} className='mb-2'>
                      <strong>{substep.name}:</strong> {substep.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
