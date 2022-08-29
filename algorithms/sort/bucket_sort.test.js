const { bucketSort } = require('./bucket_sort');

describe('Bucket sort', () => {
  test('Should sort a list of numbers between 0 and 1', () => {
    const arr = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434];
    const expected = [0.1234, 0.3434, 0.565, 0.656, 0.665, 0.897];
    bucketSort(arr);
    expect(arr).toEqual(expected);
  });
});
