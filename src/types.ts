export type FacilityType = 'Academic' | 'Laboratory' | 'Residential' | 'Athletics' | 'Dining/Admin';

export type RecordStatus = 'Normal' | 'Elevated' | 'Critical';

export interface EnergyRecord {
  id: string;
  area: string;
  type: FacilityType;
  consumption: number; // in kWh
  timestamp: string;
  status: RecordStatus;
  peakKwh?: number;
  powerFactor?: number;
  temperature?: number;
}

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  currentKwh: number;
  baselineKwh: number;
  status: RecordStatus;
  substation: string;
  occupancy: number; // percentage
  sqft: number;
}

export interface EnergyAlert {
  id: string;
  facility: string;
  severity: 'Critical' | 'Elevated' | 'Advisory';
  timestamp: string;
  message: string;
  metric: string;
  currentValue: string;
  threshold: string;
  resolved: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  algorithm?: string;
  complexity?: string;
}

export interface QueueTask {
  id: string;
  priority: number;
  area: string;
  targetReduction: number;
  status: 'Pending' | 'In Progress' | 'Executed';
  enqueuedAt: string;
}

export type ActiveTab = 'telemetry' | 'facilities' | 'dispatch' | 'alerts';

export type ActiveModal = 
  | null 
  | 'analysis' 
  | 'compare' 
  | 'alerts' 
  | 'activity' 
  | 'queue' 
  | 'binarySearch' 
  | 'gridNetwork' 
  | 'profile' 
  | 'recordDetail';
