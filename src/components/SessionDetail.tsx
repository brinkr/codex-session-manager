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
  MoreHorizontal, 
  Terminal, 
  Folder, 
  Cpu, 
  GitBranch,
  Wrench,
  Sparkles,
  Clock,
  RotateCcw
} from 'lucide-react';

interface SessionDetailProps {
  session: Session | null;
}

export function SessionDetail({ session }: SessionDetailProps) {
  if (!session) {
    return (
      <div className="flex-1 bg-[var(--color-stone-paper)] flex flex-col items-center justify-center text-zinc-400 z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.03)]">
        <div className="w-16 h-16 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-center justify-center mb-6 shadow-sm">
          <Terminal className="w-6 h-6 text-zinc-300" />
        </div>
        <p className="text-[13px] font-medium text-zinc-500">Select a session to view details</p>
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
        {/* Header Area */}
        <div className="flex-shrink-0 bg-white/80 backdrop-blur-md z-10 border-b border-black/[0.04]">
          <div className="px-8 pt-8 pb-6">
            <div className="flex items-start justify-between mb-5">
              <h1 className="text-2xl font-bold text-zinc-900 leading-tight pr-8 tracking-tight">
                {session.title}
              </h1>
              <div className="flex items-center gap-1.5">
                <button className="p-2 text-zinc-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg transition-colors">
                  <Star className={cn("w-4 h-4", session.isStarred && "fill-[#D4AF37] text-[#D4AF37]")} />
                </button>
                <button className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-black/[0.03] rounded-lg transition-colors">
                  <Tag className="w-4 h-4" />
                </button>
                <button className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-black/[0.03] rounded-lg transition-colors">
                  <Archive className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-zinc-200 mx-1"></div>
                <button className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-black/[0.03] rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Context Meta */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[12px] text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <Folder className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-zinc-600">{session.projectPath}</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-zinc-600">{session.model}</span>
              </div>
              {session.branch !== '-' && (
                <div className="flex items-center gap-2">
                  <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-zinc-600">{session.branch}</span>
                </div>
              )}
            </div>

            {/* Tags & Stats */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex flex-wrap items-center gap-2">
                {session.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-black/[0.03] text-zinc-600 text-[11px] font-medium rounded-md border border-black/[0.04]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-[11px] text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Last opened {new Date(session.lastOpenedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <span className="flex items-center gap-1.5"><RotateCcw className="w-3 h-3" /> Resumed {session.resumeCount} times</span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="px-8 py-3 bg-black/[0.01] border-t border-black/[0.03] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2 rounded-lg text-[13px] font-medium transition-all shadow-[0_1px_2px_rgba(37,99,235,0.2),0_2px_4px_rgba(37,99,235,0.1)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.2),0_4px_8px_rgba(37,99,235,0.1)] hover:-translate-y-[0.5px]">
                <Play className="w-3.5 h-3.5 fill-current" />
                Resume Session
              </button>
              <button className="flex items-center gap-2 bg-white border border-black/[0.08] hover:bg-black/[0.02] text-zinc-700 px-4 py-2 rounded-lg text-[13px] font-medium transition-all shadow-sm">
                <Terminal className="w-3.5 h-3.5" />
                Open in Terminal
              </button>
            </div>
            <button className="text-zinc-400 hover:text-zinc-700 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/[0.03] transition-colors text-[12px] font-medium" title="Copy Resume Command">
              <Copy className="w-3.5 h-3.5" />
              Copy Command
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Smart Summary Area */}
          <div className="px-8 py-6 bg-[#F8FAFC]/50 border-b border-blue-100/50">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <h4 className="text-[12px] font-semibold text-blue-800 uppercase tracking-wider">AI Summary</h4>
            </div>
            <p className="text-[14px] text-zinc-600 leading-relaxed max-w-3xl">{session.summary}</p>
          </div>

          {/* Conversation History */}
          <div className="p-8 space-y-8 max-w-4xl">
            {session.turns.map((turn, index) => (
              <TurnBlock key={turn.id} turn={turn} isLast={index === session.turns.length - 1} />
            ))}
            <div className="h-12"></div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function TurnBlock({ turn, isLast }: { turn: Turn, isLast: boolean, key?: React.Key }) {
  if (turn.role === 'tool') {
    return (
      <div className="flex items-start gap-4 pl-12 group">
        <div className="w-6 h-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
          <Wrench className="w-3 h-3 text-zinc-500" />
        </div>
        <div className="flex-1 bg-[#FBFBF9] border border-black/[0.05] rounded-lg p-3 text-[13px] font-mono text-zinc-500 shadow-sm transition-colors group-hover:border-black/[0.08]">
          <div className="text-[11px] font-sans font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider flex items-center gap-2">
            Tool Call
            <span className="text-zinc-500 normal-case font-mono bg-black/[0.04] px-1.5 py-0.5 rounded">{turn.toolName}</span>
          </div>
          <div className="leading-relaxed">{turn.content}</div>
        </div>
      </div>
    );
  }

  const isUser = turn.role === 'user';

  return (
    <div className={cn("flex items-start gap-5", isUser ? "" : "")}>
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 text-[13px] font-semibold shadow-sm",
        isUser 
          ? "bg-zinc-800 text-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]" 
          : "bg-white text-[#2563EB] border border-blue-100 shadow-[0_2px_4px_rgba(37,99,235,0.05)]"
      )}>
        {isUser ? 'U' : 'AI'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-[13px] font-semibold text-zinc-900">
            {isUser ? 'You' : 'Assistant'}
          </span>
          {turn.timestamp && (
            <span className="text-[11px] text-zinc-400 font-medium">{turn.timestamp}</span>
          )}
        </div>
        <div className={cn(
          "text-[15px] leading-[1.7] whitespace-pre-wrap",
          isUser ? "text-zinc-800 font-medium" : "text-zinc-700"
        )}>
          {turn.content}
        </div>
      </div>
    </div>
  );
}

