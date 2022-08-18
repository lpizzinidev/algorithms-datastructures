const NUM_CHARS = 256;
const Q = 1013; // Pick a random large prime number

/**
 * Rabin-Karp algorithm implementation.
 *
 * Search the `pat` substring in the `txt` string.
 * It returns all indexes where the pattern is found.
 */
const rabinKarp = (txt, pat) => {
  const res = [];
  // If one of the string is empty, there are no matches
  if (txt === '' || pat === '') return res;
  let n = txt.length,
    m = pat.length;
  // If the pattern is longer that the string, there are no matches
  if (m > n) return res;
  // Calculate the term to be used in removing the leading character
  let RM = 1;
  for (let i = 0; i < m - 1; i++) RM = (NUM_CHARS * RM) % Q;
  // Calculate hash of pattern
  const patHash = rabinKarpHash(pat, m);
  // Calculate initial hash of text
  let txtHash = rabinKarpHash(txt, m);
  // Check if an initial match is found
  if (patHash === txtHash) res.push(0);
  // Traverse text and update text hash by remving from it
  // the leading character, adding the leading character
  // and checking for matches
  for (let i = m; i < n; i++) {
    // Remove trailing character from text hash
    txtHash = (txtHash + Q - ((RM * txt.charCodeAt(i - m)) % Q)) % Q;
    // Add leading character to text hash
    txtHash = (txtHash * NUM_CHARS + txt.charCodeAt(i)) % Q;
    // Check for a match (Monte Carlo)
    if (txtHash === patHash) res.push(i - m + 1);
  }
  return res;
};

// Return an hash value for `txt` first `len` characters
const rabinKarpHash = (txt, len) => {
  let h = 0;
  for (let i = 0; i < len; i++) {
    h = (NUM_CHARS * h + txt.charCodeAt(i)) % Q;
  }
  return h;
};

module.exports = { rabinKarp };
