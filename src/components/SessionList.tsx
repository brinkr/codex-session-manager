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
          <MessageSquare className="w-5 h-5 text-[var(--color-ink-faint)]" />
        </div>
        <h3 className="text-sm font-medium text-[var(--color-ink-main)] mb-1">No sessions found</h3>
        <p className="text-xs text-[var(--color-ink-muted)]">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="w-[340px] flex-shrink-0 border-r border-black/[0.06] bg-[var(--color-stone-panel)] flex flex-col h-full z-10 shadow-[-10px_0_20px_rgba(0,0,0,0.02)_inset]">
      {/* List Header */}
      <div className="h-12 flex items-center justify-between px-5 border-b border-black/[0.04] bg-[var(--color-stone-panel)]/80 backdrop-blur z-10 sticky top-0">
        <span className="text-[11px] font-semibold text-[var(--color-ink-faint)] uppercase tracking-wider">{sessions.length} Dossiers</span>
        <button className="text-[11px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] flex items-center gap-1.5 transition-colors">
          <Clock className="w-3.5 h-3.5" />
          Recent
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4 p-2 space-y-1">
        {sessions.map((session) => {
          const isSelected = session.id === selectedId;
          return (
            <button
              key={session.id}
              onClick={() => onSelect(session.id)}
              className={cn(
                "w-full text-left px-4 py-3.5 rounded-xl transition-all relative group outline-none",
                isSelected 
                  ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] border border-black/[0.04] z-10" 
                  : "hover:bg-black/[0.02] border border-transparent"
              )}
            >
              {/* Active Indicator Line */}
              {isSelected && (
                <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-[var(--color-accent-cobalt)]" />
              )}

              <div className="flex justify-between items-start mb-1">
                <div className="text-[9px] font-mono font-bold text-[var(--color-ink-faint)] tracking-widest uppercase">
                  REF // {session.id.split('-')[0]}
                </div>
                {session.isStarred && (
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37] flex-shrink-0 opacity-80" />
                )}
              </div>

              <h3 className={cn(
                "text-[14px] font-semibold leading-snug line-clamp-1 pr-4 tracking-tight mb-1.5",
                isSelected ? "text-[var(--color-ink-main)]" : "text-[var(--color-ink-main)]/80 group-hover:text-[var(--color-ink-main)]"
              )}>
                {session.title}
              </h3>

              <div className={cn(
                "text-[13px] line-clamp-2 mb-3 leading-relaxed transition-colors",
                isSelected ? "text-[var(--color-ink-muted)]" : "text-[var(--color-ink-faint)] group-hover:text-[var(--color-ink-muted)]"
              )}>
                {session.firstPrompt}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-[var(--color-ink-faint)]">
                  <span className="truncate max-w-[100px] bg-black/[0.03] px-1.5 py-0.5 rounded text-[var(--color-ink-muted)]">{session.projectName}</span>
                  {session.branch !== '-' && (
                    <span className="flex items-center gap-1 truncate max-w-[80px]">
                      <GitBranch className="w-3 h-3" />
                      {session.branch}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[var(--color-ink-faint)] font-medium">
                  <span>{session.turnCount} turns</span>
                  <span className="w-1 h-1 rounded-full bg-black/10"></span>
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

