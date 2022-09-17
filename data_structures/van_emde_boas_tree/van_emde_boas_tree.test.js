const { VanEmdeBoasTree } = require('./van_emde_boas_tree');

describe('van Emde Boas Tree', () => {
  test('should perform vEB tree basic operations', () => {
    const tree = new VanEmdeBoasTree(16);

    expect(tree.min).toBeNull();
    expect(tree.max).toBeNull();

    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(7);
    tree.insert(14);
    tree.insert(15);

    expect(tree.min).toBe(2);
    expect(tree.max).toBe(15);

    expect(tree.member(4)).toBe(true);
    expect(tree.member(14)).toBe(true);
    expect(tree.member(6)).toBe(false);
    expect(tree.member(9)).toBe(false);

    expect(tree.predecessor(2)).toBeNull();
    expect(tree.predecessor(7)).toBe(5);
    expect(tree.successor(7)).toBe(14);
    expect(tree.successor(15)).toBeNull();

    tree.delete(2);

    expect(tree.min).toBe(3);
    expect(tree.predecessor(3)).toBeNull();

    tree.delete(15);

    expect(tree.max).toBe(14);
    expect(tree.successor(14)).toBeNull();
  });
});
