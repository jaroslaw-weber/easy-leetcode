import _, { chunk, uniq, uniqBy, flatten, flattenDeep, sortBy, reverse, fill, range, rangeRight, cloneDeep, groupBy, countBy, keyBy, partition, pick, omit, merge, get, set, has, zip, unzip, sum, mean, min, max, random, last } from "lodash";
import { Stack, Queue, Heap, MultiMap, BitSet, BloomFilter, MultiSet, Trie, LRUCache, DefaultMap } from "mnemonist";

export { Stack, Queue, Heap, MultiMap, BitSet, BloomFilter, MultiSet, Trie, LRUCache, DefaultMap };

export { chunk, uniq, flattenDeep, sortBy, range, rangeRight, sum, mean, min, max, fill, last };

export function swap<T>(arr: T[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export function peek<T>(stack: T[]): T | undefined {
  return stack[stack.length - 1];
}

export function inBounds<T>(grid: T[][], r: number, c: number): boolean {
  return r >= 0 && c >= 0 && r < grid.length && c < grid[0].length;
}

export const dirs4: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

export const dirs8: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1]
];

export function getKey(r: number, c: number): string {
  return `${r},${c}`;
}

export function charToIdx(c: string): number {
  return c.charCodeAt(0) - 65;
}

export function idxToChar(i: number): string {
  return String.fromCharCode(i + 65);
}

export class UnionFind {
  /** Parent array - each element points to its parent in the set */
  parent: number[];
  /** Rank array - used for union by rank optimization */
  rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  /** Path compression - makes future lookups O(α(n)) */
  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  /** Union by rank - attach smaller tree under larger tree */
  union(x: number, y: number): void {
    const px = this.find(x);
    const py = this.find(y);
    if (px === py) return;

    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
  }

  /** Check if two elements are in the same set */
  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }
}

/** Graph adjacency list - stores outgoing edges for each node */
export class AdjacencyList<T = number> {
  private map: DefaultMap<T, T[]>;

  constructor() {
    this.map = new DefaultMap<T, T[]>(() => []);
  }

  /** Add directed edge from -> to */
  addEdge(from: T, to: T): void {
    this.map.get(from).push(to);
  }

  /** Add undirected edge (adds both directions) */
  addUndirectedEdge(a: T, b: T): void {
    this.addEdge(a, b);
    this.addEdge(b, a);
  }

  /** Get all neighbors (outgoing edges) of a node */
  getNeighbors(node: T): T[] {
    return this.map.get(node);
  }

  /** Iterate over all nodes in the graph */
  get nodes(): IterableIterator<T> {
    return this.map.keys();
  }
}

/**
 * Kahn's algorithm for topological sorting
 * @returns Sorted array of nodes, or null if graph has a cycle
 */
export function topologicalSort<T>(adj: AdjacencyList<T>): T[] | null {
  const indegrees = new DefaultMap<T, number>(() => 0);
  
  for (const node of adj.nodes) {
    for (const neighbor of adj.getNeighbors(node)) {
      indegrees.set(neighbor, indegrees.get(neighbor) + 1);
    }
  }

  const queue = new Queue<T>();
  for (const node of adj.nodes) {
    if (indegrees.get(node) === 0) queue.enqueue(node);
  }

  const result: T[] = [];
  while (queue.size > 0) {
    const node = queue.dequeue()!;
    result.push(node);
    for (const neighbor of adj.getNeighbors(node)) {
      indegrees.set(neighbor, indegrees.get(neighbor) - 1);
      if (indegrees.get(neighbor) === 0) queue.enqueue(neighbor);
    }
  }

  return result.length === 0 ? null : result;
}

/**
 * Monotonic stack for O(n) solutions to problems like:
 * - Next Greater/Smaller Element
 * - Largest Rectangle in Histogram
 * - Daily Temperatures
 * - Trapping Rain Water
 *
 * Use popWhile to maintain monotonic property before pushing
 */
export class MonotonicStack<T = number> {
  private stack: T[] = [];

