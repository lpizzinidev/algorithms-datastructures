/**
 * Longest common subsequence's algorithm implementation.
 *
 * Solves the longest common subsequence problem:
 * Given two sequences, find the length of the longest subsequence
 * present in both of them
 *
 * Complexity analysis:
 * Time O(n^2) Space O(n^2)
 */
const lcs = (s1, s2) => {
  // Length of the strings
  const m = s1.length,
    n = s2.length;
  // Build a table to store the optimal solutions to subproblems
  // dp[i][j] stores lcs of s1[0..i] and s2[0..j]
  const dp = new Array(m + 1).fill().map(() => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If chars are equal, increase lcs
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      // Else pick the maximum value of the previous lcs
      else dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
    }
  }
  return dp[m][n];
};

module.exports = { lcs };
