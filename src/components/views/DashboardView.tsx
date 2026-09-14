import React from 'react';
import { ScreenType, TargetCompanyId } from '../../types';
import { TARGET_COMPANIES } from '../../data/mockData';

interface DashboardViewProps {
  onNavigate: (screen: ScreenType, companyId?: TargetCompanyId) => void;
  activeCompanyId: TargetCompanyId;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  activeCompanyId,
}) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#131b2e] to-[#171f33] border border-[#222a3d] p-6 rounded-3xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black tracking-tight text-white">
              Good morning, Ranjithan 👋
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Sprint Active
            </span>
          </div>
          <p className="text-xs text-[#8d90a0]">
            Day 14 of 30 · Tier-1 Campus Placement Sprint · Target: Google SDE-1 & TCS Digital
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('interview')}
            className="px-4 py-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-[#222a3d] text-xs font-semibold text-white flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-sm text-[#b4c5ff]">smart_toy</span>
            <span>Simulate AI Mock</span>
          </button>
          <button
            onClick={() => onNavigate('workspace')}
            className="px-5 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-xs font-bold text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all group"
          >
            <span>Resume Daily Routine</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Main Grid: Readiness Index (Left) & Advisor + Priority Mission (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Readiness Index Hero Card (8 cols) */}
        <div className="lg:col-span-8 bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#222a3d]">
              <div>
                <div className="text-xs font-semibold text-[#8d90a0] uppercase tracking-wider">
                  Aggregated Campus Metric
                </div>
                <h2 className="text-lg font-bold text-white">Placement Readiness Index</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                  +4.2% this week
                </span>
                <span className="text-xs text-[#b4c5ff] font-medium bg-[#2563eb]/10 px-2 py-0.5 rounded-lg">
                  92nd Percentile
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6">
              {/* Circular Gauge */}
              <div className="md:col-span-4 flex flex-col items-center justify-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#222a3d]"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#2563eb]"
                      strokeDasharray="86, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white font-mono">86</span>
                    <span className="text-[10px] text-[#8d90a0] uppercase font-bold">/ 100 Score</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#8d90a0] mt-2">
                  Target Threshold: <span className="text-white font-semibold">85</span> (Met)
                </div>
              </div>

              {/* Competency Decomposition Bars */}
              <div className="md:col-span-8 space-y-3.5">
                {[
                  { name: 'Coding & Data Structures', score: 82, target: 80, color: 'bg-blue-500' },
                  { name: 'Aptitude & Quantitative', score: 91, target: 85, color: 'bg-emerald-500' },
                  { name: 'Core CS (OS, DBMS, Networks)', score: 84, target: 80, color: 'bg-indigo-500' },
                  { name: 'Technical Articulation & Comms', score: 79, target: 85, color: 'bg-amber-500' },
                  { name: 'Mock Interview Room Performance', score: 74, target: 85, color: 'bg-purple-500' },
                ].map((comp, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#dae2fd]">{comp.name}</span>
                      <span className="font-mono font-bold text-white">{comp.score}%</span>
                    </div>
                    <div className="w-full bg-[#0b1326] h-2 rounded-full overflow-hidden border border-[#222a3d]">
                      <div
                        className={`${comp.color} h-full rounded-full transition-all`}
                        style={{ width: `${comp.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#222a3d] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8d90a0]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Calculated across 42 practice assessments and 3 live AI interview rooms</span>
            </div>
            <button
              onClick={() => onNavigate('diagnostics')}
              className="text-[#b4c5ff] hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View Full Diagnostic Breakdown</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Advisor & Priority Mission (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Daily PlacementAI Advisor */}
          <div className="bg-gradient-to-br from-[#131b2e] to-[#1a1c3d] border border-[#2563eb]/40 rounded-3xl p-5 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2 text-[#b4c5ff] mb-2">
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-wider">PlacementAI Advisor</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-2">
              Google Round 1 Intelligence Alert
            </h3>
            <p className="text-xs text-[#c3c6d7] leading-relaxed mb-4">
              Graph cycle detection and string sliding window questions have increased by 34% in recent 2024 campus interview reports.
            </p>
            <div className="bg-[#0b1326]/80 rounded-xl p-3 border border-[#222a3d] mb-4 text-xs">
              <div className="text-[#8d90a0] text-[10px] uppercase font-semibold">Recommended Focus</div>
              <div className="text-white font-semibold mt-0.5">Solve #142 (K-Distinct) & Kahn's Topological Sort</div>
            </div>
            <button
              onClick={() => onNavigate('workspace')}
              className="w-full py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Start Targeted Practice</span>
              <span className="material-symbols-outlined text-sm">code</span>
            </button>
          </div>

          {/* Priority Mission Card */}
          <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#8d90a0] uppercase tracking-wider">
                Daily Mission
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                2 Questions Left
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">TCS Advanced Coding Round</h4>
            <p className="text-xs text-[#8d90a0] mb-3">3 of 5 daily benchmark tasks completed.</p>
            <div className="w-full bg-[#0b1326] h-2 rounded-full overflow-hidden mb-4 border border-[#222a3d]">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: '60%' }} />
            </div>
            <button
              onClick={() => onNavigate('workspace')}
              className="w-full py-2 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-[#222a3d] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue Mission</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Companies Readiness Matrix */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Target Companies Readiness Matrix</h2>
            <p className="text-xs text-[#8d90a0]">
              Calibrated against hiring criteria, cutoffs, and historical campus drive papers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('blueprint', 'google')}
            className="text-xs font-semibold text-[#b4c5ff] hover:text-white flex items-center gap-1"
          >
            <span>Explore Blueprints</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TARGET_COMPANIES.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onNavigate('blueprint', comp.id)}
              className="bg-[#131b2e] border border-[#222a3d] hover:border-[#434655] rounded-2xl p-4 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#222a3d] overflow-hidden p-1 flex items-center justify-center">
                    <img src={comp.logo} alt={comp.name} className="w-full h-full object-cover rounded" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-[#b4c5ff] transition-colors">
                      {comp.name}
                    </h3>
                    <span className="text-[10px] text-[#8d90a0]">{comp.packageRange}</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-white bg-[#0b1326] px-2 py-1 rounded-lg border border-[#222a3d]">
                  {comp.readinessScore}%
                </span>
              </div>

              <div className="w-full bg-[#0b1326] h-1.5 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all ${
                    comp.readinessScore >= 80 ? 'bg-emerald-400' : 'bg-[#2563eb]'
                  }`}
                  style={{ width: `${comp.readinessScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#8d90a0]">{comp.oaDaysLeft}d to Assessment</span>
                <span
                  className={`font-semibold ${
                    comp.readinessScore >= 80 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {comp.readinessScore >= 80 ? 'Ready' : 'In Prep'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Weekly Cadence Heatmap & Accolades */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Cadence (7 cols) */}
        <div className="lg:col-span-7 bg-[#131b2e] border border-[#222a3d] rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2563eb]">calendar_today</span>
              <span>Weekly Cadence & Consistency Streak</span>
            </h3>
            <span className="text-xs font-mono font-bold text-amber-400">7-Day Streak Active</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[
              { day: 'Mon', problems: 4, hours: 2.5, completed: true },
              { day: 'Tue', problems: 5, hours: 3.1, completed: true },
              { day: 'Wed', problems: 3, hours: 1.8, completed: true },
              { day: 'Thu', problems: 6, hours: 3.5, completed: true },
              { day: 'Fri', problems: 4, hours: 2.2, completed: true },
              { day: 'Sat', problems: 8, hours: 4.8, completed: true },
              { day: 'Sun', problems: 5, hours: 3.0, completed: true, today: true },
            ].map((d, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  d.today
                    ? 'bg-[#2563eb]/20 border-blue-500 text-white'
                    : 'bg-[#0b1326] border-[#222a3d] text-[#dae2fd]'
                }`}
              >
                <div className="text-[10px] font-semibold uppercase text-[#8d90a0] mb-1">{d.day}</div>
                <div className="w-6 h-6 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center my-1">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <div className="text-[10px] font-mono text-[#b4c5ff]">{d.problems} qns</div>
              </div>
            ))}
          </div>
        </div>

        {/* Accolades & Badges (5 cols) */}
        <div className="lg:col-span-5 bg-[#131b2e] border border-[#222a3d] rounded-3xl p-5">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400">military_tech</span>
            <span>Career Milestones & Accolades</span>
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0b1326] border border-[#222a3d]">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-base">emoji_events</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Sliding Window Master</div>
                <div className="text-[10px] text-[#8d90a0]">Cleared 15 Google-tier string substring problems</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0b1326] border border-[#222a3d]">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-[#b4c5ff] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-base">record_voice_over</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Mock Interview Veteran</div>
                <div className="text-[10px] text-[#8d90a0]">Maintained &gt;90% eye contact and 138 WPM pace</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
