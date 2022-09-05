/**
 * 0-1 Knapsack's algorithm implementation.
 *
 * Solves the 0-1 knapsack problem:
 * Given weights and values of n items, put these items in a knapsack
 * of capacity C to get the maximum total value in the knapsack
 *
 * Complexity analysis:
 *
 */
const knapsack = (capacity, weights, values) => {
  // Number of values
  const n = values.length;
  // Store the optimal solutions to subproblems
  // dp[i][j] stores the maximum value obtainable with capacity j
  const dp = new Array(n + 1).fill().map(() => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= capacity; j++) {
      // If I can fit the weight with remaining capacity
      if (j >= weights[i - 1]) {
        // Update by adding the current value if possible
        dp[i][j] = Math.max(
          dp[i - 1][j],
          values[i - 1] + dp[i - 1][j - weights[i - 1]]
        );
      }
      // Can't fit weigth, keep previous value
      else dp[i][j] = dp[i - 1][j];
    }
  }
  return dp[n][capacity];
};

module.exports = { knapsack };
