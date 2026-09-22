import React, { useState } from 'react';
import { X, Binary, Play, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { EnergyRecord } from '../../types';
import { binarySearchRecords, mergeSortRecords, BinarySearchStep } from '../../utils/algorithms';

interface BinarySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: EnergyRecord[];
}

export const BinarySearchModal: React.FC<BinarySearchModalProps> = ({
  isOpen,
  onClose,
  records,
}) => {
  const [targetKwh, setTargetKwh] = useState<string>('3450');
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [steps, setSteps] = useState<BinarySearchStep[]>([]);
  const [foundIndex, setFoundIndex] = useState<number>(-1);
  const [comparisons, setComparisons] = useState<number>(0);

  if (!isOpen) return null;

  // Binary search requires ascending sorted array
  const sortedAsc = mergeSortRecords([...records], true);

  const handleRunSearch = () => {
    const val = parseFloat(targetKwh);
    if (isNaN(val)) return;

    const result = binarySearchRecords(sortedAsc, val);
    setSteps(result.steps);
    setFoundIndex(result.foundIndex);
    setComparisons(result.comparisons);
    setCurrentStepIndex(0);
    setSearchExecuted(true);
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="binary-search-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1c2028] border border-[#31353e] rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-[#dfe2ee]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Binary className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 id="binary-search-modal-title" className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
                Binary Search Explorer · O(log n)
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                Logarithmic telemetry query over sorted consumption array
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

        {/* Target Input and Preset Buttons */}
        <div className="bg-[#262a33] p-3.5 rounded-lg border border-[#31353e]/60 flex flex-col gap-2.5">
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <label htmlFor="target-kwh-input" className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/80 whitespace-nowrap">
                Target kWh:
              </label>
              <input
                id="target-kwh-input"
                type="number"
                value={targetKwh}
                onChange={(e) => setTargetKwh(e.target.value)}
                placeholder="e.g. 3450"
                className="w-32 px-3 py-1.5 bg-[#1c2028] border border-[#31353e] rounded-lg text-[#dfe2ee] font-['JetBrains_Mono'] text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              onClick={handleRunSearch}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#472a00] font-['Space_Grotesk'] font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Execute Binary Search</span>
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 flex-wrap font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/70">
            <span>Presets:</span>
            {[960, 1980, 2890, 3450, 4120, 2500].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setTargetKwh(preset.toString());
                  setTimeout(handleRunSearch, 50);
                }}
                className="px-2 py-0.5 rounded bg-[#1c2028] hover:bg-[#31353e] text-[#dfe2ee] border border-[#31353e]/60 cursor-pointer"
              >
                {preset} kWh
              </button>
            ))}
          </div>
        </div>

        {/* Trace and Step Controller */}
        {searchExecuted && steps.length > 0 && (
          <div className="flex flex-col gap-3">
            {/* Step navigation bar */}
            <div className="flex items-center justify-between bg-[#262a33] p-2.5 rounded-lg border border-[#31353e]/60 font-['JetBrains_Mono'] text-xs">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-semibold">
                  Iteration {currentStepIndex + 1} of {steps.length}
                </span>
                <span className="text-[#d8c3ad]/70">
                  (Total comparisons: {comparisons} ≤ ⌈log₂(18)⌉ = 5)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
                  className="px-2 py-1 rounded bg-[#1c2028] hover:bg-[#31353e] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Prev
                </button>
                <button
                  disabled={currentStepIndex === steps.length - 1}
                  onClick={() => setCurrentStepIndex((p) => Math.min(steps.length - 1, p + 1))}
                  className="px-2 py-1 rounded bg-amber-500 text-[#472a00] font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next Step
                </button>
              </div>
            </div>

            {/* Current Step Action Explanation */}
            {currentStep && (
              <div className="p-3 bg-[#1c2028] border border-amber-500/30 rounded-lg text-xs font-['JetBrains_Mono'] text-[#dfe2ee]">
                <div className="flex items-center gap-2 mb-1 text-amber-400 font-bold">
                  {currentStep.found ? (
                    <CheckCircle2 className="w-4 h-4 text-[#56e5a9]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  )}
                  <span>Action Step {currentStep.step}:</span>
                </div>
                <p className="text-[#d8c3ad] leading-relaxed">{currentStep.action}</p>
                {currentStep.mid !== -1 && (
                  <div className="mt-2 flex gap-4 text-[11px] text-[#d8c3ad]/70 pt-1.5 border-t border-[#262a33]">
                    <span>Low pointer: [{currentStep.low}]</span>
                    <span className="text-amber-300 font-bold">Mid pointer: [{currentStep.mid}] ({currentStep.midRecord.consumption} kWh)</span>
                    <span>High pointer: [{currentStep.high}]</span>
                  </div>
                )}
              </div>
            )}

            {/* Array visualization */}
            <div className="flex flex-col gap-1.5">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#d8c3ad]/70 uppercase">
                Sorted Array Indices (0 to {sortedAsc.length - 1})
              </span>
              <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 max-h-48 overflow-y-auto p-1 bg-[#262a33] rounded-lg border border-[#31353e]/60">
                {sortedAsc.map((item, idx) => {
                  const isMid = currentStep && currentStep.mid === idx;
                  const isLow = currentStep && currentStep.low === idx;
                  const isHigh = currentStep && currentStep.high === idx;
                  const isOutOfRange = currentStep && (idx < currentStep.low || idx > currentStep.high);
                  const isFound = foundIndex === idx;

                  let bgClass = 'bg-[#1c2028] text-[#dfe2ee] border-[#31353e]';
                  if (isFound && currentStep?.found) {
                    bgClass = 'bg-[#56e5a9]/20 text-[#56e5a9] border-[#56e5a9] font-bold shadow-[0_0_8px_rgba(86,229,169,0.3)]';
                  } else if (isMid) {
                    bgClass = 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold';
                  } else if (isOutOfRange) {
                    bgClass = 'bg-[#181c24]/50 text-[#d8c3ad]/30 border-transparent line-through';
                  }

                  return (
                    <div
                      key={item.id}
                      className={`p-1.5 rounded border text-center font-['JetBrains_Mono'] text-[10px] flex flex-col items-center justify-center transition-all ${bgClass}`}
                    >
                      <span className="text-[9px] opacity-60">[{idx}]</span>
                      <span className="font-semibold">{item.consumption}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] font-['JetBrains_Mono'] text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Binary Search
          </button>
        </div>
      </div>
    </div>
  );
};
