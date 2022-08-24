const { UnionFind } = require('../../data_structures/union_find/union_find');

/**
 * Kruskal's algorithm implementation using a UnionFind data structure
 * for Minimum Spanning Tree.
 * The method returns the MST cost if present, -1 otherwise.
 */
const kruskal = (edges, n) => {
  if (edges.length === 0) return -1;

  let cost = 0;
  const unionFind = new UnionFind(n);

  // Sort all edges by their weight in ascending order
  edges.sort((a, b) => (a[2] < b[2] ? -1 : 1));

  for (const [origin, destination, weight] of edges) {
    // Skip the edge if it would produce a cycle
    if (unionFind.connected(origin, destination)) continue;

    // Include the edge
    unionFind.union(origin, destination);
    cost += weight;

    // If we found a MST return its cost
    if (unionFind.connectedComponents === 1) return cost;
  }

  // If we can't build a MST return -1
  if (unionFind.connectedComponents !== 1) return -1;

  return cost;
};

module.exports = { kruskal };
