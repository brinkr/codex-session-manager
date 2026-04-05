import React from 'react';
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
  Terminal
} from 'lucide-react';

interface InspectorProps {
  session: SessionRecord | null;
}

export function Inspector({ session }: InspectorProps) {
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
        <div className="flex-1 overflow-y-auto no-scrollbar p-5">
          
          {/* Primary Action */}
          <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-accent-main)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] px-4 py-3 rounded-xl text-[13px] font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-[0.5px] mb-3">
            <Play className="w-4 h-4 fill-current" />
            Resume Session
          </button>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2 mb-8">
            <button className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[12px] font-medium transition-colors border",
              session.user.starred 
                ? "bg-amber-50 border-amber-200 text-amber-700" 
                : "bg-[var(--color-bg-raised)] border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-main)]"
            )}>
              <Star className={cn("w-3.5 h-3.5", session.user.starred && "fill-current")} />
              {session.user.starred ? 'Starred' : 'Star'}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[12px] font-medium transition-colors border bg-[var(--color-bg-raised)] border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-main)]">
              <Archive className="w-3.5 h-3.5" />
              Archive
            </button>
          </div>

          {/* AI Augmentation Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Augmentation
              </h3>
              <button className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-hover)] rounded transition-colors">
                <RefreshCw className="w-3 h-3" />
                Regenerate
              </button>
            </div>

            <div className="space-y-4">
              {/* Scenario */}
              <div>
                <div className="text-[12px] text-[var(--color-text-muted)] mb-1.5 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  Scenario
                </div>
                <div className="text-[13px] font-medium text-[var(--color-text-main)] bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] px-3 py-2 rounded-lg">
                  {session.ai.tags.scenarioClassification}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="text-[12px] text-[var(--color-text-muted)] mb-1.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  Tags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {session.user.manualTags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[var(--color-bg-raised)] rounded-md text-[11px] text-[var(--color-text-main)] border border-[var(--color-border-subtle)] shadow-sm">
                      {tag}
                    </span>
                  ))}
                  {session.ai.tags.autoTags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-transparent text-[var(--color-text-muted)] text-[11px] font-medium rounded-md border border-[var(--color-border-strong)]">
                      <Sparkles className="w-2.5 h-2.5 opacity-70" />
                      {tag}
                    </span>
                  ))}
                  <button className="px-2 py-1 bg-transparent border border-dashed border-[var(--color-border-strong)] rounded-md text-[11px] text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] hover:border-[var(--color-text-faint)] transition-colors flex items-center gap-1">
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Notes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Notes
              </h3>
            </div>
            
            {session.user.notes ? (
              <div className="bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg p-3 text-[13px] text-[var(--color-text-main)] leading-relaxed shadow-sm">
                {session.user.notes}
              </div>
            ) : (
              <button className="w-full py-6 border border-dashed border-[var(--color-border-strong)] rounded-lg text-[12px] text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] hover:border-[var(--color-text-faint)] transition-colors flex flex-col items-center gap-2">
                <Plus className="w-4 h-4" />
                Add a note to this session
              </button>
            )}
          </div>

        </div>

        {/* Danger Zone */}
        <div className="p-5 border-t border-[var(--color-border-subtle)]">
          <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[12px] font-medium text-[var(--color-error-text)] hover:bg-[var(--color-error-bg)] transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
            Delete Session
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
