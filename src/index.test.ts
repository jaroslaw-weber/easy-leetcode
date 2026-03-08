import {
  swap,
  peek,
  inBounds,
  getKey,
  charToIdx,
  idxToChar,
  dirs4,
  dirs8,
  createGrid,
  gridToString,
  getGridSize,
  ListNode,
  getListLength,
  getTail,
  getNodeAt,
  getMid,
  reverseList,
} from "./index";
import {
  chunk,
  uniq,
  flattenDeep,
  sortBy,
  range,
  sum,
  mean,
  min,
  max,
  fill,
} from "./index";
import { Stack, Queue, Heap, LRUCache, BitSet } from "./index";

describe("lodash reexports", () => {
  describe("chunk", () => {
    it("chunks array", () => {
      expect(chunk([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
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
      expect(sortBy([{ a: 3 }, { a: 1 }, { a: 2 }], "a")).toEqual([
        { a: 1 },
        { a: 2 },
        { a: 3 },
      ]);
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
      stack.push(1);
      stack.push(2);
      expect(stack.pop()).toBe(2);
    });
  });

  describe("Queue", () => {
    it("works", () => {
      const queue = new Queue<number>();
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.dequeue()).toBe(1);
    });
  });

  describe("Heap", () => {
    it("works", () => {
      const heap = new Heap<number>();
      heap.push(3);
      heap.push(1);
      heap.push(2);
      expect(heap.pop()).toBe(1);
    });
  });

  describe("LRUCache", () => {
    it("works", () => {
      const cache = new LRUCache<string, number>(3);
      cache.set("a", 1);
      cache.set("b", 2);
      expect(cache.get("a")).toBe(1);
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
      expect(dirs4).toEqual([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]);
    });
  });

  describe("dirs8", () => {
    it("has 8 directions", () => {
      expect(dirs8).toEqual([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ]);
    });
  });

  describe("createGrid", () => {
    it("creates grid with default fill value", () => {
      const grid = createGrid(2, 3);
      expect(grid).toEqual([
        [0, 0, 0],
        [0, 0, 0],
      ]);
    });

    it("creates grid with custom fill value", () => {
      const grid = createGrid(2, 2, "x");
      expect(grid).toEqual([
        ["x", "x"],
        ["x", "x"],
      ]);
    });

    it("creates grid with false fill value", () => {
      const grid = createGrid(2, 2, false);
      expect(grid).toEqual([
        [false, false],
        [false, false],
      ]);
    });
  });

  describe("gridToString", () => {
    it("converts grid to string", () => {
      const grid = [
        [1, 2],
        [3, 4],
      ];
      expect(gridToString(grid)).toBe(" 1  2\n 3  4");
    });

    it("handles custom cell width", () => {
      const grid = [
        [1, 10],
        [100, 1000],
      ];
      expect(gridToString(grid, 4)).toBe("   1   10\n 100 1000");
    });

    it("handles empty grid", () => {
      expect(gridToString([])).toBe("");
    });
  });

  describe("getGridSize", () => {
    it("returns dimensions for non-empty grid", () => {
      const grid = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      expect(getGridSize(grid)).toEqual({ rows: 2, cols: 3 });
    });

    it("returns { rows: 0, cols: 0 } for empty grid", () => {
      expect(getGridSize([])).toEqual({ rows: 0, cols: 0 });
    });

    it("returns correct size for single row", () => {
      expect(getGridSize([[1, 2, 3, 4]])).toEqual({ rows: 1, cols: 4 });
    });

    it("returns correct size for single column", () => {
      expect(getGridSize([[1], [2], [3]])).toEqual({ rows: 3, cols: 1 });
    });
  });

  describe("Linked List", () => {
    describe("ListNode", () => {
      it("creates node with value", () => {
        const node = new ListNode(5);
        expect(node.val).toBe(5);
        expect(node.next).toBeNull();
      });

      it("creates node with next", () => {
        const next = new ListNode(2);
        const node = new ListNode(1, next);
        expect(node.val).toBe(1);
        expect(node.next).toBe(next);
      });
    });

    describe("getListLength", () => {
      it("returns 0 for empty list", () => {
        expect(getListLength(null)).toBe(0);
      });

      it("returns correct length", () => {
        const head = new ListNode(1, new ListNode(2, new ListNode(3)));
        expect(getListLength(head)).toBe(3);
      });
    });

    describe("getTail", () => {
      it("returns null for empty list", () => {
        expect(getTail(null)).toBeNull();
      });

      it("returns last node", () => {
        const tail = new ListNode(3);
        const head = new ListNode(1, new ListNode(2, tail));
        expect(getTail(head)).toBe(tail);
      });
    });

    describe("getNodeAt", () => {
      it("returns null for empty list", () => {
        expect(getNodeAt(null, 1)).toBeNull();
      });

      it("returns node at position", () => {
        const node2 = new ListNode(2);
        const head = new ListNode(1, node2);
        expect(getNodeAt(head, 2)).toBe(node2);
      });
    });

    describe("getMid", () => {
      it("returns null for empty list", () => {
        expect(getMid(null)).toBeNull();
      });

      it("returns middle for odd length", () => {
        // 1 -> 2 -> 3, mid should be 2
        const mid = new ListNode(2, new ListNode(3));
        const head = new ListNode(1, mid);
        expect(getMid(head)).toBe(mid);
      });

      it("returns first middle for even length", () => {
        // 1 -> 2 -> 3 -> 4, mid should be 2
        const node2 = new ListNode(2, new ListNode(3, new ListNode(4)));
        const head = new ListNode(1, node2);
        expect(getMid(head)).toBe(node2);
      });
    });

    describe("reverseList", () => {
      it("returns null for empty list", () => {
        expect(reverseList(null)).toBeNull();
      });

      it("reverses single node", () => {
        const head = new ListNode(1);
        expect(reverseList(head)).toBe(head);
      });

      it("reverses list and returns new head", () => {
        // 1 -> 2 -> 3 becomes 3 -> 2 -> 1
        const head = new ListNode(1, new ListNode(2, new ListNode(3)));
        const newHead = reverseList(head);
        expect(newHead!.val).toBe(3);
        expect(newHead!.next!.val).toBe(2);
        expect(newHead!.next!.next!.val).toBe(1);
        expect(newHead!.next!.next!.next).toBeNull();
      });
    });
  });
});
