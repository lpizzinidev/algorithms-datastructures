const {
  PriorityQueue,
} = require('../../data_structures/priority_queue/priority_queue');

/**
 * Dijkstra's algorithm implementation using a Priority Queue data structure.
 * The method returns the list of shortest path reachable from a starting node in a weighted graph.
 */
const dijkstra = (edges, n, origin) => {
  // Initialize a set to keep track of included vertices
  const included = new Set();
  // Initialize a list to keep track of all nodes distances from origin
  const distances = Array(n).fill(Number.MAX_SAFE_INTEGER);
  // Initialize the starting node distance to 0 and mark it as included
  distances[origin - 1] = 0;
  included.add(origin);
  // Initialize a queue to keep track of the next edges
  const priorityQueue = new PriorityQueue();
  // For each node adjacent to origin update its distance
  for (const [or, dest, weight] of edges) {
    if (or === origin && weight < distances[dest - 1]) {
      distances[dest - 1] = weight;
      priorityQueue.enqueue([or, dest, weight], weight);
    }
  }
  // While the queue is not empty and i don't have included all edges
  while (!priorityQueue.isEmpty() && included.size < n) {
    // Dequeue the next edge, mark it as visited
    const [or, dest, weight] = priorityQueue.dequeue();
    included.add(or);
    // For each adjacent unvisited node, update its distance if necessary
    for (const [or1, dest1, weight1] of edges) {
      if (
        dest === or1 &&
        !included.has(dest) &&
        weight + weight1 < distances[dest1 - 1]
      ) {
        distances[dest1 - 1] = weight + weight1;
        priorityQueue.enqueue(
          [or1, dest1, distances[dest1 - 1]],
          distances[dest1 - 1]
        );
      }
    }
  }
  return distances;
};

module.exports = { dijkstra };
