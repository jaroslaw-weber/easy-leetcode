# algo-utils

A utility library for practicing LeetCode-style problems. Focus on solving the core algorithm, not on implementing data structures.

## Install

```bash
npm install algo-utils
```

## Why?

When practicing LeetCode, you often waste time implementing common data structures instead of focusing on the actual problem. This library gives you battle-tested implementations so you can concentrate on what matters.

## Quick Examples

### Grid traversal
```ts
// Before: repetitive bounds checking
if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) { ... }

// After: clean and simple
for (const [dr, dc] of dirs4) {
  const nr = r + dr, nc = c + dc;
  if (inBounds(grid, nr, nc)) { ... }
}
```

### Priority Queue (Min-Heap)
```ts
// Just focus on the algorithm, not heap implementation
const heap = new Heap<number>();
heap.push(5).push(1).push(3);
heap.pop(); // 1
```

### LRU Cache
```ts
// O(1) LRU cache built-in
const cache = new LRUCache<string, number>(3);
cache.set("a", 1);
cache.get("a"); // 1
```

### Swapping array elements
```ts
// Quick in-place swap without temp variable
swap(arr, i, j);
```

## API

### Custom Utils

| Function | Description |
|----------|-------------|
| `swap(arr, i, j)` | Swap elements at indices i and j in place |
| `peek(stack)` | Get the top element without removing it |
| `inBounds(grid, r, c)` | Check if coordinates are within grid bounds |
| `getKey(r, c)` | Create a string key from row and column |
| `charToIdx(c)` | Convert 'A'-'Z' to 0-25 |
| `idxToChar(i)` | Convert 0-25 to 'A'-'Z' |
| `dirs4` | 4-directional movement vectors |
| `dirs8` | 8-directional movement vectors |

### Lodash Re-exports

`chunk`, `uniq`, `uniqBy`, `flatten`, `flattenDeep`, `sortBy`, `reverse`, `fill`, `range`, `cloneDeep`, `groupBy`, `countBy`, `keyBy`, `partition`, `pick`, `omit`, `merge`, `get`, `set`, `has`, `zip`, `unzip`, `sum`, `mean`, `min`, `max`, `random`

### Mnemonist Re-exports

`Stack`, `Queue`, `Heap`, `MultiMap`, `BitSet`, `BloomFilter`, `MultiSet`, `Trie`, `LRUCache`

## Full Example: Number of Islands

```ts
// LeetCode 200 - Number of Islands
import { inBounds, dirs4 } from "algo-utils";

function numIslands(grid: string[][]): number {
  if (!grid.length) return 0;
  let count = 0;
  const rows = grid.length, cols = grid[0].length;
  
  function dfs(r: number, c: number) {
    if (!inBounds(grid, r, c) || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    for (const [dr, dc] of dirs4) dfs(r + dr, c + dc);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") { dfs(r, c); count++; }
    }
  }
  return count;
}
```

## Full Example: Top K Frequent Elements

```ts
// LeetCode 347 - Top K Frequent Elements
import { uniq, sortBy, countBy } from "algo-utils";

function topKFrequent(nums: number[], k: number): number[] {
  const freq = countBy(nums);
  return uniq(nums)
    .sort((a, b) => freq[b] - freq[a])
    .slice(0, k);
}
```

## Full Example: Longest Consecutive Sequence

```ts
// LeetCode 128 - Longest Consecutive Sequence
import { uniq } from "algo-utils";

function longestConsecutive(nums: number[]): number {
  if (!nums.length) return 0;
  const set = new Set(uniq(nums));
  let maxLen = 0;
  
  for (const num of set) {
    if (!set.has(num - 1)) {
      let len = 1;
      while (set.has(num + len)) len++;
      maxLen = Math.max(maxLen, len);
    }
  }
  return maxLen;
}
```

## Usage

```ts
import { 
  swap, peek, inBounds, dirs4, dirs8, getKey,
  chunk, uniq, flattenDeep, sortBy, range,
  Stack, Queue, Heap, LRUCache 
} from "algo-utils";
```
