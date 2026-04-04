import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { SessionList } from './components/SessionList';
import { SessionDetail } from './components/SessionDetail';
import { CommandPalette } from './components/CommandPalette';
import { mockSessions } from './mockData';
import { ViewState } from './types';
import { motion } from 'motion/react';

export default function App() {
  const [sessions] = useState(mockSessions);
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'all' });
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(sessions[0]?.id || null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const filteredSessions = useMemo(() => {
    let result = sessions;
    switch (currentView.type) {
      case 'starred': result = result.filter(s => s.isStarred); break;
      case 'archived': result = result.filter(s => s.isArchived); break;
      case 'tag': result = result.filter(s => s.tags.includes(currentView.value)); break;
      case 'project': result = result.filter(s => s.projectName === currentView.value); break;
      case 'all': default: result = result.filter(s => !s.isArchived); break;
    }
    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [sessions, currentView]);

  const selectedSession = useMemo(() => {
    return sessions.find(s => s.id === selectedSessionId) || null;
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
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-noise selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
      
      {/* Mac Titlebar */}
      <div className="h-11 w-full flex items-center px-4 justify-between select-none z-50 relative shrink-0">
        <div className="flex items-center gap-4">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 w-16 group">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 shadow-sm"></div>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-zinc-500/80 tracking-wide">
          Codex Workspace
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            Local Engine Active
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        
        <SessionList 
          sessions={filteredSessions} 
          selectedId={selectedSessionId} 
          onSelect={setSelectedSessionId} 
        />
        
        <SessionDetail session={selectedSession} />
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
