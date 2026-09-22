import React, { useState } from 'react';
import { Building2, Search, Filter, Zap, Users, ShieldAlert } from 'lucide-react';
import { Facility, FacilityType, EnergyRecord } from '../types';

interface FacilitiesViewProps {
  facilities: Facility[];
  onSelectFacility: (record: EnergyRecord) => void;
  records: EnergyRecord[];
}

export const FacilitiesView: React.FC<FacilitiesViewProps> = ({
  facilities,
  onSelectFacility,
  records,
}) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [search, setSearch] = useState('');

  const types: string[] = ['All', 'Academic', 'Laboratory', 'Residential', 'Athletics', 'Dining/Admin'];

  const filtered = facilities.filter((f) => {
    const matchType = selectedType === 'All' || f.type === selectedType;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.substation.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="flex flex-col gap-3 sm:gap-4 animate-in fade-in duration-150">
      {/* View Header */}
      <div className="bg-[#262a33] p-3 sm:p-4 rounded-xl border border-[#31353e]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
              Campus Facilities Directory
            </h2>
            <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
              18 monitored physical plants & building sub-meters
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#d8c3ad]/60" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search facility name or substation..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#1c2028] border border-[#31353e] rounded-lg text-xs text-[#dfe2ee] placeholder:text-[#d8c3ad]/40 focus:outline-none focus:border-amber-400 font-['Geist']"
          />
        </div>
      </div>

      {/* Sector Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs transition-colors shrink-0 cursor-pointer ${
              selectedType === t
                ? 'bg-amber-500 text-[#472a00] font-bold shadow-sm'
                : 'bg-[#262a33] text-[#d8c3ad] hover:bg-[#31353e] border border-[#31353e]/60'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((fac) => {
          const matchingRecord = records.find((r) => r.area === fac.name) || {
            id: fac.id,
            area: fac.name,
            type: fac.type,
            consumption: fac.currentKwh,
            timestamp: 'Live',
            status: fac.status,
            powerFactor: 0.94,
            temperature: 21.5,
          };

          const isCritical = fac.status === 'Critical' || fac.currentKwh >= 4000;
          const isElevated = fac.status === 'Elevated' || (fac.currentKwh >= 3000 && !isCritical);

          return (
            <div
              key={fac.id}
              onClick={() => onSelectFacility(matchingRecord)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectFacility(matchingRecord)}
              className="bg-[#262a33] p-3.5 rounded-xl border border-[#31353e]/60 hover:border-amber-500/40 transition-all cursor-pointer flex flex-col justify-between gap-3 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-['Space_Grotesk'] text-base font-semibold text-[#dfe2ee] group-hover:text-amber-300 transition-colors">
                    {fac.name}
                  </h3>
                  <div className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70 mt-0.5">
                    {fac.type} · {fac.substation}
                  </div>
                </div>

                {isCritical ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#93000a]/30 text-[#ffb4ab] border border-red-500/40 font-['JetBrains_Mono'] text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                    Critical
                  </span>
                ) : isElevated ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-['JetBrains_Mono'] text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Elevated
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#56e5a9]/10 text-[#56e5a9] border border-[#56e5a9]/30 font-['JetBrains_Mono'] text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9]"></span>
                    Normal
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#31353e]/60 font-['JetBrains_Mono'] text-xs">
                <div>
                  <span className="text-[10px] text-[#d8c3ad]/70 uppercase block">Active Power</span>
                  <span className="text-[#dfe2ee] font-bold text-sm">{fac.currentKwh.toLocaleString()} kWh</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#d8c3ad]/70 uppercase block">Baseline Variance</span>
                  <span className="text-amber-400 font-semibold text-xs">+2.4%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#d8c3ad]/70 uppercase block">Estimated Occupancy</span>
                  <span className="text-[#dfe2ee] text-xs">{fac.occupancy}% capacity</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#d8c3ad]/70 uppercase block">Conditioned Area</span>
                  <span className="text-[#dfe2ee] text-xs">{fac.sqft.toLocaleString()} sq ft</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
