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
  title: string;
  firstPrompt: string;
  summary: string;
  updatedAt: string;
  projectPath: string;
  projectName: string;
  turnCount: number;
  isStarred: boolean;
  isArchived: boolean;
  tags: string[];
  turns: Turn[];
  model: string;
  branch: string;
}

export type ViewState = 
  | { type: 'all' }
  | { type: 'starred' }
  | { type: 'archived' }
  | { type: 'tag'; value: string }
  | { type: 'project'; value: string };
