/**
 * Priority queue implementation
 */
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  // Add an element to the queue as per priority
  enqueue(element, priority) {
    const item = new QueueItem(element, priority);

    // Iterate the queue and add the element at the correct location
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > item.priority) {
        // Correct location found, enqueue the new item
        this.items.splice(i, 0, item);
        return;
      }
    }

    // If item have the highest priority add it at the end of the queue
    this.items.push(item);
  }

  // Returns the first element of the queue and removes it
  dequeue() {
    if (this.isEmpty()) throw new Error('No elements in queue');
    return this.items.shift();
  }

  // Returns the first element of the queue, without removing it
  front() {
    if (this.isEmpty()) throw new Error('No elements in queue');
    return this.items[0];
  }

  // Returns the last element of the queue
  rear() {
    if (this.isEmpty()) throw new Error('No elements in queue');
    return this.items[this.items.length - 1];
  }

  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
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
