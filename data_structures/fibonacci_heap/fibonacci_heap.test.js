const { FibonacciHeap } = require('./fibonacci_heap');

describe('Fibonacci Heap', () => {
  test('should perform Fibonacci Heap basic operations', () => {
    const heap = new FibonacciHeap();

    expect(heap.isEmpty()).toBe(true);
    expect(heap.size()).toBe(0);

    heap.insert(12);

    expect(heap.isEmpty()).toBe(false);
    expect(heap.size()).toBe(1);
    expect(heap.minimum()).toBe(12);

    heap.insert(1);
    heap.insert(2);

    expect(heap.size()).toBe(3);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(2);

    expect(heap.minimum()).toBe(12);
    expect(heap.size()).toBe(1);
  });
});
