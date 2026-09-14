import React, { useState } from 'react';
import { ScreenType, DiagnosticResult } from '../../types';
import { MOCK_DIAGNOSTIC } from '../../data/mockData';

interface DiagnosticsViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const DiagnosticsView: React.FC<DiagnosticsViewProps> = ({ onNavigate }) => {
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult>(MOCK_DIAGNOSTIC);
  const [selectedDay, setSelectedDay] = useState<number>(3); // Day 3 current
  const [downloadingPdf, setDownloadingPdf] = useState<boolean>(false);

  const handleToggleTask = (dayNumber: number, taskIdx: number) => {
    // Interactive checklist toggle
    setDiagnostic((prev) => {
      const updatedDays = prev.sprintDays.map((d) => {
        if (d.day === dayNumber) {
          // If toggled
          return { ...d, completed: !d.completed };
        }
        return d;
      });
      return { ...prev, sprintDays: updatedDays };
    });
  };

  const handleExportPdf = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      alert('Diagnostic Evaluation PDF downloaded successfully (#INT-9042-Google-Report.pdf)');
    }, 900);
  };

  const activeSprintDay = diagnostic.sprintDays.find((d) => d.day === selectedDay) || diagnostic.sprintDays[2];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Diagnostic Verdict Header */}
      <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#7d4ce7] flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined text-3xl">fact_check</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-white">Post-Interview Diagnostics & Plan</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                {diagnostic.verdict} (86/100)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2563eb]/20 text-[#b4c5ff] font-semibold border border-[#2563eb]/30">
                Top 6% Cohort
              </span>
            </div>
            <p className="text-xs text-[#8d90a0] mt-1">
              Candidate: <span className="text-white font-medium">Ranjithan S.</span> · Evaluated against <span className="text-white font-medium">{diagnostic.targetCompany}</span> SDE-1 Rubric · Session #{diagnostic.sessionId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPdf}
            disabled={downloadingPdf}
            className="px-4 py-2.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-[#222a3d] text-xs font-semibold text-white flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-sm text-[#b4c5ff]">
              {downloadingPdf ? 'hourglass_top' : 'download'}
            </span>
            <span>{downloadingPdf ? 'Generating PDF...' : 'Export Diagnostic PDF'}</span>
          </button>
          <button
            onClick={() => onNavigate('interview')}
            className="px-5 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-xs font-bold text-white shadow-md flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-sm">replay</span>
            <span>Retake Simulation</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Dimension Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            name: 'Technical Accuracy',
            score: diagnostic.metrics.technicalAccuracy,
            status: 'Strong Hire Tier',
            color: 'text-emerald-400',
            bg: 'bg-emerald-500'
          },
          {
            name: 'Code Modularity',
            score: diagnostic.metrics.codeModularity,
            status: 'Hire Tier',
            color: 'text-[#b4c5ff]',
            bg: 'bg-blue-500'
          },
          {
            name: 'Communication Clarity',
            score: diagnostic.metrics.communicationClarity,
            status: 'Strong Hire Tier',
            color: 'text-purple-400',
            bg: 'bg-purple-500'
          },
          {
            name: 'Edge Case Resilience',
            score: diagnostic.metrics.edgeCaseResilience,
            status: 'Action Required',
            color: 'text-amber-400',
            bg: 'bg-amber-500'
          },
        ].map((m, i) => (
          <div key={i} className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-4 shadow-sm">
            <div className="text-[10px] text-[#8d90a0] uppercase font-semibold">{m.name}</div>
            <div className="flex items-baseline justify-between mt-2 mb-2">
              <span className={`text-2xl font-black font-mono ${m.color}`}>{m.score}%</span>
              <span className="text-[10px] font-bold text-[#8d90a0]">{m.status}</span>
            </div>
            <div className="w-full bg-[#0b1326] h-1.5 rounded-full overflow-hidden">
              <div className={`${m.bg} h-full rounded-full`} style={{ width: `${m.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Breakdown: Left (Evaluations & Gaps) & Right (7-Day Sprint) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: What went well, critical areas, and Skill Gap Matrix (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Strengths & Weaknesses Panel */}
          <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md space-y-5">
            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <h3 className="text-xs font-bold uppercase tracking-wider">What You Did Well (Evaluator Highlights)</h3>
              </div>
              <div className="space-y-2">
                {diagnostic.strengths.map((str, idx) => (
                  <div key={idx} className="p-3 bg-[#0b1326] rounded-xl border border-emerald-500/20 text-xs text-[#dae2fd] leading-relaxed flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Areas */}
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <span className="material-symbols-outlined text-base">warning</span>
                <h3 className="text-xs font-bold uppercase tracking-wider">Critical Areas to Improve</h3>
              </div>
              <div className="space-y-2">
                {diagnostic.criticalAreas.map((crit, idx) => (
                  <div key={idx} className="p-3 bg-[#0b1326] rounded-xl border border-amber-500/20 text-xs text-[#dae2fd] leading-relaxed flex items-start gap-2">
                    <span className="text-amber-400 font-bold">⚠️</span>
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Automated Skill Gap Diagnostics Matrix */}
          <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Automated Skill Gap Matrix</h3>
                <p className="text-xs text-[#8d90a0]">Discrepancies compared to Google SDE-1 Offer Median.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#b4c5ff]">4 Topics Analyzed</span>
            </div>

            <div className="space-y-3">
              {diagnostic.skillGaps.map((gap, i) => (
                <div key={i} className="p-3.5 bg-[#0b1326] rounded-xl border border-[#222a3d] flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white">{gap.topic}</div>
                    <div className="text-[11px] text-[#8d90a0]">
                      Your Score: <span className="text-white font-mono">{gap.score}%</span> · Google Bar:{' '}
                      <span className="text-white font-mono">{gap.target}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold ${
                        gap.delta >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {gap.delta >= 0 ? `+${gap.delta}%` : `${gap.delta}%`}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        gap.status === 'Critical Gap'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : gap.status === 'Moderate Gap'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {gap.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Personalized Adaptive 7-Day Sprint (5 cols) */}
        <div className="lg:col-span-5 bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#222a3d] mb-4">
              <div>
                <span className="text-[10px] text-[#2563eb] uppercase font-bold tracking-wider">
                  Automated Curriculum
                </span>
                <h3 className="text-base font-bold text-white">Adaptive 7-Day Sprint</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                2/7 Days Done
              </span>
            </div>

            {/* Days Horizontal Tab Selector */}
            <div className="grid grid-cols-7 gap-1.5 mb-5">
              {diagnostic.sprintDays.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setSelectedDay(day.day)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    selectedDay === day.day
                      ? 'bg-[#2563eb] border-blue-500 text-white shadow-md'
                      : day.completed
                      ? 'bg-[#0b1326] border-emerald-500/30 text-emerald-400'
                      : 'bg-[#0b1326] border-[#222a3d] text-[#8d90a0] hover:text-white'
                  }`}
                >
                  <div className="text-[9px] uppercase font-semibold">D{day.day}</div>
                  <div className="text-xs font-bold mt-0.5">
                    {day.completed ? '✓' : `${day.day}`}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Sprint Day Plan */}
            <div className="bg-[#0b1326] rounded-2xl p-4 border border-[#222a3d] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#b4c5ff]">
                    DAY {activeSprintDay.day} · {activeSprintDay.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{activeSprintDay.title}</h4>
                </div>
                <span className="text-xs text-[#8d90a0] font-mono">{activeSprintDay.timeEstimate}</span>
              </div>

              {/* Task Checklist */}
              <div className="space-y-2 pt-2 border-t border-[#222a3d]">
                <div className="text-[10px] text-[#8d90a0] uppercase font-bold">Prescribed Tasks</div>
                {activeSprintDay.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleToggleTask(activeSprintDay.day, idx)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#131b2e] cursor-pointer text-xs transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={activeSprintDay.completed}
                      onChange={() => {}}
                      className="mt-0.5 accent-[#2563eb] cursor-pointer"
                    />
                    <span className={activeSprintDay.completed ? 'line-through text-[#8d90a0]' : 'text-[#dae2fd]'}>
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#222a3d] space-y-2">
            <button
              onClick={() => onNavigate('workspace')}
              className="w-full py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Start Day {activeSprintDay.day} Practice</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <p className="text-center text-[10px] text-[#8d90a0]">
              Completing this sprint will boost readiness score by ~7 points
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
