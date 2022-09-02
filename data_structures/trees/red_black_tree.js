const RED = 0;
const BLACK = 1;

/**
 * Red-black tree implementation
 *
 * Properties of a RB tree:
 * 1) Every node is either red or black
 * 2) The root is black
 * 3) Every leaf is black
 * 4) If a node is red, both its children are black
 * 5) For each node, all simple paths from the node to descendant leaves contain the same number of black nodes
 */
class RedBlackTree {
  constructor() {
    // Declare a sentinel node
    this.NIL = new Node(null, BLACK);
    this.NIL.parent = this.NIL;
    this.NIL.left = this.NIL;
    this.NIL.right = this.NIL;

    this.root = this.NIL;
    this.nodeCount = 0;
  }

  // Applies a left rotation on node x
  leftRotate(x) {
    // Store x's right subtree
    const y = x.right;
    // Turn y's left subtree into x's right subtree
    x.right = y.left;
    // If y has a left subtree, set its parent to x
    if (y.left !== this.NIL) y.left.parent = x;
    // Set y parent to x parent
    y.parent = x.parent;
    // If x was the root, set y as new root
    if (x.parent == this.NIL) this.root = y;
    // If x is the left subtree, set the parent of the left subtree to y
    else if (x == x.parent.left) x.parent.left = y;
    // If x is the right subtree, set the parent of the right subtree to y
    else x.parent.right = y;
    // Set x as new y left subtree
    y.left = x;
    // Set y as parent of x
    x.parent = y;
  }

  // Applies a right rotation on node y
  rightRotate(y) {
    // Store y's left subtree
    const x = y.left;
    // Turn y's left subtree into x's right subtree
    y.left = x.right;
    // If x has a right subtree, set its parent to y
    if (x.right !== this.NIL) x.right.parent = y;
    // Set x parent to y parent
    x.parent = y.parent;
    // If y was the root, set x as new root
    if (y.parent == this.NIL) this.root = x;
    // If y is the left subtree, set the parent of the left subtree to x
    else if (y == y.parent.left) y.parent.left = x;
    // If y is the right subtree, set the parent of the right subtree to x
    else y.parent.right = x;
    // Set y as new x right subtree
    x.right = y;
    // Set x as parent of y
    y.parent = x;
  }

  // Inserts a new node with the given value into the tree
  insert(val) {
    let x = this.root;
    let y = this.NIL;
    // Traverse the tree down to a path where the new node
    // is insertable
    while (x !== this.NIL) {
      y = x;
      if (val < x.value) x = x.left;
      else x = x.right;
    }
    // Create the new node
    const z = new Node(val, RED, y, this.NIL, this.NIL);
    // If the tree is empty, insert the node as root
    if (y === this.NIL) this.root = z;
    // If the node value is smaller than the value of the leaf, insert it as left child
    else if (val < y.value) y.left = z;
    // Otherwise, insert it as right child
    else y.right = z;
    // Run the fixup function to restore properties 2 or 4
    this.insertFixup(z);
    // Increase the number of nodes in the tree
    this.nodeCount++;
  }

