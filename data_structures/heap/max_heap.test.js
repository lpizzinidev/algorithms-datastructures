const { MaxHeap } = require("./max_heap");

describe("MaxHeap", () => {
  test("constructor", () => {
    const maxHeap = new MaxHeap();

    expect(() => {
      maxHeap.peek();
    }).toThrow(new Error("No elements in max heap"));

    maxHeap.add(1);
    maxHeap.add(2);
    maxHeap.add(3);

    expect(maxHeap.peek()).toBe(3);
    expect(maxHeap.extractMax()).toBe(3);
    expect(maxHeap.peek()).toBe(2);

    maxHeap.add(12);

    expect(maxHeap.peek()).toBe(12);

    maxHeap.increase
  });

  test("buildHeap", () => {
    const maxHeap = new MaxHeap();

    maxHeap.buildHeap([12, 33, 9, 101, -20, 55]);

    expect(maxHeap.extractMax()).toBe(101);
    expect(maxHeap.extractMax()).toBe(55);
  });
});
