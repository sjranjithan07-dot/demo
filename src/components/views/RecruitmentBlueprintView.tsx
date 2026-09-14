import React, { useState } from 'react';
import { ScreenType, TargetCompanyId, PipelineStage } from '../../types';
import { TARGET_COMPANIES, GOOGLE_PIPELINE_STAGES } from '../../data/mockData';

interface RecruitmentBlueprintViewProps {
  onNavigate: (screen: ScreenType, companyId?: TargetCompanyId) => void;
  activeCompanyId: TargetCompanyId;
  onSelectCompany: (companyId: TargetCompanyId) => void;
}

export const RecruitmentBlueprintView: React.FC<RecruitmentBlueprintViewProps> = ({
  onNavigate,
  activeCompanyId,
  onSelectCompany,
}) => {
  const activeCompany = TARGET_COMPANIES.find((c) => c.id === activeCompanyId) || TARGET_COMPANIES[0];
  const [activeTab, setActiveTab] = useState<'blueprint' | 'rounds' | 'questions' | 'insights' | 'plan'>('blueprint');
  const [selectedStageId, setSelectedStageId] = useState<number>(3); // Default to Stage 3 (Tech Round 1)

  const selectedStage = GOOGLE_PIPELINE_STAGES.find((s) => s.id === selectedStageId) || GOOGLE_PIPELINE_STAGES[2];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Company Selector Header */}
      <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0b1326] border border-[#222a3d] p-2 flex items-center justify-center shrink-0">
            <img src={activeCompany.logo} alt={activeCompany.name} className="w-full h-full object-cover rounded-xl" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-white">{activeCompany.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2563eb]/20 text-[#b4c5ff] font-semibold border border-[#2563eb]/30">
                {activeCompany.tier}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                {activeCompany.packageRange}
              </span>
            </div>
            <p className="text-xs text-[#8d90a0] mt-1">
              Role: <span className="text-white font-medium">{activeCompany.role}</span> · Target Drive Date: Oct 14, 2024 ({activeCompany.oaDaysLeft} days remaining)
            </p>
          </div>
        </div>

        {/* Readiness Metric Pill & Quick Switcher */}
        <div className="flex items-center gap-4 bg-[#0b1326] p-3 rounded-2xl border border-[#222a3d]">
          <div className="text-right">
            <div className="text-[10px] text-[#8d90a0] uppercase font-bold tracking-wider">Your Readiness</div>
            <div className="text-2xl font-black font-mono text-white flex items-center gap-1.5 justify-end">
              <span className={activeCompany.readinessScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
                {activeCompany.readinessScore}
              </span>
              <span className="text-xs text-[#8d90a0] font-normal">/ 100</span>
            </div>
          </div>
          <div className="h-9 w-px bg-[#222a3d]" />
          <div>
            <label className="text-[10px] text-[#8d90a0] uppercase font-semibold block mb-1">
              Switch Target
            </label>
            <select
              value={activeCompanyId}
              onChange={(e) => onSelectCompany(e.target.value as TargetCompanyId)}
              className="bg-[#131b2e] border border-[#222a3d] text-xs font-semibold text-white rounded-lg px-2.5 py-1 outline-none cursor-pointer"
            >
              {TARGET_COMPANIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.readinessScore}%)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-[#222a3d] gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'blueprint', label: 'Recruitment Blueprint', count: undefined },
          { id: 'rounds', label: 'Round Details & Rubrics', count: '6 Stages' },
          { id: 'questions', label: 'Question Bank', count: '142 Qs' },
          { id: 'insights', label: 'Company Insights', count: undefined },
          { id: 'plan', label: 'Adaptive Preparation Plan', count: 'Active' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#2563eb] text-white shadow-md'
                : 'text-[#8d90a0] hover:text-white hover:bg-[#131b2e]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#222a3d] text-[#b4c5ff]'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* End-to-End Pipeline Funnel */}
      <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">End-to-End Recruitment Pipeline Funnel</h2>
            <p className="text-xs text-[#8d90a0]">Click any stage to inspect specific evaluation criteria and launch practice.</p>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            2 Stages Cleared
          </span>
        </div>

        {/* Funnel Stages List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {GOOGLE_PIPELINE_STAGES.map((stage) => {
            const isSelected = selectedStageId === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#2563eb]/20 border-blue-500 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500'
                    : stage.status === 'passed'
                    ? 'bg-[#0b1326] border-emerald-500/40 text-emerald-400'
                    : stage.status === 'active'
                    ? 'bg-[#0b1326] border-blue-500/50'
                    : 'bg-[#060e20]/60 border-[#222a3d] opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#8d90a0]">Stage 0{stage.id}</span>
                    {stage.status === 'passed' && (
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                    {stage.status === 'active' && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-blue-500 text-white">
                        Target
                      </span>
                    )}
                    {stage.status === 'locked' && (
                      <span className="material-symbols-outlined text-xs text-[#8d90a0]">lock</span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-white mb-1 line-clamp-2">{stage.shortName}</div>
                </div>

                <div className="pt-2 mt-2 border-t border-[#222a3d]/80 flex justify-between text-[11px]">
                  <span className="text-[#8d90a0]">Score:</span>
                  <span className="font-mono font-bold text-white">{stage.score ? `${stage.score}%` : 'Pending'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Inspection for Selected Stage */}
        <div className="mt-6 pt-6 border-t border-[#222a3d] bg-[#0b1326] rounded-2xl p-5 border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#2563eb]">STAGE {selectedStage.id}</span>
                <h3 className="text-lg font-bold text-white">{selectedStage.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-[#171f33] text-[#dae2fd] border border-[#222a3d]">
                  {selectedStage.duration}
                </span>
              </div>
              <p className="text-xs text-[#8d90a0] mt-1">{selectedStage.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('workspace')}
                className="px-4 py-2 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-[#222a3d] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-sm text-[#b4c5ff]">terminal</span>
                <span>Practice Google PYQs (58)</span>
              </button>
              <button
                onClick={() => onNavigate('interview')}
                className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                <span>Launch Simulated Tech Round 1</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#131b2e] p-3 rounded-xl border border-[#222a3d]">
              <div className="text-[10px] text-[#8d90a0] uppercase font-semibold">Evaluation Format</div>
              <div className="text-xs font-semibold text-white mt-1">{selectedStage.format}</div>
            </div>
            <div className="bg-[#131b2e] p-3 rounded-xl border border-[#222a3d]">
              <div className="text-[10px] text-[#8d90a0] uppercase font-semibold">Key Competencies</div>
              <div className="text-xs font-semibold text-[#b4c5ff] mt-1">{selectedStage.focusAreas?.join(', ')}</div>
            </div>
            <div className="bg-[#131b2e] p-3 rounded-xl border border-[#222a3d]">
              <div className="text-[10px] text-[#8d90a0] uppercase font-semibold">Historical Pass Rate</div>
              <div className="text-xs font-semibold text-emerald-400 mt-1">28.4% of Shortlisted Candidates</div>
            </div>
            <div className="bg-[#131b2e] p-3 rounded-xl border border-[#222a3d]">
              <div className="text-[10px] text-[#8d90a0] uppercase font-semibold">Recommended Cadence</div>
              <div className="text-xs font-semibold text-amber-400 mt-1">3 Live Coding Mocks Required</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Frequency Blueprint & Rubric Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Frequency Blueprint by Data Structure (6 cols) */}
        <div className="lg:col-span-6 bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Google Frequency Blueprint by Data Structure</h3>
              <p className="text-xs text-[#8d90a0]">Derived from 180+ verified Google campus interviews (2022-2024).</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#b4c5ff]">100% Calibrated</span>
          </div>

          <div className="space-y-4 py-2">
            {[
              { topic: 'Trees, Graphs & Topological Sort', freq: 34, color: 'bg-blue-500' },
              { topic: 'Dynamic Programming (Grid & Tree DP)', freq: 28, color: 'bg-purple-500' },
              { topic: 'Arrays, Sliding Window & Two Pointers', freq: 22, color: 'bg-emerald-500' },
              { topic: 'Trie, Disjoint Set Union (DSU) & Bitwise', freq: 16, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">{item.topic}</span>
                  <span className="font-mono text-[#b4c5ff]">{item.freq}% Frequency</span>
                </div>
                <div className="w-full bg-[#0b1326] h-2.5 rounded-full overflow-hidden border border-[#222a3d]">
                  <div className={`${item.color} h-full rounded-full transition-all`} style={{ width: `${item.freq}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#222a3d] flex items-center justify-between text-xs text-[#8d90a0]">
            <span>Highest weight: Trees & Graphs</span>
            <button
              onClick={() => onNavigate('workspace')}
              className="text-[#b4c5ff] hover:text-white font-semibold flex items-center gap-1"
            >
              <span>Solve Most Frequent Problems</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Google Evaluation Rubric (6 cols) */}
        <div className="lg:col-span-6 bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Google Formal Evaluation Rubric</h3>
              <p className="text-xs text-[#8d90a0]">Official dimensions scored by Google hiring committees.</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Active Weights
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Algorithms & Computational Complexity',
                weight: '35% Weight',
                desc: 'Optimal asymptotic complexity proof, memory trade-offs, and invariants.',
                grade: 'Strong (88%)'
              },
              {
                title: 'Coding Craftsmanship & Cleanliness',
                weight: '30% Weight',
                desc: 'Idiomatic syntax, modular helpers, boundary defenses, and zero globals.',
                grade: 'Solid (82%)'
              },
              {
                title: 'Problem Solving & Socratic Inquiry',
                weight: '20% Weight',
                desc: 'Asking clarifying questions, responding to hints, avoiding premature code.',
                grade: 'Needs Attention (68%)'
              },
              {
                title: 'Technical Articulation & Communication',
                weight: '15% Weight',
                desc: 'Talking through decisions while coding, active eye contact, structured answers.',
                grade: 'Good (79%)'
              },
            ].map((r, i) => (
              <div key={i} className="p-3 bg-[#0b1326] rounded-xl border border-[#222a3d] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{r.title}</h4>
                    <span className="text-[10px] font-mono text-[#8d90a0] bg-[#171f33] px-1.5 py-0.2 rounded">
                      {r.weight}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8d90a0] mt-0.5">{r.desc}</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#b4c5ff] shrink-0 ml-2">
                  {r.grade}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
