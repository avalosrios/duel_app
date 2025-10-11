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
