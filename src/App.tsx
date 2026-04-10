import React, { useState, useMemo, useEffect } from 'react';
import { BrowserPane } from './components/BrowserPane';
import { DocumentPane } from './components/DocumentPane';
import { Inspector } from './components/Inspector';
import { CommandPalette } from './components/CommandPalette';
import { SettingsModal } from './components/SettingsModal';
import { mockSessions } from './mockData';
import { ViewState } from './types';
import { motion } from 'motion/react';
import { Settings } from 'lucide-react';

export default function App() {
  const [sessions] = useState(mockSessions);
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'all' });
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(sessions[0]?.raw.sessionId || null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [accentTheme, setAccentTheme] = useState('indigo');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    window.document.documentElement.setAttribute('data-accent-theme', accentTheme);
  }, [accentTheme]);

  const filteredSessions = useMemo(() => {
    let result = sessions;
    switch (currentView.type) {
      case 'starred': result = result.filter(s => s.user.starred); break;
      case 'pinned': result = result.filter(s => s.user.pinned); break;
      case 'recent': 
        // Just sort by date, maybe limit to top 20, but for now just sort
        break;
      case 'archived': result = result.filter(s => s.user.archived); break;
      case 'tag': result = result.filter(s => s.user.manualTags.includes(currentView.value!) || s.ai.tags.autoTags.includes(currentView.value!)); break;
      case 'project': result = result.filter(s => s.raw.projectName === currentView.value); break;
      case 'scenario': result = result.filter(s => s.ai.tags.scenarioClassification === currentView.value); break;
      case 'all': default: result = result.filter(s => !s.user.archived); break;
    }
    
    // Sort logic: Pinned items first if we are in 'all' or 'recent' view?
    // Actually, the user asked for pinned to be a quick filter, which we did.
    // If we want pinned at the top of 'all', we can do that here.
    return result.sort((a, b) => {
      if (currentView.type === 'all' || currentView.type === 'recent') {
        if (a.user.pinned && !b.user.pinned) return -1;
        if (!a.user.pinned && b.user.pinned) return 1;
      }
      return new Date(b.raw.updatedAt).getTime() - new Date(a.raw.updatedAt).getTime();
    });
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
      if (e.key === ',' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSettingsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-[var(--color-bg-app)] bg-noise selection:bg-[var(--color-accent-main)]/20 selection:text-[var(--color-accent-main)] p-2 sm:p-6 md:p-8">
      
      {/* App Window */}
      <div className="w-full max-w-[1440px] h-full max-h-[960px] bg-[var(--color-bg-pane)] rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] flex flex-col overflow-hidden relative z-10">
        
        {/* Mac Titlebar & App Chrome */}
        <div className="h-12 w-full flex items-center px-4 justify-between select-none z-50 relative shrink-0 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-pane)]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            {/* Traffic Lights */}
            <div className="flex items-center gap-2 w-16 group">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"></div>
            </div>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-[13px] font-semibold text-[var(--color-text-main)] tracking-wide">
              Codex Workspace
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[var(--color-bg-hover)] text-[10px] font-mono font-medium text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
              BETA
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-[11px] text-[var(--color-text-muted)] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success-text)] shadow-[0_0_8px_var(--color-success-bg)]"></span>
              Local index ready
            </span>
            <span className="w-px h-3 bg-[var(--color-border-strong)]"></span>
            <span>{sessions.length} sessions</span>
            <span className="w-px h-3 bg-[var(--color-border-strong)]"></span>
            <span>Sync 2m ago</span>
            <span className="w-px h-3 bg-[var(--color-border-strong)]"></span>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1.5 hover:text-[var(--color-text-main)] transition-colors"
              title="Preferences (Cmd+,)"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
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
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        theme={theme}
        setTheme={setTheme}
        accentTheme={accentTheme}
        setAccentTheme={setAccentTheme}
      />
    </div>
  );
}
