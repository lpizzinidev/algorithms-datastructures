const { Heap } = require('../heap/heap');

/**
 * Priority queue implementation using a min heap
 */
class PriorityQueue {
  constructor() {
    this.queue = new Heap((a, b) => {
      if (a.priority < b.priority) return 1;
      if (a.priority > b.priority) return -1;
      return 0;
    });
  }

  // Add an element to the queue as per priority
  enqueue(element, priority) {
    this.queue.add(new QueueItem(element, priority));
  }

  // Returns the first element of the queue and removes it
  dequeue() {
    if (this.isEmpty()) throw new Error('No elements in queue');
    return this.queue.pop().element;
  }

  // Returns the first element of the queue, without removing it
  front() {
    if (this.isEmpty()) throw new Error('No elements in queue');
    return this.queue.peek().element;
  }

  // Check if the queue is empty
  isEmpty() {
    return this.queue.isEmpty();
  }

  // Returns the size of the priority queue
  size() {
    return this.queue.size();
  }
}

/**
 * Auxiliary class to store an elements and its priority
 */
class QueueItem {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

module.exports = { PriorityQueue };
