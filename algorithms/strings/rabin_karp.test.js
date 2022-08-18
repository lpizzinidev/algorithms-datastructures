const { rabinKarp } = require('./rabin_karp');

describe('Rabin-Karp', () => {
  test('Should find matches in a string', () => {
    const txt = 'AABAACAADAABAABA';
    const pat = 'AABA';
    const expected = [0, 9, 12];
    const res = rabinKarp(txt, pat);
    expect(res).toEqual(expected);
  });

  test('Should return an empty array if strings does not match', () => {
    const txt = 'AABAACAADAABAABA';
    const pat = 'AABAX';
    const expected = [];
    const res = rabinKarp(txt, pat);
    expect(res).toEqual(expected);
  });
});
