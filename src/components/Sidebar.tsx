import React, { useState } from 'react';
import { ScreenType, TargetCompanyId } from '../types';
import { TARGET_COMPANIES } from '../data/mockData';

interface SidebarProps {
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  activeCompanyId: TargetCompanyId;
  onSelectCompany: (companyId: TargetCompanyId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onSelectScreen,
  activeCompanyId,
  onSelectCompany,
}) => {
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const activeCompany = TARGET_COMPANIES.find((c) => c.id === activeCompanyId) || TARGET_COMPANIES[0];

  const navItems: { id: ScreenType; label: string; icon: string; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'blueprint', label: 'Recruitment Blueprint', icon: 'account_tree', badge: 'Active' },
    { id: 'workspace', label: 'Practice Workspace', icon: 'code', badge: 'New' },
    { id: 'interview', label: 'AI Interview Room', icon: 'smart_toy', badge: 'Live', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'diagnostics', label: 'Diagnostics & Plan', icon: 'fact_check' },
    { id: 'analytics', label: 'Cohort Analytics', icon: 'insights' },
    { id: 'resume', label: 'ATS Resume Review', icon: 'description' },
  ];

  return (
    <aside className="w-64 bg-[#0b1326] border-r border-[#222a3d] flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="p-4 border-b border-[#222a3d]/80 flex items-center justify-between">
          <div 
            onClick={() => onSelectScreen('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#7d4ce7] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-[#b4c5ff] transition-colors">
                  PlacementAI
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#2563eb]/20 text-[#b4c5ff] border border-[#2563eb]/30">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-[#8d90a0] font-medium">Campus Career OS</p>
            </div>
          </div>
        </div>

        {/* Target Company Switcher Dropdown */}
        <div className="p-3 border-b border-[#222a3d]/60 relative">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-[#8d90a0] px-1 mb-1 block">
            Target Focus Blueprint
          </label>
          <button
            onClick={() => setShowCompanyMenu(!showCompanyMenu)}
            className="w-full text-left bg-[#131b2e] hover:bg-[#171f33] border border-[#222a3d] hover:border-[#434655] rounded-xl p-2.5 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#222a3d] overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={activeCompany.logo}
                  alt={activeCompany.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initial
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate flex items-center gap-1.5">
                  {activeCompany.name}
                  <span className={`w-1.5 h-1.5 rounded-full ${activeCompany.readinessScore >= 80 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                </div>
                <div className="text-[10px] text-[#8d90a0] truncate">
                  Readiness: <span className="text-[#b4c5ff] font-semibold">{activeCompany.readinessScore}%</span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-[#8d90a0] group-hover:text-white transition-colors">
              unfold_more
            </span>
          </button>

          {/* Company Selector Menu */}
          {showCompanyMenu && (
            <div className="absolute top-full left-3 right-3 mt-1 bg-[#171f33] border border-[#2d3449] rounded-xl shadow-2xl p-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="text-[10px] font-semibold text-[#8d90a0] px-2.5 py-1 uppercase">Switch Company Target</div>
              {TARGET_COMPANIES.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => {
                    onSelectCompany(comp.id);
                    setShowCompanyMenu(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    comp.id === activeCompanyId
                      ? 'bg-[#2563eb]/20 text-[#b4c5ff] font-semibold'
                      : 'text-[#dae2fd] hover:bg-[#222a3d]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{comp.name}</span>
                    <span className="text-[10px] text-[#8d90a0]">({comp.oaDaysLeft}d to OA)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#b4c5ff]">{comp.readinessScore}%</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-2 space-y-0.5 mt-1">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-md shadow-blue-600/20 font-semibold'
                    : 'text-[#8d90a0] hover:text-white hover:bg-[#131b2e]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-lg transition-colors ${
                      isActive ? 'text-white' : 'text-[#8d90a0] group-hover:text-white'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                      item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-[#222a3d] text-[#b4c5ff]')
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-3 space-y-2 border-t border-[#222a3d]/80">
        {/* Toggle to Landing Page */}
        <button
          onClick={() => onSelectScreen('landing')}
          className="w-full py-2 px-2.5 rounded-xl bg-[#131b2e] hover:bg-[#171f33] border border-[#222a3d] text-[#dae2fd] text-xs font-medium flex items-center justify-between group transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#8d90a0] group-hover:text-[#b4c5ff]">
              public
            </span>
            <span>Product Landing Page</span>
          </div>
          <span className="material-symbols-outlined text-xs text-[#8d90a0] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </button>

        {/* 7-Day Streak Card */}
        <div className="bg-gradient-to-br from-[#131b2e] to-[#171f33] border border-[#222a3d] rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <span className="material-symbols-outlined text-lg">local_fire_department</span>
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                7-Day Streak
                <span className="text-[10px] font-medium text-emerald-400">Top 4%</span>
              </div>
              <p className="text-[10px] text-[#8d90a0]">12,450 XP Earned</p>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#060e20] border border-[#222a3d]/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563eb] to-[#d0bcff] p-0.5 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Ranjithan S.</div>
              <div className="text-[10px] text-[#8d90a0] truncate">MIT Anna Univ · '25</div>
            </div>
          </div>
          <button 
            title="Account Settings"
            onClick={() => onSelectScreen('analytics')}
            className="p-1 text-[#8d90a0] hover:text-white rounded-lg hover:bg-[#131b2e] transition-colors"
          >
            <span className="material-symbols-outlined text-base">settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
