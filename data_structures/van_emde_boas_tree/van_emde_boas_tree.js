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

  insert(x) {
    if (this.min === null) {
      this.min = x;
      this.max = x;
      return;
    }
    if (x < this.min) {
      const temp = this.min;
      this.min = x;
      x = temp;
    }
    if (this.u > 2) {
      if (this.cluster[this.high(x)].minimum() === null) {
        this.summary.insert(this.high(x));
      } else {
        this.cluster[this.high(x)].insert(this.low(x));
        this.cluster[this.high(x)].min = this.low(x);
        this.cluster[this.high(x)].max = this.low(x);
      }
    }
    if (x > this.max) {
      this.max = x;
    }
  }

  delete(x) {
    if (this.min === this.max) {
      this.min = null;
      this.max = null;
      return;
    }
    if (this.u === 2) {
      this.min = x === 0 ? 1 : 0;
      this.max = this.min;
      return;
    }
    if (x === this.min) {
      const firstCluster = this.summary.minimum();
      x = this.index(firstCluster, this.cluster[firstCluster].minimum());
      this.min = x;
    }
    this.cluster[this.high(x)].delete(this.low(x));
    if (this.cluster[this.high(x)].min === null) {
      this.summary.delete(this.high(x));
      if (x === this.max) {
        const summaryMax = this.summary.maximum();
        if (summaryMax === null) {
          this.max = this.min;
        } else {
          this.max = this.index(summaryMax, this.cluster[summaryMax].maximum());
        }
      }
    } else if (x === this.max) {
      this.max = this.index(this.high(x), this.cluster[this.high(x)].maximum());
    }
  }
}

module.exports = { VanEmdeBoasTree };
