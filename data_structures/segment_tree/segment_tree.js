/**
 * Segment tree implementation
 */
class SegmentTree {
  constructor(arr) {
    this.size = arr.length;
    this.tree = new Array(this.size * 2);
    // Insert leaf nodes
    for (let i = 0; i < this.size; i++) {
      this.tree[this.size + i] = arr[i];
    }
    // Calculate parents
    for (let i = this.size - 1; i > 0; --i) {
      this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
    }
  }

  // Updates a tree node
  update(p, value) {
    // Update node value
    this.tree[p + this.size] = value;
    p += this.size;

    // Update parents of node with children values
    for (let i = p; i > 1; i >>= 1) {
      this.tree[i >> 1] = this.tree[i] + this.tree[i ^ 1];
    }
  }

  // Return the sum on the interval [l, r)
  query(l, r) {
    let sum = 0;
    // For each node in the range [l, r)
    for (l += this.size, r += this.size; l < r; l >>= 1, r >>= 1) {
      // If left is odd, increase sum with value of node l
      if ((l & 1) > 0) sum += this.tree[l++];
      // If right is odd, increase sum with value of node r - 1
      if ((r & 1) > 0) sum += this.tree[--r];
    }
    return sum;
  }
}

module.exports = { SegmentTree };
