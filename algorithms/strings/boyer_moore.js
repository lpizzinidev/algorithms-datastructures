/**
 * Boyer-Moore algorithm implementation.
 *
 * Search the `pat` substring in the `txt` string.
 * It returns all indexes where the pattern is found.
 */
const boyerMoore = (txt, pat) => {
  const numberOfChars = 256;
  const res = [];
  // If one of the string is empty, there are no matches
  if (txt === '' || pat === '') return res;
  let n = txt.length,
    m = pat.length;
  // If the pattern is longer than the string, there are no matches
  if (m > n) return res;
  // Keep track of the rightmost position of each character in pattern
  const right = new Array(numberOfChars).fill(-1);
  for (let i = 0; i < m; i++) {
    right[pat.charCodeAt(i)] = i;
  }
  let skip;
  for (let i = 0; i <= n - m; i += skip) {
    // Check if the pattern match at position i
    skip = 0;
    for (let j = m - 1; j >= 0; j--) {
      if (pat[j] !== txt[i + j]) {
        // Pattern does not match, shift the pattern
        // so that the next character in text aligns
        // with the last occurrence of it in pattern
        skip = j - right[txt.charCodeAt(i + j)];
        // Skip at least one character
        if (skip < 1) skip = 1;
        break;
      }
    }
    // Match found
    if (skip === 0) {
      res.push(i);
      // Shift the pattern so that the next character
      // in text aligns with the last occurrence of it in pattern
      skip = i + m < n ? m - right[txt.charCodeAt(i + m)] : 1;
    }
  }
  return res;
};

module.exports = { boyerMoore };
