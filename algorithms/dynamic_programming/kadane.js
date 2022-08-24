/**
 * Kadane's algorithm implementation.
 *
 * Solves the maximum subarray problem: find the series of
 * contiguous elements with the maximum sum in a given array.
 *
 * Complexity analysis:
 * Time O(n) Space O(1) where n is the size of the array.
 */
const kadane = (arr) => {
  const n = arr.length;

  // Keep track of the max cumulative sum so far
  // and in the subarray arr[start..end]
  let res = arr[0],
    cur = arr[0];

  for (let i = 1; i < n; i++) {
    // If the current value is greater than the sum
    // reset the starting point and the current sum
    if (arr[i] > cur + arr[i]) cur = arr[i];
    // Otherwise, keep increasing the current sum
    else cur += arr[i];

    // Update the maximum sum if possible and
    res = Math.max(res, cur);
  }

  return res;
};

module.exports = { kadane };
