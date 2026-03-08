import {
  movePawn,
  isPawnInCapital,
  calculateMilitaryVictory,
  getShieldDelta,
  getWeakerPlayer,
} from '../military.engine';
import { GAME_CONFIG } from '../constants/config';

const MIN = GAME_CONFIG.MIN_PAWN_POSITION; // -9
const MAX = GAME_CONFIG.MAX_PAWN_POSITION; // 9

describe('movePawn', () => {
  it('moves pawn to the right (positive shields)', () => {
    expect(movePawn(0, 3)).toBe(3);
  });

  it('moves pawn to the left (negative shields)', () => {
    expect(movePawn(0, -3)).toBe(-3);
  });

  it('stays at same position with 0 shields', () => {
    expect(movePawn(5, 0)).toBe(5);
    expect(movePawn(-3, 0)).toBe(-3);
  });

  it('clamps to MAX when movement would exceed right boundary', () => {
    expect(movePawn(8, 5)).toBe(MAX);
    expect(movePawn(MAX, 1)).toBe(MAX);
  });

  it('clamps to MIN when movement would exceed left boundary', () => {
    expect(movePawn(-8, -5)).toBe(MIN);
    expect(movePawn(MIN, -1)).toBe(MIN);
  });

  it('lands exactly on MAX boundary', () => {
    expect(movePawn(6, 3)).toBe(MAX);
  });

  it('lands exactly on MIN boundary', () => {
    expect(movePawn(-6, -3)).toBe(MIN);
  });

  it('moves from center to a mid-board position', () => {
    expect(movePawn(0, 5)).toBe(5);
    expect(movePawn(0, -5)).toBe(-5);
  });
});

describe('isPawnInCapital', () => {
  it('returns true when pawn is at start capital (MIN position)', () => {
    expect(isPawnInCapital(MIN, 'start')).toBe(true);
  });

  it('returns true when pawn is at end capital (MAX position)', () => {
    expect(isPawnInCapital(MAX, 'end')).toBe(true);
  });

  it('returns false for start side when pawn is at MAX', () => {
    expect(isPawnInCapital(MAX, 'start')).toBe(false);
  });

  it('returns false for end side when pawn is at MIN', () => {
    expect(isPawnInCapital(MIN, 'end')).toBe(false);
  });

  it('returns false for any mid-board position', () => {
    const midPositions = [-8, -5, -1, 0, 1, 5, 8];
    for (const pos of midPositions) {
      expect(isPawnInCapital(pos, 'start')).toBe(false);
      expect(isPawnInCapital(pos, 'end')).toBe(false);
    }
  });
});

describe('calculateMilitaryVictory', () => {
  it('player 2 wins immediately when pawn reaches MIN (-9)', () => {
    const result = calculateMilitaryVictory(MIN);
    expect(result.winner).toBe(2);
    expect(result.immediate).toBe(true);
  });

  it('player 1 wins immediately when pawn reaches MAX (9)', () => {
    const result = calculateMilitaryVictory(MAX);
    expect(result.winner).toBe(1);
    expect(result.immediate).toBe(true);
  });

  it('no winner when pawn is at center (0)', () => {
    const result = calculateMilitaryVictory(0);
    expect(result.winner).toBeNull();
    expect(result.immediate).toBe(false);
  });

  it('no winner for positions between boundaries', () => {
    const midPositions = [-8, -5, -1, 1, 5, 8];
    for (const pos of midPositions) {
      const result = calculateMilitaryVictory(pos);
      expect(result.winner).toBeNull();
      expect(result.immediate).toBe(false);
    }
  });
});

describe('getShieldDelta', () => {
  it('returns positive value when player has more shields', () => {
    expect(getShieldDelta(5, 3)).toBe(2);
  });

  it('returns negative value when opponent has more shields', () => {
    expect(getShieldDelta(2, 7)).toBe(-5);
  });

  it('returns 0 when both players have equal shields', () => {
    expect(getShieldDelta(4, 4)).toBe(0);
    expect(getShieldDelta(0, 0)).toBe(0);
  });

  it('returns correct delta for edge cases (0 shields)', () => {
    expect(getShieldDelta(0, 3)).toBe(-3);
    expect(getShieldDelta(3, 0)).toBe(3);
  });
});

describe('getWeakerPlayer', () => {
  it('returns player 1 when pawn is on the negative side', () => {
    expect(getWeakerPlayer(-1)).toBe(1);
    expect(getWeakerPlayer(-5)).toBe(1);
    expect(getWeakerPlayer(MIN)).toBe(1);
  });

  it('returns player 2 when pawn is on the positive side', () => {
    expect(getWeakerPlayer(1)).toBe(2);
    expect(getWeakerPlayer(5)).toBe(2);
    expect(getWeakerPlayer(MAX)).toBe(2);
  });

  it('returns null when pawn is exactly at center (balanced)', () => {
    expect(getWeakerPlayer(0)).toBeNull();
  });
});
