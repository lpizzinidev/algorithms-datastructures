/**
 * B-tree implementation
 *
 * Properties of a B-tree with minimum degree t:
 * 1) The keys of each node are stored in increasing order
 * 2) Each node has a flag which indicates whether it is a leaf
 * 3) Every node except the root must contain at least t - 1 keys
 * 4) All nodes must contain at most (2t - 1) keys
 * 5) All leaves are on the same level
 * 6) The root has at least 2 children and contains a minimum of 1 key
 */
class BTree {
  constructor(t) {
    this.root = null;
    this.t = t;
  }

  // Searches a key in the tree, return the node if present
  search(k) {
    if (this.root === null) return null;
    return this._search(k, this.root);
  }

  // Recusively search a key in the subtree rooted at x
  _search(k, x) {
    let idx = 0;
    // Traverse the root nodes of x until a value greater or
    // equal to k is found
    while (idx < x.n && k > x.keys[idx]) idx++;
    // Key found, return the node
    if (x.keys[idx] === k) return x;
    // The node is a leaf, return null
    if (x.leaf) return null;
    // Iterate on the idx-th child
    return this._search(k, x.children[idx]);
  }

  // Insert a new value in the tree
  insert(k) {
    if (this.root === null) {
      // Empty tree, add a new root node
      this.root = new BTreeNode(this.t, true);
      this.root.keys[0] = k;
      this.root.n = 1;
    } else {
      let r = this.root;
      // If the root level is full
      if (r.n === 2 * this.t - 1) {
        // Split the root and add a new node as root
        const s = new BTreeNode(this.t, false);
        s.children[0] = this.root;
        this.split(s, 0, this.root);
        let idx = 0;
        if (s.keys[0] < k) idx++;
        this.insertNonFull(s.children[idx], k);
        this.root = s;
      }
      // If the root level has space, add the node here
      else this.insertNonFull(r, k);
    }
  }

  // Inserts a key in the non full root list of x
  insertNonFull(x, k) {
    let idx = x.n - 1;
    if (x.leaf) {
      // x is a leaf node, search the right position where to insert the new key
      while (idx >= 0 && k < x.keys[idx]) {
        x.keys[idx + 1] = x.keys[idx];
        idx--;
      }
      x.keys[idx + 1] = k;
      x.n++;
    } else {
      // x is not a leaf, determine on what child to recur
      while (idx >= 0 && k < x.keys[idx]) {
        idx--;
      }
      idx++;
      const temp = x.children[idx];
      // If the child is full, split it
      if (temp.n === 2 * this.t - 1) {
        this.split(x, idx, temp);
        if (k > x.keys[idx]) idx++;
      }
      // Recurse on the child
      this.insertNonFull(x.children[idx], k);
    }
  }

  // Split the i-th full children of a node x
  split(x, i, y) {
    const z = new BTreeNode(this.t, y.leaf);
    z.n = this.t - 1;
    for (let j = 0; j < this.t - 1; j++) {
      z.keys[j] = y.keys[j + this.t];
    }
    if (!y.leaf) {
      for (let j = 0; j < this.t; j++) {
        z.children[j] = y.children[j + this.t];
      }
    }
    y.n = this.t - 1;
    for (let j = x.n; j >= i + 1; j--) {
      x.children[j + 1] = x.children[j];
    }
    x.children[i + 1] = z;
    for (let j = x.n - 1; j >= i; j--) {
      x.keys[j + 1] = x.keys[j];
    }
    x.keys[i] = y.keys[this.t - 1];
    x.n++;
  }
}

/**
 * B-tree node implementation
 */
class BTreeNode {
  constructor(t, leaf) {
    this.leaf = leaf;
    this.keys = new Array(2 * t - 1).fill(0);
    this.children = new Array(2 * t).fill(null);
    this.n = 0;
  }
}

module.exports = { BTree };
