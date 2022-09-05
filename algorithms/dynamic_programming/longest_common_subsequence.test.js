const { lcs } = require('./longest_common_subsequence');

describe('Longest Common Subsequence', () => {
  test('should calculate lcs of two sequences', () => {
    expect(lcs('ABCDGH', 'AEDFHR')).toBe(3);
    expect(lcs('AGGTAB', 'GXTXAYB')).toBe(4);
    expect(lcs('helloworld', 'playword')).toBe(5);
    expect(lcs('hello', 'hello')).toBe(5);
    expect(lcs('abc', 'def')).toBe(0);
  });
});
