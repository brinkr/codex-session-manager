export type SessionId = string;
export type ISODateTime = string;

export type MessageRole = 'user' | 'assistant' | 'tool' | 'system';

export type SummaryStatus = 'none' | 'generating' | 'completed' | 'failed';
export type AutoTagStatus = 'none' | 'generating' | 'completed' | 'failed';
export type RelatedStatus = 'none' | 'generating' | 'completed' | 'failed';

export type GeneratorKind =
  | 'local-model'
  | 'company-gateway'
  | 'openai'
  | 'manual-import'
  | 'unknown';

export type ScenarioKind =
  | 'troubleshooting'
  | 'architecture'
  | 'devops'
  | 'research'
  | 'frontend'
  | 'backend'
  | 'data'
  | 'uncategorized';

export interface SessionMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: ISODateTime;
  toolName?: string;
  toolStatus?: 'running' | 'completed' | 'failed';
}

export interface SessionRaw {
  sessionId: SessionId;
  sourcePath: string;
  cwd: string;
  projectPath: string;
  projectName: string;
  repoName?: string;
  branch?: string;
  model?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  turnCount: number;
  firstUserMessage?: string;
  messages: SessionMessage[];
}

export interface SessionDerived {
  fallbackTitle: string;
  snippet: string;
  basicKeywords: string[];
  pathSegments: string[];
  hasToolCalls: boolean;
  activityLevel: 'low' | 'medium' | 'high';
}

export interface SessionSummaryAugmentation {
  status: SummaryStatus;
  aiTitle?: string;
  summary?: string;
  summaryBullets?: string[];
  resumeRecommendation?: string;
  generatedAt?: ISODateTime;
  generator?: GeneratorKind;
  inputHash?: string;
  messageCountAtGeneration?: number;
  errorMessage?: string;
}

export interface SessionTagAugmentation {
  status: AutoTagStatus;
  autoTags: string[];
  scenarioClassification?: ScenarioKind;
  generatedAt?: ISODateTime;
  generator?: GeneratorKind;
  errorMessage?: string;
}

export interface SessionRelatedAugmentation {
  status: RelatedStatus;
  relatedSessionIds: SessionId[];
  generatedAt?: ISODateTime;
  generator?: GeneratorKind;
  errorMessage?: string;
}

export interface SessionAI {
  summary: SessionSummaryAugmentation;
  tags: SessionTagAugmentation;
  related: SessionRelatedAugmentation;
}

export interface SessionUser {
  manualTitle?: string;
  manualTags: string[];
  suppressedAutoTags: string[];
  starred: boolean;
  archived: boolean;
  pinned: boolean;
  note?: string;
  lastOpenedAt?: ISODateTime;
  resumeCount: number;
}

export interface SessionRecord {
  raw: SessionRaw;
  derived: SessionDerived;
  ai: SessionAI;
  user: SessionUser;
}

export type ViewState = 
  | { type: 'all' }
  | { type: 'starred' }
  | { type: 'archived' }
  | { type: 'tag'; value: string }
  | { type: 'project'; value: string }
  | { type: 'scenario'; value: ScenarioKind };
