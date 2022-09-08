const {
  PriorityQueue,
} = require('../../data_structures/priority_queue/priority_queue');

/**
 * Huffman code's algorithm implementation.
 *
 * Given an array of unique characters and their frequencies
 * construct an optimal prefix code which optimizes data compression
 * on the set of characters
 *
 * Complexity analysis:
 * Time O(n*log(n)) Space O(n)
 */
const huffmanCode = (chars, freqs) => {
  // Number of characters
  const n = chars.length;
  // Initilize a priority queue with all frequencies
  const pq = new PriorityQueue();
  for (let i = 0; i < n; i++) {
    pq.enqueue(new HuffmanNode(chars[i], freqs[i]), freqs[i]);
  }
  for (let i = 1; i < n; i++) {
    // Extract the nodes with the lowest frequencies
    const left = pq.dequeue().element;
    const right = pq.dequeue().element;
    // Create a new node with frequency given by the sum
    // of the frequencies of the two nodes
    const newNode = new HuffmanNode('$', left.freq + right.freq, left, right);
    // Add the new node to the queue
    pq.enqueue(newNode, newNode.freq);
  }
  // Store the value of the optimal prefix code tree
  const root = pq.front().element;
  // Store an object to keep track of each character's encoding
  const code = {};
  // Recursive function that calculate the encoding of each character
  encode(root, '', code);
  // Return the encoded values
  return code;
};

/**
 * Given the optimal prefix code, return an object
 * containing each character encoding
 */
const encode = (root, prefix, code) => {
  if (root.left !== null) {
    // Add a `0` to the left edge if present
    encode(root.left, prefix + '0', code);
  }
  if (root.right !== null) {
    // Add a `1` to the right edge if present
    encode(root.right, prefix + '1', code);
  }
  if (root.left === null && root.right === null) {
    // If the node is a leaf, set the encoding for the
    // specified character
    code[root.data] = prefix;
  }
};

class HuffmanNode {
  constructor(data, freq, left = null, right = null) {
    this.data = data;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

module.exports = { huffmanCode };
