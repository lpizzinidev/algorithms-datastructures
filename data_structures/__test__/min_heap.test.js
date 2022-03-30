const { MinHeap } = require('../min_heap');

describe('MinHeap', () => {
  test('constructor', () => {
    const minHeap = new MinHeap();

    expect(() => {
      minHeap.peek();
    }).toThrow(new Error('No elements in min heap'));

    minHeap.add(1);
    minHeap.add(2);
    minHeap.add(3);

    expect(minHeap.peek()).toBe(1);
    expect(minHeap.extractMin()).toBe(1);
    expect(minHeap.peek()).toBe(2);

    minHeap.add(12);

    expect(minHeap.peek()).toBe(2);
  });

  test('buildHeap', () => {
    const minHeap = new MinHeap();

    minHeap.buildHeap([12, 33, 9, 101, -20, 55]);

    expect(minHeap.extractMin()).toBe(-20);
    expect(minHeap.extractMin()).toBe(9);
  });
});
