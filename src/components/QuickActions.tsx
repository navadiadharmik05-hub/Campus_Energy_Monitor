import React from 'react';
import { 
  Zap, 
  BarChart3, 
  Scale, 
  Bell, 
  Activity, 
  Layers, 
  Binary, 
  Grid 
} from 'lucide-react';
import { ActiveModal } from '../types';

interface QuickActionsProps {
  onOpenModal: (modal: ActiveModal) => void;
  activeAlertsCount: number;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onOpenModal,
  activeAlertsCount,
}) => {
  return (
    <section 
      aria-label="Quick Actions"
      className="bg-[#262a33] p-3 sm:p-4 rounded-xl shadow-md border border-[#31353e]/40 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="font-['Space_Grotesk'] text-base sm:text-lg font-semibold text-[#dfe2ee]">
            Quick actions
          </h2>
        </div>
        <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/80 tracking-wide">
          Ops console
        </span>
      </div>

      {/* 2-column grid of equal-sized action buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        {/* 1. Analysis */}
        <button
          id="action-btn-analysis"
          type="button"
          onClick={() => onOpenModal('analysis')}
          className="flex items-center gap-2.5 p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg text-[#dfe2ee] text-left transition-all active:scale-95 group border border-transparent hover:border-[#ffc174]/20 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#31353e] group-hover:bg-amber-500/20 flex items-center justify-center shrink-0 transition-colors">
            <BarChart3 className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-['Geist'] text-xs sm:text-sm font-medium text-[#dfe2ee] truncate">
            Analysis
          </span>
        </button>

        {/* 2. Compare */}
        <button
          id="action-btn-compare"
          type="button"
          onClick={() => onOpenModal('compare')}
          className="flex items-center gap-2.5 p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg text-[#dfe2ee] text-left transition-all active:scale-95 group border border-transparent hover:border-[#4fdbc8]/20 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#31353e] group-hover:bg-[#4fdbc8]/20 flex items-center justify-center shrink-0 transition-colors">
            <Scale className="w-4 h-4 text-[#4fdbc8]" />
          </div>
          <span className="font-['Geist'] text-xs sm:text-sm font-medium text-[#dfe2ee] truncate">
            Compare
          </span>
        </button>

        {/* 3. Alerts */}
        <button
          id="action-btn-alerts"
          type="button"
          onClick={() => onOpenModal('alerts')}
          className="flex items-center justify-between p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg text-[#dfe2ee] text-left transition-all active:scale-95 group border border-transparent hover:border-amber-500/20 cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#31353e] group-hover:bg-amber-500/20 flex items-center justify-center shrink-0 transition-colors">
              <Bell className="w-4 h-4 text-amber-400" />
            </div>
            <span className="font-['Geist'] text-xs sm:text-sm font-medium text-[#dfe2ee] truncate">
              Alerts
            </span>
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-[#472a00] font-['JetBrains_Mono'] text-[11px] font-bold">
            {activeAlertsCount}
          </span>
        </button>

        {/* 4. Activity */}
        <button
          id="action-btn-activity"
          type="button"
          onClick={() => onOpenModal('activity')}
          className="flex items-center gap-2.5 p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg text-[#dfe2ee] text-left transition-all active:scale-95 group border border-transparent hover:border-[#56e5a9]/20 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#31353e] group-hover:bg-[#56e5a9]/20 flex items-center justify-center shrink-0 transition-colors">
            <Activity className="w-4 h-4 text-[#56e5a9]" />
          </div>
          <span className="font-['Geist'] text-xs sm:text-sm font-medium text-[#dfe2ee] truncate">
            Activity
          </span>
        </button>

        {/* 5. Queue */}
        <button
          id="action-btn-queue"
          type="button"
          onClick={() => onOpenModal('queue')}
          className="flex items-center gap-2.5 p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg text-[#dfe2ee] text-left transition-all active:scale-95 group border border-transparent hover:border-[#71f8e4]/20 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#31353e] group-hover:bg-[#71f8e4]/20 flex items-center justify-center shrink-0 transition-colors">
            <Layers className="w-4 h-4 text-[#71f8e4]" />
          </div>
          <span className="font-['Geist'] text-xs sm:text-sm font-medium text-[#dfe2ee] truncate">
            Queue
          </span>
        </button>

        {/* 6. Binary search */}
        <button
          id="action-btn-binary-search"
          type="button"
          onClick={() => onOpenModal('binarySearch')}
          className="flex items-center gap-2.5 p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg text-[#dfe2ee] text-left transition-all active:scale-95 group border border-transparent hover:border-[#ffddb8]/20 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#31353e] group-hover:bg-[#ffddb8]/20 flex items-center justify-center shrink-0 transition-colors">
            <Binary className="w-4 h-4 text-amber-300" />
          </div>
          <span className="font-['Geist'] text-xs sm:text-sm font-medium text-[#dfe2ee] truncate">
            Binary search
          </span>
        </button>

        {/* 7. Grid network (Full-width span on 2-col) */}
        <button
          id="action-btn-grid-network"
          type="button"
          onClick={() => onOpenModal('gridNetwork')}
          className="col-span-2 flex items-center gap-2.5 p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg text-[#dfe2ee] text-left transition-all active:scale-[0.98] group border border-transparent hover:border-[#6ffbbe]/20 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#31353e] group-hover:bg-[#6ffbbe]/20 flex items-center justify-center shrink-0 transition-colors">
            <Grid className="w-4 h-4 text-[#6ffbbe]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-['Geist'] text-xs sm:text-sm font-medium text-[#dfe2ee] truncate">
              Grid network
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/80 truncate">
              Substation mesh status · 100% interconnected
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};
