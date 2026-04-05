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
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';

interface SessionDetailProps {
  session: Session | null;
}

export function SessionDetail({ session }: SessionDetailProps) {
  if (!session) {
    return (
      <div className="flex-1 bg-[var(--color-stone-paper)] flex flex-col items-center justify-center text-[var(--color-ink-faint)] z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.03)] border-l border-white/50">
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
        className="flex-1 bg-[var(--color-stone-paper)] flex flex-col h-full overflow-hidden relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.03)] border-l border-white/50"
      >
        {/* Top Action Bar (Sticky Document Header) */}
        <div className="flex-shrink-0 px-8 py-4 flex items-center justify-between border-b border-black/[0.04] bg-white/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-[var(--color-ink-faint)] tracking-[0.2em] uppercase">
            <span className="w-4 h-[1px] bg-[var(--color-ink-faint)]/50"></span>
            DOC.REF // {session.id.split('-')[0]}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Secondary Actions */}
            <div className="flex items-center gap-1 mr-2">
              <button className="p-2 text-[var(--color-ink-faint)] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md transition-colors" title="Star Session">
                <Star className={cn("w-4 h-4", session.isStarred && "fill-[#D4AF37] text-[#D4AF37]")} />
              </button>
              <button className="p-2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] rounded-md transition-colors" title="Edit Tags">
                <Tag className="w-4 h-4" />
              </button>
              <button className="p-2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] rounded-md transition-colors" title="Archive">
                <Archive className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-black/10 mx-1"></div>
              <button className="p-2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] rounded-md transition-colors" title="More Options">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Primary Actions */}
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center gap-1.5 bg-white border border-black/[0.08] hover:bg-black/[0.02] text-[var(--color-ink-main)] px-3 py-2 rounded-lg text-[12px] font-medium transition-all shadow-sm">
                <Copy className="w-3.5 h-3.5" />
                Copy Cmd
              </button>
              <button className="flex items-center justify-center gap-1.5 bg-white border border-black/[0.08] hover:bg-black/[0.02] text-[var(--color-ink-main)] px-3 py-2 rounded-lg text-[12px] font-medium transition-all shadow-sm">
                <Terminal className="w-3.5 h-3.5" />
                Terminal
              </button>
              <button className="flex items-center gap-2 bg-[var(--color-accent-cobalt)] hover:bg-[#1D4ED8] text-white px-5 py-2 rounded-lg text-[12px] font-medium transition-all shadow-[0_1px_2px_rgba(37,99,235,0.2),0_2px_4px_rgba(37,99,235,0.1)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.2),0_4px_8px_rgba(37,99,235,0.1)] hover:-translate-y-[0.5px]">
                <Play className="w-3.5 h-3.5 fill-current" />
                Resume Session
              </button>
            </div>
          </div>
        </div>

        {/* Main Reading Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          {/* Session Pulse - Visual Signature */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/[0.04] z-10">
            <motion.div 
              className="h-full bg-[var(--color-accent-cobalt)]/60 w-1/4"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
          </div>

          <div className="px-12 py-12 max-w-[860px] mx-auto w-full">
            {/* Document Title */}
            <h1 className="text-[28px] font-bold text-[var(--color-ink-main)] leading-[1.3] tracking-tight mb-6">
              {session.title}
            </h1>

            {/* Document Meta Band */}
            <div className="flex flex-col gap-4 mb-12 pb-8 border-b border-black/[0.06]">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-[13px] text-[var(--color-ink-main)] font-medium">
                  <Folder className="w-4 h-4 text-[var(--color-ink-muted)]" />
                  {session.projectPath}
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[var(--color-ink-main)] font-medium">
                  <Cpu className="w-4 h-4 text-[var(--color-ink-muted)]" />
                  {session.model}
                </div>
                {session.branch !== '-' && (
                  <div className="flex items-center gap-2 text-[13px] text-[var(--color-ink-main)] font-medium">
                    <GitBranch className="w-4 h-4 text-[var(--color-ink-muted)]" />
                    {session.branch}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-[12px] text-[var(--color-ink-muted)]">
                <div className="flex items-center gap-2">
                  {session.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-black/[0.03] rounded border border-black/[0.04] text-[11px] font-medium text-[var(--color-ink-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 font-mono text-[10px] tracking-wider uppercase text-[var(--color-ink-faint)]">
                  <span>Updated {new Date(session.updatedAt).toLocaleDateString()}</span>
                  <span>Resumed {session.resumeCount}x</span>
                  <span>{session.turnCount} Turns</span>
                </div>
              </div>
            </div>

            {/* Session Distillation (Abstract) */}
            <div className="mb-14 relative bg-[var(--color-stone-panel)]/40 rounded-xl p-6 border border-black/[0.03]">
              <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-[var(--color-accent-cobalt)]/40 rounded-r-full" />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[var(--color-accent-cobalt)]" />
                  <h4 className="text-[11px] font-bold text-[var(--color-accent-cobalt)] uppercase tracking-[0.15em]">Session Abstract</h4>
                </div>
                <p className="text-[14px] text-[var(--color-ink-main)] font-medium leading-relaxed mb-5">
                  {session.summary}
                </p>
                <div className="flex items-start gap-8 text-[13px]">
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Key Actions</div>
                    <ul className="text-[var(--color-ink-muted)] space-y-1.5 list-disc list-inside">
                      <li>Analyzed project architecture</li>
                      <li>Implemented core logic</li>
                      <li>Resolved dependency conflicts</li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider mb-2">Status</div>
                    <div className="flex items-start gap-1.5 text-[var(--color-ink-muted)] leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Context is self-contained and dependencies are stable. Safe to resume.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation History (Activity Log) */}
            <div className="space-y-0">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Activity Log</span>
                <div className="h-px flex-1 bg-black/[0.04]" />
              </div>
              
              <div className="pb-12">
                {session.turns.map((turn, index) => (
                  <TurnBlock key={turn.id} turn={turn} isLast={index === session.turns.length - 1} />
                ))}
              </div>
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
            {turn.timestamp || '00:00'}
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

