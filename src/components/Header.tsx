import React from 'react';
import { Zap, Sun, Moon, User } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#0f131c]/90 dark:bg-[#0f131c]/90 backdrop-blur-xl border-b border-[#262a33]/60 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="max-w-4xl mx-auto h-20 px-4 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-['Space_Grotesk'] text-base sm:text-lg font-semibold text-[#dfe2ee] truncate tracking-tight">
              Campus Energy Monitor
            </span>
            <span className="font-['Geist'] text-xs text-[#d8c3ad]/80 truncate">
              Consumption tracking across campus facilities
            </span>
          </div>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden xs:flex sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#56e5a9]/10 border border-[#56e5a9]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#56e5a9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#56e5a9]"></span>
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#56e5a9] uppercase tracking-wider">
              System active
            </span>
          </div>

          <button
            id="theme-toggle-btn"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-[#d8c3ad] hover:text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
            type="button"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-amber-300" />
            )}
          </button>

          <button
            id="profile-toggle-btn"
            aria-label="Operator profile"
            onClick={onOpenProfile}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500 hover:bg-amber-400 flex items-center justify-center text-[#472a00] font-semibold transition-all active:scale-95 shadow-sm"
            type="button"
          >
            <User className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};
