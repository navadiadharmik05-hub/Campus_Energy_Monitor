export function linearSearch(records: any[], keyFn: (r: any) => any, target: any): { found: any | null; index: number; comparisons: number; steps: any[] } {
  const steps: any[] = [];
  for (let i = 0; i < records.length; i++) {
    steps.push({ index: i, value: keyFn(records[i]) });
    if (keyFn(records[i]) === target) {
      return { found: records[i], index: i, comparisons: i + 1, steps };
    }
  }
  return { found: null, index: -1, comparisons: records.length, steps };
}

export function binarySearchByConsumption(sortedRecords: any[], target: number): { found: any | null; index: number; comparisons: number; steps: any[] } {
  let low = 0, high = sortedRecords.length - 1;
  const steps: any[] = [];
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const value = sortedRecords[mid].consumption;
    steps.push({ low, mid, high, value });
    if (value === target) {
      return { found: sortedRecords[mid], index: mid, comparisons: steps.length, steps };
    }
    if (value < target) low = mid + 1;
    else high = mid - 1;
  }
  return { found: null, index: -1, comparisons: steps.length, steps };
}
