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
const huffman = (chars, freqs) => {
  // Number of characters
  const n = chars.length;
  // Initilize a priority queue with all frequencies
  const pq = new PriorityQueue();
  for (let i = 0; i < n; i++) {
    pq.enqueue(new HuffmanNode(freqs[i]), freqs[i]);
  }
  for (let i = 1; i < n; i++) {
    // Extract the nodes with the lowest frequencies
    const left = pq.dequeue().element;
    const right = pq.dequeue().element;
    // Create a new node with frequency given by the sum
    // of the frequencies of the two nodes
    const newNode = new HuffmanNode(left.freq + right.freq, left, right);
    // Add the new node to the queue
    pq.enqueue(newNode, newNode.freq);
  }
  // Return the root of the priority queue
  return pq.front().element;
};

class HuffmanNode {
  constructor(freq, left = null, right = null) {
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

module.exports = { huffman };
