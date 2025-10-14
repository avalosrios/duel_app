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
