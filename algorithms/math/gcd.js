/**
 * Euclid's algorithm implementation.
 *
 * Calculate the greatest common divisor of two numbers.
 */
const gcd = (p, q) => {
  if (q === 0) return p;
  return gcd(q, p % q);
};

module.exports = { gcd };
