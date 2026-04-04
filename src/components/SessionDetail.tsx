import React from 'react';
import { Session, Turn } from '../types';
import { cn } from '../lib/utils';
import { 
  Play, 
  Copy, 
  Star, 
  Tag, 
  Archive, 
  MoreHorizontal, 
  Terminal, 
  Folder, 
  Cpu, 
  GitBranch,
  Wrench
} from 'lucide-react';

interface SessionDetailProps {
  session: Session | null;
}

export function SessionDetail({ session }: SessionDetailProps) {
  if (!session) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center text-zinc-400">
        <Terminal className="w-12 h-12 mb-4 text-zinc-200" />
        <p>Select a session to view details</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden relative">
      {/* Header Area */}
      <div className="flex-shrink-0 border-b border-zinc-200 bg-white z-10">
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-xl font-semibold text-zinc-900 leading-tight pr-8">
              {session.title}
            </h1>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-zinc-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors">
                <Star className={cn("w-4 h-4", session.isStarred && "fill-amber-400 text-amber-400")} />
              </button>
              <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors">
                <Tag className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors">
                <Archive className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 font-mono">
            <div className="flex items-center gap-1.5 bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
              <Folder className="w-3.5 h-3.5 text-zinc-400" />
              <span className="truncate max-w-[200px]">{session.projectPath}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>{session.model}</span>
            </div>
            {session.branch !== '-' && (
              <div className="flex items-center gap-1.5 bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
                <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
                <span>{session.branch}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {session.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[11px] rounded-full border border-zinc-200/60">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-3 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
              <Play className="w-4 h-4 fill-current" />
              Resume Session
            </button>
            <button className="flex items-center gap-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
              <Terminal className="w-4 h-4" />
              Open in Terminal
            </button>
          </div>
          <button className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-md hover:bg-zinc-100 transition-colors" title="Copy Resume Command">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Smart Summary Area (Optional, but good for context) */}
      <div className="px-6 py-4 bg-blue-50/30 border-b border-blue-100/50 flex-shrink-0">
        <h4 className="text-xs font-semibold text-blue-800 mb-1 uppercase tracking-wider">AI Summary</h4>
        <p className="text-sm text-zinc-600 leading-relaxed">{session.summary}</p>
      </div>

      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {session.turns.map((turn, index) => (
          <TurnBlock key={turn.id} turn={turn} isLast={index === session.turns.length - 1} />
        ))}
        
        {/* Fade out at bottom to indicate more history if truncated, or just padding */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}

function TurnBlock({ turn, isLast }: { turn: Turn, isLast: boolean, key?: React.Key }) {
  if (turn.role === 'tool') {
    return (
      <div className="flex items-start gap-3 pl-10">
        <div className="w-6 h-6 rounded bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Wrench className="w-3 h-3 text-zinc-500" />
        </div>
        <div className="flex-1 bg-zinc-50 border border-zinc-100 rounded-md p-3 text-sm font-mono text-zinc-500">
          <div className="text-xs font-sans font-medium text-zinc-400 mb-1">Tool Call: {turn.toolName}</div>
          {turn.content}
        </div>
      </div>
    );
  }

  const isUser = turn.role === 'user';

  return (
    <div className={cn("flex items-start gap-4", isUser ? "" : "")}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium",
        isUser ? "bg-zinc-800 text-white" : "bg-blue-100 text-blue-700 border border-blue-200"
      )}>
        {isUser ? 'U' : 'AI'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-zinc-900">
            {isUser ? 'You' : 'Assistant'}
          </span>
          {turn.timestamp && (
            <span className="text-xs text-zinc-400">{turn.timestamp}</span>
          )}
        </div>
        <div className={cn(
          "text-sm leading-relaxed whitespace-pre-wrap",
          isUser ? "text-zinc-700" : "text-zinc-800"
        )}>
          {turn.content}
        </div>
      </div>
    </div>
  );
}
