import { EnergyRecord } from './energyRecord';

export class EnergyManager {
  energyRecords: EnergyRecord[];
  nextId: number;

  constructor() {
    this.energyRecords = [];   // the ARRAY
    this.nextId = 1;
  }

  addRecord(area: string, type: string, consumption: number | string, date: string): EnergyRecord {
    const record = new EnergyRecord(this.nextId++, area, type, consumption, date);
    this.energyRecords.push(record);
    return record;
  }

  deleteRecord(id: any): EnergyRecord | null {
    const index = this.energyRecords.findIndex(r => r.id === id);
    if (index === -1) return null;
    return this.energyRecords.splice(index, 1)[0];
  }

  editRecord(id: any, updates: Partial<EnergyRecord>): EnergyRecord | null {
    const record = this.energyRecords.find(r => r.id === id);
    if (!record) return null;
    Object.assign(record, updates);
    record.refresh();
    return record;
  }

  getAll(): EnergyRecord[] {
    return this.energyRecords;
  }

  getById(id: any): EnergyRecord | undefined {
    return this.energyRecords.find(r => r.id === id);
  }

  // HashMap-style lookup structure, rebuilt on demand -> O(1) get by area
  buildAreaMap(): Map<string, EnergyRecord> {
    const map = new Map<string, EnergyRecord>();
    this.energyRecords.forEach(r => map.set(r.area.toLowerCase(), r));
    return map;
  }

  totalConsumption(): number {
    return this.energyRecords.reduce((sum, r) => sum + r.consumption, 0);
  }

  averageConsumption(): number {
    return this.energyRecords.length
      ? this.totalConsumption() / this.energyRecords.length
      : 0;
  }

  highestArea(): EnergyRecord | null {
    if (!this.energyRecords.length) return null;
    return this.energyRecords.reduce((a, b) => (b.consumption > a.consumption ? b : a));
  }

  lowestArea(): EnergyRecord | null {
    if (!this.energyRecords.length) return null;
    return this.energyRecords.reduce((a, b) => (b.consumption < a.consumption ? b : a));
  }

  countByStatus(status: string): number {
    return this.energyRecords.filter(r => r.status === status).length;
  }

  consumptionValues(): number[] {
    return this.energyRecords.map(r => r.consumption);
  }
}
