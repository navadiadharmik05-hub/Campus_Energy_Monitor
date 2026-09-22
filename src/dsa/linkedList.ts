export class ListNode {
  data: any;
  next: ListNode | null;

  constructor(record: any) {
    this.data = record;
    this.next = null;
  }
}

export class EnergyLinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  count: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  add(record: any): ListNode {
    const node = new ListNode(record);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.count++;
    return node;
  }

  delete(area: string): boolean {
    let current = this.head;
    let previous: ListNode | null = null;
    while (current) {
      if (current.data.area === area) {
        if (previous) previous.next = current.next;
        else this.head = current.next;
        if (current === this.tail) this.tail = previous;
        this.count--;
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }

  search(area: string): { node: ListNode | null; steps: number } {
    let current = this.head;
    let steps = 0;
    while (current) {
      steps++;
      if (current.data.area === area) return { node: current, steps };
      current = current.next;
    }
    return { node: null, steps };
  }

  traverse(): any[] {
    const out: any[] = [];
    let current = this.head;
    while (current) {
      out.push(current.data);
      current = current.next;
    }
    return out;
  }

  display(): string {
    return this.traverse().map(r => r.area).join(' -> ');
  }
}
