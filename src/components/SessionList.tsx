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
      <div className="w-80 flex-shrink-0 border-r border-zinc-200 bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
          <MessageSquare className="w-5 h-5 text-zinc-400" />
        </div>
        <h3 className="text-sm font-medium text-zinc-900 mb-1">No sessions found</h3>
        <p className="text-xs text-zinc-500">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="w-80 flex-shrink-0 border-r border-zinc-200 bg-white flex flex-col h-full">
      {/* List Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-zinc-200/50 bg-white/80 backdrop-blur z-10 sticky top-0">
        <span className="text-xs font-medium text-zinc-500">{sessions.length} Sessions</span>
        <button className="text-xs text-zinc-400 hover:text-zinc-600 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Sort by Recent
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => {
          const isSelected = session.id === selectedId;
          return (
            <button
              key={session.id}
              onClick={() => onSelect(session.id)}
              className={cn(
                "w-full text-left p-4 border-b border-zinc-100 transition-all relative group",
                isSelected 
                  ? "bg-blue-50/50" 
                  : "hover:bg-zinc-50 bg-white"
              )}
            >
              {/* Active Indicator Line */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600" />
              )}

              <div className="flex justify-between items-start mb-1">
                <h3 className={cn(
                  "text-sm font-medium leading-tight line-clamp-1 pr-4",
                  isSelected ? "text-blue-900" : "text-zinc-900"
                )}>
                  {session.title}
                </h3>
                {session.isStarred && (
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0 mt-0.5" />
                )}
              </div>

              <div className="text-xs text-zinc-500 line-clamp-2 mb-2 leading-relaxed">
                {session.firstPrompt}
              </div>

              <div className="flex items-center justify-between mt-auto pt-1">
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                  <span className="truncate max-w-[100px]">{session.projectName}</span>
                  {session.branch !== '-' && (
                    <span className="flex items-center gap-0.5 truncate max-w-[80px]">
                      <GitBranch className="w-3 h-3" />
                      {session.branch}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span>{session.turnCount} turns</span>
                  <span>•</span>
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
