import React from 'react';
import { X, Grid, ShieldCheck, Zap, Activity, Radio } from 'lucide-react';

interface GridNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GridNetworkModal: React.FC<GridNetworkModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const substations = [
    {
      name: 'Substation A (North Primary)',
      voltage: '115 kV / 13.8 kV',
      load: '4,650 kW',
      capacity: '7,500 kW',
      status: 'Nominal',
      feeders: ['Engineering Hall A', 'Environmental Studies', 'North Dorms'],
    },
    {
      name: 'Substation B (Central Core)',
      voltage: '13.8 kV Loop',
      load: '3,890 kW',
      capacity: '6,000 kW',
      status: 'Nominal',
      feeders: ['Main Library', 'Student Union', 'Admin Building'],
    },
    {
      name: 'Substation C (Sci-Tech Dedicated)',
      voltage: '13.8 kV / 480 V',
      load: '8,210 kW',
      capacity: '10,000 kW',
      status: 'High Load',
      feeders: ['Sci-Tech Lab B', 'Nanotech Lab', 'Computer Science Center'],
    },
    {
      name: 'Substation D (South Quad)',
      voltage: '13.8 kV / 208 V',
      load: '2,920 kW',
      capacity: '5,000 kW',
      status: 'Nominal',
      feeders: ['Athletics Center', 'Aquatic Pavilion', 'South Dining'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="grid-network-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1c2028] border border-[#31353e] rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-[#dfe2ee]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6ffbbe]/20 border border-[#6ffbbe]/30 flex items-center justify-center">
              <Grid className="w-4 h-4 text-[#6ffbbe]" />
            </div>
            <div>
              <h3 id="grid-network-modal-title" className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
                Campus Substation Mesh Network
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                100% interconnected ring feeder status & distribution
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

        {/* Status Highlights */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-[#262a33] p-3 rounded-lg border border-[#31353e]/60">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#d8c3ad]/70 uppercase">
              Grid Frequency
            </span>
            <div className="font-['JetBrains_Mono'] text-lg font-bold text-[#56e5a9] mt-0.5">
              60.018 Hz
            </div>
            <span className="text-[10px] text-[#56e5a9] flex items-center gap-0.5 font-['JetBrains_Mono']">
              <ShieldCheck className="w-3 h-3" /> Synchronized
            </span>
          </div>

          <div className="bg-[#262a33] p-3 rounded-lg border border-[#31353e]/60">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#d8c3ad]/70 uppercase">
              Topology
            </span>
            <div className="font-['JetBrains_Mono'] text-lg font-bold text-[#6ffbbe] mt-0.5">
              Ring Mesh
            </div>
            <span className="text-[10px] text-[#6ffbbe] flex items-center gap-0.5 font-['JetBrains_Mono']">
              <Radio className="w-3 h-3" /> N-1 Redundant
            </span>
          </div>

          <div className="bg-[#262a33] p-3 rounded-lg border border-[#31353e]/60">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#d8c3ad]/70 uppercase">
              Total Campus Load
            </span>
            <div className="font-['JetBrains_Mono'] text-lg font-bold text-amber-400 mt-0.5">
              19,670 kW
            </div>
            <span className="text-[10px] text-amber-300 flex items-center gap-0.5 font-['JetBrains_Mono']">
              <Zap className="w-3 h-3" /> 69% of peak cap
            </span>
          </div>
        </div>

        {/* Substation Cards */}
        <div className="flex flex-col gap-2.5">
          <span className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
            Primary Substation Nodes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {substations.map((sub, i) => (
              <div
                key={sub.name}
                className="bg-[#262a33] p-3.5 rounded-xl border border-[#31353e]/70 flex flex-col gap-2 text-xs font-['JetBrains_Mono']"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['Space_Grotesk'] font-semibold text-[#dfe2ee]">
                    {sub.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    sub.status === 'High Load'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-[#56e5a9]/20 text-[#56e5a9]'
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <div className="flex justify-between text-[#d8c3ad]/80 pt-1 border-t border-[#31353e]/60">
                  <span>Rating: {sub.voltage}</span>
                  <span className="text-white font-semibold">{sub.load} / {sub.capacity}</span>
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-[10px] text-[#d8c3ad]/60 uppercase">Primary Feeders:</span>
                  <div className="flex flex-wrap gap-1">
                    {sub.feeders.map((f) => (
                      <span key={f} className="px-1.5 py-0.5 bg-[#1c2028] text-[10px] rounded text-[#dfe2ee]/90">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] font-['JetBrains_Mono'] text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Grid Status
          </button>
        </div>
      </div>
    </div>
  );
};
