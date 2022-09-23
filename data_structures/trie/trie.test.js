const { Trie } = require('./trie');

describe('Trie', () => {
  test('should perform basic trie operations', () => {
    const trie = new Trie();

    trie.insert('example');
    trie.insert('test');
    trie.insert('experiment');

    expect(trie.search('example')).toBe(true);
    expect(trie.search('experiment')).toBe(true);

    expect(trie.search('exampl')).toBe(false);
    expect(trie.search('examplee')).toBe(false);
  });
});
