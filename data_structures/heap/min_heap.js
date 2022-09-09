const { Heap } = require('./heap');

/**
 * Min heap implementation
 */
class MinHeap extends Heap {
  constructor() {
    super((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });
  }
}

module.exports = { MinHeap };
