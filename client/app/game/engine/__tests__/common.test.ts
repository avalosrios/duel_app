import { shuffle, selectNShuffled } from '../common';

describe('shuffle', () => {
  it('returns an array of the same length as input', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).toHaveLength(input.length);
  });

  it('returns all original elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result.sort()).toEqual([...input].sort());
  });

  it('returns a new array and does not mutate the original', () => {
    const input = [1, 2, 3, 4, 5];
    const original = [...input];
    const result = shuffle(input);
    expect(result).not.toBe(input);
    expect(input).toEqual(original);
  });

  it('handles an empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('handles a single element array', () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it('works with string elements', () => {
    const input = ['a', 'b', 'c', 'd'];
    const result = shuffle(input);
    expect(result).toHaveLength(4);
    expect(result.sort()).toEqual([...input].sort());
  });

  it('produces different orderings across multiple runs (probabilistic)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set(
      Array.from({ length: 10 }, () => shuffle(input).join(','))
    );
    // With 10 elements shuffled 10 times, at least 2 unique orderings are
    // statistically almost certain (probability of all identical < 1 / 10!^9)
    expect(results.size).toBeGreaterThan(1);
  });
});

describe('selectNShuffled', () => {
  it('returns exactly N elements', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(selectNShuffled(input, 3)).toHaveLength(3);
    expect(selectNShuffled(input, 5)).toHaveLength(5);
  });

  it('returns elements that are a subset of the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const result = selectNShuffled(input, 3);
    for (const item of result) {
      expect(input).toContain(item);
    }
  });

  it('returns 0 elements when count is 0', () => {
    expect(selectNShuffled([1, 2, 3], 0)).toHaveLength(0);
  });

  it('returns the full array when count equals array length', () => {
    const input = [1, 2, 3];
    const result = selectNShuffled(input, 3);
    expect(result).toHaveLength(3);
    expect(result.sort()).toEqual([...input].sort());
  });

  it('returns all elements when count exceeds array length', () => {
    const input = [1, 2, 3];
    const result = selectNShuffled(input, 10);
    expect(result).toHaveLength(3);
  });

  it('does not return duplicate elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = selectNShuffled(input, 4);
    expect(new Set(result).size).toBe(result.length);
  });

  it('handles an empty source array', () => {
    expect(selectNShuffled([], 5)).toHaveLength(0);
  });
});
