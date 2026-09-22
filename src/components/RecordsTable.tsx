import React from 'react';
import { Database, Search, ArrowUpDown, RotateCcw, Undo2 } from 'lucide-react';
import { EnergyRecord } from '../types';

interface RecordsTableProps {
  records: EnergyRecord[];
  allRecordsCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSortByConsumption: () => void;
  sortAscending: boolean;
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  undoCount: number;
  onSelectRecord: (record: EnergyRecord) => void;
}

export const RecordsTable: React.FC<RecordsTableProps> = ({
  records,
  searchQuery,
  onSearchChange,
  onSortByConsumption,
  sortAscending,
  onReset,
  onUndo,
  canUndo,
  undoCount,
  onSelectRecord,
}) => {
  return (
    <section 
      aria-label="Energy Consumption Records"
      className="bg-[#262a33] p-3 sm:p-4 rounded-xl shadow-md border border-[#31353e]/40 flex flex-col gap-3"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-400" />
          <h2 className="font-['Space_Grotesk'] text-base sm:text-lg font-semibold text-[#dfe2ee]">
            Energy consumption records
          </h2>
        </div>
        <span 
          id="record-count-badge"
          className="px-2.5 py-0.5 rounded-full bg-[#31353e] text-[#dfe2ee] font-['JetBrains_Mono'] text-xs font-semibold tabular-nums border border-[#534434]/40"
        >
          {records.length} records
        </span>
      </div>

      {/* Search Field */}
      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#d8c3ad]/70 pointer-events-none" />
        <input 
          id="search-input"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search area, type, or date..."
          className="w-full pl-9 pr-3 py-2 bg-[#1c2028] border border-[#31353e]/60 rounded-lg text-[#dfe2ee] placeholder:text-[#d8c3ad]/50 font-['Geist'] text-xs sm:text-sm focus:outline-none focus:border-amber-500/70 focus:bg-[#31353e]/40 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-2 text-[#d8c3ad] hover:text-white text-xs px-1.5 py-0.5 rounded bg-[#31353e]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Controls Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
        <button
          id="btn-sort"
          type="button"
          onClick={onSortByConsumption}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#31353e] hover:bg-[#353942] active:scale-95 text-[#dfe2ee] border border-[#534434]/30 rounded-lg font-['JetBrains_Mono'] text-xs transition-all shrink-0 cursor-pointer"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
          <span>Sort by consumption {sortAscending ? '(asc)' : '(desc)'}</span>
        </button>

        <button
          id="btn-reset"
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#31353e] hover:bg-[#353942] active:scale-95 text-[#dfe2ee] border border-[#534434]/30 rounded-lg font-['JetBrains_Mono'] text-xs transition-all shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#4fdbc8]" />
          <span>Reset</span>
        </button>

        <button
          id="btn-undo"
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs transition-all shrink-0 ${
            canUndo
              ? 'bg-[#31353e] hover:bg-[#353942] active:scale-95 text-[#dfe2ee] border border-[#534434]/30 cursor-pointer'
              : 'bg-[#181c24] text-[#d8c3ad]/40 border border-transparent cursor-not-allowed opacity-60'
          }`}
        >
          <Undo2 className="w-3.5 h-3.5 text-[#d8c3ad]" />
          <span>Undo {undoCount > 0 ? `(${undoCount})` : ''}</span>
        </button>
      </div>

      {/* Algorithmic Badges (Merge sort, Linear search, Undo stack LIFO) */}
      <div className="flex flex-wrap items-center gap-1.5 py-0.5">
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#1c2028] border border-[#31353e]/60 rounded-full text-[#d8c3ad] font-['JetBrains_Mono'] text-[10px] sm:text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Merge sort · O(n log n)</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#1c2028] border border-[#31353e]/60 rounded-full text-[#d8c3ad] font-['JetBrains_Mono'] text-[10px] sm:text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4fdbc8]"></span>
          <span>Linear search · O(n)</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#1c2028] border border-[#31353e]/60 rounded-full text-[#d8c3ad] font-['JetBrains_Mono'] text-[10px] sm:text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9]"></span>
          <span>Undo stack (LIFO) · O(1)</span>
        </div>
      </div>

      {/* Records Table / List */}
      <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
        <div className="min-w-[460px] flex flex-col gap-1.5">
          {/* Table Column Headers */}
          <div className="grid grid-cols-12 px-3 py-1.5 text-[#d8c3ad]/70 font-['JetBrains_Mono'] text-[10px] sm:text-xs uppercase tracking-wider">
            <div className="col-span-4">Area</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-3 text-right">Consumption</div>
            <div className="col-span-3 text-right">Status</div>
          </div>

          {/* Rows */}
          {records.length === 0 ? (
            <div className="p-6 text-center text-[#d8c3ad]/60 font-['Geist'] text-sm bg-[#1c2028] rounded-lg">
              No energy records match your search query. Try clearing the filter or resetting.
            </div>
          ) : (
            records.map((rec) => {
              const isCritical = rec.status === 'Critical' || rec.consumption >= 4000;
              const isElevated = rec.status === 'Elevated' || (rec.consumption >= 3000 && !isCritical);

              return (
                <div
                  key={rec.id}
                  onClick={() => onSelectRecord(rec)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectRecord(rec)}
                  className="record-row grid grid-cols-12 items-center px-3 py-2 bg-[#1c2028] hover:bg-[#31353e] rounded-lg transition-colors border border-transparent hover:border-[#534434]/40 cursor-pointer group"
                >
                  {/* Area Name & Timestamp */}
                  <div className="col-span-4 min-w-0 pr-2">
                    <div className="font-['Space_Grotesk'] text-sm sm:text-base font-semibold text-[#dfe2ee] group-hover:text-amber-300 transition-colors truncate">
                      {rec.area}
                    </div>
                    <div className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/70">
                      {rec.timestamp}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="col-span-2">
                    <span className="font-['Geist'] text-xs sm:text-sm text-[#d8c3ad]">
                      {rec.type}
                    </span>
                  </div>

                  {/* Consumption */}
                  <div className="col-span-3 text-right pr-2">
                    <span className="font-['JetBrains_Mono'] text-sm sm:text-base font-semibold text-[#dfe2ee] tabular-nums">
                      {rec.consumption.toLocaleString()}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/70 block">
                      kWh
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-3 flex justify-end">
                    {isCritical ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#93000a]/30 text-[#ffb4ab] border border-red-500/40 font-['JetBrains_Mono'] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                        Critical
                      </span>
                    ) : isElevated ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-['JetBrains_Mono'] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        Elevated
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#56e5a9]/10 text-[#56e5a9] border border-[#56e5a9]/30 font-['JetBrains_Mono'] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9]"></span>
                        Normal
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
