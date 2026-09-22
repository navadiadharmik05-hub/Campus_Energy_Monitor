import React from 'react';
import { Zap, Radio, AlertTriangle, Flame, TrendingUp } from 'lucide-react';

interface MetricCardsProps {
  totalTodayKwh: number;
  monitoredCount: number;
  activeAlertsCount: number;
  peakLoadArea: string;
  peakLoadKwh: number;
  onOpenAlerts: () => void;
  onOpenPeakFacility: () => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  totalTodayKwh,
  monitoredCount,
  activeAlertsCount,
  peakLoadArea,
  peakLoadKwh,
  onOpenAlerts,
  onOpenPeakFacility,
}) => {
  return (
    <section aria-label="Key telemetry summary" className="grid grid-cols-2 gap-2 sm:gap-3">
      {/* Card 1: Total Today */}
      <div 
        id="metric-total-today"
        className="bg-[#262a33] p-3 sm:p-4 rounded-xl flex flex-col justify-between shadow-sm border border-[#31353e]/40 hover:border-[#ffc174]/30 transition-colors"
      >
        <div className="flex items-center justify-between text-[#d8c3ad] mb-1">
          <span className="font-['JetBrains_Mono'] text-[10px] sm:text-xs uppercase tracking-wider text-[#d8c3ad]/80">
            Total Today
          </span>
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400/30" />
        </div>
        <div>
          <div className="font-['JetBrains_Mono'] text-xl sm:text-2xl font-bold text-[#dfe2ee] tracking-tight tabular-nums">
            {totalTodayKwh.toLocaleString()}{' '}
            <span className="text-xs font-normal text-[#d8c3ad]/70">kWh</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-amber-400 font-['JetBrains_Mono'] text-[11px]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.4% vs baseline</span>
          </div>
        </div>
      </div>

      {/* Card 2: Monitored */}
      <div 
        id="metric-monitored"
        className="bg-[#262a33] p-3 sm:p-4 rounded-xl flex flex-col justify-between shadow-sm border border-[#31353e]/40 hover:border-[#56e5a9]/30 transition-colors"
      >
        <div className="flex items-center justify-between text-[#d8c3ad] mb-1">
          <span className="font-['JetBrains_Mono'] text-[10px] sm:text-xs uppercase tracking-wider text-[#d8c3ad]/80">
            Monitored
          </span>
          <Radio className="w-4 h-4 text-[#56e5a9]" />
        </div>
        <div>
          <div className="font-['JetBrains_Mono'] text-xl sm:text-2xl font-bold text-[#dfe2ee] tracking-tight tabular-nums">
            {monitoredCount}{' '}
            <span className="text-xs font-normal text-[#d8c3ad]/70">Facilities</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-[#56e5a9] font-['JetBrains_Mono'] text-[11px]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-pulse"></span>
            <span>All sensors reporting</span>
          </div>
        </div>
      </div>

      {/* Card 3: Active Alerts */}
      <div 
        id="metric-active-alerts"
        onClick={onOpenAlerts}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpenAlerts()}
        className="bg-[#262a33] p-3 sm:p-4 rounded-xl flex flex-col justify-between shadow-sm border border-[#31353e]/40 hover:border-amber-500/50 cursor-pointer transition-all active:scale-[0.99] group"
      >
        <div className="flex items-center justify-between text-[#d8c3ad] mb-1">
          <span className="font-['JetBrains_Mono'] text-[10px] sm:text-xs uppercase tracking-wider text-[#d8c3ad]/80 group-hover:text-amber-400 transition-colors">
            Active Alerts
          </span>
          <AlertTriangle className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-['JetBrains_Mono'] text-xl sm:text-2xl font-bold text-amber-400 tracking-tight tabular-nums">
              {activeAlertsCount}
            </span>
            <span className="font-['JetBrains_Mono'] text-xs font-medium text-[#dfe2ee]">Elevated</span>
          </div>
          <div className="mt-1">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-[#ffb95f] font-['JetBrains_Mono'] text-[10px] font-semibold border border-amber-500/30">
              Requires review
            </span>
          </div>
        </div>
      </div>

      {/* Card 4: Peak Load Area */}
      <div 
        id="metric-peak-load"
        onClick={onOpenPeakFacility}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpenPeakFacility()}
        className="bg-[#262a33] p-3 sm:p-4 rounded-xl flex flex-col justify-between shadow-sm border border-[#31353e]/40 hover:border-red-500/40 cursor-pointer transition-all active:scale-[0.99] group"
      >
        <div className="flex items-center justify-between text-[#d8c3ad] mb-1">
          <span className="font-['JetBrains_Mono'] text-[10px] sm:text-xs uppercase tracking-wider text-[#d8c3ad]/80 group-hover:text-red-400 transition-colors">
            Peak Load Area
          </span>
          <Flame className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <div className="font-['Space_Grotesk'] text-sm sm:text-base font-semibold text-[#dfe2ee] truncate">
            {peakLoadArea}
          </div>
          <div className="font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold text-red-400 mt-0.5 tabular-nums">
            {peakLoadKwh.toLocaleString()}{' '}
            <span className="font-normal text-[#d8c3ad]/70 text-[10px] sm:text-xs">kWh</span>
          </div>
        </div>
      </div>
    </section>
  );
};
