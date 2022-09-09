const { huffmanCode } = require('./huffman_code');

describe("Huffman's code", () => {
  test('should return the optimal encoding', () => {
    const chars = ['a', 'b', 'c', 'd', 'e', 'f'];
    const freqs = [45, 13, 12, 16, 9, 5];
    const res = huffmanCode(chars, freqs);
    expect(res['a']).toBe('0');
    expect(res['b']).toBe('101');
    expect(res['c']).toBe('100');
    expect(res['d']).toBe('111');
    expect(res['e']).toBe('1101');
    expect(res['f']).toBe('1100');
  });
});
