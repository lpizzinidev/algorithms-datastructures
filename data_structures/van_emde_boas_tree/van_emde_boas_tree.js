/**
 * Van Emde Boas tree implementation
 */
class VanEmdeBoasTree {
  constructor(size) {
    if (Math.log2(size) % 1 !== 0) {
      throw new Error('Universe size must be a power of 2');
    }
    this.u = size;
    this.min = null;
    this.max = null;
    if (size <= 2) {
      // Base case
      this.summary = null;
      this.cluster = [];
    } else {
      const numClusters = Math.ceil(Math.sqrt(size));
      // Points to a tree containing overview of keys in the cluster
      this.summary = new VanEmdeBoasTree(numClusters);
      // Each cluster points to another vEB tree
      this.cluster = new Array(numClusters)
        .fill()
        .map(() => new VanEmdeBoasTree(numClusters));
    }
  }

  // Returns the least significant (lg(u)) / 2 bits of x
  low(x) {
    return x % Math.ceil(Math.sqrt(this.u));
  }

  // Returns the most significant (lg(u)) / 2 bits of x
  high(x) {
    return Math.floor(x / Math.ceil(Math.sqrt(this.u)));
  }

  // Returns the minimum value in the tree
  minimum() {
    return this.min;
  }

  // Returns the maximum value in the tree
  maximum() {
    return this.max;
  }

  // Checks if a value is in the tree
  member(x) {
    // Check if x is the minimum or maximum value
    if (x === this.min || x === this.max) return true;
    // If there are no other elements, x is not in the tree
    if (this.u === 2) return false;
    // Recurse on the high-th cluster searching low(x)
    return this.cluster[this.high(x)].member(this.low(x));
  }

  // Builds an element number from x and y
  index(x, y) {
    return x * Math.ceil(math.sqrt(this.u)) + y;
  }

  // Find the predecessor of x in the tree
  predecessor(x) {
    if (this.u === 2) {
      // Base case, return 0 if we are searching the predecessor of 1
      if (x === 1 && this.min === 0) return 0;
      // No predecessor found
      return null;
    }
    // If x is greater than max, then it's predecessor is max
    if (this.max !== null && x > this.max) return this.max;
    // Assign the min element in x cluster
    const minInCluster = this.cluster[this.high(x)].minimum();
    if (minInCluster !== null && this.low(x) > minInCluster) {
      // If x predecessor is in x cluster, determine where it is
      const offset = this.cluster[this.high(x)].predecessor(this.low(x));
      // Return the predecessor
      return this.index(this.high(x), offset);
    }
    // x is smaller than or equal the min element in its cluster
    const predCluster = this.summary.predecessor(this.high(x));
    if (predCluster === null) {
      // If the precedent clusters are empty and x is grater than min, return min
      if (this.min !== null && x > this.min) return this.minimum;
      // Otherwise there is no predecessor
      return null;
    }
    // Determine the position of x in the predecessor cluster
    const offset = this.cluster[predCluster].maximum();
    // Return the predecessor
    return this.index(predCluster, offset);
  }

  // Find the successor of x in the tree
  successor(x) {
    if (this.u === 2) {
      // Base case, return 1 if we are searching the successor of 0
      if (x === 0 && this.max === 1) return 1;
      // No successor found
      return null;
    }
    // If x is smaller than min, then it's successor is min
    if (this.min !== null && x < this.min) return this.min;
    // Assign the max element in x cluster
    const maxInCluster = this.cluster[this.high(x)].maximum();
    if (maxInCluster !== null && this.low(x) < maxInCluster) {
      // If x predecessor is in x cluster, determine where it is
      const offset = this.cluster[this.high(x)].successor(this.low(x));
      // Return the successor
      return this.index(this.high(x), offset);
    }
    // x is greater than or equal the max element in its cluster
    const succCluster = this.summary.successor(this.high(x));
    // If the successor clusters are empty there are no successor
    if (succCluster === null) return null;
    // Determine the position of x in the successor cluster
    const offset = this.cluster[succCluster].minimum();
    return this.index(succCluster, offset);
  }

  // Inserts a new key in the tree
  insert(x) {
    if (this.min === null) {
      // Empty tree
      this.min = x;
      this.max = x;
      return;
    }
    if (x < this.min) {
      // New value is smaller than min, swap it
      const temp = this.min;
      this.min = x;
      x = temp;
    }
    if (this.u > 2) {
      // Not base case tree
      if (this.cluster[this.high(x)].minimum() === null) {
        // If destination cluster is empty, insert x in summary
        this.summary.insert(this.high(x));
        // Insert x in empty cluster
        this.cluster[this.high(x)].min = this.low(x);
        this.cluster[this.high(x)].max = this.low(x);
      } else {
        // Recursively insert x in destination cluster
        this.cluster[this.high(x)].insert(this.low(x));
      }
    }
    if (x > this.max) {
      // New value is greater than max, update it
      this.max = x;
    }
  }

  // Removes a value from the tree
  delete(x) {
    if (this.min === this.max) {
      // Tree with one element, removes it
      this.min = null;
      this.max = null;
      return;
    }
    if (this.u === 2) {
      // Base case tree, set min and max to remaining element
      this.min = x === 0 ? 1 : 0;
      this.max = this.min;
      return;
    }
    if (x === this.min) {
      // x is the minimum, check number of clusters that contains the lowest
      // element other than min
      const firstCluster = this.summary.minimum();
      // Check minimum value in cluster with min
      x = this.index(firstCluster, this.cluster[firstCluster].minimum());
      // Update min value
      this.min = x;
    }
    // Delete x from its cluster
    this.cluster[this.high(x)].delete(this.low(x));
    if (this.cluster[this.high(x)].min === null) {
      // If the cluster is now empty, removes x cluster from summary
      this.summary.delete(this.high(x));
      if (x === this.max) {
        // If x is max element in cluster
        const summaryMax = this.summary.maximum();
        // If clusters are empty, min is equal to max
        if (summaryMax === null) this.max = this.min;
        // Otherwise, max is the highest element in the highest numbered non-empty cluster
        else
          this.max = this.index(summaryMax, this.cluster[summaryMax].maximum());
      }
    } else if (x === this.max) {
      // x cluster is not empty after its deletion, check if max needs to be updated
      this.max = this.index(this.high(x), this.cluster[this.high(x)].maximum());
    }
  }
}

module.exports = { VanEmdeBoasTree };
