import React, { useState, useMemo, useEffect } from 'react';
import { BrowserPane } from './components/BrowserPane';
import { DocumentPane } from './components/DocumentPane';
import { Inspector } from './components/Inspector';
import { CommandPalette } from './components/CommandPalette';
import { mockSessions } from './mockData';
import { ViewState } from './types';
import { motion } from 'motion/react';

export default function App() {
  const [sessions] = useState(mockSessions);
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'all' });
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(sessions[0]?.raw.sessionId || null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const filteredSessions = useMemo(() => {
    let result = sessions;
    switch (currentView.type) {
      case 'starred': result = result.filter(s => s.user.starred); break;
      case 'archived': result = result.filter(s => s.user.archived); break;
      case 'tag': result = result.filter(s => s.user.manualTags.includes(currentView.value!) || s.ai.tags.autoTags.includes(currentView.value!)); break;
      case 'project': result = result.filter(s => s.raw.projectName === currentView.value); break;
      case 'scenario': result = result.filter(s => s.ai.tags.scenarioClassification === currentView.value); break;
      case 'all': default: result = result.filter(s => !s.user.archived); break;
    }
    return result.sort((a, b) => new Date(b.raw.updatedAt).getTime() - new Date(a.raw.updatedAt).getTime());
  }, [sessions, currentView]);

  const selectedSession = useMemo(() => {
    return sessions.find(s => s.raw.sessionId === selectedSessionId) || null;
  }, [sessions, selectedSessionId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-[var(--color-stone-base)] bg-noise selection:bg-[var(--color-accent-cobalt)]/20 selection:text-[var(--color-accent-cobalt)] p-2 sm:p-6 md:p-8">
      
      {/* App Window */}
      <div className="w-full max-w-[1440px] h-full max-h-[960px] bg-[var(--color-stone-panel)] rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] flex flex-col overflow-hidden relative z-10">
        
        {/* Mac Titlebar & App Chrome */}
        <div className="h-12 w-full flex items-center px-4 justify-between select-none z-50 relative shrink-0 border-b border-black/[0.04] bg-white/40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            {/* Traffic Lights */}
            <div className="flex items-center gap-2 w-16 group">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"></div>
            </div>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-[13px] font-semibold text-[var(--color-ink-main)] tracking-wide">
              Codex Workspace
            </span>
            <span className="px-1.5 py-0.5 rounded bg-black/[0.04] text-[10px] font-mono font-medium text-[var(--color-ink-muted)] border border-black/[0.03]">
              BETA
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-[11px] text-[var(--color-ink-muted)] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              Local index ready
            </span>
            <span className="w-px h-3 bg-black/10"></span>
            <span>{sessions.length} sessions</span>
            <span className="w-px h-3 bg-black/10"></span>
            <span>Sync 2m ago</span>
          </div>
        </div>

        {/* Main Content Area - Strict 3 Columns */}
        <div className="flex-1 flex overflow-hidden relative">
          <BrowserPane 
            sessions={filteredSessions}
            currentView={currentView}
            onViewChange={setCurrentView}
            selectedId={selectedSessionId}
            onSelect={setSelectedSessionId}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
          
          <DocumentPane session={selectedSession} />
          
          <Inspector session={selectedSession} />
        </div>
      </div>

      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
        sessions={sessions}
        onSelectSession={(id) => {
          setSelectedSessionId(id);
          setCurrentView({ type: 'all' });
        }}
      />
    </div>
  );
}
