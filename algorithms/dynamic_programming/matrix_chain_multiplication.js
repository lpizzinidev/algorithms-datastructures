/**
 * Matrix-chain multiplication algorithm implementation.
 *
 * Solves the matrix-chain multiplication problem:
 * Give a chain of n matrices, fully parenthesize their product
 * in a way that minimizes the number of scalar multiplications
 *
 * Complexity analysis:
 * Time O(n^3) Space O(n^2)
 */
const matrixChain = (matrices) => {
  // Number of matrices
  const n = matrices.length;
  // Initialize a table to keep track of optimal solutions to subproblems
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  // For each chain length
  for (let l = 2; l < n; l++) {
    for (let i = 1; i < n - l + 1; i++) {
      const j = i + l - 1;
      if (j == n) continue;
      dp[i][j] = Number.MAX_VALUE;
      for (let k = i; k < j; k++) {
        dp[i][j] = Math.min(
          dp[i][j],
          dp[i][k] + dp[k + 1][j] + matrices[i - 1] * matrices[k] * matrices[j]
        );
      }
    }
  }
  return dp[1][n - 1];
};

module.exports = { matrixChain };
