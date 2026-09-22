export class EnergyRecord {
  id: any;
  area: string;
  type: string;
  consumption: number;
  date: string;
  status: string;
  priority: number;

  constructor(id: any, area: string, type: string, consumption: number | string, date: string) {
    this.id = id;
    this.area = area;
    this.type = type;
    this.consumption = Number(consumption);
    this.date = date;
    this.status = EnergyRecord.classify(this.consumption);
    this.priority = EnergyRecord.priorityOf(this.status);
  }

  static classify(consumption: number): string {
    if (consumption > 350) return 'HIGH';
    if (consumption >= 200) return 'MODERATE';
    return 'NORMAL';
  }

  static priorityOf(status: string): number {
    if (status === 'HIGH') return 1;
    if (status === 'MODERATE') return 2;
    return 3;
  }

  refresh(): void {
    this.status = EnergyRecord.classify(this.consumption);
    this.priority = EnergyRecord.priorityOf(this.status);
  }
}
