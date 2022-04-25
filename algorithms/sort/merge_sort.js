/**
 * Merge sort implementation.
 * Sort the given list in-place.
 */
const mergeSort = (arr) => {
  sort(arr, 0, arr.length - 1);
};

// Sort the array values between start and end
const sort = (arr, start, end) => {
  // If there are no elements to be sorted
  // return
  if (start >= end) return;
  // Recursively call the algorithms spitting the array
  const center = Math.floor((start + end - 1) / 2);
  sort(arr, start, center);
  sort(arr, center + 1, end);
  // Merge the sorted arrays
  merge(arr, start, center, end);
};

// Merge the sorted array values of the two subarrays
// arr[start..center] and arr[center+1..end]
const merge = (arr, start, center, end) => {
  // Initialize a temporary array to store the
  // merged values
  const tempArr = [];
  // Initialize two pointers to keep track of
  // the currently evaluated values in the arrays
  let idx1 = start;
  let idx2 = center + 1;
  // While both arrays have values
  while (idx1 <= center && idx2 <= end) {
    // If the element from the first array
    // is smaller than the element from the
    // second array add the element from the first array
    // to the temp array and increase the first index
    if (arr[idx1] < arr[idx2]) tempArr.push(arr[idx1++]);
    // If not, add the element from the second
    // array to the temp array and increase center
    else tempArr.push(arr[idx2++]);
  }
  // Populate the temporary array with the remaining
  // element from the first array
  while (idx1 <= center) tempArr.push(arr[idx1++]);
  // Populate the temporary array with the remaining
  // element from the second array
  while (idx2 <= end) tempArr.push(arr[idx2++]);
  // Update the values in the original array
  // with the sorted values
  for (let i = start; i <= end; i++) {
    arr[i] = tempArr[i - start];
  }
};

module.exports = { mergeSort };
