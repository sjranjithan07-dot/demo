import { TargetCompany, PipelineStage, QuestionData, DiagnosticResult, TelemetryData } from '../types';

export const TARGET_COMPANIES: TargetCompany[] = [
  {
    id: 'google',
    name: 'Google',
    role: 'Software Development Engineer - Campus',
    tier: 'Tier 1 Global Tech',
    packageRange: '₹32 - 45 LPA',
    readinessScore: 72,
    targetThreshold: 85,
    oaDaysLeft: 18,
    statusText: 'In Progress · 13 pts gap',
    statusColor: 'amber',
    primaryGap: 'Graph Algorithms & Socratic Inquiry',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&auto=format&fit=crop&q=80'
  },
  {
    id: 'tcs',
    name: 'TCS Digital',
    role: 'Digital / Prime Innovator',
    tier: 'Tier 1 Prime / Service',
    packageRange: '₹9 - 14 LPA',
    readinessScore: 94,
    targetThreshold: 80,
    oaDaysLeft: 6,
    statusText: 'Benchmark Cleared · Ready',
    statusColor: 'emerald',
    primaryGap: 'Advanced Coding Speed Drills',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=80'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    role: 'SDE-1 (6-Month Intern + FTE)',
    tier: 'Tier 1 Global Tech',
    packageRange: '₹28 - 40 LPA',
    readinessScore: 81,
    targetThreshold: 85,
    oaDaysLeft: 24,
    statusText: 'Approaching Benchmark',
    statusColor: 'blue',
    primaryGap: 'Leadership Principles & Low-Level Design',
    logo: 'https://images.unsplash.com/photo-1523474255658-4af61b1684c4?w=80&auto=format&fit=crop&q=80'
  },
  {
    id: 'infosys',
    name: 'Infosys Specialist',
    role: 'Specialist Programmer (SP)',
    tier: 'Tier 1 Premium R&D',
    packageRange: '₹9.5 - 12 LPA',
    readinessScore: 88,
    targetThreshold: 80,
    oaDaysLeft: 12,
    statusText: 'Benchmark Cleared',
    statusColor: 'emerald',
    primaryGap: 'HackWithInfy Previous Year Submissions',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&auto=format&fit=crop&q=80'
  }
];

export const GOOGLE_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 1,
    name: 'Resume Shortlist',
    shortName: 'ATS Resume',
    status: 'passed',
    score: 88,
    duration: 'Automated',
    format: 'Google ATS Parser + Keyword Matrix',
    focusAreas: ['System Projects', 'Impact Metrics (XYZ formula)', 'Open Source Contributions'],
    description: 'Automated candidate screening prioritizing clean metrics, competitive coding handles, and strong core CS projects.'
  },
  {
    id: 2,
    name: 'Online Assessment (OA)',
    shortName: 'Online Assessment',
    status: 'passed',
    score: 92,
    duration: '90 Minutes',
    format: 'HackerEarth / Custom Google OA Platform',
    focusAreas: ['Data Structures', 'Greedy Algorithmic Proofs', 'Time-Constrained Execution'],
    description: '2 Complex algorithmic problems with strict hidden test cases and boundary conditions.'
  },
  {
    id: 3,
    name: 'Technical Round 1 (Live Coding)',
    shortName: 'Tech Round 1',
    status: 'active',
    score: 68,
    duration: '45 Minutes',
    format: 'Google Meet + Google Docs / CoderPad',
    focusAreas: ['Graph Traversal', 'Two Pointers & Sliding Window', 'Socratic Problem Deconstruction', 'Big-O Proofs'],
    description: 'Interactive live whiteboard session assessing algorithmic efficiency, code elegance, and vocalized design rationale.'
  },
  {
    id: 4,
    name: 'Technical Round 2 (Advanced DSA)',
    shortName: 'Tech Round 2',
    status: 'upcoming',
    score: 61,
    duration: '45 Minutes',
    format: 'Google Meet + Live Code Sandbox',
    focusAreas: ['Dynamic Programming on Trees', 'Concurrency & Low-Level Memory', 'Scale Trade-offs'],
    description: 'In-depth algorithmic drill-down focusing on mathematical invariants and multi-stage optimizations.'
  },
  {
    id: 5,
    name: 'Googliness & Leadership',
    shortName: 'Googliness',
    status: 'upcoming',
    score: 84,
    duration: '45 Minutes',
    format: 'Structured Behavioral Interview',
    focusAreas: ['Intellectual Humility', 'Collaboration Under Ambiguity', 'Navigating Ethics & Scale'],
    description: 'Evaluation of collaborative temperament, conflict resolution, bias for action, and peer psychological safety.'
  },
  {
    id: 6,
    name: 'Hiring Committee (HC) Review',
    shortName: 'HC Review',
    status: 'locked',
    duration: 'Async Packet Review',
    format: 'Independent Senior Engineering Committee',
    focusAreas: ['Calibrated Feedback Packets', 'Code Artifact Audits', 'Offer Grade Sizing'],
    description: 'Independent cross-functional committee packet calibration determining formal campus employment offer.'
  }
];

