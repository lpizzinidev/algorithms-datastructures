const { mergeSort } = require('./merge_sort');

describe('Merge Sort', () => {
  test('Should sort a list of positive values', () => {
    const arr = [12, 11, 13, 5, 6, 7];
    const expected = [5, 6, 7, 11, 12, 13];
    mergeSort(arr);
    expect(arr).toEqual(expected);
  });

  test('Should sort a list of positive values with duplicates', () => {
    const arr = [12, 12, 13, 5, 6, 7, 5, 10, 20, 6];
    const expected = [5, 5, 6, 6, 7, 10, 12, 12, 13, 20];
    mergeSort(arr);
    expect(arr).toEqual(expected);
  });

  test('Should sort a list of values with negatives', () => {
    const arr = [-12, 12, 13, -5, 6, 0, 7, 5, 10, 20, -6];
    const expected = [-12, -6, -5, 0, 5, 6, 7, 10, 12, 13, 20];
    mergeSort(arr);
    expect(arr).toEqual(expected);
  });
});
