const { Heap } = require('./heap');

/**
 * Max heap implementation
 */
class MaxHeap extends Heap {
  constructor() {
    super((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  }
}

module.exports = { MaxHeap };
