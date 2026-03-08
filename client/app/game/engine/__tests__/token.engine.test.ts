import {
  shuffleTokens,
  selectRandomTokens,
  findMilitaryToken,
  initializeMilitaryTokens,
  initializeProgressTokens,
} from '../token.engine';
import { MILITARY_TOKENS, PROGRESS_TOKENS } from '../constants/tokens';
import { GAME_CONFIG } from '../constants/config';
import type { MilitaryToken, ProgressToken } from '../../types';

describe('shuffleTokens', () => {
  it('returns an array of the same length', () => {
    const tokens: MilitaryToken[] = [
      { ...MILITARY_TOKENS.TOKEN_2, isSet: false },
      { ...MILITARY_TOKENS.TOKEN_5, isSet: false },
    ];
    expect(shuffleTokens(tokens)).toHaveLength(tokens.length);
  });

  it('returns all original elements', () => {
    const tokens: MilitaryToken[] = [
      { ...MILITARY_TOKENS.TOKEN_2, isSet: false },
      { ...MILITARY_TOKENS.TOKEN_5, isSet: false },
    ];
    const result = shuffleTokens(tokens);
    for (const token of tokens) {
      expect(result).toContainEqual(token);
    }
  });

  it('returns a new array and does not mutate the original', () => {
    const tokens: MilitaryToken[] = [
      { ...MILITARY_TOKENS.TOKEN_2, isSet: false },
      { ...MILITARY_TOKENS.TOKEN_5, isSet: false },
    ];
    const original = [...tokens];
    const result = shuffleTokens(tokens);
    expect(result).not.toBe(tokens);
    expect(tokens).toEqual(original);
  });

  it('handles an empty array', () => {
    expect(shuffleTokens([])).toEqual([]);
  });
});

describe('selectRandomTokens', () => {
  const allTokens: ProgressToken[] = PROGRESS_TOKENS.map(t => ({ ...t }));

  it('returns exactly N tokens', () => {
    expect(selectRandomTokens(allTokens, 5)).toHaveLength(5);
    expect(selectRandomTokens(allTokens, 3)).toHaveLength(3);
  });

  it('every returned token exists in the source array', () => {
    const result = selectRandomTokens(allTokens, 5);
    for (const token of result) {
      expect(allTokens).toContainEqual(token);
    }
  });

  it('returns 0 tokens when count is 0', () => {
    expect(selectRandomTokens(allTokens, 0)).toHaveLength(0);
  });

  it('returns all tokens when count equals array length', () => {
    const result = selectRandomTokens(allTokens, allTokens.length);
    expect(result).toHaveLength(allTokens.length);
  });

  it('does not return duplicate tokens', () => {
    const result = selectRandomTokens(allTokens, 7);
    const names = result.map((t: ProgressToken) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('findMilitaryToken', () => {
  const tokens: MilitaryToken[] = [
    { ...MILITARY_TOKENS.TOKEN_2, isSet: true },
    { ...MILITARY_TOKENS.TOKEN_5, isSet: true },
  ];

  it('returns null for 0 victory points', () => {
    expect(findMilitaryToken(tokens, 0)).toBeNull();
  });

  it('returns null for a VP value that is not a multiple of 5 (e.g. 2)', () => {
    expect(findMilitaryToken(tokens, 2)).toBeNull();
  });

  it('returns the token at position 1 for 5 VP', () => {
    const result = findMilitaryToken(tokens, 5);
    expect(result).not.toBeNull();
    expect(result!.position).toBe(1);
    expect(result!.coinPenalty).toBe(MILITARY_TOKENS.TOKEN_2.coinPenalty);
  });

  it('returns the token at position 2 for 10 VP', () => {
    const result = findMilitaryToken(tokens, 10);
    expect(result).not.toBeNull();
    expect(result!.position).toBe(2);
    expect(result!.coinPenalty).toBe(MILITARY_TOKENS.TOKEN_5.coinPenalty);
  });

  it('returns null when no token matches the derived position', () => {
    // Empty token list — no match possible
    expect(findMilitaryToken([], 5)).toBeNull();
    expect(findMilitaryToken([], 10)).toBeNull();
  });
});

describe('initializeMilitaryTokens', () => {
  it('returns an object with start and end arrays', () => {
    const result = initializeMilitaryTokens();
    expect(result).toHaveProperty('start');
    expect(result).toHaveProperty('end');
  });

  it('each side contains exactly 2 tokens', () => {
    const { start, end } = initializeMilitaryTokens();
    expect(start).toHaveLength(2);
    expect(end).toHaveLength(2);
  });

  it('all tokens have isSet = true', () => {
    const { start, end } = initializeMilitaryTokens();
    for (const token of [...start, ...end]) {
      expect(token.isSet).toBe(true);
    }
  });

  it('each side has one token with coinPenalty 5 (position 2)', () => {
    const { start, end } = initializeMilitaryTokens();
    const startToken5 = start.find(t => t.position === 2);
    const endToken5 = end.find(t => t.position === 2);
    expect(startToken5).toBeDefined();
    expect(startToken5!.coinPenalty).toBe(5);
    expect(endToken5).toBeDefined();
    expect(endToken5!.coinPenalty).toBe(5);
  });

  it('each side has one token with coinPenalty 2 (position 1)', () => {
    const { start, end } = initializeMilitaryTokens();
    const startToken2 = start.find(t => t.position === 1);
    const endToken2 = end.find(t => t.position === 1);
    expect(startToken2).toBeDefined();
    expect(startToken2!.coinPenalty).toBe(2);
    expect(endToken2).toBeDefined();
    expect(endToken2!.coinPenalty).toBe(2);
  });

  it('start and end token arrays are independent (not the same reference)', () => {
    const { start, end } = initializeMilitaryTokens();
    expect(start).not.toBe(end);
    // Mutating one should not affect the other
    start[0].isSet = false;
    expect(end[0].isSet).toBe(true);
  });
});

describe('initializeProgressTokens', () => {
  it(`returns exactly ${GAME_CONFIG.MAX_PROGRESS_TOKENS} progress tokens`, () => {
    const result = initializeProgressTokens();
    expect(result).toHaveLength(GAME_CONFIG.MAX_PROGRESS_TOKENS);
  });

  it('all returned tokens have isSet = true', () => {
    const result = initializeProgressTokens();
    for (const token of result) {
      expect(token.isSet).toBe(true);
    }
  });

  it('all returned tokens are from the PROGRESS_TOKENS pool', () => {
    const result = initializeProgressTokens();
    const validNames = new Set(PROGRESS_TOKENS.map(t => t.name));
    for (const token of result) {
      expect(validNames.has(token.name)).toBe(true);
    }
  });

  it('does not return duplicate tokens', () => {
    const result = initializeProgressTokens();
    const names = result.map(t => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('produces different selections across multiple calls (probabilistic)', () => {
    const runs = Array.from({ length: 10 }, () =>
      initializeProgressTokens()
        .map(t => t.name)
        .sort()
        .join(',')
    );
    const unique = new Set(runs);
    // With 10 possible tokens and selecting 5, C(10,5) = 252 combinations.
    // Chance of 10 identical runs is effectively zero.
    expect(unique.size).toBeGreaterThan(1);
  });
});
