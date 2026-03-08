# easy-leetcode

A utility library for practicing LeetCode-style problems.

## Install

```bash
npm install easy-leetcode
```

## Usage

```ts
import { swap, peek, inBounds, dirs4, dirs8, key, lodash, Mnemonist } from "easy-leetcode";
```

### Array Helpers

- `swap(arr, i, j)` - Swap elements at indices i and j in place
- `peek(stack)` - Get the top element of a stack without removing it

### Grid Helpers

- `inBounds(grid, r, c)` - Check if coordinates are within grid bounds
- `dirs4` - 4-directional movement vectors (up, down, left, right)
- `dirs8` - 8-directional movement vectors

### Coordinate Helpers

- `getKey(r, c)` - Create a string key from row and column

### Char Helpers

- `charToIdx(c)` - Convert 'A'-'Z' to 0-25
- `idxToChar(i)` - Convert 0-25 to 'A'-'Z'

### Re-exports

- `lodash` - Full lodash library
- `Mnemonist` - Full mnemonist library
