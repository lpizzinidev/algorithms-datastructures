const { PriorityQueue } = require('./priority_queue');

describe('PriorityQueue', () => {
  test('constructor', () => {
    const priorityQueue = new PriorityQueue();

    expect(() => {
      priorityQueue.front();
    }).toThrow(new Error('No elements in queue'));

    priorityQueue.enqueue('Paul', 1);
    priorityQueue.enqueue('John', 5);
    priorityQueue.enqueue('Sandra', 3);
    priorityQueue.enqueue('Karl', 2);
    priorityQueue.enqueue('Anthony', 4);

    expect(priorityQueue.front()).toBe('Paul');

    priorityQueue.dequeue();

    expect(priorityQueue.front()).toBe('Karl');
  });
});
