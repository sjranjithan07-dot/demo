import React from 'react';
import { ScreenType } from '../../types';

interface AnalyticsViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Campus Cohort Analytics & Percentiles</h1>
          <p className="text-xs text-[#8d90a0] mt-1">
            Comparing your performance against 480 candidates across Anna University, IITs, and NITs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 font-bold">
            Rank #14 in College Batch
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-5">
          <div className="text-xs font-bold text-[#8d90a0] uppercase">Batch Percentile</div>
          <div className="text-3xl font-black font-mono text-white mt-2">94.2%</div>
          <p className="text-xs text-emerald-400 mt-1">Top 6% across all Tier-1 drives</p>
        </div>
        <div className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-5">
          <div className="text-xs font-bold text-[#8d90a0] uppercase">Problem Velocity</div>
          <div className="text-3xl font-black font-mono text-[#b4c5ff] mt-2">4.8 / day</div>
          <p className="text-xs text-[#8d90a0] mt-1">Campus median: 2.1 / day</p>
        </div>
        <div className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-5">
          <div className="text-xs font-bold text-[#8d90a0] uppercase">Offer Probability</div>
          <div className="text-3xl font-black font-mono text-purple-400 mt-2">87.5%</div>
          <p className="text-xs text-[#8d90a0] mt-1">Google & TCS composite</p>
        </div>
      </div>

      <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6">
        <h3 className="text-base font-bold text-white mb-4">Competency Progression (Last 30 Days)</h3>
        <div className="h-48 flex items-end gap-3 pt-6 border-b border-[#222a3d]">
          {[52, 58, 63, 67, 72, 75, 78, 81, 84, 86].map((score, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-mono text-[#8d90a0] opacity-0 group-hover:opacity-100 transition-opacity">
                {score}%
              </span>
              <div
                className="w-full bg-gradient-to-t from-[#2563eb] to-[#7d4ce7] rounded-t-lg transition-all"
                style={{ height: `${(score / 100) * 160}px` }}
              />
              <span className="text-[10px] text-[#8d90a0]">D{idx * 3 + 1}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-xs text-[#8d90a0] mt-3">
          <span>Sprint Day 1 (52%)</span>
          <span className="text-white font-bold">Sprint Day 30 Target (90%+)</span>
        </div>
      </div>
    </div>
  );
};
