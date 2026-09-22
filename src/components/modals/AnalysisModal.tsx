import React, { useState } from 'react';
import { X, BarChart3, TrendingUp, Zap, Clock, ShieldCheck, ArrowDownRight } from 'lucide-react';
import { EnergyRecord } from '../../types';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: EnergyRecord[];
  totalTodayKwh: number;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({
  isOpen,
  onClose,
  records,
  totalTodayKwh,
}) => {
  if (!isOpen) return null;

  // Breakdown by type
  const typeMap: Record<string, number> = {};
  records.forEach((r) => {
    typeMap[r.type] = (typeMap[r.type] || 0) + r.consumption;
  });

  const total = Object.values(typeMap).reduce((a, b) => a + b, 0) || 1;

  // Hourly curve data
  const hourlyData = [
    { hour: '06:00', kwh: 520 },
    { hour: '08:00', kwh: 1100 },
    { hour: '10:00', kwh: 2450 },
    { hour: '12:00', kwh: 3890 },
    { hour: '14:00', kwh: 4120 },
    { hour: '16:00', kwh: 3680 },
    { hour: '18:00', kwh: 2940 },
    { hour: '20:00', kwh: 1980 },
    { hour: '22:00', kwh: 1120 },
  ];

  const maxKwh = Math.max(...hourlyData.map((d) => d.kwh));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="analysis-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1c2028] border border-[#31353e] rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-[#dfe2ee]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 id="analysis-modal-title" className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
                Campus Energy Analytics
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                Aggregated telemetry profile & load variance
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

        {/* Top KPIs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-[#262a33] p-3 rounded-lg border border-[#31353e]/60">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#d8c3ad]/70 uppercase">
              Current Power Factor
            </span>
            <div className="font-['JetBrains_Mono'] text-lg font-bold text-[#56e5a9] mt-0.5">
              0.942
            </div>
            <span className="text-[10px] text-[#56e5a9] flex items-center gap-0.5 mt-0.5 font-['JetBrains_Mono']">
              <ShieldCheck className="w-3 h-3" /> Nominal
            </span>
          </div>

          <div className="bg-[#262a33] p-3 rounded-lg border border-[#31353e]/60">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#d8c3ad]/70 uppercase">
              Peak Interval
            </span>
            <div className="font-['JetBrains_Mono'] text-lg font-bold text-amber-400 mt-0.5">
              14:00 - 15:00
            </div>
            <span className="text-[10px] text-amber-300 flex items-center gap-0.5 mt-0.5 font-['JetBrains_Mono']">
              <Clock className="w-3 h-3" /> 4,120 kWh max
            </span>
          </div>

          <div className="bg-[#262a33] p-3 rounded-lg border border-[#31353e]/60">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#d8c3ad]/70 uppercase">
              Grid Efficiency
            </span>
            <div className="font-['JetBrains_Mono'] text-lg font-bold text-[#4fdbc8] mt-0.5">
              96.8%
            </div>
            <span className="text-[10px] text-[#4fdbc8] flex items-center gap-0.5 mt-0.5 font-['JetBrains_Mono']">
              <TrendingUp className="w-3 h-3" /> High resilience
            </span>
          </div>
        </div>

        {/* 24-Hour Load Profile Chart */}
        <div className="bg-[#262a33] p-3 sm:p-4 rounded-lg border border-[#31353e]/60 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
              Diurnal Load Profile (kW Demand)
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/70">
              Telemetry sample rate: 15 min
            </span>
          </div>

          <div className="h-36 flex items-end gap-2 pt-6 pb-2 px-1">
            {hourlyData.map((d) => {
              const heightPct = Math.round((d.kwh / maxKwh) * 100);
              const isPeak = d.kwh === maxKwh;
              return (
                <div key={d.hour} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[9px] font-['JetBrains_Mono'] text-[#d8c3ad]/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.kwh}
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t transition-all ${
                      isPeak 
                        ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                        : 'bg-[#4fdbc8]/60 hover:bg-[#4fdbc8]'
                    }`}
                  ></div>
                  <span className="font-['JetBrains_Mono'] text-[9px] text-[#d8c3ad]/60">
                    {d.hour.slice(0, 2)}h
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consumption by Facility Sector */}
        <div className="bg-[#262a33] p-3 sm:p-4 rounded-lg border border-[#31353e]/60 flex flex-col gap-2.5">
          <span className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
            Consumption by Facility Sector
          </span>
          <div className="flex flex-col gap-2">
            {Object.entries(typeMap).map(([type, val]) => {
              const pct = Math.round((val / total) * 100);
              return (
                <div key={type} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-['JetBrains_Mono'] text-xs">
                    <span className="text-[#dfe2ee]">{type}</span>
                    <span className="text-[#d8c3ad]/80">
                      {val.toLocaleString()} kWh ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1c2028] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full rounded-full ${
                        type === 'Laboratory'
                          ? 'bg-amber-400'
                          : type === 'Academic'
                          ? 'bg-[#4fdbc8]'
                          : type === 'Residential'
                          ? 'bg-[#56e5a9]'
                          : 'bg-[#ffb95f]'
                      }`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] font-['JetBrains_Mono'] text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
