const { kadane } = require('./kadane');

describe('Kadane', () => {
  test('Should find the maximum subarray sum', () => {
    const arr = [-3, 1, -8, 4, -1, 2, 1, -5, 5];
    expect(kadane(arr)).toBe(6);
  });

  test('Should find the maximum subarray sum', () => {
    const arr = [
      13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7,
    ];
    expect(kadane(arr)).toBe(43);
  });
});
