import React from 'react';
import { Session } from '../types';
import { cn } from '../lib/utils';
import { Star, MessageSquare, GitBranch, Clock } from 'lucide-react';

interface SessionListProps {
  sessions: Session[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SessionList({ sessions, selectedId, onSelect }: SessionListProps) {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (sessions.length === 0) {
    return (
      <div className="w-[340px] flex-shrink-0 border-r border-black/[0.06] bg-[var(--color-stone-panel)] flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="w-12 h-12 rounded-full bg-black/[0.03] flex items-center justify-center mb-4">
          <MessageSquare className="w-5 h-5 text-zinc-400" />
        </div>
        <h3 className="text-sm font-medium text-zinc-900 mb-1">No sessions found</h3>
        <p className="text-xs text-zinc-500">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="w-[340px] flex-shrink-0 border-r border-black/[0.06] bg-[var(--color-stone-panel)] flex flex-col h-full z-10 shadow-[-10px_0_20px_rgba(0,0,0,0.02)_inset]">
      {/* List Header */}
      <div className="h-12 flex items-center justify-between px-5 border-b border-black/[0.04] bg-[var(--color-stone-panel)]/80 backdrop-blur z-10 sticky top-0">
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">{sessions.length} Sessions</span>
        <button className="text-[11px] font-medium text-zinc-400 hover:text-zinc-600 flex items-center gap-1.5 transition-colors">
          <Clock className="w-3.5 h-3.5" />
          Recent
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        {sessions.map((session) => {
          const isSelected = session.id === selectedId;
          return (
            <button
              key={session.id}
              onClick={() => onSelect(session.id)}
              className={cn(
                "w-full text-left px-5 py-4 border-b border-black/[0.03] transition-all relative group outline-none",
                isSelected 
                  ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] z-10" 
                  : "hover:bg-white/50"
              )}
            >
              {/* Active Indicator Line */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2563EB]" />
              )}

              <div className="flex justify-between items-start mb-1.5">
                <h3 className={cn(
                  "text-[14px] font-semibold leading-snug line-clamp-1 pr-4 tracking-tight",
                  isSelected ? "text-zinc-900" : "text-zinc-800 group-hover:text-zinc-900"
                )}>
                  {session.title}
                </h3>
                {session.isStarred && (
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37] flex-shrink-0 mt-0.5 opacity-80" />
                )}
              </div>

              <div className={cn(
                "text-[13px] line-clamp-2 mb-3 leading-relaxed transition-colors",
                isSelected ? "text-zinc-600" : "text-zinc-500 group-hover:text-zinc-600"
              )}>
                {session.firstPrompt}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-zinc-400">
                  <span className="truncate max-w-[100px] bg-black/[0.03] px-1.5 py-0.5 rounded text-zinc-500">{session.projectName}</span>
                  {session.branch !== '-' && (
                    <span className="flex items-center gap-1 truncate max-w-[80px]">
                      <GitBranch className="w-3 h-3" />
                      {session.branch}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                  <span>{session.turnCount} turns</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                  <span>{formatDate(session.updatedAt)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

