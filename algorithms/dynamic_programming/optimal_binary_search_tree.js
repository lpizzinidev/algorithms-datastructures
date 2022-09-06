/**
 * Optimal binary search tree's algorithm implementation.
 *
 * Solves the optimal binary search tree problem:
 * Given a sorted array of search keys and an array of frequencies,
 * where freq[i] is the number of searches for keys[i].
 * Build a binary search tree such that the total cost of all searches
 * is minimizes.
 * Return the optimal cost.
 *
 * Complexity analysis:
 * Time O(n^3) Space O(n^2)
 */
const optimalBST = (keys, freq) => {
  // Number of keys
  const n = keys.length;
  // Store the optimal solutions to subproblems
  // dp[i][j] contains the optimal cost search for a
  // BST with keys[i..j]
  const dp = new Array(n).fill().map(() => new Array(n).fill(Number.MAX_VALUE));
  // A single key has cost equal to its frequency
  for (let i = 0; i < n; i++) dp[i][i] = freq[i];
  // Consider chains of length greater than 1
  for (let l = 2; l <= n; l++) {
    // For each row
    for (let i = 0; i <= n - l + 1; i++) {
      // Consider column from i to l
      const j = i + l - 1;
      // If out of range, break inner loop
      if (i >= n || j >= n) break;
      // Initialize optimal cost to +inf
      dp[i][j] = Number.MAX_VALUE;
      // Calculate the cost of all freq[i..j]
      let offsetSum = 0;
      for (let k = i; k <= j; k++) offsetSum += freq[k];
      // Explore all subproblems between i and j and calculate the optimal cost
      for (let r = i; r <= j; r++) {
        let cost = 0;
        if (r > i) cost += dp[i][r - 1];
        if (r < j) cost += dp[r + 1][j];
        cost += offsetSum;
        // Update the result if possible
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }
  return dp[0][n - 1];
};

module.exports = { optimalBST };
