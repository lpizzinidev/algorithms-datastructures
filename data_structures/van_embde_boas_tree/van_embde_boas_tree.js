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
      this.cluster = [];
    } else {
      const numClusters = Math.ceil(Math.sqrt(size));
      this.summary = new VanEmdeBoasTree(numClusters);
      this.cluster = new Array(numClusters)
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
    if (x === this.min || x === this.max) return true;
    if (this.u === 2) return false;
    return this.cluster[this.high(x)].member(this.low(x));
  }

  index(x, y) {
    return x * Math.ceil(math.sqrt(this.u)) + y;
  }

  predecessor(x) {
    if (this.u === 2) {
      if (x === 1 && this.min === 0) return 0;
      return null;
    }
    if (this.max !== null && x > this.max) return this.max;
    const minInCluster = this.cluster[this.high(x)].minimum();
    if (minInCluster !== null && this.low(x) > minInCluster) {
      const offset = this.cluster[this.high(x)].predecessor(this.low(x));
      return this.index(this.high(x), offset);
    }
    const predCluster = this.summary.predecessor(this.high(x));
    if (predCluster === null) {
      if (this.min !== null && x > this.min) return this.minimum;
      return null;
    }
    const offset = this.cluster[predCluster].maximum();
    return this.index(predCluster, offset);
  }

  successor(x) {
    if (this.u === 2) {
      if (x === 0 && this.max === 1) return 1;
      return null;
    }
    if (this.min !== null && x < this.min) return this.min;
    const maxInCluster = this.cluster[this.high(x)].maximum();
    if (maxInCluster !== null && this.low(x) < maxInCluster) {
      const offset = this.cluster[this.high(x)].successor(this.low(x));
      return this.index(this.high(x), offset);
    }
    const succCluster = this.summary.successor(this.high(x));
    if (succCluster === null) return null;
    const offset = this.cluster[succCluster].minimum();
    return this.index(succCluster, offset);
  }
}
