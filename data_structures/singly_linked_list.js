/**
 * Singly linked list implementation
 */
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Return the index-th node in the linked list
  // If the index is invalid, return null
  getNode(index) {
    if (this.size < index) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  // Return the last node in the linked list
  // If the list is empty, return null
  getTail() {
    if (this.isEmpty()) return null;
    let current = this.head;
    while (current && current.next) {
      current = current.next;
    }
    return current;
  }

  // Get the value of the index-th node in the linked list
  // If the index is invalid, return -1
  get(index) {
    const current = this.getNode(index);
    return current === null ? -1 : current.value;
  }

  // Add a node with the specified value before the first element of the list
  addAtHead(value) {
    const current = new LinkedListNode(value);
    current.next = this.head;
    this.head = current;
    this.size++;
  }

  // Add a node with the specified value to the last element of the list
  addAtTail(value) {
    if (this.isEmpty()) {
      this.addAtHead(value);
      return;
    }
    const prev = this.getTail();
    const current = new LinkedListNode(value);
    prev.next = current;
    this.size++;
  }

  // Add a node with the specified value before the index-th node in the list.
  // If the index is equal to the length of the list, the node will be appended to the end.
  // If index is greater than the lenfth, it will not be inserted
  addAtIndex(index, value) {
    if (index === 0) {
      this.addAtHead(value);
      return;
    }
    const prev = this.getNode(index - 1);
    if (prev === null) return;
    const current = new LinkedListNode(value);
    const next = prev.next;
    current.next = next;
    prev.next = current;
  }

  // Delete the index-th node in the list, if valid
  deleteAtIndex(index) {
    const current = this.getNode(index);
    if (current === null) return;
    const next = current.next;
    if (index === 0) {
      // Remove the head
      this.head = next;
    } else {
      const prev = this.getNode(index - 1);
      prev.next = next;
    }
    this.size--;
  }

  // Check if the linked list is empty
  isEmpty() {
    return this.size === 0;
  }
}

class LinkedListNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

module.exports = { LinkedList };
