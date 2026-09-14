import React, { useState } from 'react';
import { ScreenType, TargetCompanyId } from '../types';
import { TARGET_COMPANIES } from '../data/mockData';

interface HeaderProps {
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  activeCompanyId: TargetCompanyId;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onSelectScreen,
  activeCompanyId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeCompany = TARGET_COMPANIES.find((c) => c.id === activeCompanyId) || TARGET_COMPANIES[0];

  const screensList: { id: ScreenType; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'blueprint', label: 'Blueprint' },
    { id: 'workspace', label: 'Code IDE' },
    { id: 'interview', label: 'Mock Interview' },
    { id: 'diagnostics', label: 'Diagnostics' },
  ];

  return (
    <header className="h-14 bg-[#0b1326]/90 backdrop-blur-md border-b border-[#222a3d] px-5 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Quick Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8d90a0]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchModal(true)}
            placeholder="Search blueprints, questions, core CS topics (e.g. 'Google DP')..."
            className="w-full bg-[#131b2e] border border-[#222a3d] focus:border-[#2563eb] rounded-xl pl-9 pr-12 py-1.5 text-xs text-[#dae2fd] placeholder:text-[#8d90a0] outline-none transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#8d90a0] bg-[#171f33] px-1.5 py-0.5 rounded border border-[#222a3d]">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Center: Quick Screen Jump Chips */}
      <div className="hidden lg:flex items-center gap-1 bg-[#131b2e] p-1 rounded-xl border border-[#222a3d]">
        {screensList.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectScreen(item.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeScreen === item.id
                ? 'bg-[#2563eb] text-white shadow-sm'
                : 'text-[#8d90a0] hover:text-white hover:bg-[#171f33]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: Telemetry status, AI Coach indicator & Notifications */}
      <div className="flex items-center gap-3">
        {/* Active Readiness Chip */}
        <div 
          onClick={() => onSelectScreen('blueprint')}
          className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-[#131b2e] border border-[#222a3d] cursor-pointer hover:border-[#434655] transition-colors"
        >
          <span className="text-[11px] text-[#8d90a0] font-medium">Focus:</span>
          <span className="text-xs font-bold text-white">{activeCompany.name}</span>
          <span className="text-xs font-mono font-bold text-[#b4c5ff] bg-[#2563eb]/20 px-1.5 py-0.2 rounded">
            {activeCompany.readinessScore}%
          </span>
        </div>

        {/* AI Coach Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px]">Nova-6 Coach Active</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 rounded-xl bg-[#131b2e] hover:bg-[#171f33] border border-[#222a3d] flex items-center justify-center text-[#8d90a0] hover:text-white transition-colors relative"
          >
            <span className="material-symbols-outlined text-lg">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2563eb]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#171f33] border border-[#2d3449] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#222a3d]">
                <span className="text-xs font-bold text-white">Live Readiness Alerts</span>
                <span className="text-[10px] text-[#b4c5ff] cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="py-2 space-y-2">
                <div className="p-2 bg-[#131b2e] rounded-xl border border-[#222a3d] text-xs">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Google OA Approaching (18d)
                  </div>
                  <p className="text-[11px] text-[#8d90a0] mt-0.5">
                    Graph traversal questions spiked 34% in recent drives. Recommended 2 Medium drills.
                  </p>
                </div>
                <div className="p-2 bg-[#131b2e] rounded-xl border border-[#222a3d] text-xs">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    TCS Digital Benchmark Cleared
                  </div>
                  <p className="text-[11px] text-[#8d90a0] mt-0.5">
                    Your readiness score reached 94%. Candidate qualified for Prime interview pool.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
