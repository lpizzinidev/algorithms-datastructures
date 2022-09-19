const { bfs } = require('./breadth_first_search');

describe('Breadth first search', () => {
  test('Should perform a basic BFS', () => {
    const edges = [
      [0, 2],
      [1, 0],
      [2, 3],
      [3, 3],
    ];
    const expected = [1, 2, 0, 1];
    expect(bfs(edges, 3, 2)).toEqual(expected);
  });
});
