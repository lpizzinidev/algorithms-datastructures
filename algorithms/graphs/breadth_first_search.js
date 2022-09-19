/**
 * BFS algorithm implementation.
 *
 * Returns the BFS traversal of the graph starting at origin.
 */
const bfs = (edges, n, origin) => {
  // Initialize an array to keep track of visited nodes
  const visited = new Array(n).fill(false);
  // Initialize an empty array to store the bfs traversal of the graph
  const bfsTraversal = [];
  // Initialize a queue with the origin
  const q = [origin];
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
    const node = q.shift();
    // If visited, ignore it
    if (visited[node]) continue;
    // Mark it as visited
    visited[node] = true;
    // Add the node to the BFS traversal
    bfsTraversal.push(node);
    // Add each unvisited neighbor to the queue
    for (const neighbor of adj[node]) {
      if (visited[neighbor]) continue;
      q.push(neighbor);
    }
  }
  return bfsTraversal;
};

module.exports = { bfs };
