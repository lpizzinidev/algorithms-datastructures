const { BinaryHeap } = require('./binary_heap');

/**
 * Min heap implementation
 */
class BinaryMinHeap extends BinaryHeap {
  constructor() {
    super((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });
  }
}

module.exports = { BinaryMinHeap };
