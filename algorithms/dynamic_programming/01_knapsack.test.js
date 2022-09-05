const { knapsack } = require('./01_knapsack');

describe('0-1 knapsack', () => {
  test('should calculate the maximum value obtainable', () => {
    expect(knapsack(11, [3, 4, 5, 9, 4], [3, 4, 4, 10, 4])).toBe(11);
    expect(knapsack(15, [12, 2, 1, 1, 4], [4, 2, 1, 2, 10])).toBe(15);
    expect(knapsack(50, [10, 20, 30], [60, 100, 120])).toBe(220);
  });
});
