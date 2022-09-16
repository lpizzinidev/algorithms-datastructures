/**
 * Van Emde Boas tree implementation
 *
 *
 */
class VanEmdeBoasTree {
  constructor(size) {
    this.u = size;
    this.min = null;
    this.max = null;
    if (size <= 2) {
      this.summary = null;
      this.clusters = [];
    } else {
      const numClusters = Math.ceil(Math.sqrt(size));
      this.summary = new VanEmdeBoasTree(numClusters);
      this.clusters = new Array(numClusters)
        .fill()
        .map(() => new VanEmdeBoasTree(numClusters));
    }
  }

  low(x) {
    return x % Math.ceil(Math.sqrt(this.u));
  }

  high(x) {
    return Math.floor(x / Math.ceil(Math.sqrt(this.u)));
  }

  minimum() {
    return this.min;
  }

  maximum() {
    return this.max;
  }

  member(x) {
    return this._member(this, x);
  }

  _member(tree, x) {
    if (x === tree.min || x === tree.max) return true;
    if (tree.u === 2) return false;
    return this._member(tree.clusters[this.high(x)], this.low(x));
  }
}
