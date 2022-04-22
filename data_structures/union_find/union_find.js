/**
 * Union find data structure optimized with path compression
 * and union by rank
 */
class UnionFind {
  constructor(size) {
    this.size = size;
    // Keep track of the root of each node in the data structure
    this.root = Array(size)
      .fill(0)
      .map((v, idx) => idx);
    // Use a rank array to record the height of each vertex, the "rank" of each vertex
    this.rank = Array(size).fill(1);
    // Keep track of the number of connected components in the graph
    this.connectedComponents = size;
  }

  // Optimize the function by applying path compression recursively
  find(x) {
    if (x === this.root[x]) return x;
    this.root[x] = this.find(this.root[x]);
    return this.root[x];
  }

  // The union function is optimized with union by rank
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
      }
      this.connectedComponents--;
    }
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

module.exports = { UnionFind };
