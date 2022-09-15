const { BTree } = require('./b_tree');

describe('B-tree', () => {
  test('should perform basic b-tree operations', () => {
    const tree = new BTree(3);

    tree.insert(3);
    tree.insert(6);
    tree.insert(9);
    tree.insert(12);
    tree.insert(24);

    expect(tree.search(12)).not.tobe(null);
    expect(tree.search(24)).not.tobe(null);
    expect(tree.search(30)).tobe(null);
  });
});
