import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, Folder, Tag, Play, Settings } from 'lucide-react';
import { SessionRecord } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: SessionRecord[];
  onSelectSession: (id: string) => void;
  onOpenSettings?: () => void;
}

export function CommandPalette({ isOpen, onClose, sessions, onSelectSession, onOpenSettings }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredSessions = sessions.filter(s => {
    const title = s.user.manualTitle || s.ai.summary.aiTitle || s.derived.fallbackTitle;
    const allTags = [...s.user.manualTags, ...s.ai.tags.autoTags];
    const searchStr = `${title} ${s.raw.projectName} ${allTags.join(' ')}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  const showSettingsCommand = query.toLowerCase() === 'settings' || query.toLowerCase() === 'preferences';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Palette */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
          className="relative w-full max-w-2xl bg-[var(--color-bg-doc)]/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col border border-[var(--color-border-subtle)]"
        >
          {/* Search Input */}
          <div className="flex items-center px-5 py-4 border-b border-[var(--color-border-subtle)]">
            <Search className="w-5 h-5 text-[var(--color-accent-main)] mr-3" />
            <input 
              ref={inputRef}
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sessions, projects, or commands..." 
              className="flex-1 bg-transparent border-none outline-none text-[17px] font-medium text-[var(--color-text-main)] placeholder:text-[var(--color-text-faint)] placeholder:font-normal"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-sans font-medium text-[var(--color-text-faint)] bg-[var(--color-bg-hover)] rounded border border-[var(--color-border-subtle)]">
              ESC
            </kbd>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
            {showSettingsCommand && (
               <div className="space-y-0.5 mb-2">
                 <button 
                   onClick={() => {
                     onClose();
                     onOpenSettings?.();
                   }}
                   className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[var(--color-accent-subtle)] rounded-xl text-left transition-colors outline-none focus:bg-[var(--color-accent-subtle)]"
                 >
                   <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] flex items-center justify-center flex-shrink-0">
                     <Settings className="w-4 h-4 text-[var(--color-accent-main)]" />
                   </div>
                   <div className="text-[14px] font-medium text-[var(--color-text-main)]">Open Settings</div>
                 </button>
               </div>
            )}

            {filteredSessions.length > 0 ? (
              <>
                <div className="px-4 py-2 mt-2 text-[11px] font-semibold text-[var(--color-text-faint)] uppercase tracking-wider">
                  {query ? 'Search Results' : 'Recent Sessions'}
                </div>
                
                <div className="space-y-0.5">
                  {filteredSessions.slice(0, 6).map((session) => {
                    const title = session.user.manualTitle || session.ai.summary.aiTitle || session.derived.fallbackTitle;
                    const allTags = [...session.user.manualTags, ...session.ai.tags.autoTags];
                    return (
                    <button
                      key={session.raw.sessionId}
                      onClick={() => {
                        onSelectSession(session.raw.sessionId);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--color-accent-subtle)] rounded-xl group text-left transition-colors outline-none focus:bg-[var(--color-accent-subtle)]"
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-bg-doc)] group-hover:border-[var(--color-accent-main)]/20 group-hover:shadow-sm transition-all">
                          <Terminal className="w-4 h-4 text-[var(--color-text-faint)] group-hover:text-[var(--color-accent-main)]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[14px] font-medium text-[var(--color-text-main)] truncate">{title}</div>
                          <div className="text-[12px] text-[var(--color-text-muted)] truncate flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1"><Folder className="w-3 h-3" /> {session.raw.projectName}</span>
                            {allTags.length > 0 && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {allTags[0]}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[12px] font-medium text-[var(--color-accent-main)] flex items-center gap-1 bg-[var(--color-accent-main)]/10 px-2.5 py-1 rounded-md">
                          <Play className="w-3 h-3 fill-current" /> Resume
                        </span>
                        <span className="text-xs text-[var(--color-text-faint)]">↵</span>
                      </div>
                    </button>
                  )})}
                </div>
              </>
            ) : (
              !showSettingsCommand && (
                <div className="py-12 text-center text-[var(--color-text-muted)] text-[14px]">
                  No sessions found matching "{query}"
                </div>
              )
            )}

            {!query && (
              <>
                <div className="px-4 py-2 mt-4 text-[11px] font-semibold text-[var(--color-text-faint)] uppercase tracking-wider">
                  Commands
                </div>
                <div className="space-y-0.5 mb-2">
                  <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[var(--color-bg-hover)] rounded-xl text-left transition-colors outline-none focus:bg-[var(--color-bg-hover)]">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] flex items-center justify-center flex-shrink-0">
                      <Terminal className="w-4 h-4 text-[var(--color-text-muted)]" />
                    </div>
                    <div className="text-[14px] font-medium text-[var(--color-text-main)]">Start New Session</div>
                  </button>
                  <button 
                    onClick={() => {
                      onClose();
                      onOpenSettings?.();
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[var(--color-bg-hover)] rounded-xl text-left transition-colors outline-none focus:bg-[var(--color-bg-hover)]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] flex items-center justify-center flex-shrink-0">
                      <Settings className="w-4 h-4 text-[var(--color-text-muted)]" />
                    </div>
                    <div className="text-[14px] font-medium text-[var(--color-text-main)]">Open Settings</div>
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
