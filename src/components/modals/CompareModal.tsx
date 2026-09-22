import React, { useState } from 'react';
import { X, Scale, ArrowRight, Zap, Check } from 'lucide-react';
import { EnergyRecord } from '../../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: EnergyRecord[];
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  records,
}) => {
  const [selectedIdA, setSelectedIdA] = useState<string>(records[0]?.id || '');
  const [selectedIdB, setSelectedIdB] = useState<string>(records[1]?.id || '');

  if (!isOpen) return null;

  const itemA = records.find((r) => r.id === selectedIdA) || records[0];
  const itemB = records.find((r) => r.id === selectedIdB) || records[1] || records[0];

  const delta = (itemA?.consumption || 0) - (itemB?.consumption || 0);
  const deltaPct = itemB?.consumption ? Math.round((delta / itemB.consumption) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1c2028] border border-[#31353e] rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-[#dfe2ee]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4fdbc8]/20 border border-[#4fdbc8]/30 flex items-center justify-center">
              <Scale className="w-4 h-4 text-[#4fdbc8]" />
            </div>
            <div>
              <h3 id="compare-modal-title" className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
                Facility Energy Comparison
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                Comparative load, power factor, and operational variance
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

        {/* Facility Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/80 uppercase">
              Facility 1 (Primary)
            </label>
            <select
              value={selectedIdA}
              onChange={(e) => setSelectedIdA(e.target.value)}
              className="w-full px-3 py-2 bg-[#262a33] border border-[#31353e] rounded-lg text-[#dfe2ee] font-['Geist'] text-xs sm:text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {records.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.area} ({r.consumption.toLocaleString()} kWh)
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/80 uppercase">
              Facility 2 (Benchmark)
            </label>
            <select
              value={selectedIdB}
              onChange={(e) => setSelectedIdB(e.target.value)}
              className="w-full px-3 py-2 bg-[#262a33] border border-[#31353e] rounded-lg text-[#dfe2ee] font-['Geist'] text-xs sm:text-sm focus:outline-none focus:border-[#4fdbc8] cursor-pointer"
            >
              {records.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.area} ({r.consumption.toLocaleString()} kWh)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Delta Callout */}
        <div className="bg-[#262a33] p-3 rounded-lg border border-[#31353e]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="font-['Space_Grotesk'] text-sm font-medium text-[#dfe2ee]">
              Net Consumption Variance:
            </span>
          </div>
          <div className="font-['JetBrains_Mono'] text-sm font-bold text-amber-400">
            {delta > 0 ? `+${delta.toLocaleString()}` : delta.toLocaleString()} kWh ({delta > 0 ? `+${deltaPct}%` : `${deltaPct}%`})
          </div>
        </div>

        {/* Side by side comparison cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card A */}
          <div className="bg-[#262a33] p-4 rounded-xl border border-amber-500/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-['Space_Grotesk'] font-semibold text-amber-300 text-sm truncate">
                {itemA?.area}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-['JetBrains_Mono'] bg-amber-500/20 text-amber-300">
                {itemA?.type}
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#31353e]/60 font-['JetBrains_Mono'] text-xs">
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Consumption:</span>
                <span className="font-bold text-[#dfe2ee]">{itemA?.consumption.toLocaleString()} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Peak Capacity:</span>
                <span className="text-[#dfe2ee]">{itemA?.peakKwh || Math.round(itemA?.consumption * 1.08)} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Power Factor:</span>
                <span className="text-[#56e5a9]">{itemA?.powerFactor || 0.94}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Indoor Temp:</span>
                <span className="text-[#dfe2ee]">{itemA?.temperature || 21.5}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Status:</span>
                <span className={`font-semibold ${itemA?.status === 'Critical' ? 'text-red-400' : itemA?.status === 'Elevated' ? 'text-amber-400' : 'text-[#56e5a9]'}`}>
                  {itemA?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-[#262a33] p-4 rounded-xl border border-[#4fdbc8]/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-['Space_Grotesk'] font-semibold text-[#4fdbc8] text-sm truncate">
                {itemB?.area}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-['JetBrains_Mono'] bg-[#4fdbc8]/20 text-[#4fdbc8]">
                {itemB?.type}
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#31353e]/60 font-['JetBrains_Mono'] text-xs">
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Consumption:</span>
                <span className="font-bold text-[#dfe2ee]">{itemB?.consumption.toLocaleString()} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Peak Capacity:</span>
                <span className="text-[#dfe2ee]">{itemB?.peakKwh || Math.round(itemB?.consumption * 1.08)} kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Power Factor:</span>
                <span className="text-[#56e5a9]">{itemB?.powerFactor || 0.94}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Indoor Temp:</span>
                <span className="text-[#dfe2ee]">{itemB?.temperature || 21.5}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#d8c3ad]/70">Status:</span>
                <span className={`font-semibold ${itemB?.status === 'Critical' ? 'text-red-400' : itemB?.status === 'Elevated' ? 'text-amber-400' : 'text-[#56e5a9]'}`}>
                  {itemB?.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] font-['JetBrains_Mono'] text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
