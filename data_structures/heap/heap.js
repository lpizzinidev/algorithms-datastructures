/**
 * Heap signature class implementation
 */
class Heap {
  constructor() {
    this.values = [];
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
    return (
      index >= Math.floor(this.values.length / 2) &&
      index <= this.values.length - 1
    );
  }

  // Swap two nodes
  swap(index1, index2) {
    const temp = this.values[index2];
    this.values[index2] = this.values[index1];
    this.values[index1] = temp;
  }
}

module.exports = { Heap };
