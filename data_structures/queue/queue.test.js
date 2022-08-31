const { Queue } = require('./queue');

describe('Queue', () => {
  test('should perform queue basic operations', () => {
    const queue = new Queue();

    expect(queue.isEmpty()).toBe(true);

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.isEmpty()).toBe(false);

    expect(queue.front()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.front()).toBe(2);
  });
});
