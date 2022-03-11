const { kruskal } = require('../kruskal');

describe("Kruskal's algorithm", () => {
  test('Basic test', () => {
    const edges = [
      [1, 3, 3],
      [0, 4, 1],
      [1, 2, 4],
      [1, 4, 1.5],
      [0, 1, 0.5],
      [4, 3, 2],
    ];
    expect(kruskal(edges, 5)).toBe(7.5);
  });
});
