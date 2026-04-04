import React from 'react';
import { Session, Turn } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Copy, 
  Star, 
  Tag, 
  Archive, 
  Terminal, 
  Folder, 
  Cpu, 
  GitBranch,
  Wrench,
  Sparkles,
  Clock,
  RotateCcw,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface SessionDetailProps {
  session: Session | null;
}

export function SessionDetail({ session }: SessionDetailProps) {
  if (!session) {
    return (
      <div className="flex-1 bg-[var(--color-stone-paper)] flex flex-col items-center justify-center text-[var(--color-ink-faint)] z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.03)]">
        <div className="w-16 h-16 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-center justify-center mb-6 shadow-sm">
          <Terminal className="w-6 h-6 text-[var(--color-ink-faint)]" />
        </div>
        <p className="text-[13px] font-medium text-[var(--color-ink-muted)]">Select a session to view dossier</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={session.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex-1 bg-[var(--color-stone-paper)] flex h-full overflow-hidden relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.03)] border-l border-white/50"
      >
        {/* Main Reading Column */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto no-scrollbar relative">
          {/* Session Pulse - Visual Signature */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/[0.04] z-10">
            <motion.div 
              className="h-full bg-[var(--color-accent-cobalt)]/60 w-1/4"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
          </div>

          <div className="px-12 py-14 max-w-[860px] mx-auto w-full relative">
            {/* Margin Note / Index Mark */}
            <div className="absolute left-0 top-16 -ml-6 text-[9px] font-mono font-bold text-[var(--color-ink-faint)] tracking-[0.2em] origin-top-left -rotate-90 opacity-60 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[var(--color-ink-faint)]/50"></span>
              DOC.REF // {session.id.split('-')[0].toUpperCase()}
            </div>

            {/* Document Title */}
            <h1 className="text-[28px] font-bold text-[var(--color-ink-main)] leading-[1.3] tracking-tight mb-10 pr-8">
              {session.title}
            </h1>

            {/* AI Summary (Session Distillation) */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[var(--color-accent-cobalt)]" />
                <h4 className="text-[11px] font-bold text-[var(--color-accent-cobalt)] uppercase tracking-[0.15em]">Session Distillation</h4>
              </div>
              <div className="bg-white rounded-xl p-7 border border-[var(--color-accent-cobalt)]/[0.1] shadow-[0_2px_12px_rgba(37,99,235,0.03)] relative overflow-hidden">
                {/* Decorative subtle background element */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-accent-cobalt)]/[0.02] rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-6 relative z-10">
                  <div>
                    <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Executive Summary</div>
                    <p className="text-[14px] text-[var(--color-ink-main)] font-medium leading-relaxed">{session.summary}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-5 border-t border-black/[0.04]">
                    <div>
                      <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Key Actions</div>
                      <ul className="text-[13px] text-[var(--color-ink-muted)] space-y-1.5 list-disc list-inside">
                        <li>Analyzed project architecture</li>
                        <li>Implemented core logic</li>
                        <li>Resolved dependency conflicts</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Resume Recommendation</div>
                      <div className="flex items-start gap-2 text-[13px] text-[var(--color-ink-muted)] leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Safe to resume. Context is self-contained and dependencies are stable.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation History */}
            <div className="space-y-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-px flex-1 bg-black/[0.04]" />
                <span className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Activity Log</span>
                <div className="h-px flex-1 bg-black/[0.04]" />
              </div>
              {session.turns.map((turn, index) => (
                <TurnBlock key={turn.id} turn={turn} isLast={index === session.turns.length - 1} />
              ))}
              <div className="h-12"></div>
            </div>
          </div>
        </div>

        {/* Auxiliary Side Column */}
        <div className="w-[280px] flex-shrink-0 border-l border-black/[0.06] bg-[var(--color-stone-panel)]/40 flex flex-col h-full overflow-y-auto no-scrollbar relative z-10">
          {/* Action Area */}
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

          {/* Context Meta */}
          <div className="p-5 border-b border-black/[0.04] space-y-4">
            <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Context</div>
            
            <div className="space-y-3">
              <div>
                <div className="text-[11px] text-[var(--color-ink-faint)] mb-1">Project</div>
                <div className="flex items-center gap-2 text-[12px] font-medium text-[var(--color-ink-main)]">
                  <Folder className="w-3.5 h-3.5 text-[var(--color-ink-muted)]" />
                  <span className="truncate">{session.projectPath}</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[var(--color-ink-faint)] mb-1">Model</div>
                <div className="flex items-center gap-2 text-[12px] font-medium text-[var(--color-ink-main)]">
                  <Cpu className="w-3.5 h-3.5 text-[var(--color-ink-muted)]" />
                  {session.model}
                </div>
              </div>
              {session.branch !== '-' && (
                <div>
                  <div className="text-[11px] text-[var(--color-ink-faint)] mb-1">Branch</div>
                  <div className="flex items-center gap-2 text-[12px] font-medium text-[var(--color-ink-main)]">
                    <GitBranch className="w-3.5 h-3.5 text-[var(--color-ink-muted)]" />
                    <span className="truncate">{session.branch}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity & Tags */}
          <div className="p-5 border-b border-black/[0.04] space-y-4">
            <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Activity & Tags</div>
            
            <div className="flex flex-wrap gap-1.5 mb-4">
              {session.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-black/[0.04] text-[var(--color-ink-muted)] text-[11px] font-medium rounded border border-black/[0.04]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-2.5 text-[11px] text-[var(--color-ink-muted)]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" /> Last Opened</span>
                <span className="font-medium">{new Date(session.lastOpenedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" /> Resumed</span>
                <span className="font-medium">{session.resumeCount} times</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" /> Turns</span>
                <span className="font-medium">{session.turnCount}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-5">
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
                <Archive className="w-3.5 h-3.5" />
                Archive Session
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function TurnBlock({ turn, isLast }: { turn: Turn, isLast: boolean, key?: React.Key }) {
  const isUser = turn.role === 'user';
  const isTool = turn.role === 'tool';

  return (
    <div className="relative group">
      {/* Margin Note for Turn */}
      <div className="absolute -left-16 top-1 text-[9px] font-mono font-medium text-[var(--color-ink-faint)] opacity-0 group-hover:opacity-100 transition-opacity">
        {turn.timestamp || '00:00'}
      </div>

      {isTool ? (
        <div className="flex items-start gap-4 pl-8">
          <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-black/[0.04] group-last:hidden" />
          <div className="w-6 h-6 rounded bg-[var(--color-stone-panel)] border border-black/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm relative z-10">
            <Wrench className="w-3 h-3 text-[var(--color-ink-faint)]" />
          </div>
          <div className="flex-1 bg-[var(--color-stone-panel)] border border-black/[0.05] rounded-lg p-5 text-[13px] font-mono text-[var(--color-ink-muted)] shadow-sm transition-colors group-hover:border-black/[0.08]">
            <div className="text-[10px] font-sans font-bold text-[var(--color-ink-faint)] mb-2.5 uppercase tracking-wider flex items-center gap-2">
              Tool Execution
              <span className="text-[var(--color-ink-muted)] normal-case font-mono bg-black/[0.04] px-1.5 py-0.5 rounded">{turn.toolName}</span>
            </div>
            <div className="leading-relaxed">{turn.content}</div>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-5">
          <div className="absolute left-[15px] top-8 bottom-[-32px] w-px bg-black/[0.04] group-last:hidden" />
          <div className={cn(
            "w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-1 text-[11px] font-bold shadow-sm relative z-10 tracking-wider",
            isUser 
              ? "bg-[var(--color-ink-main)] text-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]" 
              : "bg-white text-[var(--color-accent-cobalt)] border border-[var(--color-accent-cobalt)]/20 shadow-[0_2px_4px_rgba(37,99,235,0.05)]"
          )}>
            {isUser ? 'USR' : 'SYS'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[11px] font-bold text-[var(--color-ink-main)] uppercase tracking-wider">
                {isUser ? 'User Input' : 'System Response'}
              </span>
            </div>
            <div className={cn(
              "text-[14px] leading-[1.8] whitespace-pre-wrap",
              isUser ? "text-[var(--color-ink-main)] font-medium" : "text-[var(--color-ink-muted)]"
            )}>
              {turn.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

