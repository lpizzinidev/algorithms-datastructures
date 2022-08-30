/**
 * Median of medians algorithm implementation.
 *
 * Find the i-th smallest element in an array.
 *
 * Complexity analysis:
 * Time O(n)
 * Space O(1)
 */
const medianOfMedians = (arr, index) => {
  // Size of the array
  const n = arr.length;
  // Number of groups
  const g = Math.ceil(n / 5);
  // Store the number of groups
  const groups = new Array(g);
  // Divide the n elements of the input array into n / 5 sorted groups of 5 elements
  for (let i = 0; i < g; i++) {
    const start = i * 5;
    groups[i] = [...arr].slice(start, start + 5).sort((a, b) => a - b);
  }
  // Find the median element of each group
  const medians = groups.map((group) => group[Math.floor(group.length / 2)]);
  // Median of the n / 5 groups
  let pivot = -1;
  // If there are more than 5 groups, recursively call the function
  // to find the pivot element
  if (medians.length > 5) pivot = medianOfMedians(medians, medians.length / 2);
  // If there are less than 5 elements, calculate the median directly
  else pivot = medians.sort((a, b) => a - b)[Math.floor(medians.length / 2)];
  // Filter the values smaller than the pivot
  const low = arr.filter((value) => value < pivot);
  const k = low.length;
  // If the searched element correspond to the pivot, return it
  if (index === k) return pivot;
  // If the searched element is in the lowest subarray, recurse there
  if (index < k) return medianOfMedians(low, index);
  // Filter the values larger than the pivot
  const high = arr.filter((value) => value > pivot);
  // If the searched element is in the highest subarray, recurse there
  return medianOfMedians(high, index - k - 1);
};

module.exports = { medianOfMedians };
