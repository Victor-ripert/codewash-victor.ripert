# Issue #28 — Biased Shuffle Algorithm in SkillCard Memory Game

## Problem

The memory game in `SkillCard.jsx` shuffled cards using:

```javascript
array.sort(() => Math.random() - 0.5)
```

This approach is **not a uniform shuffle**. The `Array.prototype.sort` comparator is expected to be consistent (if `a < b` then `b > a`), but `Math.random() - 0.5` returns a different value on every call. Different JavaScript engines use different sorting algorithms (TimSort, QuickSort, etc.), and each produces a different bias pattern with a random comparator. In practice, elements near their original positions are favored, so certain card arrangements appear far more often than others.

## Impact

- Some card layouts were more likely than others, making the memory game subtly unfair.
- Depending on the browser engine, the bias could be significant (up to ~30 % deviation from uniform for small arrays).

## Fix

Replaced both `sort(() => Math.random() - 0.5)` calls with a **Fisher-Yates (Knuth) shuffle**, which guarantees every permutation is equally likely in O(n) time.

```javascript
const fisherYatesShuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
```

The two affected lines in the `useEffect` that initializes the memory game were updated:

```javascript
// Before
const shuffledMobs = [...allMobKeys].sort(() => Math.random() - 0.5);
let deck = [...selectedMobs, ...selectedMobs].sort(() => Math.random() - 0.5);

// After
const shuffledMobs = fisherYatesShuffle(allMobKeys);
let deck = fisherYatesShuffle([...selectedMobs, ...selectedMobs]);
```

## References

- Fisher-Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
- "The Danger of Naive Shuffling": https://blog.codinghorror.com/the-danger-of-naivete/
