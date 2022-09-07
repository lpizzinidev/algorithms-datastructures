const { huffman } = require('./huffman_code');

describe("Huffman's code", () => {
  test('should return the root of the tree representing the prefix code', () => {
    const chars = ['a', 'b', 'c', 'd', 'e', 'f'];
    const freqs = [45, 13, 12, 16, 9, 5];
    const res = huffman(chars, freqs);
    expect(res.freq).toBe(100);
    expect(res.left.freq).toBe(45);
    expect(res.right.freq).toBe(55);
  });
});
