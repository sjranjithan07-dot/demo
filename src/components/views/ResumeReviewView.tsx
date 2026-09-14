import React, { useState } from 'react';
import { ScreenType } from '../../types';

interface ResumeReviewViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ResumeReviewView: React.FC<ResumeReviewViewProps> = ({ onNavigate }) => {
  const [atsScore, setAtsScore] = useState<number>(88);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Google ATS Resume Matcher & Scanner</h1>
          <p className="text-xs text-[#8d90a0] mt-1">
            Analyzing resume `Ranjithan_S_SWE_Resume.pdf` against Google Software Engineer - Campus parser.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-bold">
            ATS Match: 88/100 (Passed Stage 1)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Google X-Y-Z Impact Metric Analysis</h3>
          <p className="text-xs text-[#8d90a0]">
            Google hiring managers favor bullets structured as: "Accomplished [X] as measured by [Y], by doing [Z]".
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 bg-[#0b1326] rounded-xl border border-emerald-500/30 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <span>✓ Verified Google Format</span>
                <span className="text-[10px] text-[#8d90a0] font-normal font-mono">(Project 1)</span>
              </div>
              <p className="text-[#dae2fd]">
                "Reduced P99 API latency by 42% (measured via Prometheus) by implementing Redis read-through caching and connection pooling in Go."
              </p>
            </div>

            <div className="p-3.5 bg-[#0b1326] rounded-xl border border-amber-500/30 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                <span>⚠️ Missing Quantitative Metric</span>
                <span className="text-[10px] text-[#8d90a0] font-normal font-mono">(Project 2)</span>
              </div>
              <p className="text-[#dae2fd]">
                "Built an image classification pipeline using PyTorch and deployed it to cloud container."
              </p>
              <p className="text-[11px] text-[#8d90a0] mt-1 italic">
                Recommendation: Add test accuracy (e.g. "achieving 94.6% F1-score across 50,000 images").
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Keyword Density Match</h3>
          <div className="space-y-2 text-xs">
            {[
              { skill: 'Data Structures & Algorithms', match: true },
              { skill: 'Distributed Systems & Microservices', match: true },
              { skill: 'Concurrency & Multi-Threading', match: true },
              { skill: 'Graph Algorithms & Trees', match: true },
              { skill: 'Kubernetes / Cloud Deployments', match: false },
            ].map((k, idx) => (
              <div key={idx} className="p-2.5 bg-[#0b1326] rounded-xl border border-[#222a3d] flex items-center justify-between">
                <span className="text-white">{k.skill}</span>
                {k.match ? (
                  <span className="text-emerald-400 font-bold text-[11px]">Matched</span>
                ) : (
                  <span className="text-amber-400 font-bold text-[11px]">Missing</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
