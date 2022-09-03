/**
 * Rod cutting's algorithm implementation.
 *
 * Solves the rod cutting problem:
 * Given a rod of length `n` and i prices, where price i is
 * the cost of a rod of length i, find the maximum revenue obtainable
 * by cutting up the rod
 *
 * Complexity analysis:
 * Time O(n^2) Space O(n)
 */
const cutRod = (prices, n) => {
  // Build a table to store the optimal solutions to the n subproblems
  const dp = new Array(n + 1);
  dp[0] = 0;
  // For each length of rod
  for (let i = 1; i <= n; i++) {
    // Calculate the maximum price obtainable
    let p = 0;
    for (let j = 0; j < i; j++) {
      // Update the price if the value obtainable is greater
      p = Math.max(p, prices[j] + dp[i - j - 1]);
    }
    dp[i] = p;
  }
  return dp[n];
};

module.exports = { cutRod };
