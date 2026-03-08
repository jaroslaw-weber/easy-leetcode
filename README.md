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
heap.push(5);
heap.push(1);
heap.push(3);
heap.pop(); // 1
```

### LRU Cache
```ts
// O(1) LRU cache built-in
const cache = new LRUCache<string, number>(3);
cache.set("a", 1);
cache.get("a"); // 1
```

### DefaultMap
```ts
// Like Python's defaultdict - auto-initialize missing keys
const map = new DefaultMap<string, number[]>(() => []);
map.get("foo").push(1); // no need to check if "foo" exists
map.get("foo").push(2);
map.get("foo"); // [1, 2]
```

### Union Find
```ts
// O(α(n)) per operation - nearly constant time
const uf = new UnionFind(5);
uf.union(0, 1);
uf.union(1, 2);
uf.connected(0, 2); // true
uf.connected(0, 3); // false
```

### Adjacency List
```ts
// Generic graph representation
const adj = new AdjacencyList<number>();
adj.addUndirectedEdge(1, 2);
adj.addUndirectedEdge(1, 3);
adj.getNeighbors(1); // [2, 3]
```

### Topological Sort
```ts
// Kahn's algorithm - returns null if cycle exists
const adj = new AdjacencyList<string>();
adj.addEdge("a", "b");
adj.addEdge("b", "c");
topologicalSort(adj); // ["a", "b", "c"] or similar
```

### Monotonic Stack
```ts
// Next greater element - find next bigger number to the right
// Input: [2, 1, 2, 4, 3] → Output: [4, 2, 4, -1, -1]
import { rangeRight } from "algo-utils";

const nums = [2, 1, 2, 4, 3];
const result = Array(nums.length).fill(-1);
const stack = new MonotonicStack<number>();

for (const i of rangeRight(nums.length)) {
  stack.popWhile((top) => nums[i] >= top);
  result[i] = stack.peek() ?? -1;
  stack.push(nums[i]);
}
result; // [4, 2, 4, -1, -1]
```

### Monotonic Queue
```ts
// Sliding window maximum
// Input: [1,3,-1,-3,3,3], k=3 → Output: [3,3,3,3]
import { range } from "algo-utils";

const nums = [1, 3, -1, -3, 3, 3];
const k = 3;
const result: number[] = [];
const queue = new MonotonicQueue<number>();

for (const i of range(nums.length)) {
  if (i >= k && nums[i - k] === queue.front()) queue.pop();
  queue.dequeueWhile((front) => nums[i] >= front);
  queue.push(nums[i]);
  if (i >= k - 1) result.push(queue.peek()!);
}
result; // [3, 3, 3, 3]
```

### Counter
```ts
// Count occurrences with ease
const counter = new Counter();
counter.increase("apple");     // 1
counter.increase("apple");     // 2
counter.increase("banana", 3); // 3
counter.get("apple");          // 2
counter.decrease("banana");    // 2
counter.get("banana");         // 2

// Or initialize from an array
const counter2 = new Counter(["a", "b", "a", "c", "a"]);
counter2.get("a"); // 3
counter2.get("b"); // 1
counter2.get("c"); // 1
```

### Bucket Sort
```ts
// O(n + k) sort for integers in a known range
const nums = [2, 0, 2, 1, 1, 0];
bucketSort(nums, 0, 2); // [0, 0, 1, 1, 2, 2]

// Perfect for Sort Colors (LC 75)
const colors = [2, 0, 2, 1, 1, 0];
bucketSort(colors, 0, 2); // [0, 0, 1, 1, 2, 2]
```

### Swapping array elements
```ts
// Quick in-place swap without temp variable
swap(arr, i, j);
```

## API

### Custom Utils

| Function/Class | Description |
|----------------|-------------|
| `swap(arr, i, j)` | Swap elements at indices i and j in place |
| `peek(stack)` | Get the top element without removing it |
| `inBounds(grid, r, c)` | Check if coordinates are within grid bounds |
| `getKey(r, c)` | Create a string key from row and column |
| `charToIdx(c)` | Convert 'A'-'Z' to 0-25 |
| `idxToChar(i)` | Convert 0-25 to 'A'-'Z' |
| `dirs4` | 4-directional movement vectors |
| `dirs8` | 8-directional movement vectors |
| `UnionFind` | Disjoint set union with path compression and union by rank |
| `AdjacencyList<T>` | Graph adjacency list with directed/undirected edge support |
| `topologicalSort(adj)` | Kahn's algorithm - returns sorted order or null if cycle exists |
| `MonotonicStack` | Stack with popWhile for next greater/smaller problems |
| `MonotonicQueue` | Queue for sliding window maximum/minimum |
| `Counter` | Counter class with get/set/increase/decrease using DefaultMap |
| `bucketSort(arr, min, max)` | O(n + k) counting sort for integers in range [min, max] |

### Lodash Re-exports

`chunk`, `uniq`, `uniqBy`, `flatten`, `flattenDeep`, `sortBy`, `reverse`, `fill`, `range`, `cloneDeep`, `groupBy`, `countBy`, `keyBy`, `partition`, `pick`, `omit`, `merge`, `get`, `set`, `has`, `zip`, `unzip`, `sum`, `mean`, `min`, `max`, `random`

### Mnemonist Re-exports

`Stack`, `Queue`, `Heap`, `MultiMap`, `DefaultMap`, `BitSet`, `BloomFilter`, `MultiSet`, `Trie`, `LRUCache`

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

## Usage

```ts
import { 
  swap, peek, inBounds, dirs4, dirs8, getKey,
  chunk, uniq, flattenDeep, sortBy, range,
  Stack, Queue, Heap, LRUCache 
} from "algo-utils";
```
