const { dfs } = require('./depth_first_search');

describe('Depth first search', () => {
  test('Should perform a basic DFS', () => {
    const edges = [
      [0, 2],
      [1, 0],
      [2, 3],
      [3, 3],
      [4, 5],
    ];
    const expected = [true, true, true, true, false, false];
    expect(dfs(edges, 5, 2)).toEqual(expected);
  });
});
