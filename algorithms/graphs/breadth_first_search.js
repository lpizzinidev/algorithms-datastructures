/**
 * BFS algorithm implementation.
 *
 * Returns an array of edge distances from the origin (+inf if not reachable)
 */
const bfs = (edges, n, origin) => {
  // Initialize an array to keep track of visited nodes
  const visited = new Array(n + 1).fill(false);
  // Initialize an empty array edge distances
  const distances = new Array(n + 1).fill(Number.MAX_VALUE);
  // Initialize a queue with the origin and the current step
  const q = [[origin, 0]];
  // Initialize an adjacency list to store adjacent nodes
  const adj = {};
  for (const [n1, n2] of edges) {
    if (adj[n1] === undefined) adj[n1] = [];
    if (adj[n2] === undefined) adj[n2] = [];
    adj[n1].push(n2);
    adj[n2].push(n1);
  }
  // While the queue is not empty
  while (q.length > 0) {
    // Remove the first node from the queue
    const [node, step] = q.shift();
    // If visited, ignore it
    if (visited[node]) continue;
    // Mark it as visited
    visited[node] = true;
    // Add the node to the BFS traversal
    distances[node] = step;
    // Add each unvisited neighbor to the queue
    for (const neighbor of adj[node]) {
      if (visited[neighbor]) continue;
      q.push([neighbor, step + 1]);
    }
  }
  return distances;
};

module.exports = { bfs };
