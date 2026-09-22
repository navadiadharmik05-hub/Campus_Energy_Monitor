import React, { useState } from 'react';
import { SlidersHorizontal, Zap, ShieldCheck, Check, AlertCircle, ArrowDown } from 'lucide-react';

export const DispatchView: React.FC = () => {
  const [targetCap, setTargetCap] = useState<number>(14000);
  const [shedLighting, setShedLighting] = useState<boolean>(true);
  const [shedHvac, setShedHvac] = useState<boolean>(true);
  const [shedPumps, setShedPumps] = useState<boolean>(false);
  const [shedEv, setShedEv] = useState<boolean>(true);
  const [dispatched, setDispatched] = useState<boolean>(false);

  const calculateShed = () => {
    let sum = 0;
    if (shedLighting) sum += 180;
    if (shedHvac) sum += 420;
    if (shedPumps) sum += 310;
    if (shedEv) sum += 250;
    return sum;
  };

  const handleExecuteDispatch = () => {
    setDispatched(true);
    setTimeout(() => setDispatched(false), 3000);
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-[#262a33] p-3 sm:p-4 rounded-xl border border-[#31353e]/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
              Demand Response & Load Dispatch
            </h2>
            <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
              Automated curtailment & peak tariff avoidance
            </p>
          </div>
        </div>
      </div>

      {/* Target Capacity Slider */}
      <div className="bg-[#262a33] p-4 rounded-xl border border-[#31353e]/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
            Campus Peak Load Cap Limit
          </span>
          <span className="font-['JetBrains_Mono'] text-sm font-bold text-amber-400">
            {targetCap.toLocaleString()} kWh
          </span>
        </div>
        <input
          type="range"
          min="12000"
          max="18000"
          step="250"
          value={targetCap}
          onChange={(e) => setTargetCap(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#d8c3ad]/60">
          <span>12,000 kWh (Deep Curtailment)</span>
          <span>15,000 kWh (Baseline)</span>
          <span>18,000 kWh (Unrestricted)</span>
        </div>
      </div>

      {/* Shed Options */}
      <div className="bg-[#262a33] p-4 rounded-xl border border-[#31353e]/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
            Selectable Load Shedding Routines
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#56e5a9] font-bold">
            Total Target Curtailment: -{calculateShed()} kW
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Item 1 */}
          <label className="flex items-center justify-between p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg border border-[#31353e]/60 cursor-pointer transition-colors">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={shedHvac}
                onChange={(e) => setShedHvac(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <div>
                <div className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
                  HVAC Chiller Setpoint Floating (+1.5°C)
                </div>
                <div className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                  Applies to Main Library, Admin Building & Classroom halls
                </div>
              </div>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#56e5a9] shrink-0">
              -420 kW
            </span>
          </label>

          {/* Item 2 */}
          <label className="flex items-center justify-between p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg border border-[#31353e]/60 cursor-pointer transition-colors">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={shedLighting}
                onChange={(e) => setShedLighting(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <div>
                <div className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
                  Non-Critical & Architectural Lighting Dimming (-30%)
                </div>
                <div className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                  Common walkways, facade floodlights, atrium fixtures
                </div>
              </div>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#56e5a9] shrink-0">
              -180 kW
            </span>
          </label>

          {/* Item 3 */}
          <label className="flex items-center justify-between p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg border border-[#31353e]/60 cursor-pointer transition-colors">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={shedEv}
                onChange={(e) => setShedEv(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <div>
                <div className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
                  Campus EV Charging Smart Throttling
                </div>
                <div className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                  Rate limits 32 Level-2 chargers across campus parking decks
                </div>
              </div>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#56e5a9] shrink-0">
              -250 kW
            </span>
          </label>

          {/* Item 4 */}
          <label className="flex items-center justify-between p-3 bg-[#1c2028] hover:bg-[#31353e] rounded-lg border border-[#31353e]/60 cursor-pointer transition-colors">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={shedPumps}
                onChange={(e) => setShedPumps(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <div>
                <div className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
                  Aquatic Center Pool Water Re-Circulation Pause
                </div>
                <div className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                  Shifts high-capacity filter pumps off-peak (up to 2h)
                </div>
              </div>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#56e5a9] shrink-0">
              -310 kW
            </span>
          </label>
        </div>

        {dispatched && (
          <div className="p-3 bg-[#56e5a9]/10 border border-[#56e5a9]/30 rounded-lg text-[#56e5a9] font-['JetBrains_Mono'] text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Curtailment command dispatched to automated building SCADA controllers!</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleExecuteDispatch}
          className="mt-1 w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#472a00] font-['Space_Grotesk'] font-bold text-sm sm:text-base rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.99]"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Execute Curtailment Dispatch (-{calculateShed()} kW)</span>
        </button>
      </div>
    </div>
  );
};
