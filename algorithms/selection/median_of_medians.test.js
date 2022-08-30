const { medianOfMedians } = require('./median_of_medians');

describe('Median of medians', () => {
  test('Should return the first element', () => {
    const arr = [1, 2, 3, 4, 5, 1000, 8, 9, 99];
    expect(medianOfMedians(arr, 0)).toEqual(1);
  });

  test('Should return the i-th element in the array', () => {
    const arr = [1, 2, 3, 4, 5, 1000, 8, 9, 99];
    expect(medianOfMedians(arr, 7)).toEqual(99);
  });

  test('Should return the i-th element in the array', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(medianOfMedians(arr, 4)).toEqual(5);
  });
});
