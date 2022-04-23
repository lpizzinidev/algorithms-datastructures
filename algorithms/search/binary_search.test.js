const { binarySearch } = require('./binary_search');

describe('Binary Search', () => {
  const arr = [-10, -5, 0, 1, 3, 10, 15, 25, 100, 101];

  test('Should return the index of the existing values', () => {
    expect(binarySearch(arr, -5)).toBe(1);
    expect(binarySearch(arr, 1)).toBe(3);
    expect(binarySearch(arr, 100)).toBe(8);
  });

  test('Should return -1 if value is not present', () => {
    expect(binarySearch(arr, -20)).toBe(-1);
    expect(binarySearch(arr, 27)).toBe(-1);
    expect(binarySearch(arr, 110)).toBe(-1);
  });
});
