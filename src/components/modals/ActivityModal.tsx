import React from 'react';
import { X, Activity, Clock, ShieldCheck, Terminal } from 'lucide-react';
import { ActivityLog } from '../../types';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: ActivityLog[];
}

export const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1c2028] border border-[#31353e] rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-[#dfe2ee]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#56e5a9]/20 border border-[#56e5a9]/30 flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#56e5a9]" />
            </div>
            <div>
              <h3 id="activity-modal-title" className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
                Telemetry Activity Audit Stream
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                DSA execution traces & live operational telemetry events
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

        {/* Stream */}
        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-[#262a33] border border-[#31353e]/60 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-['JetBrains_Mono'] text-xs"
            >
              <div className="flex items-start gap-2.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-[#dfe2ee]">{log.action}</div>
                  <div className="text-[11px] text-[#d8c3ad]/70 mt-0.5">{log.details}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {log.complexity && (
                  <span className="px-2 py-0.5 rounded bg-[#1c2028] text-[10px] text-[#4fdbc8] border border-[#31353e]">
                    {log.complexity}
                  </span>
                )}
                <span className="text-[10px] text-[#d8c3ad]/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {log.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] font-['JetBrains_Mono'] text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Stream
          </button>
        </div>
      </div>
    </div>
  );
};
