export interface BoardSpace {
  name: string;
  description: string;
  colSize: number;
  position: number;
}

export type VictoryPoints = 0 | 2 | 5 | 10;
export interface IBoardSquare {
  spaces: BoardSpace[];
  victoryPoints: VictoryPoints;
  position: 'start' | 'end';
  id: string;
}

export interface IBoardToken {
  isSet: boolean;
}

export interface ProgressToken extends IBoardToken {
  name: string;
  effects: string[];
}

export interface MilitaryToken extends IBoardToken {
  coinPenalty: number;
  position: 1 | 2;
}

export interface TokenBoardSpace {
  type: 'progress';
  token: ProgressToken | null;
}

/**
 * Effects that can be granted by Wonders or other game elements
 */

// Common timing hooks (useful later for engine execution)
export type EffectTiming = 'immediate' | 'passive' | 'endOfGame';
export type EffectType =
  | 'gainCoins'
  | 'discardOpponentCard'
  | 'playAgain'
  | 'militaryShields'
  | 'victoryPoints'
  | 'resourceProduction'
  | 'progressTokenChoice'
  | 'buildFromDiscard';

// Base interface
interface BaseEffect {
  timing: EffectTiming;
  type: EffectType;
}

export interface GainCoinsEffect extends BaseEffect {
  type: 'gainCoins';
  amount: number;
  target: 'self' | 'opponent';
}

export interface DiscardOpponentCardEffect extends BaseEffect {
  type: 'discardOpponentCard';
  cardColor: 'brown' | 'grey';
}

export interface PlayAgainEffect extends BaseEffect {
  type: 'playAgain';
}

export interface MilitaryShieldEffect extends BaseEffect {
  type: 'militaryShields';
  shields: number;
}

export interface VictoryPointsEffect extends BaseEffect {
  type: 'victoryPoints';
  points: number;
}

export interface ResourceProductionEffect extends BaseEffect {
  type: 'resourceProduction';
  resources: Array<'stone' | 'clay' | 'wood' | 'glass' | 'papyrus'>;
  amount: 1;
  affectsTradingCost: false;
}

export interface ProgressTokenChoiceEffect extends BaseEffect {
  type: 'progressTokenChoice';
  draw: number;
  keep: number;
}

export interface BuildDiscardedCardEffect extends BaseEffect {
  type: 'buildFromDiscard';
  free: true;
  excludesSetupDiscards: true;
}

export type WonderEffect =
  | GainCoinsEffect
  | DiscardOpponentCardEffect
  | PlayAgainEffect
  | MilitaryShieldEffect
  | VictoryPointsEffect
  | ResourceProductionEffect
  | ProgressTokenChoiceEffect
  | BuildDiscardedCardEffect;

/**
 * ---- END OF EFFECT INTERFACES ----
 */
