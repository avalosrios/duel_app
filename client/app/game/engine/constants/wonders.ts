import type { WonderEffect } from '~/game/types';

export interface Wonder {
  id: string;
  name: string;
  effects: WonderEffect[];
}
export const WONDERS: Wonder[] = [
  {
    id: 'appian-way',
    name: 'The Appian Way',
    effects: [
      {
        type: 'gainCoins',
        timing: 'immediate',
        amount: 3,
        target: 'self',
      },
      {
        type: 'gainCoins',
        timing: 'immediate',
        amount: 3,
        target: 'opponent',
      },
      {
        type: 'playAgain',
        timing: 'immediate',
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 3,
      },
    ],
  },
  {
    id: 'circus-maximus',
    name: 'Circus Maximus',
    effects: [
      {
        type: 'discardOpponentCard',
        timing: 'immediate',
        cardColor: 'grey',
      },
      {
        type: 'militaryShields',
        timing: 'passive',
        shields: 1,
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 3,
      },
    ],
  },
  {
    id: 'colossus',
    name: 'The Colossus',
    effects: [
      {
        type: 'militaryShields',
        timing: 'passive',
        shields: 2,
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 3,
      },
    ],
  },
  {
    id: 'great-library',
    name: 'The Great Library',
    effects: [
      {
        type: 'progressTokenChoice',
        timing: 'immediate',
        draw: 3,
        keep: 1,
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 4,
      },
    ],
  },
  {
    id: 'great-lighthouse',
    name: 'The Great Lighthouse',
    effects: [
      {
        type: 'resourceProduction',
        timing: 'passive',
        resources: ['stone', 'clay', 'wood'],
        amount: 1,
        affectsTradingCost: false,
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 4,
      },
    ],
  },
  {
    id: 'hanging-gardens',
    name: 'The Hanging Gardens',
    effects: [
      {
        type: 'gainCoins',
        timing: 'immediate',
        amount: 6,
        target: 'self',
      },
      {
        type: 'playAgain',
        timing: 'immediate',
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 3,
      },
    ],
  },
  {
    id: 'mausoleum',
    name: 'The Mausoleum',
    effects: [
      {
        type: 'buildFromDiscard',
        timing: 'immediate',
        free: true,
        excludesSetupDiscards: true,
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 2,
      },
    ],
  },
  {
    id: 'piraeus',
    name: 'Piraeus',
    effects: [
      {
        type: 'resourceProduction',
        timing: 'passive',
        resources: ['glass', 'papyrus'],
        amount: 1,
        affectsTradingCost: false,
      },
      {
        type: 'playAgain',
        timing: 'immediate',
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 2,
      },
    ],
  },
  {
    id: 'pyramids',
    name: 'The Pyramids',
    effects: [
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 9,
      },
    ],
  },
  {
    id: 'sphinx',
    name: 'The Sphinx',
    effects: [
      {
        type: 'playAgain',
        timing: 'immediate',
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 6,
      },
    ],
  },
  {
    id: 'statue-of-zeus',
    name: 'The Statue of Zeus',
    effects: [
      {
        type: 'discardOpponentCard',
        timing: 'immediate',
        cardColor: 'brown',
      },
      {
        type: 'militaryShields',
        timing: 'passive',
        shields: 1,
      },
      {
        type: 'victoryPoints',
        timing: 'endOfGame',
        points: 3,
      },
    ],
  },
  {
    id: 'temple-of-artemis',
    name: 'The Temple of Artemis',
    effects: [
      {
        type: 'gainCoins',
        timing: 'immediate',
        amount: 12,
        target: 'self',
      },
      {
        type: 'playAgain',
        timing: 'immediate',
      },
    ],
  },
];
