const { BinaryHeap } = require('./binary_heap');

/**
 * Max heap implementation
 */
class BinaryMaxHeap extends BinaryHeap {
  constructor() {
    super((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  }
}

module.exports = { BinaryMaxHeap };
