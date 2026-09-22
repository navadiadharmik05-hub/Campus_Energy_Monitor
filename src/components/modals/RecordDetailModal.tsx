import React from 'react';
import { X, Zap, Gauge, Building, Thermometer, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { EnergyRecord } from '../../types';

interface RecordDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: EnergyRecord | null;
  onUpdateConsumption?: (id: string, newKwh: number) => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  isOpen,
  onClose,
  record,
  onUpdateConsumption,
}) => {
  if (!isOpen || !record) return null;

  const isCritical = record.status === 'Critical' || record.consumption >= 4000;
  const isElevated = record.status === 'Elevated' || (record.consumption >= 3000 && !isCritical);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-detail-modal-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#1c2028] border border-[#31353e] rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-[#dfe2ee]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33]">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isCritical
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : isElevated
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-[#56e5a9]/20 text-[#56e5a9] border border-[#56e5a9]/30'
            }`}>
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 id="record-detail-modal-title" className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
                {record.area}
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                {record.type} Sector · Telemetry ID: {record.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#d8c3ad] hover:text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Metric Display */}
        <div className="bg-[#262a33] p-4 rounded-xl border border-[#31353e]/60 flex items-center justify-between">
          <div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#d8c3ad]/70 uppercase">
              Current Power Draw
            </span>
            <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#dfe2ee] mt-0.5">
              {record.consumption.toLocaleString()}{' '}
              <span className="text-sm font-normal text-[#d8c3ad]/70">kWh</span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/70">
              Recorded: {record.timestamp}
            </span>
          </div>

          <div className="text-right flex flex-col items-end">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#d8c3ad]/70 uppercase mb-1">
              Circuit State
            </span>
            {isCritical ? (
              <span className="px-2.5 py-1 rounded-full bg-[#93000a]/30 text-[#ffb4ab] border border-red-500/40 font-['JetBrains_Mono'] text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                Critical Spike
              </span>
            ) : isElevated ? (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-['JetBrains_Mono'] text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Elevated Load
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-[#56e5a9]/10 text-[#56e5a9] border border-[#56e5a9]/30 font-['JetBrains_Mono'] text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9]"></span>
                Nominal
              </span>
            )}
          </div>
        </div>

        {/* Telemetric Parameters Grid */}
        <div className="grid grid-cols-2 gap-2.5 font-['JetBrains_Mono'] text-xs">
          <div className="p-3 bg-[#262a33] rounded-lg border border-[#31353e]/60 flex flex-col gap-1">
            <span className="text-[#d8c3ad]/70 text-[10px] uppercase">Power Factor (cos φ)</span>
            <span className="text-[#56e5a9] font-bold text-sm">{record.powerFactor || 0.94}</span>
            <span className="text-[10px] text-[#d8c3ad]/60">Target: ≥ 0.90</span>
          </div>

          <div className="p-3 bg-[#262a33] rounded-lg border border-[#31353e]/60 flex flex-col gap-1">
            <span className="text-[#d8c3ad]/70 text-[10px] uppercase">Sub-meter Temp</span>
            <span className="text-white font-bold text-sm">{record.temperature || 21.5}°C</span>
            <span className="text-[10px] text-[#d8c3ad]/60">Chilled air ambient</span>
          </div>

          <div className="p-3 bg-[#262a33] rounded-lg border border-[#31353e]/60 flex flex-col gap-1">
            <span className="text-[#d8c3ad]/70 text-[10px] uppercase">Peak Contract Cap</span>
            <span className="text-amber-400 font-bold text-sm">{record.peakKwh || Math.round(record.consumption * 1.08)} kWh</span>
            <span className="text-[10px] text-[#d8c3ad]/60">Substation feeder fuse limit</span>
          </div>

          <div className="p-3 bg-[#262a33] rounded-lg border border-[#31353e]/60 flex flex-col gap-1">
            <span className="text-[#d8c3ad]/70 text-[10px] uppercase">Est. Cost / Hour</span>
            <span className="text-[#71f8e4] font-bold text-sm">${((record.consumption * 0.14)).toFixed(2)}</span>
            <span className="text-[10px] text-[#d8c3ad]/60">At $0.14 / kWh blended rate</span>
          </div>
        </div>

        {/* Close */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] font-['JetBrains_Mono'] text-xs rounded-lg transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
