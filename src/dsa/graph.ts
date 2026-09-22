export class CampusGraph {
  adjacencyList: Map<string, string[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(name: string): void {
    if (!this.adjacencyList.has(name)) this.adjacencyList.set(name, []);
  }

  addEdge(a: string, b: string): void {
    this.addNode(a);
    this.addNode(b);
    this.adjacencyList.get(a)!.push(b);
    this.adjacencyList.get(b)!.push(a);
  }

  neighbors(node: string): string[] {
    return this.adjacencyList.get(node) || [];
  }

  bfs(start: string): { order: string[]; parent: Record<string, string | null> } {
    const visited = new Set([start]);
    const order: string[] = [];
    const parent: Record<string, string | null> = { [start]: null };
    const queue = [start];
    while (queue.length) {
      const current = queue.shift()!;
      order.push(current);
      for (const n of this.neighbors(current)) {
        if (!visited.has(n)) {
          visited.add(n);
          parent[n] = current;
          queue.push(n);
        }
      }
    }
    return { order, parent };
  }

  dfs(start: string): string[] {
    const visited = new Set<string>();
    const order: string[] = [];
    const go = (node: string) => {
      visited.add(node);
      order.push(node);
      for (const n of this.neighbors(node)) if (!visited.has(n)) go(n);
    };
    go(start);
    return order;
  }

  shortestPath(start: string, end: string): string[] | null {
    if (start === end) return [start];
    const { parent } = this.bfs(start);
    if (!(end in parent)) return null;
    const path: string[] = [];
    let cur: string | null = end;
    while (cur !== null && cur !== undefined) {
      path.unshift(cur);
      cur = parent[cur];
    }
    return path[0] === start ? path : null;
  }

  dijkstra(start: string, end: string, getWeight: (u: string, v: string) => number = () => 1): { path: string[]; distance: number } {
    if (!this.adjacencyList.has(start) || !this.adjacencyList.has(end)) return { path: [], distance: Infinity };
    if (start === end) return { path: [start], distance: 0 };

    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const visited = new Set<string>();
    const nodes = Array.from(this.adjacencyList.keys());

    for (const node of nodes) {
      distances.set(node, node === start ? 0 : Infinity);
      previous.set(node, null);
    }

    while (visited.size < nodes.length) {
      let current: string | null = null;
      let minDistance = Infinity;

      for (const node of nodes) {
        if (!visited.has(node) && (distances.get(node) ?? Infinity) < minDistance) {
          minDistance = distances.get(node)!;
          current = node;
        }
      }

      if (current === null || current === end) break;
      visited.add(current);

      for (const neighbor of this.neighbors(current)) {
        if (visited.has(neighbor)) continue;
        const weight = getWeight(current, neighbor);
        const alt = distances.get(current)! + weight;

        if (alt < (distances.get(neighbor) ?? Infinity)) {
          distances.set(neighbor, alt);
          previous.set(neighbor, current);
        }
      }
    }

    const path: string[] = [];
    let cur: string | null | undefined = end;
    while (cur !== null && cur !== undefined) {
      path.unshift(cur);
      cur = previous.get(cur);
    }

    if (path[0] !== start) return { path: [], distance: Infinity };
    return { path, distance: distances.get(end) ?? Infinity };
  }
}
