const { Heap } = require('./heap');

/**
 * Min heap implementation
 */
class MinHeap extends Heap {
  // Heapify operation on all subnodes of node at index
  heapifyDown(index) {
    // If the node is a leaf no operations are needed
    if (this.isLeaf(index)) return;
    // Get indexes of children
    const leftChildIndex = this.leftChild(index);
    const rightChildIndex = this.rightChild(index);
    // Store the index of the smallest element (initialized at parent)
    let smallestIndex = index;
    // If left child < largestIndex
    if (this.values[leftChildIndex] < this.values[smallestIndex]) {
      // Reassign smallest index
      smallestIndex = leftChildIndex;
    }
    // If right child <= smallestIndex
    if (this.values[rightChildIndex] <= this.values[smallestIndex]) {
      // Reassign largest index
      smallestIndex = rightChildIndex;
    }
    // If the smallest element is the parent no operations are needed
    if (smallestIndex === index) return;
    // Swap the parent with the smallest node and heapify the children
    this.swap(index, smallestIndex);
    this.heapifyDown(smallestIndex);
  }

  // Heapify operation on all nodes above index
  heapifyUp(index) {
    let currentIndex = index;
    let parentIndex = this.parent(currentIndex);

    // While we haven't reached the root and the current element is smaller than its parent
    while (
      currentIndex > 0 &&
      this.values[currentIndex] < this.values[parentIndex]
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

  // Decrease value at index with new one
  decrease(index, value) {
    // Check if index is present
    if (index >= this.values.length) throw new Error('Index out of range');
    // If new value is greater, throw an error
    if (this.values[index] > value)
      throw new Error('New value is greater than existing one');
    // If new value is equal, do nothing
    if (this.values[index] === value) return;
    let currentIndex = index;
    // Update the value at index
    this.values[currentIndex] = value;
    // Traverse the heap until you find a value smaller than new value
    while (
      currentIndex > 0 &&
      this.values[this.parent(currentIndex)] > this.values[currentIndex]
    ) {
      // Swap the elements and move up
      this.swap(currentIndex, this.parent(currentIndex));
      currentIndex = this.parent(currentIndex);
    }
  }

  // Return the value of min (without removing it)
  peek() {
    // Empty heap
    if (this.values.length === 0) throw new Error('No elements in min heap');
    return this.values[0];
  }

  // Return the value of min and removes it
  extractMin() {
    // Empty heap
    if (this.values.length === 0) throw new Error('No elements in min heap');
    // Get minimum and last element
    const min = this.values[0];
    const end = this.values.pop();
    // Reassign the first element to the last element
    this.values[0] = end;
    // Heapify down until element is in correct position
    this.heapifyDown(0);
    // Return the minimum value
    return min;
  }

  // Build a max heap from an array of values
  buildHeap(values) {
    this.values = values;
    for (let i = Math.floor(this.values.length / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
}

module.exports = { MinHeap };
