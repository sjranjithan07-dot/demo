import React, { useState, useEffect, useRef } from 'react';
import { ScreenType, TelemetryData } from '../../types';
import { INITIAL_TELEMETRY } from '../../data/mockData';

interface InterviewRoomViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const InterviewRoomView: React.FC<InterviewRoomViewProps> = ({ onNavigate }) => {
  const [telemetry, setTelemetry] = useState<TelemetryData>(INITIAL_TELEMETRY);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isCamOn, setIsCamOn] = useState<boolean>(true);
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(true);
  const [activeWhiteboardTab, setActiveWhiteboardTab] = useState<'code' | 'diagram'>('code');

  // Video stream ref for actual camera if user approves
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasWebcamAccess, setHasWebcamAccess] = useState<boolean>(false);

  // Roadmap active index
  const [currentQuestionStep, setCurrentQuestionStep] = useState<number>(3); // Q3 is current

  // Whiteboard code state
  const [whiteboardCode, setWhiteboardCode] = useState<string>(`// Google Live Whiteboard - Shared with Evaluator Nova-6
func longestSubstringKDistinct(s string, k int) int {
    if k == 0 || len(s) == 0 {
        return 0
    }
    
    counts := make(map[byte]int)
    left, maxLen := 0, 0
    
    for right := 0; right < len(s); right++ {
        counts[s[right]]++
        
        for len(counts) > k {
            counts[s[left]]--
            if counts[s[left]] == 0 {
                delete(counts, s[left])
            }
            left++
        }
        
        if right - left + 1 > maxLen {
            maxLen = right - left + 1
        }
    }
    
    return maxLen
}`);

  const [candidateResponse, setCandidateResponse] = useState<string>('');
  const [transcript, setTranscript] = useState<{ speaker: 'nova' | 'candidate'; text: string; time: string }[]>([
    {
      speaker: 'nova',
      text: 'Good morning Ranjithan. Welcome to your Google Technical Round 1 simulation. I’ve reviewed your initial approach on the sliding window. Can you articulate the loop invariants you are maintaining?',
      time: '10:02'
    },
    {
      speaker: 'candidate',
      text: 'Certainly. The invariant is that at any point during iteration, the window between index left and right contains at most k unique characters, tracked in our frequency map.',
      time: '10:04'
    },
    {
      speaker: 'nova',
      text: 'Good. Now, suppose this function receives a continuous stream of characters over a network socket where storing the full string in memory is impossible. How would you redesign this window?',
      time: '10:06'
    }
  ]);

  // Attempt real webcam preview if available
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isCamOn && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setHasWebcamAccess(true);
          }
        })
        .catch(() => {
          setHasWebcamAccess(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCamOn]);

  // Small telemetry fluctuations for lifelike immersion
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        eyeContact: Math.min(98, Math.max(85, prev.eyeContact + (Math.random() > 0.5 ? 1 : -1))),
        speakingPaceWpm: Math.min(148, Math.max(130, prev.speakingPaceWpm + (Math.random() > 0.5 ? 2 : -2))),
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSendResponse = () => {
    if (!candidateResponse.trim()) return;
    const text = candidateResponse;
    setCandidateResponse('');
    setTranscript((prev) => [...prev, { speaker: 'candidate', text, time: '10:08' }]);

    setIsAiSpeaking(true);
    setTimeout(() => {
      let reply = 'Spot on. By decoupling the window buffer from a bounded ring queue, we retain O(1) eviction. Let us transition to testing your boundary edge cases.';
      if (text.toLowerCase().includes('queue') || text.toLowerCase().includes('buffer')) {
        reply = 'Excellent choice using a bounded ring buffer or deque. How would you handle hash collisions under extreme throughput?';
      }
      setTranscript((prev) => [...prev, { speaker: 'nova', text: reply, time: '10:09' }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#0b1326] text-[#dae2fd]">
      {/* Top Session Header */}
      <div className="h-14 border-b border-[#222a3d] px-5 flex items-center justify-between bg-[#0b1326] shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">LIVE SIMULATION</span>
          </div>
          <span className="h-4 w-px bg-[#222a3d]" />
          <div>
            <h1 className="text-xs font-bold text-white flex items-center gap-2">
              Google Tech Round 1 · Evaluator: Nova-6 (Google SDE-III Persona)
            </h1>
            <span className="text-[10px] text-[#8d90a0]">Session: #GOOG-MOCK-7712 · Track: Algorithms & Architecture</span>
          </div>
        </div>

        {/* Telemetry quick badges & End action */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#131b2e] border border-[#222a3d] px-3 py-1 rounded-xl text-xs">
            <span className="text-[#8d90a0]">Eye Contact:</span>
            <span className="font-mono font-bold text-emerald-400">{telemetry.eyeContact}%</span>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-[#131b2e] border border-[#222a3d] px-3 py-1 rounded-xl text-xs">
            <span className="text-[#8d90a0]">Pace:</span>
            <span className="font-mono font-bold text-[#b4c5ff]">{telemetry.speakingPaceWpm} WPM</span>
          </div>

          <button
            onClick={() => onNavigate('diagnostics')}
            className="px-4 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">flag</span>
            <span>End & View Diagnostics</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Stage (Avatars & Speech) + Right Stage (Whiteboard & Telemetry HUD) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Live Audio/Video & Dialogue (5 cols) */}
        <div className="lg:col-span-5 border-r border-[#222a3d] flex flex-col bg-[#060e20] overflow-hidden">
          {/* Top Half: Video & AI Spectrum */}
          <div className="h-56 sm:h-64 p-3 grid grid-cols-2 gap-3 border-b border-[#222a3d] shrink-0 bg-[#0b1326]">
            {/* AI Evaluator Screen */}
            <div className="relative rounded-2xl bg-[#131b2e] border border-[#222a3d] overflow-hidden flex flex-col items-center justify-center p-3">
              <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold text-white">Nova-6 (AI)</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2563eb] to-[#7d4ce7] flex items-center justify-center shadow-lg shadow-blue-500/20 mb-2">
                <span className="material-symbols-outlined text-3xl text-white">psychology</span>
              </div>
              <div className="text-[11px] font-bold text-white">Senior Staff SDE</div>
              {/* Audio Spectrum Animation */}
              <div className="flex items-center gap-1 mt-2 h-4">
                {[4, 12, 8, 16, 10, 14, 6, 12].map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1 bg-[#2563eb] rounded-full transition-all duration-150"
                    style={{
                      height: isAiSpeaking ? `${h}px` : '3px',
                      opacity: isAiSpeaking ? 1 : 0.4
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Candidate Webcam / PiP */}
            <div className="relative rounded-2xl bg-[#131b2e] border border-[#222a3d] overflow-hidden flex flex-col items-center justify-center">
              {isCamOn && hasWebcamAccess ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-center">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                    alt="Ranjithan"
                    className="w-14 h-14 rounded-full object-cover border border-[#222a3d] mb-1"
                  />
                  <div className="text-[11px] font-bold text-white">Ranjithan S.</div>
                  <div className="text-[10px] text-emerald-400">Face Centered · 92% Eye Contact</div>
                </div>
              )}

              {/* In-Video Controls */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10 px-1">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`p-1.5 rounded-lg text-xs ${
                      isMicOn ? 'bg-[#0b1326]/80 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">
                      {isMicOn ? 'mic' : 'mic_off'}
                    </span>
                  </button>
                  <button
                    onClick={() => setIsCamOn(!isCamOn)}
                    className={`p-1.5 rounded-lg text-xs ${
                      isCamOn ? 'bg-[#0b1326]/80 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">
                      {isCamOn ? 'videocam' : 'videocam_off'}
                    </span>
                  </button>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-[#0b1326]/80 px-1.5 py-0.5 rounded">
                  720p HD
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Half: Live Speech Transcript & Response Input */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-[#222a3d] bg-[#0b1326] flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#2563eb]">forum</span>
                <span>Live Audio Transcript</span>
              </span>
              <span className="text-[10px] text-[#8d90a0]">Real-time NLP Speech Recognition</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {transcript.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl max-w-[90%] leading-relaxed ${
                    item.speaker === 'nova'
                      ? 'bg-[#131b2e] border border-[#222a3d] text-[#dae2fd] mr-auto'
                      : 'bg-[#2563eb] text-white ml-auto'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1 opacity-75">
                    <span className="font-bold uppercase tracking-wider">
                      {item.speaker === 'nova' ? 'Nova-6 (Google Evaluator)' : 'You (Candidate)'}
                    </span>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Candidate Response Composer */}
            <div className="p-3 border-t border-[#222a3d] bg-[#0b1326] space-y-2 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={candidateResponse}
                  onChange={(e) => setCandidateResponse(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendResponse()}
                  placeholder="Type or speak your technical reasoning..."
                  className="flex-1 bg-[#131b2e] border border-[#222a3d] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#2563eb]"
                />
                <button
                  onClick={handleSendResponse}
                  className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  Send
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#8d90a0]">
                <span>Press Enter to vocalize answer</span>
                <span className="text-[#b4c5ff] hover:underline cursor-pointer">
                  Request Hint / Clarification
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Shared Technical Whiteboard & Telemetry HUD (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#0b1326] overflow-hidden">
          {/* Top Sub-Bar: Whiteboard vs Scratchpad */}
          <div className="h-10 border-b border-[#222a3d] px-4 flex items-center justify-between bg-[#060e20] shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveWhiteboardTab('code')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeWhiteboardTab === 'code'
                    ? 'bg-[#2563eb] text-white'
                    : 'text-[#8d90a0] hover:text-white'
                }`}
              >
                Shared Code Editor (Go / Python)
              </button>
              <button
                onClick={() => setActiveWhiteboardTab('diagram')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeWhiteboardTab === 'diagram'
                    ? 'bg-[#2563eb] text-white'
                    : 'text-[#8d90a0] hover:text-white'
                }`}
              >
                System Architecture Scratchpad
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Sync Active (0ms lag)
              </span>
            </div>
          </div>

          {/* Whiteboard Content Area */}
          <div className="h-64 sm:h-72 border-b border-[#222a3d] bg-[#060e20] overflow-hidden flex flex-col shrink-0">
            {activeWhiteboardTab === 'code' ? (
              <textarea
                value={whiteboardCode}
                onChange={(e) => setWhiteboardCode(e.target.value)}
                spellCheck={false}
                className="flex-1 bg-[#060e20] text-[#dae2fd] p-4 font-mono text-xs leading-6 outline-none resize-none overflow-auto selection:bg-[#2563eb] selection:text-white"
              />
            ) : (
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center text-xs text-[#8d90a0] space-y-2">
                <span className="material-symbols-outlined text-3xl text-[#2563eb]">hub</span>
                <div className="text-white font-bold">Sliding Window Network Stream Diagram</div>
                <p className="max-w-md">
                  [Socket Stream] → [Bounded Ring Buffer (Size K)] → [Frequency Hash Map] → [Max Length Monotonic Tracker]
                </p>
              </div>
            )}
          </div>

          {/* Real-time Telemetry & Question Roadmap (Lower Half) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Behavioral Telemetry HUD */}
            <div className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#2563eb]">sensors</span>
                  <span>Multimodal Behavioral Telemetry (Live)</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">Calibrated against Google Rubric</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#0b1326] p-2.5 rounded-xl border border-[#222a3d]">
                  <div className="text-[10px] text-[#8d90a0] uppercase font-semibold">Eye Contact</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">{telemetry.eyeContact}%</div>
                  <div className="text-[9px] text-[#8d90a0]">Target: &gt;85%</div>
                </div>
                <div className="bg-[#0b1326] p-2.5 rounded-xl border border-[#222a3d]">
                  <div className="text-[10px] text-[#8d90a0] uppercase font-semibold">Speaking Pace</div>
                  <div className="text-lg font-bold font-mono text-[#b4c5ff] mt-0.5">{telemetry.speakingPaceWpm} WPM</div>
                  <div className="text-[9px] text-[#8d90a0]">Ideal: 130-150</div>
                </div>
                <div className="bg-[#0b1326] p-2.5 rounded-xl border border-[#222a3d]">
                  <div className="text-[10px] text-[#8d90a0] uppercase font-semibold">Filler Words</div>
                  <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">{telemetry.fillerWords} Detected</div>
                  <div className="text-[9px] text-[#8d90a0]">"um" at 10:04</div>
                </div>
                <div className="bg-[#0b1326] p-2.5 rounded-xl border border-[#222a3d]">
                  <div className="text-[10px] text-[#8d90a0] uppercase font-semibold">Confidence Index</div>
                  <div className="text-lg font-bold font-mono text-purple-400 mt-0.5">{telemetry.confidenceScore}%</div>
                  <div className="text-[9px] text-[#8d90a0]">Voice Tone Match</div>
                </div>
              </div>
            </div>

            {/* Session Roadmap Tracker */}
            <div className="bg-[#131b2e] border border-[#222a3d] rounded-2xl p-4">
              <div className="text-xs font-bold text-white mb-2">Interview Session Roadmap (45 Min Allocation)</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { step: 1, label: 'Resume Deep-Dive', status: 'done' },
                  { step: 2, label: 'Problem Clarification', status: 'done' },
                  { step: 3, label: 'Algorithmic Invariant Design', status: 'active' },
                  { step: 4, label: 'Live Code Execution', status: 'pending' },
                  { step: 5, label: 'Distributed Scale Probes', status: 'pending' },
                  { step: 6, label: 'Candidate Questions for Nova-6', status: 'pending' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`p-2 rounded-xl border text-xs flex items-center justify-between ${
                      item.status === 'active'
                        ? 'bg-[#2563eb]/20 border-blue-500 text-white font-bold'
                        : item.status === 'done'
                        ? 'bg-[#0b1326] border-emerald-500/30 text-emerald-400'
                        : 'bg-[#0b1326] border-[#222a3d] text-[#8d90a0]'
                    }`}
                  >
                    <span>{item.step}. {item.label}</span>
                    {item.status === 'done' && <span className="text-xs">✓</span>}
                    {item.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
