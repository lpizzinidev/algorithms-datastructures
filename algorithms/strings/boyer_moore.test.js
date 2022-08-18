const { boyerMoore } = require('./boyer_moore');

describe('Boyer-Moore', () => {
  test('Should find matches in a string', () => {
    const txt = 'AABAACAADAABAABA';
    const pat = 'AABA';
    const expected = [0, 9, 12];
    const res = boyerMoore(txt, pat);
    expect(res).toEqual(expected);
  });

  test('Should find matches in a string with special characters', () => {
    const txt = 'P@TTerNabcdefP@TTerNP@TTerNabcdefabcdefabcdefabcdefP@TTerN';
    const pat = 'P@TTerN';
    const expected = [0, 13, 20, 51];
    const res = boyerMoore(txt, pat);
    expect(res).toEqual(expected);
  });

  test('Should find matches in a string when pattern is a single character', () => {
    const txt = 'ababababa';
    const pat = 'a';
    const expected = [0, 2, 4, 6, 8];
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
