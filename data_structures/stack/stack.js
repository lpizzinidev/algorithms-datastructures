const { LinkedList } = require('../linked_list/linked_list');

/**
 * FIFO Stack implementation.
 */
class Stack {
  constructor() {
    // Uses a linked list to represent the stack
    this.stack = new LinkedList();
  }

  // Add a new value at the top of the stack
  push(value) {
    this.stack.addAtHead(value);
  }

  // Returns the value at the top of the stack
  top() {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.stack.get(0);
  }

  // Returns the value at the top of the stack
  // and removes it
  pop() {
    if (this.isEmpty()) throw new Error('Stack is empty');
    const value = this.top();
    this.stack.deleteAtIndex(0);
    return value;
  }

  // Check if the stack is empty
  isEmpty() {
    return this.stack.isEmpty();
  }
}

module.exports = { Stack };