  // Fix Red-Black trees properties after a new node insertion
  // The only properties that could be violated are either 2 or 4
  insertFixup(z) {
    // While the node parent is red
    while (z.parent.color === RED) {
      let y;
      if (z.parent === z.parent.parent.left) {
        // z's parent is in the left subtree
        y = z.parent.parent.right;
        // Case 1: z's uncle is red
        if (y.color === RED) {
          // Color both z's parent and y black
          z.parent.color = BLACK;
          y.color = BLACK;
          // Color z's grandparent red
          z.parent.parent.color = RED;
          // Keep iterating on z's grandparent
          z = z.parent.parent;
        } else {
          // Case 2: z's uncle is black and z is a right child
          if (z === z.parent.right) {
            // Use a left rotation to transform into case 3
            z = z.parent;
            this.leftRotate(z);
          }
          // Case 3: z's uncle is black and z is a left child
          // Color z's parent black and z's grandparent red
          z.parent.color = BLACK;
          z.parent.parent.color = RED;
          // Apply a right rotation on z's grandparent to preserve property 5
          this.rightRotate(z.parent.parent);
        }
      } else {
        // z's parent is in the right subtree
        // simmetric to previous case
        y = z.parent.parent.left;
        if (y.color === RED) {
          z.parent.color = BLACK;
          y.color = BLACK;
          z.parent.parent.color = RED;
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            z = z.parent;
            this.rightRotate(z);
          }
          z.parent.color = BLACK;
          z.parent.parent.color = RED;
          this.leftRotate(z.parent.parent);
        }
      }
    }
    this.root.color = BLACK;
    this.NIL.parent = null;
  }

  // Deletes the node with the given value from the tree
  delete(val) {
    // Seach the node with `val` in the tree
    let z = this.search(val, this.root);
    // If the node is not found, return
    if (z === this.NIL) return;
    // Auxiliary copy of the node
    let y = z;
    // Store the original color of the node
    let yOriginalColor = y.color;
    // Keep track of the node that moves in y's original position
    let x;
    // If the node has no left child
    if (z.left === this.NIL) {
      // Set x to the right subtree
      x = z.right;
      // Replace the node with its right subtree
      this.transplant(z, z.right);
    }
    // If the node has no right child
    else if (z.right === this.NIL) {
      // Set x to the left subtree
      x = z.left;
      // Replace the node with its left subtree
      this.transplant(z, z.left);
    }
    // If the node has both children
    else {
      // Update y's original color
      yOriginalColor = y.color;
      // Set x to the right child
      x = y.right;
      // If z is the parent of y, set x parent to y
      if (y.parent === z) x.parent = y;
      else {
        // Replace y with its right subtree
        this.transplant(y, y.right);
        // Update y's right pointers
        y.right = z.right;
        y.right.parent = y;
      }
      // Replace z with y
      this.transplant(z, y);
      // Update y's left pointers and color
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
    }
    // If y was black, fix RB tree properties
    if (yOriginalColor === BLACK) this.deleteFixup(x);
    // Decrease the number of nodes in the tree
    this.nodeCount--;
  }

  // Returns the node with the given value if present in the
  // subtree rooted at node, otherwise returns the sentinel node
  search(val, node) {
    if (node === this.NIL) return this.NIL;
    if (node.value === val) return node;
    if (node.value < val) return this.search(val, node.right);
    return this.search(val, node.left);
  }

  // Replaces one subtree as a child of its parent with another subtree
  transplant(u, v) {
    // `u` is the root of the tree
    if (u.parent === this.NIL) this.root = v;
    // `u` is a left child
    else if (u === u.parent.left) u.parent.left = v;
    // `u` is a right child
    else u.parent.right = v;
    // Update the node's parent
    v.parent = u.parent;
  }

  // Fix Red-Black trees properties after a node deletion
  // The only properties that could be violated are either 1, 2, and 4
  deleteFixup(x) {
    // Move the extra black node up until
    // - x points to a red and black node
    // - x points to the root
    while (x !== this.NIL && x.color === BLACK) {
      let w;
      if (x === x.parent.left) {
        // x is in the left subtree
        w = x.parent.right;
        // Case 1: w is red
        if (w.color === RED) {
          // Switch the colors of w and x.parent
          w.color = BLACK;
          x.parent.color = RED;
          // Left rotate on x.parent
          this.leftRotate(x.parent);
          w = x.parent.right;
        }
        // Case 2: w is black and both its children are black
        if (w.left.color === BLACK && w.right.color === BLACK) {
          // Remove one black node
          w.color = RED;
          // Iterate on the parent
          x = x.parent;
        } else {
          // Case 3: w is black, it's left child is red, and right child is black
          if (w.right.color === BLACK) {
            // Switch the colors of w and it's left child
            w.left.color = BLACK;
            w.color = RED;
            // Right rotate to transform to case 4
            this.rightRotate(w);
            w = x.parent.right;
          }
          // Case 4: w is black, it's right child is red
          // Apply color changes and a left rotation to
          // remove the extra black
          w.color = x.parent.color;
          x.parent.color = BLACK;
          w.right.color = BLACK;
          this.leftRotate(x.parent);
          // Set x to the root to terminate the while loop
          x = this.root;
        }
      } else {
        // x is in the right subtree
        // simmetric to previous case
        w = x.parent.left;
        if (w.color === RED) {
          w.color = BLACK;
          x.parent.color = RED;
          this.rightRotate(x.parent);
          w = x.parent.left;
        }
        if (w.right.color === BLACK && w.left.color === BLACK) {
          w.color = RED;
          x = x.parent;
        } else {
          if (w.left.color === BLACK) {
            w.right.color = BLACK;
            w.color = RED;
            this.leftRotate(w);
            w = x.parent.left;
          }
          w.color = x.parent.color;
          x.parent.color = BLACK;
          w.right.color = BLACK;
          this.rightRotate(x.parent);
          x = this.root;
        }
      }
    }
    x.color = BLACK;
  }

  // Returns the size of the tree
  size() {
    return this.nodeCount;
  }

  // Checks if the tree is empty
  isEmpty() {
    return this.size() == 0;
  }
}

/**
 * Red-black tree node implementation
 */
class Node {
  constructor(value, color = RED, parent = null, left = null, right = null) {
    this.value = value;
    this.color = color;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

module.exports = { RedBlackTree };
