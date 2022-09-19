const { bfs } = require('./breadth_first_search');

describe('Breadth first search', () => {
  test('Should perform a basic BFS', () => {
    const edges = [
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 0],
      [2, 3],
      [3, 3],
    ];
    const expected = [2, 0, 1, 3];
    expect(bfs(edges, 3, 2)).toEqual(expected);
  });
});
