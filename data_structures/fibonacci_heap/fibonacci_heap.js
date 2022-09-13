/**
 * Fibonacci heap implementation
 */
class FibonacciHeap {
  constructor() {
    this.min = null;
    this.count = 0;
    this.found = null; // Helper node for find function
  }

  // Inserts a new node with value in the heap
  insert(value) {
    // Create the new node
    const newNode = new FibonacciNode(value);
    // If the heap is empty
    if (this.min === null) {
      // Add the new node as minimum
      this.minimum = newNode;
      newNode.left = this.min;
      newNode.right = this.min;
    } else {
      // Otherwise, add the new node to the left of the minimum
      newNode.right = this.min;
      newNode.left = this.min.left;
      this.min.left.right = newNode;
      this.min.left = newNode;
      // If the new node is the new minimum, updates the
      // value of the minimum
      if (newNode.value < this.min.value) {
        this.minimum = newNode;
      }
    }
    // Increase the number of nodes in the heap
    this.count++;
  }

  // Returns the minimum value in the heap, if present
  minimum() {
    if (this.isEmpty()) throw new Error('Heap is empty');
    return this.min.value;
  }

  // Removes the minimum node and returns its value
  extractMin() {
    // Store the value of the minimum node
    const z = this.min;
    // Check if heap is empty
    if (z === null) throw new Error('Heap is empty');
    // Makes each child of z root of the heap
    const child = z.child;
    let k = child;
    let p;
    while (child !== null) {
      p = child.right;
      this.insert(child.value);
      child.parent = null;
      child = p;
      if (child == k) break;
    }
    // Remove the node from the root list
    z.left.right = z.right;
    z.right.left = z.left;
    z.child = null;
    // If the heap had only one node, empty it
    if (z === z.right) this.min = null;
    else {
      // Make the minimum node point to another node
      this.min = z.right;
      // Consolidate the root list
      this.consolidate();
    }
    // Decrease the number of nodes in the heap
    this.count--;
    // Return the minimum value
    return z.value;
  }

  // Consolidate the root list to make sure that every root
  // node has a distinct degree
  consolidate() {
    // Check if heap is empty
    if (this.isEmpty()) return;
    const PHI = (1 + Math.sqrt(5)) / 2;
    const D = Math.floor(Math.log(this.count) / Math.log(PHI));
    // Create an array of size D(count) filled with null
    const arr = new Array(D + 1).fill(null);
    // For each node in the root list
    let w = this.min;
    while (w !== null) {
      let check = this.min;
      let x = w;
      const d = x.degree;
      // While there is another node with the same degree
      while (arr[d] !== null) {
        const y = arr[d];
        // If the node value is greater than the other node
        // with the same degree
        if (x.value > y.value) {
          // Swap the nodes
          const temp = x;
          x = y;
          y = temp;
          w = x;
        }
        // Make y a child of x
        this.link(y, x);
        check = x;
        arr[d] = null;
        d++;
      }
      // Set the node to the corresponding degree
      arr[d] = x;
      // Keep iterating
      w = w.right;
      // If reached minimum node, terminate the loop
      if (w === check) break;
    }
    // Remove the minimum node
    this.min = null;
    for (let i = 0; i <= D; i++) {
      // Insert the new root nodes with the new degree
      if (arr[i] != null) this.insert(arr[i]);
    }
  }

  // Performs a linking operation between two nodes
  link(y, x) {
    // Remove the y node from the root list
    y.left.right = y.right;
    y.right.left = y.left;
    // Makes y a child of x
    const p = x.child;
    if (p === null) {
      y.right = y;
      y.left = y;
    } else {
      y.right = p;
      y.left = p.left;
      p.left.right = y;
      p.left = y;
    }
    y.parent = x;
    x.child = y;
    // Increament the degree of x
    x.degree++;
    // Unmark y
    y.mark = false;
  }

  // Returns the node with the given key
  find(k) {
    // Initializes helper node to null
    this.found = null;
    // Recursively search for the node with the given key
    this._find(k, this.min);
    // Returns the found node
    return this.found;
  }

  // Recusively search the node with given key
  // in the node and its children
  _find(k, node) {
    // If node is found or not present return
    if (this.found !== null || node === null) return;
    // Iterate in the heap until the node is found
    let temp = node;
    do {
      if (k === temp.value) this.found = temp;
      else {
        this._find(k, temp.child);
        temp = temp.right;
      }
    } while (temp !== node && this.found === null);
  }

  // Decreases the value of the node with given key
  decreaseKey(k, value) {
    // Search the node with the given key
    const x = this.find(k);
    // If the node is not present or the new key is greater, throw an exception
    if (x === null || value > x.value) throw new Error('Invalid key');
    // Update the value of the node
    x.value = value;
    const y = x.parent;
    // Reintegrate the order in the heap if necessary
    if (y !== null && x.value < y.value) {
      this.cut(x, y);
      this.cascadingCut(y);
    }
    // If the value is the new minimum, update the minimum pointer
    if (x.value < this.min.value) this.min = x;
  }

  // Cuts the link between x and its parent y making x a root
  cut(x, y) {
    // Remove x from the subtree
    x.right.left = x.left;
    x.left.right = x.right;
    // Decrease the parent degree
    y.degree--;
    // Insert x as new root
    x.right = null;
    x.left = null;
    this.insert(x);
    x.parent = null;
    x.mark = false;
  }

  cascadingCut(y) {
    const z = y.parent;
    if (z === null) return;
    // If y is unmarked, mark it since its first children has
    // just been cut
    if (!y.mark) y.mark = true;
    else {
      // If y is marked, it has just lost its second child
      // The function recurses up the heap until a root
      // or un unmarked node is found
      this.cut(y, z);
      this.cascadingCut(z);
    }
  }

  // Deletes a node from the heap
  delete(x) {
    this.decreaseKey(x, Number.MIN_VALUE);
    this.extractMin();
  }

  // Checks if the heap is empty
  isEmpty() {
    return this.size() === 0;
  }

  // Returns the number of nodes in the heap
  size() {
    return this.count;
  }
}

/**
 * Fibonacci heap node implementation
 */
class FibonacciNode {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
    this.child = null;
    this.degree = 0;
    this.mark = false;
  }
}

module.exports = { FibonacciHeap };
