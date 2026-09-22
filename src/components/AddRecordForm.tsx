import React, { useState } from 'react';
import { PlusCircle, Zap, CheckCircle2 } from 'lucide-react';
import { FacilityType } from '../types';

interface AddRecordFormProps {
  onAddRecord: (data: {
    area: string;
    type: FacilityType;
    consumption: number;
    date: string;
  }) => void;
}

export const AddRecordForm: React.FC<AddRecordFormProps> = ({ onAddRecord }) => {
  const [areaName, setAreaName] = useState('');
  const [areaType, setAreaType] = useState<FacilityType>('Academic');
  const [consumption, setConsumption] = useState('');
  const [dateVal, setDateVal] = useState('2025-05-18');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const kwh = parseFloat(consumption);
    if (!areaName.trim() || isNaN(kwh) || kwh <= 0) return;

    onAddRecord({
      area: areaName.trim(),
      type: areaType,
      consumption: kwh,
      date: dateVal || 'Today',
    });

    setAreaName('');
    setConsumption('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <section 
      aria-label="Add Energy Record"
      className="bg-[#262a33] p-3 sm:p-4 rounded-xl shadow-md border border-[#31353e]/40 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-amber-400" />
          <h2 className="font-['Space_Grotesk'] text-base sm:text-lg font-semibold text-[#dfe2ee]">
            Add energy record
          </h2>
        </div>
        <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/80 tracking-wide">
          Telemetric Entry
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Area Name */}
          <div className="flex flex-col gap-1">
            <label 
              htmlFor="area-name"
              className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/80 uppercase tracking-wider"
            >
              Area name
            </label>
            <input 
              id="area-name"
              type="text"
              required
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="e.g., Biology Annex"
              className="w-full px-3 py-2 bg-[#1c2028] border border-[#31353e]/60 rounded-lg text-[#dfe2ee] placeholder:text-[#d8c3ad]/40 font-['Geist'] text-xs sm:text-sm focus:outline-none focus:border-amber-500/70 focus:bg-[#31353e]/40 transition-colors"
            />
          </div>

          {/* Area Type */}
          <div className="flex flex-col gap-1">
            <label 
              htmlFor="area-type"
              className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/80 uppercase tracking-wider"
            >
              Area type
            </label>
            <select
              id="area-type"
              value={areaType}
              onChange={(e) => setAreaType(e.target.value as FacilityType)}
              className="w-full px-3 py-2 bg-[#1c2028] border border-[#31353e]/60 rounded-lg text-[#dfe2ee] font-['Geist'] text-xs sm:text-sm focus:outline-none focus:border-amber-500/70 focus:bg-[#31353e]/40 transition-colors cursor-pointer"
            >
              <option value="Academic">Academic</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Residential">Residential</option>
              <option value="Athletics">Athletics</option>
              <option value="Dining/Admin">Dining/Admin</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Consumption */}
          <div className="flex flex-col gap-1">
            <label 
              htmlFor="consumption"
              className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/80 uppercase tracking-wider"
            >
              Consumption (kWh)
            </label>
            <input 
              id="consumption"
              type="number"
              min="1"
              step="any"
              required
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
              placeholder="e.g., 1850"
              className="w-full px-3 py-2 bg-[#1c2028] border border-[#31353e]/60 rounded-lg text-[#dfe2ee] placeholder:text-[#d8c3ad]/40 font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none focus:border-amber-500/70 focus:bg-[#31353e]/40 transition-colors tabular-nums"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label 
              htmlFor="date-val"
              className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/80 uppercase tracking-wider"
            >
              Date
            </label>
            <input 
              id="date-val"
              type="date"
              value={dateVal}
              onChange={(e) => setDateVal(e.target.value)}
              className="w-full px-3 py-2 bg-[#1c2028] border border-[#31353e]/60 rounded-lg text-[#dfe2ee] font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none focus:border-amber-500/70 focus:bg-[#31353e]/40 transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Success toast notification */}
        {showSuccess && (
          <div className="flex items-center gap-2 p-2 bg-[#56e5a9]/10 border border-[#56e5a9]/30 rounded-lg text-[#56e5a9] font-['JetBrains_Mono'] text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Telemetric record recorded and enqueued to operational stack!</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          id="submit-record"
          type="submit"
          className="mt-1 w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-[#472a00] font-['Space_Grotesk'] font-bold text-sm sm:text-base rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-current stroke-[2.5]" />
          <span>Add record</span>
        </button>
      </form>
    </section>
  );
};