  constructor() {}

  /** Push item to stack */
  push(item: T): void {
    this.stack.push(item);
  }

  /** Get top without removing */
  peek(): T | undefined {
    return last(this.stack);
  }

  /** Pop elements while predicate returns true */
  popWhile(predicate: (item: T) => boolean): void {
    while (this.stack.length > 0 && predicate(last(this.stack)!)) {
      this.stack.pop();
    }
  }

  /** Remove and return top */
  pop(): T | undefined {
    return this.stack.pop();
  }

  /** Check if empty */
  get isEmpty(): boolean {
    return this.stack.length === 0;
  }

  /** Current size */
  get size(): number {
    return this.stack.length;
  }
}

/**
 * Monotonic queue for O(n) sliding window problems like:
 * - Sliding Window Maximum/Minimum
 * - Longest Substring with At Most K Distinct Characters
 *
 * Use popWhile to maintain monotonic property
 */
export class MonotonicQueue<T = number> {
  private deque: T[] = [];

  /** Push to back */
  push(item: T): void {
    this.deque.push(item);
  }

  /** Pop from front (for when element leaves window) */
  pop(): T | undefined {
    return this.deque.shift();
  }

  /** Pop elements while predicate returns true (from front) */
  dequeueWhile(predicate: (item: T) => boolean): void {
    while (this.deque.length > 0 && predicate(this.deque[0])) {
      this.deque.shift();
    }
  }

  /** Get front element without removing */
  front(): T | undefined {
    return this.deque[0];
  }

  /** Get max/min without removing (front) */
  peek(): T | undefined {
    return this.front();
  }

  /** Check if empty */
  get isEmpty(): boolean {
    return this.deque.length === 0;
  }

  /** Current size */
  get size(): number {
    return this.deque.length;
  }
}

/**
 * Counter class for counting occurrences of items
 * Internally uses DefaultMap with default value 0
 */
export class Counter {
  private map: DefaultMap<string, number>;

  constructor(items?: string[]) {
    this.map = new DefaultMap<string, number>(() => 0);
    if (items) {
      for (const item of items) {
        this.increase(item);
      }
    }
  }

  /** Get the count for a key (returns 0 if not set) */
  get(key: string): number {
    return this.map.get(key);
  }

  /** Set the count for a key */
  set(key: string, value: number): void {
    this.map.set(key, value);
  }

  /** Increase the count for a key by amount (default 1) */
  increase(key: string, amount: number = 1): number {
    const newValue = this.map.get(key) + amount;
    this.map.set(key, newValue);
    return newValue;
  }

  /** Decrease the count for a key by amount (default 1) */
  decrease(key: string, amount: number = 1): number {
    const newValue = this.map.get(key) - amount;
    this.map.set(key, newValue);
    return newValue;
  }

  /** Get all entries */
  entries(): IterableIterator<[string, number]> {
    return this.map.entries();
  }

  /** Get all keys */
  keys(): IterableIterator<string> {
    return this.map.keys();
  }

  /** Check if key exists */
  has(key: string): boolean {
    return this.map.has(key);
  }
}

/**
 * Bucket sort (counting sort) for integers in a known range
 * Time: O(n + k), Space: O(k) where k = max - min + 1
 * @param arr - Array to sort
 * @param min - Minimum value in the range (inclusive)
 * @param max - Maximum value in the range (inclusive)
 * @returns New sorted array
 * @example bucketSort([2, 0, 2, 1, 1], 0, 2) // [0, 1, 1, 2, 2]
 */
export function bucketSort(arr: number[], min: number, max: number): number[] {
  const bucketSize = max - min + 1;
  const counts = Array(bucketSize).fill(0);
  
  for (const num of arr) {
    counts[num - min]++;
  }
  
  const result: number[] = [];
  for (let i = 0; i < bucketSize; i++) {
    for (let j = 0; j < counts[i]; j++) {
      result.push(i + min);
    }
  }
  
  return result;
}
