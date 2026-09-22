export function bubbleSortSteps(input: number[]): { ops: any[]; comparisons: number; swaps: number; result: number[] } {
  const a = [...input];
  const ops: any[] = [];
  let comparisons = 0, swaps = 0;
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      comparisons++;
      ops.push({ type: 'compare', indices: [j, j + 1], array: [...a] });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        ops.push({ type: 'swap', indices: [j, j + 1], array: [...a] });
      }
    }
  }
  return { ops, comparisons, swaps, result: a };
}

export function selectionSortSteps(input: number[]): { ops: any[]; comparisons: number; swaps: number; result: number[] } {
  const a = [...input];
  const ops: any[] = [];
  let comparisons = 0, swaps = 0;
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      comparisons++;
      ops.push({ type: 'compare', indices: [minIdx, j], array: [...a] });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      swaps++;
      ops.push({ type: 'swap', indices: [i, minIdx], array: [...a] });
    }
  }
  return { ops, comparisons, swaps, result: a };
}

export function insertionSortSteps(input: number[]): { ops: any[]; comparisons: number; swaps: number; result: number[] } {
  const a = [...input];
  const ops: any[] = [];
  let comparisons = 0, swaps = 0;
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0) {
      comparisons++;
      ops.push({ type: 'compare', indices: [j - 1, j], array: [...a] });
      if (a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        swaps++;
        ops.push({ type: 'swap', indices: [j - 1, j], array: [...a] });
        j--;
      } else break;
    }
  }
  return { ops, comparisons, swaps, result: a };
}

export function mergeSortSteps(input: number[]): { ops: any[]; comparisons: number; swaps: number; result: number[] } {
  const a = [...input];
  const ops: any[] = [];
  let comparisons = 0, swaps = 0;

  function merge(lo: number, mid: number, hi: number) {
    const left = a.slice(lo, mid + 1);
    const right = a.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      comparisons++;
      ops.push({ type: 'compare', indices: [lo + i, mid + 1 + j], array: [...a] });
      if (left[i] <= right[j]) a[k] = left[i++];
      else a[k] = right[j++];
      swaps++;
      ops.push({ type: 'swap', indices: [k], array: [...a] });
      k++;
    }
    while (i < left.length) { a[k] = left[i++]; ops.push({ type: 'swap', indices: [k], array: [...a] }); k++; }
    while (j < right.length) { a[k] = right[j++]; ops.push({ type: 'swap', indices: [k], array: [...a] }); k++; }
  }

  function sort(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  sort(0, a.length - 1);
  return { ops, comparisons, swaps, result: a };
}

export function quickSortSteps(input: number[]): { ops: any[]; comparisons: number; swaps: number; result: number[] } {
  const a = [...input];
  const ops: any[] = [];
  let comparisons = 0, swaps = 0;

  function partition(lo: number, hi: number) {
    const pivot = a[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      comparisons++;
      ops.push({ type: 'compare', indices: [j, hi], array: [...a] });
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;
        ops.push({ type: 'swap', indices: [i, j], array: [...a] });
      }
    }
    [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
    swaps++;
    ops.push({ type: 'swap', indices: [i + 1, hi], array: [...a] });
    return i + 1;
  }

  function sort(lo: number, hi: number) {
    if (lo < hi) {
      const p = partition(lo, hi);
      sort(lo, p - 1);
      sort(p + 1, hi);
    }
  }

  sort(0, a.length - 1);
  return { ops, comparisons, swaps, result: a };
}

export const SORT_ALGORITHMS: Record<string, { name: string; fn: (input: number[]) => { ops: any[]; comparisons: number; swaps: number; result: number[] } }> = {
  bubble: { name: 'Bubble Sort', fn: bubbleSortSteps },
  selection: { name: 'Selection Sort', fn: selectionSortSteps },
  insertion: { name: 'Insertion Sort', fn: insertionSortSteps },
  merge: { name: 'Merge Sort', fn: mergeSortSteps },
  quick: { name: 'Quick Sort', fn: quickSortSteps },
};
