import { EnergyRecord as DsaEnergyRecord } from '../dsa/energyRecord';
import { EnergyRecord as UiEnergyRecord, FacilityType } from '../types';

/**
 * Adapter converting UI EnergyRecord shape to DSA EnergyRecord instance
 */
export function uiToDsaRecord(ui: UiEnergyRecord): DsaEnergyRecord {
  return new DsaEnergyRecord(
    ui.id,
    ui.area,
    ui.type,
    ui.consumption,
    ui.timestamp
  );
}

/**
 * Adapter converting DSA EnergyRecord instance to UI EnergyRecord shape
 */
export function dsaToUiRecord(dsa: DsaEnergyRecord): UiEnergyRecord {
  let uiStatus: 'Normal' | 'Elevated' | 'Critical' = 'Normal';
  if (dsa.status === 'HIGH' || dsa.consumption >= 4000) {
    uiStatus = 'Critical';
  } else if (dsa.status === 'MODERATE' || dsa.consumption >= 3000) {
    uiStatus = 'Elevated';
  }

  return {
    id: String(dsa.id),
    area: dsa.area,
    type: (dsa.type as FacilityType) || 'Academic',
    consumption: dsa.consumption,
    timestamp: dsa.date || 'Today',
    status: uiStatus,
    peakKwh: Math.round(dsa.consumption * 1.08),
    powerFactor: 0.94,
    temperature: 21.0,
  };
}
