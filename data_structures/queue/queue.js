const { LinkedList } = require('../linked_list/linked_list');

/**
 * LIFO Queue implementation.
 */
class Queue {
  constructor() {
    // Uses a linked list to represent the queue
    this.queue = new LinkedList();
  }

  // Add a new value at the end of the queue
  enqueue(value) {
    this.queue.addAtTail(value);
  }

  // Returns the value at the beginning of the queue
  front() {
    if (this.isEmpty()) throw new Error('Queue is empty');
    return this.queue.get(0);
  }

  // Returns the value at the beginning of the queue
  // and removes it
  dequeue() {
    if (this.isEmpty()) throw new Error('Queue is empty');
    const value = this.front();
    this.queue.deleteAtIndex(0);
    return value;
  }

  // Check if the queue is empty
  isEmpty() {
    return this.queue.isEmpty();
  }
}

module.exports = { Queue };
