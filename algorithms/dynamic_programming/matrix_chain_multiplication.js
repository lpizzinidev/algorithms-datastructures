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
    // For each matrix parenthesization
    for (let i = 1; i < n - l + 1; i++) {
      const j = i + l - 1;
      if (j == n) continue;
      // Set the cost of multiplying matrices[i]...matrices[j] to infinity
      dp[i][j] = Number.MAX_VALUE;
      for (let k = i; k < j; k++) {
        // Update the cost to multiply matrices[i]...matrices[j] if possible
        dp[i][j] = Math.min(
          dp[i][j],
          // Cost of multiplying matrices[i]...matrices[k]
          dp[i][k] +
            // Cost of multiplying matrices[k+1]...matrices[j]
            dp[k + 1][j] +
            // Cost of multiplying two `i-1 x k` and `k x j` matrices
            matrices[i - 1] * matrices[k] * matrices[j]
        );
      }
    }
  }
  return dp[1][n - 1];
};

module.exports = { matrixChain };
