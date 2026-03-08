import { swap, peek, inBounds, getKey, charToIdx, idxToChar, dirs4, dirs8 } from "./index";
import { chunk, uniq, flattenDeep, sortBy, range, sum, mean, min, max, fill } from "./index";
import { Stack, Queue, Heap, LRUCache, BitSet } from "./index";

describe("lodash reexports", () => {
  describe("chunk", () => {
    it("chunks array", () => {
      expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
    });
  });

  describe("uniq", () => {
    it("removes duplicates", () => {
      expect(uniq([1, 2, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe("flattenDeep", () => {
    it("flattens deeply", () => {
      expect(flattenDeep([1, [2, [3]]])).toEqual([1, 2, 3]);
    });
  });

  describe("sortBy", () => {
    it("sorts by key", () => {
      expect(sortBy([{a: 3}, {a: 1}, {a: 2}], "a")).toEqual([{a: 1}, {a: 2}, {a: 3}]);
    });
  });

  describe("range", () => {
    it("creates range", () => {
      expect(range(3)).toEqual([0, 1, 2]);
    });
  });

  describe("sum", () => {
    it("sums array", () => {
      expect(sum([1, 2, 3])).toBe(6);
    });
  });

  describe("mean", () => {
    it("calculates mean", () => {
      expect(mean([1, 2, 3])).toBe(2);
    });
  });

  describe("min", () => {
    it("finds min", () => {
      expect(min([3, 1, 2])).toBe(1);
    });
  });

  describe("max", () => {
    it("finds max", () => {
      expect(max([1, 3, 2])).toBe(3);
    });
  });

  describe("fill", () => {
    it("fills array", () => {
      expect(fill([1, 2, 3], "a")).toEqual(["a", "a", "a"]);
    });
  });
});

describe("mnemonist reexports", () => {
  describe("Stack", () => {
    it("works", () => {
      const stack = new Stack<number>();
      stack.push(1).push(2);
      expect(stack.pop()).toBe(2);
    });
  });

  describe("Queue", () => {
    it("works", () => {
      const queue = new Queue<number>();
      queue.enqueue(1).enqueue(2);
      expect(queue.dequeue()).toBe(1);
    });
  });

  describe("Heap", () => {
    it("works", () => {
      const heap = new Heap<number>();
      heap.push(3).push(1).push(2);
      expect(heap.pop()).toBe(1);
    });
  });

  describe("LRUCache", () => {
    it("works", () => {
      const cache = new LRUCache<string, number>(3);
      cache.set("a", 1).set("b", 2);
      expect(cache.get("a")).toBe(1);
    });
  });

  describe("BitSet", () => {
    it("works", () => {
      const bits = new BitSet(10);
      bits.add(0).add(5);
      expect(bits.has(0)).toBe(true);
      expect(bits.has(1)).toBe(false);
    });
  });
});

describe("custom utils", () => {
  describe("swap", () => {
    it("swaps two elements", () => {
      const arr = [1, 2, 3];
      swap(arr, 0, 2);
      expect(arr).toEqual([3, 2, 1]);
    });
  });

  describe("peek", () => {
    it("returns last element", () => {
      expect(peek([1, 2, 3])).toBe(3);
    });

    it("returns undefined for empty array", () => {
      expect(peek([])).toBeUndefined();
    });
  });

  describe("inBounds", () => {
    const grid = [
      [1, 2],
      [3, 4],
    ];

    it("returns true for valid coordinates", () => {
      expect(inBounds(grid, 0, 0)).toBe(true);
      expect(inBounds(grid, 1, 1)).toBe(true);
    });

    it("returns false for out of bounds", () => {
      expect(inBounds(grid, -1, 0)).toBe(false);
      expect(inBounds(grid, 0, 2)).toBe(false);
      expect(inBounds(grid, 2, 0)).toBe(false);
    });
  });

  describe("getKey", () => {
    it("creates key from coordinates", () => {
      expect(getKey(0, 0)).toBe("0,0");
      expect(getKey(3, 5)).toBe("3,5");
    });
  });

  describe("charToIdx", () => {
    it("converts A-Z to 0-25", () => {
      expect(charToIdx("A")).toBe(0);
      expect(charToIdx("Z")).toBe(25);
      expect(charToIdx("C")).toBe(2);
    });
  });

  describe("idxToChar", () => {
    it("converts 0-25 to A-Z", () => {
      expect(idxToChar(0)).toBe("A");
      expect(idxToChar(25)).toBe("Z");
      expect(idxToChar(2)).toBe("C");
    });
  });

  describe("dirs4", () => {
    it("has 4 directions", () => {
      expect(dirs4).toEqual([[1, 0], [-1, 0], [0, 1], [0, -1]]);
    });
  });

  describe("dirs8", () => {
    it("has 8 directions", () => {
      expect(dirs8).toEqual([
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
      ]);
    });
  });
});
