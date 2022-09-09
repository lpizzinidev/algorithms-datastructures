/**
 * Heap signature class implementation
 */
class Heap {
  constructor(comparator) {
    this.values = [];
    this.comparator = comparator;
    this.count = 0;
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
    return index >= Math.floor(this.count / 2) && index <= this.count - 1;
  }

  // Swap two nodes
  swap(index1, index2) {
    const temp = this.values[index2];
    this.values[index2] = this.values[index1];
    this.values[index1] = temp;
  }

  // Remove last leaf node
  removeLast() {
    if (this.count === 0) return;
    this.count--;
  }

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
    if (
      leftChildIndex < this.count &&
      this.comparator(this.values[leftChildIndex], this.values[smallestIndex]) >
        0
    ) {
      // Reassign smallest index
      smallestIndex = leftChildIndex;
    }
    // If right child <= smallestIndex
    if (
      rightChildIndex < this.count &&
      this.comparator(
        this.values[rightChildIndex],
        this.values[smallestIndex]
      ) >= 0
    ) {
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
      this.comparator(this.values[currentIndex], this.values[parentIndex]) > 0
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
    this.count++;
    this.heapifyUp(this.size - 1);
  }

  // Return the value of max (without removing it)
  peek() {
    // Empty heap
    if (this.isEmpty()) throw new Error('No elements in heap');
    return this.values[0];
  }

  // Return the value of max and removes it
  pop() {
    // Empty heap
    if (this.isEmpty()) throw new Error('No elements in heap');
    // Get maximum and last element
    const max = this.values[0];
    const end = this.values.pop();
    this.count--;
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
    this.count = values.length;
    for (let i = Math.floor(this.count / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  // Check if the heap is empty
  isEmpty() {
    return this.count === 0;
  }

  // Returns the size of the heap
  size() {
    return this.count;
  }
}

module.exports = { Heap };