export const MOCK_QUESTIONS: QuestionData[] = [
  {
    id: 'GOOG-9142',
    number: 142,
    title: 'Longest Substring with At Most K Distinct Characters',
    difficulty: 'Hard',
    frequency: 94,
    category: 'Sliding Window & Hash Map',
    description: `Given a string \`s\` and an integer \`k\`, return the length of the longest substring of \`s\` that contains at most \`k\` distinct characters.

In recent Google Tier-1 campus interviews, candidates were tested on optimizing time complexity from $O(N \\times K)$ to strictly $O(N)$ single-pass using an optimal sliding window with character frequency tracking.`,
    examples: [
      {
        input: 's = "eceba", k = 2',
        output: '3',
        explanation: 'The substring is "ece" with length 3.'
      },
      {
        input: 's = "aa", k = 1',
        output: '2',
        explanation: 'The substring is "aa" with length 2.'
      },
      {
        input: 's = "a", k = 0',
        output: '0',
        explanation: 'K is zero, so no valid substring exists.'
      }
    ],
    constraints: [
      '1 <= s.length <= 5 * 10^4',
      '0 <= k <= 50',
      's consists of English letters.'
    ],
    googleHints: [
      'Consider maintaining a sliding window [left, right] where the frequency of unique characters inside the window is kept in a hash map.',
      'When the number of keys in the map exceeds k, shrink the window from the left until the distinct character count is <= k.',
      'Ensure your update operations are strictly amortized O(1) so overall time is O(N).'
    ],
    starterCode: {
      python: `class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        if k == 0 or not s:
            return 0
            
        char_count = {}
        left = 0
        max_len = 0
        
        for right in range(len(s)):
            char_count[s[right]] = char_count.get(s[right], 0) + 1
            
            while len(char_count) > k:
                char_count[s[left]] -= 1
                if char_count[s[left]] == 0:
                    del char_count[s[left]]
                left += 1
                
            max_len = max(max_len, right - left + 1)
            
        return max_len`,
      typescript: `function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
    if (k === 0 || s.length === 0) return 0;
    
    const charCount = new Map<string, number>();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        charCount.set(char, (charCount.get(char) || 0) + 1);
        
        while (charCount.size > k) {
            const leftChar = s[left];
            const count = charCount.get(leftChar)! - 1;
            if (count === 0) {
                charCount.delete(leftChar);
            } else {
                charCount.set(leftChar, count);
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}`,
      java: `class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        if (k == 0 || s == null || s.length() == 0) return 0;
        
        Map<Character, Integer> counts = new HashMap<>();
        int left = 0, maxLen = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char rChar = s.charAt(right);
            counts.put(rChar, counts.getOrDefault(rChar, 0) + 1);
            
            while (counts.size() > k) {
                char lChar = s.charAt(left);
                counts.put(lChar, counts.get(lChar) - 1);
                if (counts.get(lChar) == 0) {
                    counts.remove(lChar);
                }
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        if (k == 0 || s.empty()) return 0;
        unordered_map<char, int> freq;
        int left = 0, maxLen = 0;
        
        for (int right = 0; right < s.size(); right++) {
            freq[s[right]]++;
            while (freq.size() > k) {
                if (--freq[s[left]] == 0) {
                    freq.erase(s[left]);
                }
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`
    },
    testCases: [
      { id: 1, input: 's = "eceba", k = 2', expected: '3' },
      { id: 2, input: 's = "aa", k = 1', expected: '2' },
      { id: 3, input: 's = "a", k = 0', expected: '0' }
    ]
  },
  {
    id: 'GOOG-9143',
    number: 210,
    title: 'Course Schedule II (Build Pipeline Resolver)',
    difficulty: 'Medium',
    frequency: 89,
    category: 'Topological Sort & Graph BFS',
    description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

Return the ordering of courses you should take to finish all courses. If it is impossible to finish all courses, return an empty array.`,
    examples: [
      {
        input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
        output: '[0,2,1,3]',
        explanation: 'There are a total of 4 courses. To take course 3 you should have finished both courses 1 and 2.'
      }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= numCourses * (numCourses - 1)',
      'All the pairs prerequisites[i] are unique.'
    ],
    googleHints: [
      'This is an in-degree topological sort problem (Kahn’s Algorithm).',
      'Detect cycles using a queue of vertices with zero in-degree.'
    ],
    starterCode: {
      python: `class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        # Implementation here
        pass`,
      typescript: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    // Implementation here
    return [];
}`,
      java: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        return new int[0];
    }
}`,
      cpp: `class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        return {};
    }
};`
    },
    testCases: [
      { id: 1, input: 'numCourses = 2, prerequisites = [[1,0]]', expected: '[0, 1]' },
      { id: 2, input: 'numCourses = 1, prerequisites = []', expected: '[0]' }
    ]
  }
];

export const INITIAL_TELEMETRY: TelemetryData = {
  eyeContact: 92,
  speakingPaceWpm: 138,
  fillerWords: 1,
  confidenceScore: 88,
  competencies: {
    algorithmSpeed: 84,
    edgeCases: 76,
    modularity: 82,
    articulation: 89,
    communication: 91,
    socraticResponse: 85
  }
};

export const MOCK_DIAGNOSTIC: DiagnosticResult = {
  sessionId: 'INT-9042',
  targetCompany: 'Google',
  role: 'Software Development Engineer - Campus Tier 1',
  verdict: 'Strong Hire',
  overallScore: 86,
  percentile: 94,
  metrics: {
    technicalAccuracy: 88,
    codeModularity: 82,
    communicationClarity: 89,
    edgeCaseResilience: 76
  },
  strengths: [
    'Identified optimal two-pointer sliding window approach within 3.5 minutes of problem disclosure.',
    'Proactively articulated space-time complexities: $O(N)$ runtime with amortized $O(K)$ auxiliary space.',
    'Handled boundary conditions (empty string, k = 0, unicode characters) without requiring evaluator prompts.'
  ],
  criticalAreas: [
    'Graph cycle detection in follow-up prompt had $O(V^2)$ latency; recommend mastering Kahn’s BFS in-degree queue.',
    'Hesitated for 16 seconds when probed on memory constraints in distributed cache synchronization.'
  ],
  skillGaps: [
    {
      topic: 'Dynamic Programming on Trees',
      score: 78,
      target: 85,
      delta: -7,
      status: 'Moderate Gap'
    },
    {
      topic: 'Graph Cycle & Topological Sort',
      score: 68,
      target: 90,
      delta: -22,
      status: 'Critical Gap'
    },
    {
      topic: 'Multi-Threading & Concurrency',
      score: 84,
      target: 80,
      delta: +4,
      status: 'Strong'
    },
    {
      topic: 'System Design & Scalable Caching',
      score: 74,
      target: 75,
      delta: -1,
      status: 'On Track'
    }
  ],
  sprintDays: [
    {
      day: 1,
      title: 'Advanced Graph Cycle Detection & Topological Sort',
      category: 'Critical Gap Repair',
      completed: true,
      timeEstimate: '1.5 hrs',
      tasks: [
        'Study Kahn’s in-degree queue implementation vs DFS 3-color cycle detection',
        'Solve LeetCode #207 (Course Schedule I) & #210 (Course Schedule II)',
        'Complete Google PYQ: Alien Dictionary (#269)'
      ]
    },
    {
      day: 2,
      title: 'Sliding Window & Two-Pointer Speed Drills',
      category: 'Speed Optimization',
      completed: true,
      timeEstimate: '1.2 hrs',
      tasks: [
        'Solve 3 Google Tier-1 string sliding window problems under 18 mins each',
        'Analyze amortized hash map resizing overhead in Python vs C++ STL',
        'Practice verbalizing loop invariants during continuous typing'
      ]
    },
    {
      day: 3,
      title: 'Simulated 90-Min Google OA Benchmark',
      category: 'High-Stakes Assessment',
      completed: false,
      timeEstimate: '2.0 hrs',
      tasks: [
        'Timed assessment: 2 algorithmic problems with strict time limits',
        'Zero external editor usage to simulate native Google OA environment',
        'Review comprehensive automated runtime telemetry'
      ]
    },
    {
      day: 4,
      title: 'Core CS Foundations: OS Primitives & Virtual Memory',
      category: 'Technical Articulation',
      completed: false,
      timeEstimate: '1.0 hr',
      tasks: [
        'Review Page Replacement algorithms (LRU, Clock, Second Chance)',
        'Revise Mutex, Semaphore, and Deadlock conditions (Coffman Criteria)',
        '10-minute rapid-fire voice articulation with PlacementAI Coach'
      ]
    },
    {
      day: 5,
      title: 'AI Mock Technical Interview 2 (Focus: Tree DP)',
      category: 'Live Room Simulation',
      completed: false,
      timeEstimate: '1.0 hr',
      tasks: [
        'Live whiteboard session with AI Evaluator Nova-6',
        'Problem theme: Binary Tree Maximum Path Sum & Tree Diameter',
        'Target: >85% score in Edge Case Resilience'
      ]
    },
    {
      day: 6,
      title: 'High-Level System Design & Distributed Caching',
      category: 'Architecture Deep-Dive',
      completed: false,
      timeEstimate: '1.5 hrs',
      tasks: [
        'Design a Distributed Key-Value Store with Consistent Hashing',
        'Analyze Cache Invalidation strategies (Write-through vs Write-back)',
        'Review Google BigTable and Spanner high-level architecture papers'
      ]
    },
    {
      day: 7,
      title: 'Final Full-Length Calibrated Benchmark Verification',
      category: 'Readiness Certification',
      completed: false,
      timeEstimate: '2.0 hrs',
      tasks: [
        'Full 4-hour simulated interview day (2 Tech Rounds + 1 Googliness)',
        'Generate Hiring Committee calibrated readiness scorecard',
        'Target: Attain Placement Readiness Index >= 90/100'
      ]
    }
  ]
};
