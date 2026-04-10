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
  AlertCircle,
  Loader2,
  Play,
  User,
  Tag,
  Clock
} from 'lucide-react';

interface DocumentPaneProps {
  session: SessionRecord | null;
}

export function DocumentPane({ session }: DocumentPaneProps) {
  if (!session) {
    return (
      <div className="flex-1 bg-[var(--color-bg-doc)] flex flex-col items-center justify-center text-[var(--color-text-faint)] z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.03)] border-l border-[var(--color-border-subtle)]">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-hover)] border border-[var(--color-border-subtle)] flex items-center justify-center mb-6 shadow-sm">
          <Terminal className="w-6 h-6 text-[var(--color-text-faint)]" />
        </div>
        <p className="text-[13px] font-medium text-[var(--color-text-muted)]">Select a session to view document</p>
      </div>
    );
  }

  const title = session.user.manualTitle || session.ai.summary.aiTitle || session.derived.fallbackTitle;
  const titleSource = session.user.manualTitle ? 'manual' : session.ai.summary.aiTitle ? 'ai' : 'fallback';
  
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
        className="flex-1 bg-[var(--color-bg-doc)] flex flex-col h-full overflow-hidden relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.03)] border-l border-[var(--color-border-subtle)]"
      >
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          
          <div className="px-12 py-8 max-w-[860px] mx-auto w-full">
            {/* Document Title */}
            <div className="mb-4 flex items-start gap-3">
              <h1 className="text-[28px] font-bold text-[var(--color-text-main)] leading-[1.3] tracking-tight">
                {title}
              </h1>
              {titleSource === 'manual' && (
                <div className="mt-2 flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-bg-hover)] border border-[var(--color-border-subtle)]" title="Manually titled">
                  <User className="w-3 h-3 text-[var(--color-text-muted)]" />
                </div>
              )}
              {titleSource === 'ai' && (
                <div className="mt-2 flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-accent-subtle)] border border-[var(--color-accent-main)]/20" title="AI generated title">
                  <Sparkles className="w-3 h-3 text-[var(--color-accent-main)]" />
                </div>
              )}
            </div>

            {/* Document Meta Band */}
            <div className="flex flex-col gap-4 mb-12 pb-8 border-b border-[var(--color-border-subtle)]">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-[13px] text-[var(--color-text-main)] font-medium">
                  <Folder className="w-4 h-4 text-[var(--color-text-muted)]" />
                  {session.raw.projectPath}
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[var(--color-text-main)] font-medium">
                  <Cpu className="w-4 h-4 text-[var(--color-text-muted)]" />
                  {session.raw.model}
                </div>
                {session.raw.branch && session.raw.branch !== '-' && (
                  <div className="flex items-center gap-2 text-[13px] text-[var(--color-text-main)] font-medium">
                    <GitBranch className="w-4 h-4 text-[var(--color-text-muted)]" />
                    {session.raw.branch}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-[12px] text-[var(--color-text-muted)]">
                <div className="flex items-center gap-4 font-mono text-[10px] tracking-wider uppercase text-[var(--color-text-faint)]">
                  <span>Updated {new Date(session.raw.updatedAt).toLocaleDateString()}</span>
                  <span>{session.raw.turnCount} Turns</span>
                </div>
              </div>

              {/* Tag Row */}
              {(session.user.manualTags.length > 0 || session.ai.tags.autoTags.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {session.user.manualTags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[var(--color-bg-raised)] border border-[var(--color-border-strong)] text-[var(--color-text-main)] text-[11px] font-medium rounded-md flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[var(--color-text-muted)]" />
                      {tag}
                    </span>
                  ))}
                  {session.ai.tags.autoTags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-transparent border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] text-[11px] font-medium rounded-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[var(--color-text-faint)]" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* AI Summary (Abstract) */}
            <div className="mb-14 relative">
              {session.ai.summary.status === 'completed' && session.ai.summary.summary && (
                <div className="bg-[var(--color-bg-raised)] rounded-xl p-6 border border-[var(--color-border-subtle)] shadow-sm">
                  <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-[var(--color-accent-main)]/40 rounded-r-full" />
                  <div className="pl-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-[var(--color-accent-main)]" />
                      <h4 className="text-[11px] font-bold text-[var(--color-accent-main)] uppercase tracking-[0.15em]">Session Abstract</h4>
                      {isSummaryStale && (
                        <span className="px-1.5 py-0.5 bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] text-[9px] font-bold uppercase tracking-wider rounded border border-[var(--color-warning-text)]/20 ml-2">
                          Stale
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] text-[var(--color-text-main)] font-medium leading-relaxed mb-5">
                      {session.ai.summary.summary}
                    </p>
                    <div className="flex items-start gap-8 text-[13px]">
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider mb-2">Key Actions</div>
                        <ul className="text-[var(--color-text-muted)] space-y-1.5 list-disc list-inside">
                          {session.ai.summary.summaryBullets?.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          )) || <li>No specific actions recorded.</li>}
                        </ul>
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider mb-2">Next Step</div>
                        <div className="flex items-start gap-1.5 text-[var(--color-text-muted)] leading-snug">
                          <Play className="w-4 h-4 text-[var(--color-accent-main)] flex-shrink-0 mt-0.5" />
                          <span>{session.ai.summary.resumeRecommendation || 'No recommendation provided.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {session.ai.summary.status === 'generating' && (
                <div className="bg-[var(--color-bg-raised)] rounded-xl p-6 border border-[var(--color-border-subtle)] shadow-sm flex items-center gap-4">
                  <Loader2 className="w-5 h-5 text-[var(--color-accent-main)] animate-spin" />
                  <span className="text-[13px] font-medium text-[var(--color-text-muted)]">Generating session abstract...</span>
                </div>
              )}

              {session.ai.summary.status === 'none' && (
                <div className="bg-[var(--color-bg-raised)] rounded-xl p-6 border border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                    <Sparkles className="w-4 h-4 opacity-50" />
                    <span className="text-[13px] font-medium">No AI abstract generated for this session.</span>
                  </div>
                  <button className="text-[12px] font-medium text-[var(--color-accent-main)] hover:underline">
                    Generate Now
                  </button>
                </div>
              )}

              {session.ai.summary.status === 'failed' && (
                <div className="bg-[var(--color-error-bg)] rounded-xl p-6 border border-[var(--color-error-text)]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[var(--color-error-text)]">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[13px] font-medium">Failed to generate abstract.</span>
                  </div>
                  <button className="text-[12px] font-medium text-[var(--color-error-text)] hover:underline">
                    Retry
                  </button>
                </div>
              )}
            </div>

            {/* Conversation History (Activity Log) */}
            <div className="space-y-0">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider">Activity Log</span>
                <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
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
        <div className="absolute left-[11px] top-8 bottom-[-16px] w-px bg-[var(--color-border-subtle)]" />
      )}

      {/* Role Indicator */}
      <div className="relative z-10 flex flex-col items-center mt-1">
        <div className={cn(
          "w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold tracking-wider shadow-sm",
          isUser ? "bg-[var(--color-text-main)] text-[var(--color-bg-doc)]" : 
          isTool ? "bg-[var(--color-bg-raised)] border border-[var(--color-border-strong)] text-[var(--color-text-faint)]" :
          "bg-[var(--color-bg-doc)] border border-[var(--color-accent-main)]/30 text-[var(--color-accent-main)]"
        )}>
          {isUser ? 'U' : isTool ? <Wrench className="w-3 h-3"/> : 'AI'}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[11px] font-bold text-[var(--color-text-main)] uppercase tracking-wider">
            {isUser ? 'User' : isTool ? 'System Tool' : 'Assistant'}
          </span>
          {isTool && (
            <span className="text-[10px] font-mono bg-[var(--color-bg-hover)] px-1.5 py-0.5 rounded text-[var(--color-text-muted)]">
              {turn.toolName}
            </span>
          )}
          <span className="text-[10px] font-mono font-medium text-[var(--color-text-faint)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            {new Date(turn.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {isTool ? (
          <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg p-4 text-[12px] font-mono text-[var(--color-text-muted)] leading-relaxed shadow-sm">
            {turn.content}
          </div>
        ) : (
          <div className={cn(
            "text-[14px] leading-[1.7] whitespace-pre-wrap",
            isUser ? "text-[var(--color-text-main)] font-medium" : "text-[var(--color-text-muted)]"
          )}>
            {turn.content}
          </div>
        )}
      </div>
    </div>
  );
}
