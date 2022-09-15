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

  search(k) {
    if (this.root === null) return null;
    return this._search(k, this.root);
  }

  _search(k, x) {
    let idx = 0;
    while (idx < x.n && k > x.keys[idx]) idx++;
    if (x.keys[idx] === k) return x;
    if (x.leaf) return null;
    return this._search(k, x.children[idx]);
  }

  // Insert a new value in the tree
  insert(k) {
    if (this.root === null) {
      this.root = new BTreeNode(this.t, true);
      this.root.keys[0] = k;
      this.root.n = 1;
    } else {
      let r = this.root;
      if (r.n === 2 * this.t - 1) {
        const s = new BTreeNode(this.t, false);
        s.children[0] = this.root;
        this.split(s, 0, this.root);
        this.insertValue(s, k);
        this.root = s;
      } else {
        this.insertValue(r, k);
      }
    }
  }

  insertValue(x, k) {
    let idx = x.n - 1;
    if (x.leaf) {
      while (idx >= 0 && k < x.keys[idx]) {
        x.keys[idx + 1] = x.keys[idx];
        idx--;
      }
      x.keys[idx + 1] = k;
      x.n++;
    } else {
      while (idx >= 0 && k < x.keys[idx]) {
        idx--;
      }
      idx++;
      const temp = x.children[idx];
      if (temp.n === 2 * t - 1) {
        this.split(x, idx, temp);
        if (k > x.keys[idx]) idx++;
      }
      this.insertValue(x.children[idx], k);
    }
  }

  // Split the i-th full children of a node x
  split(x, i, y) {
    const z = new BTreeNode(y.t, y.leaf);
    z.n = this.t - 1;
    for (let j = 0; j < this.t - 1; j++) {
      z.keys[j] = x.keys[j + this.t];
    }
    if (!x.leaf) {
      for (let j = 0; j < this.t; j++) {
        z.children[j] = y.children[j + this.t];
      }
    }
    x.n = this.t - 1;
    for (let j = n; j >= i + 1; j--) {
      this.children[j + 1] = this.children[j];
    }
    this.children[i + 1] = z;
    for (let j = n - 1; j >= i; j--) {
      this.keys[j + 1] = this.keys[j];
    }
    this.keys[i] = x.keys[this.t - 1];
    this.n++;
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
