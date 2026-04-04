import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, Folder, Tag, Play } from 'lucide-react';
import { Session } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: Session[];
  onSelectSession: (id: string) => void;
}

export function CommandPalette({ isOpen, onClose, sessions, onSelectSession }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open logic is handled in App.tsx
        }
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
    const searchStr = `${s.title} ${s.projectName} ${s.tags.join(' ')}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

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
          className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Palette */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col"
        >
          {/* Search Input */}
          <div className="flex items-center px-5 py-4 border-b border-black/[0.06]">
            <Search className="w-5 h-5 text-[#2563EB] mr-3" />
            <input 
              ref={inputRef}
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sessions, projects, or commands..." 
              className="flex-1 bg-transparent border-none outline-none text-[17px] font-medium text-zinc-800 placeholder:text-zinc-400 placeholder:font-normal"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-sans font-medium text-zinc-400 bg-black/[0.03] rounded border border-black/[0.05]">
              ESC
            </kbd>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
            {filteredSessions.length > 0 ? (
              <>
                <div className="px-4 py-2 mt-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {query ? 'Search Results' : 'Recent Sessions'}
                </div>
                
                <div className="space-y-0.5">
                  {filteredSessions.slice(0, 6).map((session) => (
                    <button
                      key={session.id}
                      onClick={() => {
                        onSelectSession(session.id);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#2563EB]/[0.06] rounded-xl group text-left transition-colors outline-none focus:bg-[#2563EB]/[0.06]"
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-black/[0.03] border border-black/[0.04] flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:border-[#2563EB]/20 group-hover:shadow-sm transition-all">
                          <Terminal className="w-4 h-4 text-zinc-500 group-hover:text-[#2563EB]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[14px] font-medium text-zinc-900 truncate">{session.title}</div>
                          <div className="text-[12px] text-zinc-500 truncate flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1"><Folder className="w-3 h-3" /> {session.projectName}</span>
                            {session.tags.length > 0 && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {session.tags[0]}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[12px] font-medium text-[#2563EB] flex items-center gap-1 bg-[#2563EB]/10 px-2.5 py-1 rounded-md">
                          <Play className="w-3 h-3 fill-current" /> Resume
                        </span>
                        <span className="text-xs text-zinc-400">↵</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-12 text-center text-zinc-500 text-[14px]">
                No sessions found matching "{query}"
              </div>
            )}

            {!query && (
              <>
                <div className="px-4 py-2 mt-4 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Commands
                </div>
                <div className="space-y-0.5 mb-2">
                  <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-black/[0.03] rounded-xl text-left transition-colors outline-none focus:bg-black/[0.03]">
                    <div className="w-8 h-8 rounded-lg bg-black/[0.02] border border-black/[0.04] flex items-center justify-center flex-shrink-0">
                      <Terminal className="w-4 h-4 text-zinc-600" />
                    </div>
                    <div className="text-[14px] font-medium text-zinc-900">Start New Session</div>
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
