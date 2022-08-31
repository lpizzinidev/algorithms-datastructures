/**
 * Doubly linked list implementation
 */
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Return the value of the first node in the linked list
  getHead() {
    if (this.head === null) throw new Error('List is empty');
    return this.head.value;
  }

  // Return the value of the last node in the linked list
  getTail() {
    if (this.head === null) throw new Error('List is empty');
    return this.tail.value;
  }

  // Get the value of the index-th node in the linked list
  // If the index is invalid, return -1
  get(index) {
    return this.getNode(index).value;
  }

  // Returns the node at the given index
  getNode(index) {
    if (this.size < index) throw new Error('Invalid index');
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  // Add a node with the specified value before the first element of the list
  addAtHead(value) {
    const newNode = new LinkedListNode(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = this.head.prev;
    }
    this.size++;
  }

  // Add a node with the specified value to the last element of the list
  addAtTail(value) {
    if (this.isEmpty()) {
      this.addAtHead(value);
      return;
    }
    this.tail.next = new LinkedListNode(value, this.tail);
    this.tail = this.tail.next;
    this.size++;
  }

  // Add a node with the specified value before the index-th node in the list.
  // If the index is equal to the length of the list, the node will be appended to the end.
  // If index is greater than the lenfth, it will not be inserted
  addAtIndex(index, value) {
    if (this.isEmpty() || index === 0) {
      this.addAtHead(value);
      return;
    }
    if (index === this.size) {
      this.addAtTail(value);
      return;
    }
    const prev = this.getNode(index - 1);
    const newNode = new LinkedListNode(value, prev, prev.next);
    if (prev.next !== null) prev.next.prev = newNode;
    prev.next = newNode;
    this.size++;
  }

  // Delete the head of the list, if not empty
  deleteHead() {
    if (this.isEmpty()) throw new Error('List is empty');
    this.head = this.head.next;
    this.size--;
    if (this.isEmpty()) this.tail = null;
    else this.head.prev = null;
  }

  // Delete the tail of the list, if not empty
  deleteTail() {
    if (this.isEmpty()) throw new Error('List is empty');
    this.tail = this.tail.prev;
    this.size--;
    if (this.isEmpty()) this.head = null;
    else this.tail.next = null;
  }

  // Delete the index-th node in the list, if valid
  deleteAtIndex(index) {
    const current = this.getNode(index);
    if (current.prev === null) this.deleteHead();
    if (current.next === null) this.deleteTail();
    if (current.next !== null) current.next.prev = current.prev;
    if (current.prev !== null) current.prev.next = current.next;
    current.prev = null;
    current.next = null;
    this.size--;
  }

  // Clear the content of the linked list
  clear() {
    if (this.isEmpty()) return;
    let current = this.head;
    while (current !== null) {
      const next = current.next;
      current.prev = null;
      current.next = null;
      current = next;
    }
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Check if the linked list is empty
  isEmpty() {
    return this.size === 0;
  }
}

/**
 * Linked list node implementation.
 */
class LinkedListNode {
  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

module.exports = { LinkedList };
