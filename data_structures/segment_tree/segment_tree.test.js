const { SegmentTree } = require('./segment_tree');

describe('SegmentTree', () => {
  test('should perform segment tree basic operations', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const tree = new SegmentTree(arr);

    expect(tree.query(1, 3)).toBe(5);
    expect(tree.query(3, 7)).toBe(22);
    expect(tree.query(11, 12)).toBe(12);
    expect(tree.query(0, 12)).toBe(78);

    tree.update(1, 4);
    expect(tree.query(1, 3)).toBe(7);

    tree.update(4, 2);
    expect(tree.query(3, 7)).toBe(19);

    tree.update(11, 20);
    expect(tree.query(11, 12)).toBe(20);
  });
});
