/**
 * Radix sort implementation.
 *
 * Sort a list of elements in ascending order by using a
 * stable sort to sort each digit of the array from the least
 * significant.
 *
 * Complexity analysis:
 * Time O(n) if stable sort is O(n)
 */
const radixSort = (arr) => {
  // Calculate the max value in the array
  const max = Math.max(...arr);
  // For each digit, from the least significant
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    // Apply count sort
    countSort(arr, exp);
  }
};

/**
 * Count sort auxiliary implementation.
 * Sort the array on the digit represented by exp.
 */
const countSort = (arr, exp) => {
  // Size of the array
  const n = arr.length;

  // Initialize an array to store the sorted array
  const sorted = new Array(n).fill(0);
  // Initialize an array to store the count of each digit
  const count = new Array(10).fill(0);

  // Increase the counter of each digit
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  // Store the cumulative value of each digit
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Update the sorted array with the value represented by the index
  // in count and decrease the counter for the value
  for (let i = n - 1; i >= 0; i--) {
    sorted[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }

  // Copy the sorted elements into the array
  for (let i = 0; i < n; i++) arr[i] = sorted[i];
};

module.exports = { radixSort };
