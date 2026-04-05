import React from 'react';
import { SessionRecord, SessionMessage } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Folder, 
  Cpu, 
  GitBranch,
  Wrench,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Play
} from 'lucide-react';

interface DocumentPaneProps {
  session: SessionRecord | null;
}

export function DocumentPane({ session }: DocumentPaneProps) {
  if (!session) {
    return (
      <div className="flex-1 bg-[var(--color-stone-paper)] flex flex-col items-center justify-center text-[var(--color-ink-faint)] z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.03)] border-l border-white/50">
        <div className="w-16 h-16 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-center justify-center mb-6 shadow-sm">
          <Terminal className="w-6 h-6 text-[var(--color-ink-faint)]" />
        </div>
        <p className="text-[13px] font-medium text-[var(--color-ink-muted)]">Select a session to view document</p>
      </div>
    );
  }

  const title = session.user.manualTitle || session.ai.summary.aiTitle || session.derived.fallbackTitle;
  const isSummaryStale = session.ai.summary.status === 'completed' && 
    (session.ai.summary.messageCountAtGeneration !== undefined && session.raw.turnCount > session.ai.summary.messageCountAtGeneration);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={session.raw.sessionId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex-1 bg-[var(--color-stone-paper)] flex flex-col h-full overflow-hidden relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.03)] border-l border-white/50"
      >
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          
          <div className="px-12 py-16 max-w-[860px] mx-auto w-full">
            {/* Document Title */}
            <h1 className="text-[28px] font-bold text-[var(--color-ink-main)] leading-[1.3] tracking-tight mb-6">
              {title}
            </h1>

            {/* Document Meta Band */}
            <div className="flex flex-col gap-4 mb-12 pb-8 border-b border-black/[0.06]">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-[13px] text-[var(--color-ink-main)] font-medium">
                  <Folder className="w-4 h-4 text-[var(--color-ink-muted)]" />
                  {session.raw.projectPath}
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[var(--color-ink-main)] font-medium">
                  <Cpu className="w-4 h-4 text-[var(--color-ink-muted)]" />
                  {session.raw.model}
                </div>
                {session.raw.branch && session.raw.branch !== '-' && (
                  <div className="flex items-center gap-2 text-[13px] text-[var(--color-ink-main)] font-medium">
                    <GitBranch className="w-4 h-4 text-[var(--color-ink-muted)]" />
                    {session.raw.branch}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-[12px] text-[var(--color-ink-muted)]">
                <div className="flex items-center gap-4 font-mono text-[10px] tracking-wider uppercase text-[var(--color-ink-faint)]">
                  <span>Updated {new Date(session.raw.updatedAt).toLocaleDateString()}</span>
                  <span>{session.raw.turnCount} Turns</span>
                </div>
              </div>
            </div>

            {/* AI Summary (Abstract) */}
            <div className="mb-14 relative">
              {session.ai.summary.status === 'completed' && session.ai.summary.summary && (
                <div className="bg-[var(--color-stone-panel)]/40 rounded-xl p-6 border border-black/[0.03]">
                  <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-[var(--color-accent-cobalt)]/40 rounded-r-full" />
                  <div className="pl-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-[var(--color-accent-cobalt)]" />
                      <h4 className="text-[11px] font-bold text-[var(--color-accent-cobalt)] uppercase tracking-[0.15em]">Session Abstract</h4>
                      {isSummaryStale && (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold uppercase tracking-wider rounded border border-amber-200 ml-2">
                          Stale
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] text-[var(--color-ink-main)] font-medium leading-relaxed mb-5">
                      {session.ai.summary.summary}
                    </p>
                    <div className="flex items-start gap-8 text-[13px]">
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Key Actions</div>
                        <ul className="text-[var(--color-ink-muted)] space-y-1.5 list-disc list-inside">
                          {session.ai.summary.summaryBullets?.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          )) || <li>No specific actions recorded.</li>}
                        </ul>
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Next Step</div>
                        <div className="flex items-start gap-1.5 text-[var(--color-ink-muted)] leading-snug">
                          <Play className="w-4 h-4 text-[var(--color-accent-cobalt)] flex-shrink-0 mt-0.5" />
                          <span>{session.ai.summary.resumeRecommendation || 'No recommendation provided.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {session.ai.summary.status === 'generating' && (
                <div className="bg-[var(--color-stone-panel)]/40 rounded-xl p-6 border border-black/[0.03] flex items-center gap-4">
                  <Loader2 className="w-5 h-5 text-[var(--color-accent-cobalt)] animate-spin" />
                  <span className="text-[13px] font-medium text-[var(--color-ink-muted)]">Generating session abstract...</span>
                </div>
              )}

              {session.ai.summary.status === 'none' && (
                <div className="bg-[var(--color-stone-panel)]/20 rounded-xl p-6 border border-black/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[var(--color-ink-muted)]">
                    <Sparkles className="w-4 h-4 opacity-50" />
                    <span className="text-[13px] font-medium">No AI abstract generated for this session.</span>
                  </div>
                  <button className="text-[12px] font-medium text-[var(--color-accent-cobalt)] hover:underline">
                    Generate Now
                  </button>
                </div>
              )}

              {session.ai.summary.status === 'failed' && (
                <div className="bg-red-50 rounded-xl p-6 border border-red-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[13px] font-medium">Failed to generate abstract.</span>
                  </div>
                  <button className="text-[12px] font-medium text-red-600 hover:underline">
                    Retry
                  </button>
                </div>
              )}
            </div>

            {/* Conversation History (Activity Log) */}
            <div className="space-y-0">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Activity Log</span>
                <div className="h-px flex-1 bg-black/[0.04]" />
              </div>
              
              <div className="pb-12">
                {session.raw.messages.map((msg, index) => (
                  <TurnBlock key={msg.id} turn={msg} isLast={index === session.raw.messages.length - 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function TurnBlock({ turn, isLast }: { turn: SessionMessage, isLast: boolean, key?: React.Key }) {
  const isUser = turn.role === 'user';
  const isTool = turn.role === 'tool';

  return (
    <div className="relative flex items-start gap-5 group">
      {/* Continuous Thread Line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-[-16px] w-px bg-black/[0.06]" />
      )}

      {/* Role Indicator */}
      <div className="relative z-10 flex flex-col items-center mt-1">
        <div className={cn(
          "w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold tracking-wider shadow-sm",
          isUser ? "bg-[var(--color-ink-main)] text-white" : 
          isTool ? "bg-[var(--color-stone-panel)] border border-black/[0.08] text-[var(--color-ink-faint)]" :
          "bg-white border border-[var(--color-accent-cobalt)]/30 text-[var(--color-accent-cobalt)]"
        )}>
          {isUser ? 'U' : isTool ? <Wrench className="w-3 h-3"/> : 'AI'}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[11px] font-bold text-[var(--color-ink-main)] uppercase tracking-wider">
            {isUser ? 'User' : isTool ? 'System Tool' : 'Assistant'}
          </span>
          {isTool && (
            <span className="text-[10px] font-mono bg-black/[0.04] px-1.5 py-0.5 rounded text-[var(--color-ink-muted)]">
              {turn.toolName}
            </span>
          )}
          <span className="text-[10px] font-mono font-medium text-[var(--color-ink-faint)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            {new Date(turn.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {isTool ? (
          <div className="bg-[var(--color-stone-panel)]/40 border border-black/[0.04] rounded-lg p-4 text-[12px] font-mono text-[var(--color-ink-muted)] leading-relaxed">
            {turn.content}
          </div>
        ) : (
          <div className={cn(
            "text-[14px] leading-[1.7] whitespace-pre-wrap",
            isUser ? "text-[var(--color-ink-main)] font-medium" : "text-[var(--color-ink-muted)]"
          )}>
            {turn.content}
          </div>
        )}
      </div>
    </div>
  );
}
