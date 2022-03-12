const { PriorityQueue } = require('../priority_queue');

describe('PriorityQueue', () => {
  test('constructor', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.enqueue('John', 2);
    priorityQueue.enqueue('Paul', 1);
    priorityQueue.enqueue('Sandra', 3);
    priorityQueue.enqueue('Karl', 2);
    priorityQueue.enqueue('Anthony', 4);

    expect(priorityQueue.front().element).toBe('Paul');
    expect(priorityQueue.rear().element).toBe('Anthony');

    priorityQueue.dequeue();

    expect(priorityQueue.front().element).toBe('John');
  });
});
