const { RedBlackTree } = require('./red_black_tree');

describe('Red-black tree', () => {
  test('should insert and delete values from the tree', () => {
    const tree = new RedBlackTree();

    expect(tree.isEmpty()).toBe(true);

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    expect(tree.size()).toBe(3);

    expect(tree.search(1, tree.root)).not.toBe(tree.NIL);
    expect(tree.search(2, tree.root)).not.toBe(tree.NIL);
    expect(tree.search(3, tree.root)).not.toBe(tree.NIL);

    tree.delete(1);
    expect(tree.size()).toBe(2);

    expect(tree.search(1, tree.root)).toBe(tree.NIL);

    tree.delete(2);
    expect(tree.size()).toBe(1);

    expect(tree.search(2, tree.root)).toBe(tree.NIL);

    tree.delete(3);
    expect(tree.isEmpty()).toBe(true);

    expect(tree.search(3, tree.root)).toBe(tree.NIL);
  });
});
