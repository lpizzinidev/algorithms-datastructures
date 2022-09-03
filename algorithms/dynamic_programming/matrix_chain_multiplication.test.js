const { matrixChain } = require('./matrix_chain_multiplication');

describe('Matrix chain multiplication', () => {
  test('Should find the minimum number of scalar multiplication', () => {
    expect(matrixChain([40, 20, 30, 10, 30])).toBe(26000);
    expect(matrixChain([1, 2, 3, 4, 3])).toBe(30);
    expect(matrixChain([10, 20, 30])).toBe(6000);
  });
});
