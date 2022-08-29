/**
 * Bucket sort implementation.
 *
 * Sort a list of floating point numbers in ascending order.
 *
 * Complexity analysis:
 * Time O(n) on average
 * Space O(n)
 */
const bucketSort = (arr) => {
  const n = arr.length;
  // Initialize an array of buckets
  // Each bucket will contain a sublist of values to be sorted
  const buckets = new Array(n).fill().map(() => []);
  // Add each array element into a bucket
  for (const num of arr) {
    const idx = Math.floor(num * n);
    buckets[idx].push(num);
  }
  // Sort the individual buckets
  for (let i = 0; i < n; i++) {
    buckets[i].sort((a, b) => a - b);
  }
  // Concatenate the sorted buckets into the original array
  let idx = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      arr[idx++] = buckets[i][j];
    }
  }
};

module.exports = { bucketSort };
