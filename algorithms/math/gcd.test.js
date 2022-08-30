const { gcd } = require('./gcd');

describe("Euclid's algorithm", () => {
  test('Should calculate the GCD of two numbers', () => {
    expect(gcd(210, 45)).toEqual(15);
    expect(gcd(270, 192)).toEqual(6);
  });
});
