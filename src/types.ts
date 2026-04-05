export type Role = 'user' | 'assistant' | 'tool';

export interface Turn {
  id: string;
  role: Role;
  content: string;
  toolName?: string;
  timestamp?: string;
}

export interface Session {
  id: string;
  
  // Titles
  manualTitle?: string;
  fallbackTitle: string;
  
  // Content
  firstPrompt: string;
  turns: Turn[];
  
  // AI Augmentation
  summaryStatus: 'none' | 'generating' | 'completed' | 'failed';
  summary?: string;
  autoTags: string[];
  
  // User Data
  manualTags: string[];
  note?: string;
  isStarred: boolean;
  isArchived: boolean;
  
  // Metadata
  updatedAt: string;
  lastOpenedAt: string;
  projectPath: string;
  projectName: string;
  turnCount: number;
  resumeCount: number;
  model: string;
  branch: string;
}

export type ViewState = 
  | { type: 'all' }
  | { type: 'starred' }
  | { type: 'archived' }
  | { type: 'tag'; value: string }
  | { type: 'project'; value: string };
