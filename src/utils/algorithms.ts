import { EnergyRecord } from '../types';
import { mergeSortSteps } from '../dsa/sorting';
import { linearSearch, binarySearchByConsumption } from '../dsa/searching';
import { ActivityStack } from '../dsa/stackQueue';
import { uiToDsaRecord, dsaToUiRecord } from './dsaAdapters';

/**
 * Merge Sort wrapper using DSA mergeSortSteps O(n log n)
 */
export function mergeSortRecords(
  records: EnergyRecord[],
  ascending: boolean = false
): EnergyRecord[] {
  if (records.length <= 1) return records;

  const numbers = records.map(r => r.consumption);
  const { result } = mergeSortSteps(numbers);

  // Map sorted numbers back to records array in correct order
  const sorted: EnergyRecord[] = [];
  const remaining = [...records];

  for (const num of result) {
    const idx = remaining.findIndex(r => r.consumption === num);
    if (idx !== -1) {
      sorted.push(remaining.splice(idx, 1)[0]);
    }
  }

  if (!ascending) {
    sorted.reverse();
  }

  return sorted;
}

/**
 * Linear Search wrapper using DSA linearSearch O(n)
 */
export function linearSearchRecords(
  records: EnergyRecord[],
  query: string
): { results: EnergyRecord[]; comparisons: number } {
  const q = query.trim().toLowerCase();
  if (!q) return { results: records, comparisons: 0 };

  const dsaRecords = records.map(uiToDsaRecord);
  const results: EnergyRecord[] = [];
  let totalComparisons = 0;

  for (let i = 0; i < records.length; i++) {
    const r = records[i];
    totalComparisons++;
    if (
      r.area.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.timestamp.toLowerCase().includes(q) ||
      r.consumption.toString().includes(q)
    ) {
      results.push(r);
    }
  }

  return { results, comparisons: totalComparisons };
}

/**
 * Binary Search Step Interface for visualizer compatibility
 */
export interface BinarySearchStep {
  step: number;
  low: number;
  high: number;
  mid: number;
  midRecord: EnergyRecord;
  found: boolean;
  action: string;
}

/**
 * Binary Search wrapper using DSA binarySearchByConsumption O(log n)
 */
export function binarySearchRecords(
  sortedRecordsAsc: EnergyRecord[],
  targetKwh: number
): {
  foundIndex: number;
  steps: BinarySearchStep[];
  comparisons: number;
} {
  const dsaRecords = sortedRecordsAsc.map(uiToDsaRecord);
  const { found, index, comparisons, steps: dsaSteps } = binarySearchByConsumption(dsaRecords, targetKwh);

  const steps: BinarySearchStep[] = dsaSteps.map((step, idx) => {
    const midRec = sortedRecordsAsc[step.mid] || sortedRecordsAsc[0];
    const isFound = midRec.consumption === targetKwh;

    let actionStr = `Step ${idx + 1}: low=${step.low}, mid=${step.mid}, high=${step.high}, value=${step.value} kWh.`;
    if (isFound) {
      actionStr = `Match found! Mid index ${step.mid} (${midRec.area}) equals target ${targetKwh} kWh.`;
    } else if (step.value < targetKwh) {
      actionStr = `Target ${targetKwh} > ${step.value} (${midRec.area}). Eliminating left half: low -> ${step.mid + 1}.`;
    } else {
      actionStr = `Target ${targetKwh} < ${step.value} (${midRec.area}). Eliminating right half: high -> ${step.mid - 1}.`;
    }

    return {
      step: idx + 1,
      low: step.low,
      high: step.high,
      mid: step.mid,
      midRecord: midRec,
      found: isFound,
      action: actionStr,
    };
  });

  return { foundIndex: index, steps, comparisons };
}

/**
 * Export ActivityStack from DSA module as LifoStack for backward compatibility
 */
export class LifoStack<T> {
  private stack: ActivityStack;

  constructor(maxSize: number = 30) {
    this.stack = new ActivityStack(maxSize);
  }

  push(item: T): void {
    this.stack.push({
      action: 'SNAPSHOT',
      type: 'STATE',
      record: item,
      snapshot: item,
      time: new Date().toISOString(),
    });
  }

  pop(): T | undefined {
    const popped = this.stack.pop();
    return popped ? (popped.snapshot as T) : undefined;
  }

  peek(): T | undefined {
    const peeked = this.stack.peek();
    return peeked ? (peeked.snapshot as T) : undefined;
  }

  isEmpty(): boolean {
    return this.stack.isEmpty();
  }

  size(): number {
    return this.stack.size();
  }

  clear(): void {
    this.stack.clear();
  }
}
