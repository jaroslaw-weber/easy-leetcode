import _, { chunk, uniq, uniqBy, flatten, flattenDeep, sortBy, reverse, fill, range, cloneDeep, groupBy, countBy, keyBy, partition, pick, omit, merge, get, set, has, zip, unzip, sum, mean, min, max, random } from "lodash";
import { Stack, Queue, Heap, MultiMap, BitSet, BloomFilter, MultiSet, Trie, LRUCache } from "mnemonist";

export { chunk, uniq, uniqBy, flatten, flattenDeep, sortBy, reverse, fill, range, cloneDeep, groupBy, countBy, keyBy, partition, pick, omit, merge, get, set, has, zip, unzip, sum, mean, min, max, random };
export { Stack, Queue, Heap, MultiMap, BitSet, BloomFilter, MultiSet, Trie, LRUCache };

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
