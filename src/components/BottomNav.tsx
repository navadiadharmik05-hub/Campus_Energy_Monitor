import React from 'react';
import { Activity, Building2, SlidersHorizontal, AlertTriangle } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  activeAlertsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  activeAlertsCount,
}) => {
  return (
    <>
      {/* Fixed Status Bar strip just above Bottom Nav */}
      <div className="fixed bottom-16 inset-x-0 z-40 bg-[#0a0e16]/95 backdrop-blur-md px-4 py-1.5 border-t border-[#262a33]/60 shadow-[0_-1px_4px_rgba(0,0,0,0.3)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-[#d8c3ad] font-['JetBrains_Mono'] text-[11px]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] shrink-0 animate-pulse"></span>
            <span className="truncate">System active · Real-time sync</span>
          </div>
          <span className="truncate font-['JetBrains_Mono'] text-[10px] sm:text-[11px] text-[#d8c3ad]/70 pl-2">
            Java · Data Structures & Algorithms · Web dashboard
          </span>
        </div>
      </div>

      {/* Primary Bottom Navigation Bar */}
      <nav 
        aria-label="Campus navigation"
        className="fixed bottom-0 inset-x-0 z-50 bg-[#0f131c]/95 backdrop-blur-xl border-t border-[#262a33]/80 shadow-[0_-2px_12px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-4xl mx-auto flex justify-around items-center h-16 px-4">
          {/* 1. Telemetry (Initial / Primary Screen) */}
          <button
            id="tab-telemetry"
            type="button"
            onClick={() => onSelectTab('telemetry')}
            aria-current={activeTab === 'telemetry' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors cursor-pointer ${
              activeTab === 'telemetry'
                ? 'text-amber-400 font-semibold'
                : 'text-[#d8c3ad]/70 hover:text-[#dfe2ee]'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="font-['JetBrains_Mono'] text-[10px]">Telemetry</span>
          </button>

          {/* 2. Facilities */}
          <button
            id="tab-facilities"
            type="button"
            onClick={() => onSelectTab('facilities')}
            aria-current={activeTab === 'facilities' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors cursor-pointer ${
              activeTab === 'facilities'
                ? 'text-amber-400 font-semibold'
                : 'text-[#d8c3ad]/70 hover:text-[#dfe2ee]'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="font-['JetBrains_Mono'] text-[10px]">Facilities</span>
          </button>

          {/* 3. Dispatch */}
          <button
            id="tab-dispatch"
            type="button"
            onClick={() => onSelectTab('dispatch')}
            aria-current={activeTab === 'dispatch' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors cursor-pointer ${
              activeTab === 'dispatch'
                ? 'text-amber-400 font-semibold'
                : 'text-[#d8c3ad]/70 hover:text-[#dfe2ee]'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-['JetBrains_Mono'] text-[10px]">Dispatch</span>
          </button>

          {/* 4. Alerts */}
          <button
            id="tab-alerts"
            type="button"
            onClick={() => onSelectTab('alerts')}
            aria-current={activeTab === 'alerts' ? 'page' : undefined}
            className={`relative flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors cursor-pointer ${
              activeTab === 'alerts'
                ? 'text-amber-400 font-semibold'
                : 'text-[#d8c3ad]/70 hover:text-[#dfe2ee]'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            {activeAlertsCount > 0 && (
              <span className="absolute top-1.5 right-3 w-4 h-4 rounded-full bg-amber-500 text-[#472a00] font-['JetBrains_Mono'] text-[9px] font-bold flex items-center justify-center">
                {activeAlertsCount}
              </span>
            )}
            <span className="font-['JetBrains_Mono'] text-[10px]">Alerts</span>
          </button>
        </div>
      </nav>
    </>
  );
};
