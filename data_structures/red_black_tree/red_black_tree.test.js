const { RED, BLACK, RedBlackTree } = require('./red_black_tree');

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

  test('should apply left-left rotation', () => {
    const tree = new RedBlackTree();

    tree.insert(3);
    tree.insert(2);
    tree.insert(1);

    expect(tree.root.value).toBe(2);
    expect(tree.root.left.value).toBe(1);
    expect(tree.root.right.value).toBe(3);

    expect(tree.root.color).toBe(BLACK);
    expect(tree.root.left.color).toBe(RED);
    expect(tree.root.right.color).toBe(RED);
  });

  test('should apply left-right rotation', () => {
    const tree = new RedBlackTree();

    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    expect(tree.root.value).toBe(2);
    expect(tree.root.left.value).toBe(1);
    expect(tree.root.right.value).toBe(3);

    expect(tree.root.color).toBe(BLACK);
    expect(tree.root.left.color).toBe(RED);
    expect(tree.root.right.color).toBe(RED);
  });

  test('should apply right-left rotation', () => {
    const tree = new RedBlackTree();

    tree.insert(1);
    tree.insert(3);
    tree.insert(2);

    expect(tree.root.value).toBe(2);
    expect(tree.root.left.value).toBe(1);
    expect(tree.root.right.value).toBe(3);

    expect(tree.root.color).toBe(BLACK);
    expect(tree.root.left.color).toBe(RED);
    expect(tree.root.right.color).toBe(RED);
  });

  test('should apply right-right rotation', () => {
    const tree = new RedBlackTree();

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    expect(tree.root.value).toBe(2);
    expect(tree.root.left.value).toBe(1);
    expect(tree.root.right.value).toBe(3);

    expect(tree.root.color).toBe(BLACK);
    expect(tree.root.left.color).toBe(RED);
    expect(tree.root.right.color).toBe(RED);
  });

  test('should select the correct index for a node in the tree', () => {
    const tree = new RedBlackTree();

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    expect(tree.select(tree.root, 2)).toBe(2);
    expect(tree.select(tree.root, 5)).toBe(5);
  });
});
