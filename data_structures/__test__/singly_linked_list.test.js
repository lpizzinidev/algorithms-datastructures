const { LinkedList } = require('../singly_linked_list');

describe('SinglyLinkedList', () => {
  test('basic test', () => {
    const linkedList = new LinkedList();

    linkedList.addAtHead(1);
    linkedList.addAtTail(3);
    linkedList.addAtIndex(1, 2);

    expect(linkedList.get(1)).toBe(2);
    expect(linkedList.get(2)).toBe(3);
    expect(linkedList.get(3)).toBe(-1);

    linkedList.deleteAtIndex(1);

    expect(linkedList.get(1)).toBe(3);
  });
});
