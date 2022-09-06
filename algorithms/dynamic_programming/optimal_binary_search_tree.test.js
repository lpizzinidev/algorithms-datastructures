const { optimalBST } = require('./optimal_binary_search_tree');

describe('Optimal binary search tree', () => {
  test('should return the optimal search cost', () => {
    expect(optimalBST([10, 12], [34, 50])).toBe(118);
    expect(optimalBST([10, 12, 20], [34, 8, 50])).toBe(142);
  });
});
