/**
 * Binary search implementation.
 * Returns the index of the target element in arr, -1 if not present.
 */
const binarySearch = (arr, target) => {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) / 2;
    if (target === arr[mid]) return mid;
    if (target < arr[mid]) hi = mid - 1;
    else lo = mid + 1;
  }
  return -1;
};

module.exports = { binarySearch };
