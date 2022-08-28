/**
 * Counting sort implementation.
 *
 * Sort a list of elements in the range 0 to k in ascending order.
 *
 * Complexity analysis:
 * Time O(n) when k = O(n)
 * Space O(n)
 */
const countingSort = (arr) => {
  // Calculate the range of values in the input array
  const max = Math.max(...arr);
  const min = Math.min(...arr);

  const range = max - min + 1;

  // Create an array to store the count of each value
  const count = new Array(range).fill(0);
  // Create an array to store the sorted values
  const sorted = new Array(range).fill(0);

  // Increment the count of each number
  for (const num of arr) count[num - min]++;

  // Calculate the cumulative sum of count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Count now contains the index of the corresponding value
  // in the result: update the sorted array and decrease the count
  // for the value
  for (let i = arr.length - 1; i >= 0; i--) {
    sorted[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  // Copy the sorted elements into the array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sorted[i];
  }
};

module.exports = { countingSort };
