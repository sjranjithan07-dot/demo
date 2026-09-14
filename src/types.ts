export type ScreenType =
  | 'landing'
  | 'dashboard'
  | 'blueprint'
  | 'workspace'
  | 'interview'
  | 'diagnostics'
  | 'analytics'
  | 'resume';

export type TargetCompanyId = 'google' | 'tcs' | 'amazon' | 'infosys' | 'microsoft';

export interface TargetCompany {
  id: TargetCompanyId;
  name: string;
  role: string;
  tier: string;
  packageRange: string;
  readinessScore: number;
  targetThreshold: number;
  oaDaysLeft: number;
  statusText: string;
  statusColor: 'emerald' | 'amber' | 'blue' | 'purple';
  primaryGap: string;
  logo: string;
}

export interface PipelineStage {
  id: number;
  name: string;
  shortName: string;
  status: 'passed' | 'active' | 'upcoming' | 'locked';
  score?: number;
  duration?: string;
  format?: string;
  focusAreas?: string[];
  description: string;
}

export interface QuestionData {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  frequency: number;
  category: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  googleHints: string[];
  starterCode: {
    python: string;
    java: string;
    cpp: string;
    typescript: string;
  };
  testCases: {
    id: number;
    input: string;
    expected: string;
  }[];
}

export interface TelemetryData {
  eyeContact: number;
  speakingPaceWpm: number;
  fillerWords: number;
  confidenceScore: number;
  competencies: {
    algorithmSpeed: number;
    edgeCases: number;
    modularity: number;
    articulation: number;
    communication: number;
    socraticResponse: number;
  };
}

export interface DiagnosticResult {
  sessionId: string;
  targetCompany: string;
  role: string;
  verdict: 'Strong Hire' | 'Hire' | 'Lean Hire' | 'No Hire';
  overallScore: number;
  percentile: number;
  metrics: {
    technicalAccuracy: number;
    codeModularity: number;
    communicationClarity: number;
    edgeCaseResilience: number;
  };
  strengths: string[];
  criticalAreas: string[];
  skillGaps: {
    topic: string;
    score: number;
    target: number;
    delta: number;
    status: 'Critical Gap' | 'Moderate Gap' | 'Strong' | 'On Track';
  }[];
  sprintDays: {
    day: number;
    title: string;
    category: string;
    completed: boolean;
    tasks: string[];
    timeEstimate: string;
  }[];
}
