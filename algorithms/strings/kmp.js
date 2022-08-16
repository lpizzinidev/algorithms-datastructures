/**
 * Knuth-Morris-Pratt algorithm implementation.
 *
 * Search the `pat` substring in the `txt` string.
 * It returns all indexes where the pattern is found.
 */
const kmp = (txt, pat) => {
  const res = [];
  // If one of the string is empty, there are no matches
  if (txt === '' || pat === '') return res;
  let i = 0,
    j = 0,
    n = txt.length,
    m = pat.length;
  // If the pattern is longer than the string, there are no matches
  if (m > n) return res;
  // Calculate prefixes and suffixes matches in pat
  const match = kmpMatches(pat);
  // For each character in txt
  while (i < n) {
    // If characters match, increase both pointers
    if (txt[i] === pat[j]) {
      i++;
      j++;
    }
    if (j === m) {
      // Found a match
      res.push(i - j);
      j = match[j - 1];
    } else if (i < n && txt[i] !== pat[j]) {
      // Match not found
      if (j !== 0) j = match[j - 1];
      else i++;
    }
  }
  return res;
};

// Calculate the longest match between a prefix starting at 0
// and a suffix starting at i in the pattern
const kmpMatches = (pat) => {
  const match = Array(pat.length).fill(0);
  let i = 1,
    len = 0;
  while (i < pat.length) {
    if (pat[i] === pat[len]) match[i++] = ++len;
    else {
      if (len > 0) len = match[len - 1];
      else i++;
    }
  }
  return match;
};

module.exports = { kmp };
