import type { BoardSpace, IBoardSquare, VictoryPoints } from '~/game/types';

/**
 * Board layout configuration
 * Extracted from board/MilitaryGrid.tsx (lines 31-66)
 *
 * Board structure:
 * | C | Zone 1 (3) | Zone 2 (3) | Zone 3 (2) | Middle | Zone 4 (2) | Zone 5 (3) | Zone 6 (3) | C |
 * | X | TOKEN/VP   | TOKEN/VP   | TOKEN/VP   | SPACE  | TOKEN/VP   | TOKEN/VP   | TOKEN/VP   | X |
 *
 * Where C = Capital, VP = Victory Points
 */

interface Row {
  size: number;
  points: VictoryPoints;
}

const EMPTY_BOARD_SPACE: BoardSpace = {
  name: '',
  description: '',
  colSize: 1,
  position: 0,
};

/**
 * Generates the complete board layout with 9 squares
 * Layout: Capital | Zone1(3) | Zone2(3) | Zone3(2) | Middle | Zone4(2) | Zone5(3) | Zone6(3) | Capital
 *
 * @returns Array of 9 board squares with spaces, victory points, and positions
 */
export function generateBoardLayout(): IBoardSquare[] {
  const bottomRowSizes: Row[] = [
    { size: 1, points: 0 }, // Start capital
    { size: 3, points: 10 }, // Zone 1
    { size: 3, points: 5 }, // Zone 2
    { size: 2, points: 2 }, // Zone 3
    { size: 1, points: 0 }, // Middle space
    { size: 2, points: 2 }, // Zone 4
    { size: 3, points: 5 }, // Zone 5
    { size: 3, points: 10 }, // Zone 6
    { size: 1, points: 0 }, // End capital
  ];

  // Calculate starting position (negative side of board)
  // -1 because we don't count the middle space in the total
  let totalSpaces =
    (bottomRowSizes.reduce<number>((acc: number, { size }) => acc + size, -1) *
      -1) /
    2;

  return bottomRowSizes.map(({ size, points }) => {
    const spaces: BoardSpace[] = Array(size)
      .fill(EMPTY_BOARD_SPACE)
      .map((space: BoardSpace, idx: number) => {
        return {
          name: `N-${size + 1}`,
          description: `Space ${idx + 1}`,
          colSize: 1,
          position: totalSpaces++,
        };
      });

    return {
      spaces,
      id: `Square ${size}`,
      victoryPoints: points,
      position: totalSpaces < 0 ? 'start' : 'end',
    };
  });
}

/**
 * Calculates the absolute position for a space within a zone
 * @param zone Zone index (0-8)
 * @param spaceIndex Index within the zone
 * @returns Absolute position on the board (-9 to 9)
 */
export function calculateSpacePosition(
  zone: number,
  spaceIndex: number
): number {
  const layout = generateBoardLayout();
  if (zone < 0 || zone >= layout.length) {
    throw new Error(`Invalid zone index: ${zone}`);
  }

  const square = layout[zone];
  if (spaceIndex < 0 || spaceIndex >= square.spaces.length) {
    throw new Error(
      `Invalid space index: ${spaceIndex} for zone ${zone} with ${square.spaces.length} spaces`
    );
  }

  return square.spaces[spaceIndex].position;
}

/**
 * Gets a board square by its position
 * @param position Position on the board (-9 to 9)
 * @returns The board square containing that position, or null if not found
 */
export function getBoardSquareByPosition(
  position: number
): IBoardSquare | null {
  const layout = generateBoardLayout();
  return (
    layout.find(square =>
      square.spaces.some(space => space.position === position)
    ) ?? null
  );
}

/**
 * Checks if a position is a capital space (immediate military victory)
 * @param position Position on the board (-9 to 9)
 * @returns True if position is either capital (-9 or 9)
 */
export function isCapitalSpace(position: number): boolean {
  return position === -9 || position === 9;
}

/**
 * Gets the zone index for a given position
 * @param position Position on the board (-9 to 9)
 * @returns Zone index (0-8), or -1 if position not found
 */
export function getZoneForPosition(position: number): number {
  const layout = generateBoardLayout();
  return layout.findIndex(square =>
    square.spaces.some(space => space.position === position)
  );
}
