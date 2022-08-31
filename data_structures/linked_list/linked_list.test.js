const { LinkedList } = require('./linked_list');

describe('List', () => {
  test('should perform linked list basic operations', () => {
    const list = new LinkedList();

    list.addAtHead(1);
    list.addAtTail(3);
    list.addAtIndex(1, 2);

    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
    expect(list.get(3)).toBe(-1);

    list.deleteAtIndex(1);

    expect(list.get(1)).toBe(3);
  });
});
