const { Heap } = require("./heap");

/**
 * Max heap implementation
 */
class MaxHeap extends Heap {
  // Heapify operation on all subnodes of node at index
  heapifyDown(index) {
    // If the node is a leaf no operations are needed
    if (this.isLeaf(index)) return;
    // Get indexes of children
    const leftChildIndex = this.leftChild(index);
    const rightChildIndex = this.rightChild(index);
    // Store the index of the largest element (initialized at parent)
    let largestIndex = index;
    // If left child > largestIndex
    if (this.values[leftChildIndex] > this.values[largestIndex]) {
      // Reassign largest index
      largestIndex = leftChildIndex;
    }
    // If right child >= largestIndex
    if (this.values[rightChildIndex] >= this.values[largestIndex]) {
      // Reassign largest index
      largestIndex = rightChildIndex;
    }
    // If the largest element is the parent no operations are needed
    if (largestIndex === index) return;
    // Swap the parent with the largest node and heapify the children
    this.swap(index, largestIndex);
    this.heapifyDown(largestIndex);
  }

  // Heapify operation on all nodes above index
  heapifyUp(index) {
    let currentIndex = index;
    let parentIndex = this.parent(currentIndex);

    // While we haven't reached the root and the current element is greater than its parent
    while (
      currentIndex > 0 &&
      this.values[currentIndex] > this.values[parentIndex]
    ) {
      // Swap the elements and move up
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.parent(parentIndex);
    }
  }

  // Add a new element to the heap
  add(element) {
    this.values.push(element);
    this.heapifyUp(this.values.length - 1);
  }

  // Return the value of max (without removing it)
  peek() {
    // Empty heap
    if (this.values.length === 0) throw new Error("No elements in max heap");
    return this.values[0];
  }

  // Return the value of max and removes it
  extractMax() {
    // Empty heap
    if (this.values.length === 0) throw new Error("No elements in max heap");
    // Get maximum and last element
    const max = this.values[0];
    const end = this.values.pop();
    // Reassign the first element to the last element
    this.values[0] = end;
    // Heapify down until element is in correct position
    this.heapifyDown(0);
    // Return the maximum value
    return max;
  }

  // Build a max heap from an array of values
  buildHeap(values) {
    this.values = values;
    for (let i = Math.floor(this.values.length / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
}

module.exports = { MaxHeap };
