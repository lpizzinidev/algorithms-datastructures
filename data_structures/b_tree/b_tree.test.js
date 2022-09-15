const { BTree } = require('./b_tree');

describe('B-tree', () => {
  test('should perform basic b-tree operations', () => {
    const tree = new BTree(3);

    tree.insert(3);
    tree.insert(6);
    tree.insert(9);
    tree.insert(12);
    tree.insert(24);
    tree.insert(34);
    tree.insert(59);
    tree.insert(101);
    tree.insert(139);

    expect(tree.search(12)).not.toBeNull();
    expect(tree.search(24)).not.toBeNull();
    expect(tree.search(30)).toBeNull();
  });
});
