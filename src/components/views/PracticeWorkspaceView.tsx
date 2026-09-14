import React, { useState, useEffect } from 'react';
import { ScreenType, QuestionData } from '../../types';
import { MOCK_QUESTIONS } from '../../data/mockData';

interface PracticeWorkspaceViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const PracticeWorkspaceView: React.FC<PracticeWorkspaceViewProps> = ({ onNavigate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];

  const [language, setLanguage] = useState<'python' | 'typescript' | 'java' | 'cpp'>('python');
  const [code, setCode] = useState<string>(currentQuestion.starterCode.python);
  const [activeTab, setActiveTab] = useState<'desc' | 'hints' | 'patterns'>('desc');
  const [selectedTestCase, setSelectedTestCase] = useState<number>(1);
  const [customInput, setCustomInput] = useState<string>('s = "abaccc", k = 2');

  // Execution state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{
    status: 'idle' | 'success' | 'error';
    passedCount: number;
    runtimeMs: number;
    memoryMb: number;
    outputLog: string;
  }>({
    status: 'idle',
    passedCount: 0,
    runtimeMs: 0,
    memoryMb: 0,
    outputLog: 'Click "Run Code" or press Ctrl+Enter to execute test cases against Google sandbox.'
  });

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState<number>(32 * 60 + 45); // 32:45
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Socratic Hint Dialog state
  const [showSocraticCoach, setShowSocraticCoach] = useState<boolean>(false);
  const [coachMessages, setCoachMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    {
      role: 'ai',
      text: "Hello Ranjithan! I'm Nova-6, your Socratic AI Coach. I won't give away the code directly, but I will guide your algorithmic reasoning. Where are you stuck?"
    }
  ]);
  const [userInputHint, setUserInputHint] = useState<string>('');

  // Switch code when language changes
  useEffect(() => {
    setCode(currentQuestion.starterCode[language]);
  }, [language, currentQuestion]);

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTestResults({
      status: 'idle',
      passedCount: 0,
      runtimeMs: 0,
      memoryMb: 0,
      outputLog: 'Compiling code in Google V8 / Python sandbox...'
    });

    setTimeout(() => {
      setIsRunning(false);
      setTestResults({
        status: 'success',
        passedCount: currentQuestion.testCases.length,
        runtimeMs: 52,
        memoryMb: 16.4,
        outputLog: `[SUCCESS] All ${currentQuestion.testCases.length} standard test cases passed!\nCase 1: Expected: ${currentQuestion.testCases[0]?.expected} | Got: ${currentQuestion.testCases[0]?.expected} (Latency: 14ms)\nCase 2: Expected: ${currentQuestion.testCases[1]?.expected} | Got: ${currentQuestion.testCases[1]?.expected} (Latency: 18ms)\nCase 3: Expected: ${currentQuestion.testCases[2]?.expected} | Got: ${currentQuestion.testCases[2]?.expected} (Latency: 20ms)\n\nOptimal Time Complexity: O(N) amortized\nAuxiliary Space: O(K) hash map capacity`
      });
    }, 700);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setTestResults({
        status: 'success',
        passedCount: 38, // 38 hidden test cases
        runtimeMs: 48,
        memoryMb: 16.2,
        outputLog: `[ACCEPTED - 100% SCORE]\n38/38 Test Cases Passed (including Unicode and Large N = 50,000 stress tests).\nRuntime: 48 ms (Faster than 94.2% of Google campus submissions)\nMemory: 16.2 MB (Better than 88.6%)\n\nReadiness Index Updated: +2.5 points`
      });
    }, 900);
  };

  const handleSendCoachMessage = () => {
    if (!userInputHint.trim()) return;
    const userQuery = userInputHint;
    setUserInputHint('');
    setCoachMessages((prev) => [...prev, { role: 'user', text: userQuery }]);

    setTimeout(() => {
      let reply = "Notice that as your 'right' pointer advances, you expand the window. When the number of distinct keys in your frequency map exceeds K, what is the invariant you must restore with the 'left' pointer?";
      if (userQuery.toLowerCase().includes('time') || userQuery.toLowerCase().includes('complexity')) {
        reply = "Each character is visited at most twice: once by the right pointer and once by the left pointer. Hence, even with the inner while loop, the total work is 2N operations, making it strictly O(N)!";
      } else if (userQuery.toLowerCase().includes('map') || userQuery.toLowerCase().includes('dict')) {
        reply = "Remember to delete the character key from the map once its count drops to 0! If you leave it with value 0, `map.size` or `len(char_count)` will still count it as a distinct key.";
      }
      setCoachMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    }, 600);
  };

  const lines = code.split('\n');

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#0b1326] text-[#dae2fd]">
      {/* Top Workspace Header */}
      <div className="h-12 border-b border-[#222a3d] px-4 flex items-center justify-between bg-[#0b1326] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('blueprint')}
            className="text-xs text-[#8d90a0] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="hidden sm:inline">Blueprint</span>
          </button>
          <span className="h-4 w-px bg-[#222a3d]" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.5 rounded">
              #{currentQuestion.id}
            </span>
            <span className="text-xs font-bold text-white truncate max-w-[280px] sm:max-w-md">
              {currentQuestion.number}. {currentQuestion.title}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
              {currentQuestion.difficulty}
            </span>
            <span className="hidden md:inline text-[10px] font-mono text-[#8d90a0]">
              Google Frequency: {currentQuestion.frequency}%
            </span>
          </div>
        </div>

        {/* Timer & Navigation */}
        <div className="flex items-center gap-3">
          {/* Socratic Coach Trigger */}
          <button
            onClick={() => setShowSocraticCoach(true)}
            className="px-3 py-1 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">psychology</span>
            <span>Ask AI Coach</span>
          </button>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 bg-[#131b2e] border border-[#222a3d] px-2.5 py-1 rounded-xl">
            <span className="material-symbols-outlined text-sm text-amber-400">timer</span>
            <span className="text-xs font-mono font-bold text-white">{formatTimer(timeLeft)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              className="text-[#8d90a0] hover:text-white"
            >
              <span className="material-symbols-outlined text-xs">
                {isTimerRunning ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          {/* Question Nav */}
          <div className="flex items-center gap-1">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              className="w-7 h-7 rounded-lg bg-[#131b2e] disabled:opacity-40 border border-[#222a3d] flex items-center justify-center text-[#8d90a0] hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <span className="text-xs font-mono text-[#8d90a0] px-1">
              {currentQuestionIndex + 1}/{MOCK_QUESTIONS.length}
            </span>
            <button
              disabled={currentQuestionIndex === MOCK_QUESTIONS.length - 1}
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(MOCK_QUESTIONS.length - 1, prev + 1))}
              className="w-7 h-7 rounded-lg bg-[#131b2e] disabled:opacity-40 border border-[#222a3d] flex items-center justify-center text-[#8d90a0] hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Pane Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Pane: Problem Context (4 cols) */}
        <div className="lg:col-span-4 border-r border-[#222a3d] bg-[#0b1326] flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#222a3d] bg-[#060e20] px-3 pt-2 gap-2 text-xs font-semibold shrink-0">
            {[
              { id: 'desc', label: 'Problem Description' },
              { id: 'hints', label: 'Company Hints' },
              { id: 'patterns', label: 'Google Patterns' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`pb-2 px-2 border-b-2 transition-all ${
                  activeTab === t.id
                    ? 'border-[#2563eb] text-white'
                    : 'border-transparent text-[#8d90a0] hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {activeTab === 'desc' && (
              <>
                <div className="space-y-2 text-[#dae2fd] leading-relaxed">
                  <p>{currentQuestion.description}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-[11px] uppercase font-bold text-[#8d90a0]">Examples</div>
                  {currentQuestion.examples.map((ex, i) => (
                    <div key={i} className="p-3 bg-[#131b2e] rounded-xl border border-[#222a3d] space-y-1.5 font-mono">
                      <div>
                        <span className="text-[#8d90a0]">Input: </span>
                        <span className="text-white">{ex.input}</span>
                      </div>
                      <div>
                        <span className="text-[#8d90a0]">Output: </span>
                        <span className="text-emerald-400 font-bold">{ex.output}</span>
                      </div>
                      {ex.explanation && (
                        <div className="text-[#8d90a0] text-[11px] font-sans pt-1 border-t border-[#222a3d]/60">
                          Explanation: {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-[11px] uppercase font-bold text-[#8d90a0]">Constraints</div>
                  <ul className="list-disc pl-4 space-y-1 text-[#8d90a0]">
                    {currentQuestion.constraints.map((c, i) => (
                      <li key={i} className="font-mono text-[11px] text-[#c3c6d7]">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#222a3d]">
                  <div className="p-3 bg-[#131b2e]/60 rounded-xl border border-[#222a3d] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Need a strategic nudge?</div>
                      <div className="text-[11px] text-[#8d90a0]">Nova-6 AI coach is ready to help</div>
                    </div>
                    <button
                      onClick={() => setShowSocraticCoach(true)}
                      className="px-3 py-1.5 rounded-lg bg-[#2563eb] text-white text-xs font-bold"
                    >
                      Ask
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-3">
                <div className="text-[11px] uppercase font-bold text-[#8d90a0]">Google Candidate Hints</div>
                {currentQuestion.googleHints.map((hint, i) => (
                  <div key={i} className="p-3 bg-[#131b2e] rounded-xl border border-[#222a3d] space-y-1">
                    <div className="text-[10px] font-bold text-[#b4c5ff]">HINT 0{i + 1}</div>
                    <p className="text-[#dae2fd]">{hint}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'patterns' && (
              <div className="space-y-3">
                <div className="text-[11px] uppercase font-bold text-[#8d90a0]">Related Google Patterns</div>
                <div className="p-3 bg-[#131b2e] rounded-xl border border-[#222a3d] space-y-2">
                  <div className="font-bold text-white">Sliding Window (Variable Size)</div>
                  <p className="text-[#8d90a0] leading-relaxed">
                    Used frequently in Google Tier-1 interviews for substring optimization problems where brute force is O(N^2) or O(N^3).
                  </p>
                  <div className="pt-2 border-t border-[#222a3d] flex justify-between text-[11px]">
                    <span className="text-[#b4c5ff]">Frequency in Batch 2024:</span>
                    <span className="font-bold text-white">28%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Pane: Interactive Code Editor (5 cols) */}
        <div className="lg:col-span-5 border-r border-[#222a3d] flex flex-col bg-[#060e20] overflow-hidden">
          {/* Editor Controls Bar */}
          <div className="h-10 border-b border-[#222a3d] px-3 flex items-center justify-between bg-[#0b1326] shrink-0">
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-[#131b2e] border border-[#222a3d] text-xs font-semibold text-white rounded-lg px-2.5 py-1 outline-none cursor-pointer"
              >
                <option value="python">Python 3</option>
                <option value="typescript">TypeScript</option>
                <option value="java">Java 17</option>
                <option value="cpp">C++ 20</option>
              </select>
              <span className="text-[10px] text-[#8d90a0]">Auto-saved</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCode(currentQuestion.starterCode[language])}
                title="Reset starter template"
                className="p-1 rounded text-[#8d90a0] hover:text-white hover:bg-[#131b2e] text-xs flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span className="text-[10px]">Reset</span>
              </button>
            </div>
          </div>

          {/* Editable Code Canvas */}
          <div className="flex-1 flex overflow-hidden font-mono text-xs relative">
            {/* Line Numbers */}
            <div className="w-10 bg-[#0b1326] border-r border-[#222a3d] py-3 select-none text-right pr-2 text-[#434655] font-mono shrink-0">
              {lines.map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code Input */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-[#060e20] text-[#dae2fd] p-3 leading-6 outline-none resize-none font-mono whitespace-pre overflow-auto selection:bg-[#2563eb] selection:text-white"
            />
          </div>

          {/* Editor Footer Status */}
          <div className="h-7 border-t border-[#222a3d] px-3 bg-[#0b1326] flex items-center justify-between text-[10px] text-[#8d90a0] shrink-0 font-mono">
            <span>Spaces: 4 · UTF-8</span>
            <span>Lines: {lines.length}</span>
          </div>
        </div>

        {/* Right Pane: Test Runner & Output (3 cols) */}
        <div className="lg:col-span-3 flex flex-col bg-[#0b1326] overflow-hidden">
          {/* Test Runner Controls Header */}
          <div className="h-10 border-b border-[#222a3d] px-3 flex items-center justify-between bg-[#060e20] shrink-0">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#2563eb]">science</span>
              <span>Test Runner</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-3 py-1 rounded-lg bg-[#171f33] hover:bg-[#222a3d] border border-[#222a3d] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {isRunning ? (
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                ) : (
                  <span className="material-symbols-outlined text-sm text-emerald-400">play_arrow</span>
                )}
                <span>Run</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={isRunning}
                className="px-3.5 py-1 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold shadow-md flex items-center gap-1 transition-all"
              >
                <span>Submit</span>
              </button>
            </div>
          </div>

          {/* Test Cases Selector */}
          <div className="p-3 border-b border-[#222a3d] bg-[#0b1326] shrink-0 space-y-2">
            <div className="flex items-center gap-1.5">
              {currentQuestion.testCases.map((tc) => (
                <button
                  key={tc.id}
                  onClick={() => setSelectedTestCase(tc.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    selectedTestCase === tc.id
                      ? 'bg-[#2563eb] text-white'
                      : 'bg-[#131b2e] text-[#8d90a0] hover:text-white'
                  }`}
                >
                  Case {tc.id}
                </button>
              ))}
              <button
                onClick={() => setSelectedTestCase(999)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedTestCase === 999
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#131b2e] text-[#8d90a0] hover:text-white'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Active Test Case Input Viewer */}
            <div className="bg-[#131b2e] p-2.5 rounded-xl border border-[#222a3d] font-mono text-xs">
              {selectedTestCase === 999 ? (
                <div>
                  <div className="text-[10px] text-[#8d90a0] uppercase mb-1">Custom Input:</div>
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-full bg-[#0b1326] border border-[#222a3d] rounded p-1 text-white text-xs outline-none"
                  />
                </div>
              ) : (
                <>
                  <div className="text-[10px] text-[#8d90a0] uppercase mb-1">Input:</div>
                  <div className="text-white">
                    {currentQuestion.testCases.find((tc) => tc.id === selectedTestCase)?.input}
                  </div>
                  <div className="text-[10px] text-[#8d90a0] uppercase mt-2 mb-1">Expected Output:</div>
                  <div className="text-emerald-400 font-bold">
                    {currentQuestion.testCases.find((tc) => tc.id === selectedTestCase)?.expected}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Console / Telemetry Output */}
          <div className="flex-1 overflow-y-auto p-3 bg-[#060e20] font-mono text-xs text-[#c3c6d7] space-y-2">
            <div className="text-[10px] text-[#8d90a0] uppercase font-bold">Execution Output & Telemetry</div>
            <pre className="whitespace-pre-wrap leading-relaxed text-[#dae2fd]">
              {testResults.outputLog}
            </pre>

            {testResults.runtimeMs > 0 && (
              <div className="mt-3 pt-3 border-t border-[#222a3d] space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#8d90a0]">Execution Latency:</span>
                  <span className="text-emerald-400 font-bold">{testResults.runtimeMs} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8d90a0]">Memory Consumption:</span>
                  <span className="text-[#b4c5ff] font-bold">{testResults.memoryMb} MB</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Socratic Hint Dialog Modal */}
      {showSocraticCoach && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#131b2e] border border-[#222a3d] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-[#222a3d] flex items-center justify-between bg-[#171f33]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563eb] to-[#7d4ce7] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">psychology</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Nova-6 Socratic AI Coach</h3>
                  <p className="text-[10px] text-emerald-400">Guiding reasoning without spoilers</p>
                </div>
              </div>
              <button
                onClick={() => setShowSocraticCoach(false)}
                className="p-1 rounded-lg text-[#8d90a0] hover:text-white hover:bg-[#222a3d]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
              {coachMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.role === 'ai'
                      ? 'bg-[#0b1326] border border-[#222a3d] text-[#dae2fd] mr-auto'
                      : 'bg-[#2563eb] text-white ml-auto'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-[#222a3d] bg-[#171f33] flex items-center gap-2">
              <input
                type="text"
                value={userInputHint}
                onChange={(e) => setUserInputHint(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendCoachMessage()}
                placeholder="e.g. How does sliding window stay O(N)?"
                className="flex-1 bg-[#0b1326] border border-[#222a3d] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#2563eb]"
              />
              <button
                onClick={handleSendCoachMessage}
                className="px-3 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl text-xs font-bold"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
