const { Heap } = require('./heap');

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
    if (
      leftChildIndex < this.size &&
      this.values[leftChildIndex] > this.values[largestIndex]
    ) {
      // Reassign largest index
      largestIndex = leftChildIndex;
    }
    // If right child >= largestIndex
    if (
      rightChildIndex < this.size &&
      this.values[rightChildIndex] >= this.values[largestIndex]
    ) {
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
    this.size++;
    this.heapifyUp(this.size - 1);
  }

  // Increase value at index with new one
  increase(index, value) {
    // Check if index is present
    if (index >= this.size) throw new Error('Index out of range');
    // If new value is smaller, throw an error
    if (this.values[index] < value)
      throw new Error('New value is smaller than existing one');
    // If new value is equal, do nothing
    if (this.values[index] === value) return;
    let currentIndex = index;
    // Update the value at index
    this.values[currentIndex] = value;
    // Traverse the heap until you find a value greater than new value
    while (
      currentIndex > 0 &&
      this.values[this.parent(currentIndex)] < this.values[currentIndex]
    ) {
      // Swap the elements and move up
      this.swap(currentIndex, this.parent(currentIndex));
      currentIndex = this.parent(currentIndex);
    }
  }

  // Return the value of max (without removing it)
  peek() {
    // Empty heap
    if (this.size === 0) throw new Error('No elements in max heap');
    return this.values[0];
  }

  // Return the value of max and removes it
  extractMax() {
    // Empty heap
    if (this.size === 0) throw new Error('No elements in max heap');
    // Get maximum and last element
    const max = this.values[0];
    const end = this.values.pop();
    this.size--;
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
    this.size = values.length;
    for (let i = Math.floor(this.size / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
}

module.exports = { MaxHeap };
