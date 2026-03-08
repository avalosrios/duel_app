import {
  generateBoardLayout,
  calculateSpacePosition,
  getBoardSquareByPosition,
  isCapitalSpace,
  getZoneForPosition,
} from '../board.engine';

describe('generateBoardLayout', () => {
  it('returns exactly 9 board squares', () => {
    const layout = generateBoardLayout();
    expect(layout).toHaveLength(9);
  });

  it('first square is the start capital with 0 victory points', () => {
    const layout = generateBoardLayout();
    expect(layout[0].victoryPoints).toBe(0);
  });

  it('last square is the end capital with 0 victory points', () => {
    const layout = generateBoardLayout();
    expect(layout[8].victoryPoints).toBe(0);
  });

  it('middle square (index 4) has 0 victory points', () => {
    const layout = generateBoardLayout();
    expect(layout[4].victoryPoints).toBe(0);
  });

  it('zones 1 and 7 (outermost zones) have 10 victory points', () => {
    const layout = generateBoardLayout();
    expect(layout[1].victoryPoints).toBe(10);
    expect(layout[7].victoryPoints).toBe(10);
  });

  it('zones 2 and 6 have 5 victory points', () => {
    const layout = generateBoardLayout();
    expect(layout[2].victoryPoints).toBe(5);
    expect(layout[6].victoryPoints).toBe(5);
  });

  it('zones 3 and 5 have 2 victory points', () => {
    const layout = generateBoardLayout();
    expect(layout[3].victoryPoints).toBe(2);
    expect(layout[5].victoryPoints).toBe(2);
  });

  it('each square has the correct number of spaces', () => {
    const layout = generateBoardLayout();
    const expectedSizes = [1, 3, 3, 2, 1, 2, 3, 3, 1];
    layout.forEach((square, idx) => {
      expect(square.spaces).toHaveLength(expectedSizes[idx]);
    });
  });

  it('all spaces have unique positions', () => {
    const layout = generateBoardLayout();
    const allPositions = layout.flatMap(square =>
      square.spaces.map(space => space.position)
    );
    expect(new Set(allPositions).size).toBe(allPositions.length);
  });

  it('board is symmetric: positions on left and right are mirrored', () => {
    const layout = generateBoardLayout();
    // Zone 1 (10VP) and Zone 7 (10VP) are mirrors
    const zone1Positions = layout[1].spaces.map(s => s.position);
    const zone7Positions = layout[7].spaces.map(s => s.position);
    const zone1Sum = zone1Positions.reduce((a, b) => a + b, 0);
    const zone7Sum = zone7Positions.reduce((a, b) => a + b, 0);
    // Left zones are negative, right zones are positive, so they should sum to 0 together
    expect(zone1Sum + zone7Sum).toBe(0);
  });

  it('all positions are within the valid board range (-9 to 9)', () => {
    const layout = generateBoardLayout();
    for (const square of layout) {
      for (const space of square.spaces) {
        expect(space.position).toBeGreaterThanOrEqual(-9);
        expect(space.position).toBeLessThanOrEqual(9);
      }
    }
  });

  it('each square has an id property', () => {
    const layout = generateBoardLayout();
    for (const square of layout) {
      expect(square.id).toBeDefined();
      expect(typeof square.id).toBe('string');
    }
  });
});

describe('calculateSpacePosition', () => {
  it('returns a numeric position for valid zone and space index', () => {
    const position = calculateSpacePosition(0, 0);
    expect(typeof position).toBe('number');
  });

  it('returns correct position for the start capital (zone 0, space 0)', () => {
    // Zone 0 is the single start capital space at position -9
    const position = calculateSpacePosition(0, 0);
    expect(position).toBe(-9);
  });

  it('returns correct position for the end capital (zone 8, space 0)', () => {
    // Zone 8 is the single end capital space at position 9
    const position = calculateSpacePosition(8, 0);
    expect(position).toBe(9);
  });

  it('throws an error for a negative zone index', () => {
    expect(() => calculateSpacePosition(-1, 0)).toThrow('Invalid zone index');
  });

  it('throws an error for a zone index >= 9', () => {
    expect(() => calculateSpacePosition(9, 0)).toThrow('Invalid zone index');
    expect(() => calculateSpacePosition(100, 0)).toThrow('Invalid zone index');
  });

  it('throws an error for a negative space index', () => {
    expect(() => calculateSpacePosition(0, -1)).toThrow('Invalid space index');
  });

  it('throws an error for a space index out of bounds for the zone', () => {
    // Zone 0 has only 1 space (index 0), so index 1 is out of bounds
    expect(() => calculateSpacePosition(0, 1)).toThrow('Invalid space index');
    // Zone 1 has 3 spaces (indices 0-2), so index 3 is out of bounds
    expect(() => calculateSpacePosition(1, 3)).toThrow('Invalid space index');
  });
});

describe('getBoardSquareByPosition', () => {
  it('returns the correct square for position -9 (start capital)', () => {
    const square = getBoardSquareByPosition(-9);
    expect(square).not.toBeNull();
    expect(square!.victoryPoints).toBe(0);
  });

  it('returns the correct square for position 9 (end capital)', () => {
    const square = getBoardSquareByPosition(9);
    expect(square).not.toBeNull();
    expect(square!.victoryPoints).toBe(0);
  });

  it('returns a square with 10 VP for positions in outer zones', () => {
    // Positions in zone 1 (the 10 VP zone on the left) should be around -8 to -6
    const layout = generateBoardLayout();
    const zone1Position = layout[1].spaces[0].position;
    const square = getBoardSquareByPosition(zone1Position);
    expect(square).not.toBeNull();
    expect(square!.victoryPoints).toBe(10);
  });

  it('returns null for a position not on the board', () => {
    expect(getBoardSquareByPosition(100)).toBeNull();
    expect(getBoardSquareByPosition(-100)).toBeNull();
  });
});

describe('isCapitalSpace', () => {
  it('returns true for position -9 (start capital)', () => {
    expect(isCapitalSpace(-9)).toBe(true);
  });

  it('returns true for position 9 (end capital)', () => {
    expect(isCapitalSpace(9)).toBe(true);
  });

  it('returns false for all other positions', () => {
    const nonCapitalPositions = [-8, -5, -1, 0, 1, 5, 8];
    for (const pos of nonCapitalPositions) {
      expect(isCapitalSpace(pos)).toBe(false);
    }
  });
});

describe('getZoneForPosition', () => {
  it('returns 0 for the start capital position (-9)', () => {
    expect(getZoneForPosition(-9)).toBe(0);
  });

  it('returns 8 for the end capital position (9)', () => {
    expect(getZoneForPosition(9)).toBe(8);
  });

  it('returns 4 for the middle position (0)', () => {
    expect(getZoneForPosition(0)).toBe(4);
  });

  it('returns -1 for positions not on the board', () => {
    expect(getZoneForPosition(100)).toBe(-1);
    expect(getZoneForPosition(-100)).toBe(-1);
  });

  it('returns the correct zone for all valid board positions', () => {
    const layout = generateBoardLayout();
    layout.forEach((square, zoneIdx) => {
      for (const space of square.spaces) {
        expect(getZoneForPosition(space.position)).toBe(zoneIdx);
      }
    });
  });
});
