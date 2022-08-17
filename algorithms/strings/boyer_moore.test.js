const { boyerMoore } = require('./boyer_moore');

describe('Boyer-Moore', () => {
  test('Should find matches in a string', () => {
    const txt = 'AABAACAADAABAABA';
    const pat = 'AABA';
    const expected = [0, 9, 12];
    const res = boyerMoore(txt, pat);
    expect(res).toEqual(expected);
  });

  test('Should return an empty array if strings does not match', () => {
    const txt = 'AABAACAADAABAABA';
    const pat = 'AABAX';
    const expected = [];
    const res = boyerMoore(txt, pat);
    expect(res).toEqual(expected);
  });
});
