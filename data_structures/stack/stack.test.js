const { Stack } = require('./stack');

describe('Stack', () => {
  test('should perform stack basic operations', () => {
    const stack = new Stack();

    expect(stack.isEmpty()).toBe(true);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.isEmpty()).toBe(false);

    expect(stack.top()).toBe(3);
    expect(stack.pop()).toBe(3);
    expect(stack.top()).toBe(2);
  });
});
