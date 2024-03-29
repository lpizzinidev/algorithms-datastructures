const { UnionFind } = require("./union_find");

describe("UnionFind", () => {
  test("Connected", () => {
    const unionFind = new UnionFind(10);
    unionFind.union(1, 2);
    unionFind.union(2, 5);
    unionFind.union(5, 6);
    unionFind.union(6, 7);
    unionFind.union(3, 8);
    unionFind.union(8, 9);

    expect(unionFind.connected(1, 5)).toBe(true);
    expect(unionFind.connected(5, 7)).toBe(true);
    expect(unionFind.connected(4, 9)).toBe(false);

    unionFind.union(9, 4);

    expect(unionFind.connected(4, 9)).toBe(true);
  });

  test("Multiple connected components", () => {
    const unionFind = new UnionFind(5);
    unionFind.union(0, 1);
    unionFind.union(1, 2);
    unionFind.union(3, 4);

    expect(unionFind.connectedComponents).toBe(2);
  });

  test("Adding the same edge should not change the number of connected components", () => {
    const unionFind = new UnionFind(5);
    unionFind.union(0, 1);
    unionFind.union(1, 2);
    unionFind.union(3, 4);
    unionFind.union(4, 3);

    expect(unionFind.connectedComponents).toBe(2);
  });

  test("Single connected component", () => {
    const unionFind = new UnionFind(5);
    unionFind.union(0, 1);
    unionFind.union(1, 2);
    unionFind.union(2, 3);
    unionFind.union(3, 4);

    expect(unionFind.connectedComponents).toBe(1);
  });
});
