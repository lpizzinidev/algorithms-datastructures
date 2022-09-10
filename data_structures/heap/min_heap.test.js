const { MinHeap } = require('./min_heap');

describe('MinHeap', () => {
  test('constructor', () => {
    const minHeap = new MinHeap();

    expect(() => {
      minHeap.peek();
    }).toThrow(new Error('No elements in heap'));

    minHeap.add(1);
    minHeap.add(2);
    minHeap.add(3);

    expect(minHeap.peek()).toBe(1);
    expect(minHeap.pop()).toBe(1);
    expect(minHeap.peek()).toBe(2);

    minHeap.add(12);

    expect(minHeap.peek()).toBe(2);

    minHeap.add(-12);
    minHeap.add(0);

    expect(minHeap.pop()).toBe(-12);
    expect(minHeap.peek()).toBe(0);
  });

  test('buildHeap', () => {
    const minHeap = new MinHeap();

    minHeap.buildHeap([12, 33, 9, 101, -20, 55]);

    expect(minHeap.pop()).toBe(-20);
    expect(minHeap.pop()).toBe(9);
  });
});
