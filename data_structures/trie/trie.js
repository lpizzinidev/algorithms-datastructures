const ALPHABET_SIZE = 26; // lowercase english letters

/**
 * Trie implementation
 */
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Inserts a new key into the trie
  insert(key) {
    let cur = this.root;
    for (let i = 0; i < key.length; i++) {
      const idx = key.charCodeAt(i) - 'a'.charCodeAt(0);
      if (idx < 0 || idx >= ALPHABET_SIZE) {
        throw new Error('Invalid key format');
      }
      if (cur.children[idx] === null) {
        cur.children[idx] = new TrieNode();
      }
      cur = cur.children[idx];
    }
    cur.isEnd = true;
  }

  // Checks if a key is present in the trie
  search(key) {
    let cur = this.root;
    for (let i = 0; i < key.length; i++) {
      const idx = key.charCodeAt(i) - 'a'.charCodeAt(0);
      if (idx < 0 || idx >= ALPHABET_SIZE) {
        throw new Error('Invalid key format');
      }
      if (cur.children[idx] === null) return false;
      cur = cur.children[idx];
    }
    return cur.isEnd;
  }
}

/**
 * Trie node implementation
 */
class TrieNode {
  constructor() {
    this.isEnd = false;
    this.children = new Array(ALPHABET_SIZE).fill(null);
  }
}

module.exports = { Trie };
