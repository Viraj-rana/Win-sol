
export enum Severity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL'
}

export enum ReviewStatus {
  APPROVE = 'APPROVE',
  REQUEST_CHANGES = 'REQUEST_CHANGES',
  PENDING = 'PENDING'
}

export interface ReviewIssue {
  line?: number;
  codeSnippet: string;
  message: string;
  severity: Severity;
  ruleReference?: string;
  suggestedFix?: string;
}

export interface ReviewResult {
  summary: string;
  status: ReviewStatus;
  issues: ReviewIssue[];
  markdownReport: string;
  impactGraphMermaid?: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  author: string;
  projectName: string;
  status: ReviewStatus;
  summary: string;
  result: ReviewResult;
}

export interface ProjectAnalysisResult {
  projectName: string;
  description: string;
  techStack: string[];
  architecture: string;
  keyFeatures: string[];
  suggestedReadme: string;
  impactGraphMermaid?: string;
}

export interface PipelineConfig {
  blockOnWarning: boolean;
  model: string;
}

export interface ExternalMR {
  id: string;
  number: number;
  title: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  url: string;
  sourceBranch: string;
  targetBranch: string;
  platform: 'github' | 'gitlab';
  repo: string;
}
