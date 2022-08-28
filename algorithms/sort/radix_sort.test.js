const { radixSort } = require('./radix_sort');

describe('Radix sort', () => {
  test('Should sort a list of positive values', () => {
    const arr = [12, 11, 13, 5, 6, 7];
    const expected = [5, 6, 7, 11, 12, 13];
    radixSort(arr);
    expect(arr).toEqual(expected);
  });

  test('Should sort a list of positive values with duplicates', () => {
    const arr = [12, 12, 13, 5, 6, 7, 5, 10, 20, 6];
    const expected = [5, 5, 6, 6, 7, 10, 12, 12, 13, 20];
    radixSort(arr);
    expect(arr).toEqual(expected);
  });
});
