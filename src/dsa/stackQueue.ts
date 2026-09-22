export class ActivityStack {
  items: any[];

  constructor() {
    this.items = [];
  }

  push(payload: any): void {
    if (typeof payload === 'string') {
      this.items.push({ action: payload, time: new Date().toLocaleTimeString() });
    } else {
      this.items.push({
        action: payload.action || `${payload.type} record`,
        type: payload.type,
        record: payload.record ? { ...payload.record } : null,
        snapshot: payload.snapshot ? { ...payload.snapshot } : null,
        time: new Date().toLocaleTimeString()
      });
    }
  }

  pop(): any {
    return this.items.pop();
  }

  peek(): any {
    return this.items[this.items.length - 1] || null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }

  toDisplayArray(): any[] {
    return [...this.items].reverse();
  }
}

export class InspectionQueue {
  items: any[];

  constructor() {
    this.items = [];
  }

  enqueue(record: any): boolean {
    if (this.items.find(r => r.area === record.area)) return false;
    this.items.push(record);
    return true;
  }

  dequeue(): any {
    return this.items.shift() || null;
  }

  peek(): any {
    return this.items[0] || null;
  }

  remove(area: string): void {
    this.items = this.items.filter(r => r.area !== area);
  }

  toArray(): any[] {
    return [...this.items];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

export class InspectionPriorityQueue {
  items: any[];

  constructor() {
    this.items = [];
  }

  insert(record: any): void {
    this.items = this.items.filter(r => r.area !== record.area);
    let i = 0;
    while (i < this.items.length && this.items[i].priority <= record.priority) i++;
    this.items.splice(i, 0, record);
  }

  enqueue(record: any): void {
    this.insert(record);
  }

  extractMin(): any {
    return this.items.shift() || null;
  }

  dequeue(): any {
    return this.extractMin();
  }

  peek(): any {
    return this.items[0] || null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  remove(area: string): void {
    this.items = this.items.filter(r => r.area !== area);
  }

  toArray(): any[] {
    return [...this.items];
  }

  rebuild(records: any[]): void {
    this.items = [...records].sort((a, b) => a.priority - b.priority);
  }
}
