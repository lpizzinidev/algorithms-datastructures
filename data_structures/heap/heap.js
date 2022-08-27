/**
 * Heap signature class implementation
 */
class Heap {
  constructor() {
    this.values = [];
    this.size = 0;
  }

  // Return the index of the parent node
  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  // Return the index of the left child of the node
  leftChild(index) {
    return index * 2 + 1;
  }

  // Return the index of the right child of the node
  rightChild(index) {
    return index * 2 + 2;
  }

  // Return true if the node is a leaf (has no children)
  isLeaf(index) {
    return index >= Math.floor(this.size / 2) && index <= this.size - 1;
  }

  // Swap two nodes
  swap(index1, index2) {
    const temp = this.values[index2];
    this.values[index2] = this.values[index1];
    this.values[index1] = temp;
  }

  // Remove last leaf node
  removeLast() {
    if (this.size === 0) return;
    this.size--;
  }
}

module.exports = { Heap };
