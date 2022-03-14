const { PriorityQueue } = require('../../data_structures/priority_queue');

/**
 * Prim's algorithm implementation using a PriorityQueue
 * for Minimum Spanning Tree.
 * The method returns the MST cost, -1 otherwise
 */
const prim = (edges, n) => {
  if (edges.length === 0) return -1;

  let result = 0.0;

  // Create a set to keep track of vertices already included
  const included = new Set();
  // Create a priority queue to store the edges ordered by their weight
  const priorityQueue = new PriorityQueue();
  // Add the 0th edge to the visited ones and populate the priority queue with its adjacent values
  for (const [origin, destination, weight] of edges) {
    if (origin === 0) {
      priorityQueue.enqueue({ origin, destination, weight }, weight);
    }
  }
  included.add(0);

  // While there are still vertices to be visited
  while (!priorityQueue.isEmpty() && included.size < n) {
    // Dequeue the next element
    const { destination, weight } = priorityQueue.dequeue().element;
    if (!included.has(destination)) {
      result += weight;
      included.add(destination);
      for (const [origin2, destination2, weight2] of edges) {
        if (origin2 === destination && !included.has(destination2)) {
          priorityQueue.enqueue(
            {
              origin: origin2,
              destination: destination2,
              weight: weight2,
            },
            weight2
          );
        }
      }
    }
  }

  return result;
};

module.exports = { prim };
