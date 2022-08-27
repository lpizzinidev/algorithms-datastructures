/**
 * Quicksort implementation.
 *
 * Sort a list of elements in ascending order in place.
 *
 * Complexity analysis:
 * Time O(n^2) worst case O(n*log(n)) average
 * Space O(1)
 */
const quicksort = (arr) => {
  // Call recursive function on whole array
  sort(arr, 0, arr.length - 1);
};

const sort = (arr, start, end) => {
  // If there is one or no elements the subarray is already sorted
  if (start >= end) return;
  // Calculate the index of the pivot element
  // arr[start..pivot] contains all elements smaller than pivot
  // arr[end..pivot] contains all elements larger than pivot
  const pivot = partition(arr, start, end);
  // Recursively apply procedure
  sort(arr, start, pivot - 1);
  sort(arr, pivot + 1, end);
};

const partition = (arr, start, end) => {
  // Pick a random value as pivot to reduce the possibility of
  // a worst case partition
  const randomPivotIdx = Math.floor(Math.random() * (end - start)) + start;
  swap(arr, randomPivotIdx, end);
  const value = arr[end];
  let i = start - 1;
  // For each element in the subarray
  for (let j = start; j < end; j++) {
    // If greater than pivot, add it to the right subarray
    if (arr[j] > value) continue;
    // If smaller, add it to the left subarray and increase its size
    i++;
    swap(arr, i, j);
  }
  // Put the pivot in the central position
  swap(arr, i + 1, end);
  // Return the index of the pivot element
  return i + 1;
};

const swap = (arr, idx1, idx2) => {
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
};

module.exports = { quicksort };
