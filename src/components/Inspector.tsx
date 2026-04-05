import React from 'react';
import { Session } from '../types';
import { cn } from '../lib/utils';
import { 
  Play, 
  Copy, 
  Star, 
  Tag, 
  Archive, 
  Terminal, 
  Sparkles,
  Clock,
  RotateCcw,
  Activity,
  FileText
} from 'lucide-react';

interface InspectorProps {
  session: Session | null;
}

export function Inspector({ session }: InspectorProps) {
  if (!session) {
    return (
      <div className="w-[280px] flex-shrink-0 border-l border-black/[0.06] bg-[var(--color-stone-panel)]/40 flex flex-col h-full z-10">
        {/* Empty state */}
      </div>
    );
  }

  return (
    <div className="w-[280px] flex-shrink-0 border-l border-black/[0.06] bg-[var(--color-stone-panel)]/40 flex flex-col h-full overflow-y-auto no-scrollbar relative z-10">
      
      {/* Primary Actions */}
      <div className="p-5 border-b border-black/[0.04] bg-white/40 backdrop-blur-md sticky top-0 z-20">
        <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-accent-cobalt)] hover:bg-[#1D4ED8] text-white px-4 py-3 rounded-xl text-[13px] font-medium transition-all shadow-[0_2px_4px_rgba(37,99,235,0.2),0_4px_8px_rgba(37,99,235,0.1)] hover:shadow-[0_4px_8px_rgba(37,99,235,0.2),0_8px_16px_rgba(37,99,235,0.1)] hover:-translate-y-[0.5px] mb-3">
          <Play className="w-4 h-4 fill-current" />
          Resume Session
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-1.5 bg-white border border-black/[0.08] hover:bg-black/[0.02] text-[var(--color-ink-main)] px-3 py-2 rounded-lg text-[11px] font-medium transition-all shadow-sm">
            <Terminal className="w-3.5 h-3.5" />
            Terminal
          </button>
          <button className="flex items-center justify-center gap-1.5 bg-white border border-black/[0.08] hover:bg-black/[0.02] text-[var(--color-ink-main)] px-3 py-2 rounded-lg text-[11px] font-medium transition-all shadow-sm">
            <Copy className="w-3.5 h-3.5" />
            Copy Cmd
          </button>
        </div>
      </div>

      {/* User Management */}
      <div className="p-5 border-b border-black/[0.04]">
        <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-3">Manage</div>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 text-[12px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] rounded-md transition-colors">
            <Star className={cn("w-3.5 h-3.5", session.isStarred && "fill-[#D4AF37] text-[#D4AF37]")} />
            {session.isStarred ? 'Unstar Session' : 'Star Session'}
          </button>
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 text-[12px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] rounded-md transition-colors">
            <Tag className="w-3.5 h-3.5" />
            Edit Tags
          </button>
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 text-[12px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] rounded-md transition-colors">
            <FileText className="w-3.5 h-3.5" />
            Add Note
          </button>
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 text-[12px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] rounded-md transition-colors">
            <Archive className="w-3.5 h-3.5" />
            Archive Session
          </button>
        </div>
      </div>

      {/* AI Augmentation Status */}
      <div className="p-5 border-b border-black/[0.04]">
        <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-3">AI Augmentation</div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-[var(--color-ink-faint)]">Abstract Status</span>
              <span className={cn(
                "text-[10px] font-mono px-1.5 py-0.5 rounded",
                session.summaryStatus === 'completed' ? "bg-emerald-100 text-emerald-700" :
                session.summaryStatus === 'generating' ? "bg-blue-100 text-blue-700" :
                session.summaryStatus === 'failed' ? "bg-red-100 text-red-700" :
                "bg-black/[0.04] text-[var(--color-ink-muted)]"
              )}>
                {session.summaryStatus}
              </span>
            </div>
            {session.summaryStatus !== 'generating' && (
              <button className="text-[11px] font-medium text-[var(--color-accent-cobalt)] hover:underline flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {session.summaryStatus === 'completed' ? 'Regenerate' : 'Generate Now'}
              </button>
            )}
          </div>

          <div>
            <div className="text-[11px] text-[var(--color-ink-faint)] mb-1.5">Auto Tags</div>
            {session.autoTags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {session.autoTags.map(tag => (
                  <span key={tag} className="px-1.5 py-0.5 bg-[var(--color-accent-cobalt)]/10 text-[var(--color-accent-cobalt)] text-[10px] font-medium rounded border border-[var(--color-accent-cobalt)]/20">
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-[11px] text-[var(--color-ink-muted)]">None generated</span>
            )}
          </div>
        </div>
      </div>

      {/* Supplementary Context (Minimal) */}
      <div className="p-5">
        <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-3">Activity</div>
        <div className="space-y-2.5 text-[11px] text-[var(--color-ink-muted)]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" /> Last Opened</span>
            <span className="font-medium">{new Date(session.lastOpenedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" /> Resumed</span>
            <span className="font-medium">{session.resumeCount} times</span>
          </div>
        </div>
      </div>

    </div>
  );
}
