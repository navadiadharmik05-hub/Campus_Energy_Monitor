import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, Clock, Check } from 'lucide-react';
import { EnergyAlert } from '../types';

interface AlertsViewProps {
  alerts: EnergyAlert[];
  onResolveAlert: (id: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ alerts, onResolveAlert }) => {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Resolved'>('Active');

  const filtered = alerts.filter((a) => {
    if (filter === 'Active') return !a.resolved;
    if (filter === 'Resolved') return a.resolved;
    return true;
  });

  return (
    <div className="flex flex-col gap-3 sm:gap-4 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-[#262a33] p-3 sm:p-4 rounded-xl border border-[#31353e]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
              Telemetry Anomaly & Alert Center
            </h2>
            <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
              Active thresholds, phase imbalance & demand spike surveillance
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-center font-['JetBrains_Mono'] text-xs">
          {(['Active', 'Resolved', 'All'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === f
                  ? 'bg-amber-500 text-[#472a00] font-bold'
                  : 'bg-[#1c2028] text-[#d8c3ad] hover:bg-[#31353e]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-[#262a33] rounded-xl border border-[#31353e]/60 text-[#d8c3ad]/60 font-['Geist'] text-sm">
            No alerts currently in this view. All campus substations operating nominally.
          </div>
        ) : (
          filtered.map((alt) => (
            <div
              key={alt.id}
              className={`p-4 rounded-xl border transition-all flex flex-col gap-3 ${
                alt.resolved
                  ? 'bg-[#1c2028]/60 border-[#31353e]/40 opacity-70'
                  : alt.severity === 'Critical'
                  ? 'bg-[#262a33] border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.1)]'
                  : 'bg-[#262a33] border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full font-['JetBrains_Mono'] text-[10px] font-bold ${
                    alt.severity === 'Critical'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : alt.severity === 'Elevated'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-[#56e5a9]/20 text-[#56e5a9]'
                  }`}>
                    {alt.severity}
                  </span>
                  <span className="font-['Space_Grotesk'] text-base font-semibold text-[#dfe2ee]">
                    {alt.facility}
                  </span>
                </div>

                <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/70 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {alt.timestamp}
                </span>
              </div>

              <p className="font-['Geist'] text-xs sm:text-sm text-[#dfe2ee]/90">
                {alt.message}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-['JetBrains_Mono'] text-xs pt-2 border-t border-[#31353e]/60 text-[#d8c3ad]/80">
                <div>
                  <span className="text-[10px] uppercase block text-[#d8c3ad]/60">Metric</span>
                  <span className="text-white">{alt.metric}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase block text-[#d8c3ad]/60">Current Value</span>
                  <span className={alt.severity === 'Critical' ? 'text-red-400 font-bold' : 'text-amber-400 font-bold'}>
                    {alt.currentValue}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase block text-[#d8c3ad]/60">Threshold</span>
                  <span className="text-[#56e5a9]">{alt.threshold}</span>
                </div>
              </div>

              {/* Action Row */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/60">
                  {alt.resolved ? 'Status: Resolved & Logged' : 'Requires operational inspection'}
                </span>
                {!alt.resolved ? (
                  <button
                    type="button"
                    onClick={() => onResolveAlert(alt.id)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#472a00] font-['Space_Grotesk'] font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Acknowledge & Clear</span>
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-[#56e5a9] font-['JetBrains_Mono'] text-xs">
                    <CheckCircle2 className="w-4 h-4" /> Cleared
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
