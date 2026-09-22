export class BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  _x?: number;
  _depth?: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class EnergyBST {
  root: BSTNode | null;

  constructor() {
    this.root = null;
  }

  insert(value: number): void {
    this.root = this._insert(this.root, value);
  }

  _insert(node: BSTNode | null, value: number): BSTNode {
    if (!node) return new BSTNode(value);
    if (value < node.value) node.left = this._insert(node.left, value);
    else if (value > node.value) node.right = this._insert(node.right, value);
    return node;
  }

  search(value: number): { found: boolean; comparisons: number; path: number[] } {
    let current = this.root;
    let comparisons = 0;
    const path: number[] = [];
    while (current) {
      comparisons++;
      path.push(current.value);
      if (current.value === value) return { found: true, comparisons, path };
      current = value < current.value ? current.left : current.right;
    }
    return { found: false, comparisons, path };
  }

  inorder(): number[] {
    const out: number[] = [];
    const go = (n: BSTNode | null) => { if (!n) return; go(n.left); out.push(n.value); go(n.right); };
    go(this.root);
    return out;
  }

  preorder(): number[] {
    const out: number[] = [];
    const go = (n: BSTNode | null) => { if (!n) return; out.push(n.value); go(n.left); go(n.right); };
    go(this.root);
    return out;
  }

  postorder(): number[] {
    const out: number[] = [];
    const go = (n: BSTNode | null) => { if (!n) return; go(n.left); go(n.right); out.push(n.value); };
    go(this.root);
    return out;
  }

  findRange(min: number, max: number): { results: number[]; comparisons: number } {
    const results: number[] = [];
    let comparisons = 0;

    const traverse = (node: BSTNode | null) => {
      if (!node) return;
      comparisons++;
      if (node.value > min) {
        traverse(node.left);
      }
      if (node.value >= min && node.value <= max) {
        results.push(node.value);
      }
      if (node.value < max) {
        traverse(node.right);
      }
    };

    traverse(this.root);
    return { results, comparisons };
  }

  buildFrom(values: number[]): void {
    this.root = null;
    values.forEach(v => this.insert(v));
  }

  layout(width = 640): { positions: Array<{ value: number; x: number; y: number }>; links: Array<{ x1: number; y1: number; x2: number; y2: number }> } {
    const positions: Array<{ value: number; x: number; y: number }> = [];
    const links: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    let leafIndex = 0;
    const levelHeight = 72;

    const assign = (node: BSTNode | null, depth: number): number | null => {
      if (!node) return null;
      if (!node.left && !node.right) {
        const x = leafIndex++;
        node._x = x;
        node._depth = depth;
        return x;
      }
      const lx = assign(node.left, depth + 1);
      const rx = assign(node.right, depth + 1);
      let x: number;
      if (lx !== null && rx !== null) x = (lx + rx) / 2;
      else if (lx !== null) x = lx + 0.6;
      else if (rx !== null) x = rx - 0.6;
      else x = leafIndex++;
      node._x = x;
      node._depth = depth;
      return x;
    };
    assign(this.root, 0);

    const maxLeaf = Math.max(leafIndex - 1, 1);
    const collect = (node: BSTNode | null) => {
      if (!node) return;
      const px = 40 + ((node._x || 0) / maxLeaf) * (width - 80);
      const py = 30 + (node._depth || 0) * levelHeight;
      positions.push({ value: node.value, x: px, y: py });
      if (node.left) {
        links.push({
          x1: px,
          y1: py,
          x2: 40 + ((node.left._x || 0) / maxLeaf) * (width - 80),
          y2: 30 + ((node._depth || 0) + 1) * levelHeight
        });
        collect(node.left);
      }
      if (node.right) {
        links.push({
          x1: px,
          y1: py,
          x2: 40 + ((node.right._x || 0) / maxLeaf) * (width - 80),
          y2: 30 + ((node._depth || 0) + 1) * levelHeight
        });
        collect(node.right);
      }
    };
    collect(this.root);
    return { positions, links };
  }
}
