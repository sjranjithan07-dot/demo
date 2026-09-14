import React, { useState } from 'react';
import { ScreenType, TargetCompanyId } from '../../types';
import { TARGET_COMPANIES } from '../../data/mockData';

interface LandingViewProps {
  onEnterApp: (screen?: ScreenType, companyId?: TargetCompanyId) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onEnterApp }) => {
  const [selectedSimRole, setSelectedSimRole] = useState<'google' | 'tcs' | 'amazon'>('google');
  const [cgpa, setCgpa] = useState<number>(8.7);
  const [dsaScore, setDsaScore] = useState<number>(420);

  // Simulated prediction calculation
  const getSimulatedProbability = () => {
    let base = 60;
    if (selectedSimRole === 'google') base = Math.min(96, Math.round((dsaScore / 600) * 60 + (cgpa / 10) * 35));
    if (selectedSimRole === 'tcs') base = Math.min(99, Math.round((dsaScore / 500) * 50 + (cgpa / 10) * 48));
    if (selectedSimRole === 'amazon') base = Math.min(95, Math.round((dsaScore / 550) * 55 + (cgpa / 10) * 40));
    return base;
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] flex flex-col font-sans selection:bg-[#2563eb] selection:text-white">
      {/* Landing Navigation */}
      <nav className="w-full border-b border-[#222a3d] bg-[#0b1326]/80 backdrop-blur-lg sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#7d4ce7] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/30">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">PlacementAI</span>
              <span className="ml-2 text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#2563eb]/20 text-[#b4c5ff] border border-[#2563eb]/30">
                CAMPUS OS
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#c3c6d7]">
            <a href="#blueprints" className="hover:text-white transition-colors">Target Blueprints</a>
            <a href="#flywheel" className="hover:text-white transition-colors">The 5-Step Engine</a>
            <a href="#simulator" className="hover:text-white transition-colors">Readiness Simulator</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Candidate Stories</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEnterApp('dashboard')}
              className="px-4 py-2 text-xs font-semibold text-[#dae2fd] hover:text-white rounded-xl hover:bg-[#131b2e] transition-colors border border-transparent hover:border-[#222a3d]"
            >
              Log In
            </button>
            <button
              onClick={() => onEnterApp('dashboard')}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#3626ce] hover:from-[#1d4ed8] hover:to-[#2e1ebd] text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-1.5 group"
            >
              <span>Launch Platform</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 overflow-hidden border-b border-[#222a3d]">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#2563eb]/20 to-[#7d4ce7]/15 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131b2e] border border-[#222a3d] text-xs font-semibold text-[#b4c5ff] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            2024-2025 Tier-1 Campus Hiring Blueprints Now Live
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Placement readiness is an <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b4c5ff] via-[#82a4ff] to-[#d0bcff]">engineering problem</span>.
            <br />We engineered the solution.
          </h1>

          <p className="text-base sm:text-lg text-[#c3c6d7] max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            PlacementAI maps company-specific hiring rubrics from Google, Amazon, TCS Digital, and Microsoft into calibrated recruitment funnels, multimodal mock interviews, real-time code telemetries, and automated 7-day adaptive sprints.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button
              onClick={() => onEnterApp('dashboard')}
              className="px-8 py-3.5 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 group"
            >
              <span>Start Preparing Free</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button
              onClick={() => onEnterApp('blueprint', 'google')}
              className="px-6 py-3.5 rounded-2xl bg-[#131b2e] hover:bg-[#171f33] border border-[#222a3d] hover:border-[#434655] text-white text-sm font-semibold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-[#b4c5ff]">account_tree</span>
              <span>Inspect Google Blueprint</span>
            </button>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-[#222a3d]/60">
            <div className="p-4 rounded-xl bg-[#060e20]/60 border border-[#222a3d]/60 text-left">
              <div className="text-2xl font-black text-white font-mono">91.4%</div>
              <div className="text-xs text-[#8d90a0] mt-1 font-medium">Campus Shortlist Clearance</div>
            </div>
            <div className="p-4 rounded-xl bg-[#060e20]/60 border border-[#222a3d]/60 text-left">
              <div className="text-2xl font-black text-[#b4c5ff] font-mono">140+</div>
              <div className="text-xs text-[#8d90a0] mt-1 font-medium">Calibrated Company Blueprints</div>
            </div>
            <div className="p-4 rounded-xl bg-[#060e20]/60 border border-[#222a3d]/60 text-left">
              <div className="text-2xl font-black text-emerald-400 font-mono">3.4x</div>
              <div className="text-xs text-[#8d90a0] mt-1 font-medium">Faster Readiness Attainment</div>
            </div>
            <div className="p-4 rounded-xl bg-[#060e20]/60 border border-[#222a3d]/60 text-left">
              <div className="text-2xl font-black text-purple-400 font-mono">18,500+</div>
              <div className="text-xs text-[#8d90a0] mt-1 font-medium">Simulated Technical Mocks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Readiness Simulator Section */}
      <section id="simulator" className="py-20 px-6 border-b border-[#222a3d] bg-[#060e20]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563eb] mb-2">Interactive Assessment Preview</h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              Calculate Your Company-Specific Clearance Odds
            </h3>
            <p className="text-sm text-[#8d90a0] mt-2">
              Our Bayesian placement model estimates shortlisting probability by matching your DSA index, academic record, and target company rubric.
            </p>
          </div>

          <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="text-xs font-semibold text-[#8d90a0] uppercase tracking-wider block mb-2">
                  Select Target Company Drive
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['google', 'tcs', 'amazon'] as const).map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setSelectedSimRole(comp)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        selectedSimRole === comp
                          ? 'bg-[#2563eb] text-white border-blue-500 shadow-md shadow-blue-600/30'
                          : 'bg-[#171f33] text-[#dae2fd] border-[#222a3d] hover:border-[#434655]'
                      }`}
                    >
                      <span className="capitalize">{comp === 'tcs' ? 'TCS Digital' : comp}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#dae2fd] mb-2">
                  <span>Current DSA Problems Solved</span>
                  <span className="font-mono text-[#b4c5ff]">{dsaScore} Solved</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="650"
                  step="10"
                  value={dsaScore}
                  onChange={(e) => setDsaScore(Number(e.target.value))}
                  className="w-full accent-[#2563eb] bg-[#222a3d] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8d90a0] mt-1">
                  <span>50 (Beginner)</span>
                  <span>350 (Campus Median)</span>
                  <span>650+ (Competitive)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#dae2fd] mb-2">
                  <span>Academic CGPA / Percentage</span>
                  <span className="font-mono text-[#b4c5ff]">{cgpa.toFixed(1)} / 10.0</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="10.0"
                  step="0.1"
                  value={cgpa}
                  onChange={(e) => setCgpa(Number(e.target.value))}
                  className="w-full accent-[#2563eb] bg-[#222a3d] h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onEnterApp('blueprint', selectedSimRole)}
                  className="px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <span>Open Full {selectedSimRole.toUpperCase()} Funnel</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
                <button
                  onClick={() => onEnterApp('workspace')}
                  className="px-5 py-3 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-[#222a3d] text-white text-xs font-semibold transition-colors"
                >
                  Try Code IDE
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0b1326] border border-[#222a3d] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8d90a0] mb-2">
                Estimated Clearance Probability
              </div>
              <div className="relative w-36 h-36 flex items-center justify-center my-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#171f33]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#2563eb]"
                    strokeDasharray={`${getSimulatedProbability()}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-white font-mono">{getSimulatedProbability()}%</span>
                  <span className="text-[10px] text-[#8d90a0] uppercase font-semibold">Probable</span>
                </div>
              </div>

              <div className="text-xs text-[#c3c6d7] max-w-xs mt-1">
                {getSimulatedProbability() >= 80 ? (
                  <span className="text-emerald-400 font-semibold">
                    ✓ High Confidence Candidate. Meets tier-1 cutoffs. Focus on technical articulation.
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold">
                    ⚠️ Gap Detected. Needs ~18 days focused dynamic programming & sliding window sprint.
                  </span>
                )}
              </div>

              <div className="w-full mt-4 pt-4 border-t border-[#222a3d] flex justify-between text-[11px] text-[#8d90a0]">
                <span>Avg Package: ₹32 LPA</span>
                <span>Cohort Benchmark: 78%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Blueprints Grid */}
      <section id="blueprints" className="py-20 px-6 border-b border-[#222a3d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] block mb-2">
                Engineered Rubrics
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Company-Specific Hiring Blueprints
              </h2>
              <p className="text-sm text-[#8d90a0] mt-1">
                Every company tests differently. We broke down each recruitment pipeline into exact evaluation dimensions.
              </p>
            </div>
            <button
              onClick={() => onEnterApp('dashboard')}
              className="mt-4 md:mt-0 text-xs font-bold text-[#b4c5ff] hover:text-white flex items-center gap-1 group"
            >
              <span>View All 140+ Blueprints</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TARGET_COMPANIES.map((comp) => (
              <div
                key={comp.id}
                className="bg-[#131b2e] border border-[#222a3d] hover:border-[#434655] rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#222a3d] overflow-hidden p-1 flex items-center justify-center">
                      <img
                        src={comp.logo}
                        alt={comp.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[#2563eb]/20 text-[#b4c5ff] border border-[#2563eb]/30">
                      {comp.packageRange}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#b4c5ff] transition-colors">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-[#8d90a0] mb-3">{comp.role}</p>

                  <div className="space-y-2 py-3 border-y border-[#222a3d]">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8d90a0]">Readiness Index:</span>
                      <span className="font-mono font-bold text-white">{comp.readinessScore}%</span>
                    </div>
                    <div className="w-full bg-[#222a3d] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#2563eb] h-full rounded-full transition-all"
                        style={{ width: `${comp.readinessScore}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-[#c3c6d7] pt-1">
                      <span className="text-[#8d90a0]">Primary Gap:</span> {comp.primaryGap}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#8d90a0]">{comp.oaDaysLeft} days to OA</span>
                  <button
                    onClick={() => onEnterApp('blueprint', comp.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#171f33] hover:bg-[#2563eb] text-white text-xs font-semibold transition-all flex items-center gap-1 group/btn"
                  >
                    <span>Inspect</span>
                    <span className="material-symbols-outlined text-xs group-hover/btn:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Flywheel Section */}
      <section id="flywheel" className="py-20 px-6 border-b border-[#222a3d] bg-[#060e20]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] block mb-2">
              System Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              The 5-Step Placement Clearance Flywheel
            </h2>
            <p className="text-sm text-[#8d90a0] mt-2">
              A closed-loop loop that diagnoses weaknesses and prescribes exact engineering actions until you hit offer readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Blueprint Ingestion',
                desc: 'Company hiring rubrics and previous year question matrices parsed into pipeline stages.',
                icon: 'dataset'
              },
              {
                step: '02',
                title: 'Diagnostic OA',
                desc: 'Timed code execution with edge-case tests to determine exact baseline competency.',
                icon: 'fact_check'
              },
              {
                step: '03',
                title: 'Live AI Mock Room',
                desc: 'Face & audio telemetry analyzing speech speed, eye contact, and whiteboard syntax.',
                icon: 'smart_toy'
              },
              {
                step: '04',
                title: 'Gap-Filling Sprint',
                desc: 'Personalized 7-day curriculum targeting algorithmic gaps (e.g. Tarjan cycle detection).',
                icon: 'cycle'
              },
              {
                step: '05',
                title: 'Offer Clearance',
                desc: 'Verified readiness scorecard calibrated against actual hiring committee acceptance bars.',
                icon: 'verified'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-5 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-bold text-[#2563eb]">{item.step}</span>
                    <span className="material-symbols-outlined text-[#8d90a0] text-xl">{item.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-[#8d90a0] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate Testimonials */}
      <section id="testimonials" className="py-20 px-6 border-b border-[#222a3d]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] block mb-2">
              Verified Candidate Outcomes
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Placed at Tier-1 Engineering Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Aditya K.',
                college: 'IIT Madras',
                offer: 'Google SDE-1 (₹42 LPA)',
                quote:
                  'The AI Interview Room caught that I was pausing for 18 seconds without explaining my thought process. Fixing that behavioral telemetry got me through Google Round 1 with flying colors.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80'
              },
              {
                name: 'Sneha R.',
                college: 'NIT Trichy',
                offer: 'Amazon SDE (₹34 LPA)',
                quote:
                  'I was failing online assessments due to hidden constraints. PlacementAI’s Practice Workspace test runner mirrors HackerEarth tests down to millisecond memory limits.',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80'
              },
              {
                name: 'Karthik V.',
                college: 'Anna University',
                offer: 'TCS Digital Prime (₹14 LPA)',
                quote:
                  'Cleared the TCS Digital coding round after doing the 7-Day Sprint. The questions asked were virtually identical to the PlacementAI previous year pattern bank.',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80'
              }
            ].map((story, i) => (
              <div key={i} className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-6 flex flex-col justify-between">
                <p className="text-xs text-[#c3c6d7] italic leading-relaxed mb-6">"{story.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#222a3d]">
                  <img src={story.avatar} alt={story.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-white">{story.name}</div>
                    <div className="text-[11px] text-[#8d90a0]">{story.college}</div>
                    <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">{story.offer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#171f33] via-[#131b2e] to-[#0b1326] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Stop guessing. Start clearing campus placements.
          </h2>
          <p className="text-sm text-[#8d90a0] mb-8 max-w-xl mx-auto">
            Get instant access to company recruitment funnels, automated mock interviews, and your personalized readiness dashboard today.
          </p>
          <button
            onClick={() => onEnterApp('dashboard')}
            className="px-8 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold shadow-xl shadow-blue-600/30 transition-all inline-flex items-center gap-2"
          >
            <span>Enter PlacementAI Platform</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[#222a3d] py-8 px-6 text-center text-xs text-[#8d90a0]">
        <p>© 2025 PlacementAI. Engineered for Tier-1 engineering cohorts and campus placement cells.</p>
      </footer>
    </div>
  );
};
