import React from 'react';
import { X, User, Shield, Terminal, Clock, CheckCircle2 } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#1c2028] border border-[#31353e] rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-[#dfe2ee]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <User className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 id="profile-modal-title" className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
                Operator Console Profile
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                Grid Dispatcher Authentication
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

        {/* User Card */}
        <div className="flex items-center gap-3 p-3 bg-[#262a33] rounded-lg border border-[#31353e]/60">
          <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-[#472a00] font-bold text-lg">
            OP
          </div>
          <div>
            <div className="font-['Space_Grotesk'] font-semibold text-base text-[#dfe2ee]">
              Lead Energy Dispatcher
            </div>
            <div className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/80">
              Campus Facilities & Infrastructure
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#56e5a9] font-['JetBrains_Mono'] mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> Level 4 SCADA Clearance
            </div>
          </div>
        </div>

        {/* Credentials and session metadata */}
        <div className="flex flex-col gap-2 font-['JetBrains_Mono'] text-xs">
          <div className="p-3 bg-[#262a33] rounded-lg border border-[#31353e]/60 flex justify-between">
            <span className="text-[#d8c3ad]/70">Console Node:</span>
            <span className="text-white font-semibold">OPS-SUBSTATION-01</span>
          </div>
          <div className="p-3 bg-[#262a33] rounded-lg border border-[#31353e]/60 flex justify-between">
            <span className="text-[#d8c3ad]/70">Algorithms Engine:</span>
            <span className="text-amber-400 font-semibold">DSA Stack / Merge Sort / Min-Heap</span>
          </div>
          <div className="p-3 bg-[#262a33] rounded-lg border border-[#31353e]/60 flex justify-between">
            <span className="text-[#d8c3ad]/70">Session Active:</span>
            <span className="text-[#56e5a9] font-semibold">4h 18m (Continuous sync)</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] font-['JetBrains_Mono'] text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
