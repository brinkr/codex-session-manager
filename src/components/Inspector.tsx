import React, { useState } from 'react';
import { SessionRecord } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Star, 
  Archive, 
  Trash2, 
  Sparkles, 
  Hash, 
  FileText,
  RefreshCw,
  Plus,
  Terminal,
  ChevronDown,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

interface InspectorProps {
  session: SessionRecord | null;
}

export function Inspector({ session }: InspectorProps) {
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);

  if (!session) {
    return (
      <div className="w-[320px] shrink-0 bg-[var(--color-bg-pane)] border-l border-[var(--color-border-subtle)] z-30 flex items-center justify-center">
        <p className="text-[13px] text-[var(--color-text-faint)] font-medium">No session selected</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={session.raw.sessionId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-[320px] shrink-0 bg-[var(--color-bg-pane)] border-l border-[var(--color-border-subtle)] z-30 flex flex-col h-full"
      >
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
          
          {/* 1. Primary Action */}
          <div>
            <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-accent-main)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors border border-transparent">
              <Play className="w-4 h-4 fill-current opacity-80" />
              Resume Session
            </button>
          </div>

          {/* 2. Quick Session Actions */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <button className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-colors text-[12px] font-medium",
                session.user.starred 
                  ? "bg-[#FEF3C7] border-[#FDE68A] text-[#B45309] dark:bg-[#B45309]/20 dark:border-[#B45309]/30 dark:text-[#FDE68A]" 
                  : "bg-[var(--color-bg-raised)] border-[var(--color-border-subtle)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-hover)]"
              )}>
                <Star className={cn("w-3.5 h-3.5", session.user.starred && "fill-current")} />
                {session.user.starred ? 'Starred' : 'Star'}
              </button>
              <button className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-colors text-[12px] font-medium",
                session.user.archived
                  ? "bg-[var(--color-bg-active)] border-[var(--color-border-strong)] text-[var(--color-text-main)]"
                  : "bg-[var(--color-bg-raised)] border-[var(--color-border-subtle)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-hover)]"
              )}>
                <Archive className="w-3.5 h-3.5" />
                {session.user.archived ? 'Archived' : 'Archive'}
              </button>
            </div>

            {/* Collapsible Note */}
            <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg overflow-hidden">
              <button 
                onClick={() => setIsNoteExpanded(!isNoteExpanded)}
                className="w-full flex items-center justify-between p-2.5 text-[12px] font-medium text-[var(--color-text-main)] hover:bg-[var(--color-bg-hover)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                  <span className="truncate max-w-[200px] text-left">
                    {session.user.notes ? session.user.notes : 'Add note...'}
                  </span>
                </div>
                {isNoteExpanded ? <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-faint)] shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-faint)] shrink-0" />}
              </button>
              
              <AnimatePresence>
                {isNoteExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[var(--color-border-subtle)]"
                  >
                    <div className="p-2">
                      <textarea 
                        className="w-full h-24 bg-transparent border-none resize-none outline-none text-[12px] text-[var(--color-text-main)] placeholder:text-[var(--color-text-faint)]"
                        placeholder="Write a note about this session..."
                        defaultValue={session.user.notes}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 3. AI Augmentation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> AI Augmentation
              </h3>
              <button className="p-1 text-[var(--color-text-faint)] hover:text-[var(--color-text-main)] transition-colors rounded hover:bg-[var(--color-bg-hover)]" title="Regenerate AI Metadata">
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {/* Summary Status */}
              <div className="p-2.5 bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg flex items-center justify-between">
                <div className="text-[12px] text-[var(--color-text-muted)]">Summary</div>
                <div className="text-[12px] font-medium text-[var(--color-text-main)] flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success-text)]" />
                  Generated
                </div>
              </div>

              {/* Scenario */}
              <div className="p-2.5 bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg flex items-center justify-between">
                <div className="text-[12px] text-[var(--color-text-muted)]">Scenario</div>
                <div className="text-[12px] font-medium text-[var(--color-text-main)] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[var(--color-text-faint)]" />
                  {session.ai.tags.scenarioClassification}
                </div>
              </div>

              {/* Tags Editing */}
              <div className="p-2.5 bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg">
                <div className="text-[12px] text-[var(--color-text-muted)] mb-2 flex items-center justify-between">
                  <span>Tags</span>
                  <button className="text-[var(--color-text-main)] hover:text-[var(--color-accent-main)]"><Plus className="w-3 h-3" /></button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {session.user.manualTags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-[var(--color-bg-hover)] border border-[var(--color-border-strong)] text-[var(--color-text-main)] text-[11px] rounded flex items-center gap-1">
                      {tag}
                    </span>
                  ))}
                  {session.ai.tags.autoTags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-transparent border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] text-[11px] rounded flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[var(--color-text-faint)]" />
                      {tag}
                    </span>
                  ))}
                  {session.user.manualTags.length === 0 && session.ai.tags.autoTags.length === 0 && (
                    <span className="text-[11px] text-[var(--color-text-faint)]">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Supplemental Metadata */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider">Metadata</h3>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Created</span>
                <span className="text-[var(--color-text-main)] font-mono">{new Date(session.raw.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Last opened</span>
                <span className="text-[var(--color-text-main)] font-mono">{new Date(session.raw.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Resume count</span>
                <span className="text-[var(--color-text-main)] font-mono">12</span>
              </div>
            </div>
          </div>

          {/* 5. Danger Zone */}
          <div className="pt-4 border-t border-[var(--color-border-subtle)]">
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-transparent hover:border-[var(--color-error-text)]/30 hover:bg-[var(--color-error-bg)] text-[var(--color-error-text)] text-[12px] font-medium transition-colors opacity-70 hover:opacity-100">
              <AlertTriangle className="w-3.5 h-3.5" />
              Delete Session
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
