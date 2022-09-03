const { cutRod } = require('./rod_cutting');

describe('Rod cutting', () => {
  test('Should find the maximal revenue', () => {
    const prices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
    expect(cutRod(prices, 4)).toBe(10);
    expect(cutRod(prices, 8)).toBe(22);
  });
});
