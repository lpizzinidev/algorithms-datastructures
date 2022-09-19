/**
 * DFS algorithm implementation.
 *
 * Returns an array that checks if the node is reachable from the origin.
 */
const dfs = (edges, n, origin) => {
  // Initialize an empty array to store the bfs traversal of the graph
  const reached = new Array(n + 1).fill(false);
  // Initialize a stack with the origin
  const s = [origin];
  // Initialize an adjacency list to store adjacent nodes
  const adj = {};
  for (const [n1, n2] of edges) {
    if (adj[n1] === undefined) adj[n1] = [];
    if (adj[n2] === undefined) adj[n2] = [];
    adj[n1].push(n2);
    adj[n2].push(n1);
  }
  // While the stack is not empty
  while (s.length > 0) {
    // Remove the top node from the stack
    const node = s.pop();
    // If already reached, ignore it
    if (reached[node]) continue;
    // Mark it as reached
    reached[node] = true;
    // Add each unreached neighbor to the queue
    for (const neighbor of adj[node]) {
      if (reached[neighbor]) continue;
      s.push(neighbor);
    }
  }
  return reached;
};

module.exports = { dfs };
