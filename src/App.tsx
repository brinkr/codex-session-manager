import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { SessionList } from './components/SessionList';
import { SessionDetail } from './components/SessionDetail';
import { CommandPalette } from './components/CommandPalette';
import { mockSessions } from './mockData';
import { ViewState } from './types';

export default function App() {
  const [sessions] = useState(mockSessions);
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'all' });
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(sessions[0]?.id || null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Filter sessions based on current view
  const filteredSessions = useMemo(() => {
    let result = sessions;
    
    switch (currentView.type) {
      case 'starred':
        result = result.filter(s => s.isStarred);
        break;
      case 'archived':
        result = result.filter(s => s.isArchived);
        break;
      case 'tag':
        result = result.filter(s => s.tags.includes(currentView.value));
        break;
      case 'project':
        result = result.filter(s => s.projectName === currentView.value);
        break;
      case 'all':
      default:
        result = result.filter(s => !s.isArchived); // Hide archived by default in 'all'
        break;
    }
    
    // Sort by updatedAt descending
    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [sessions, currentView]);

  const selectedSession = useMemo(() => {
    return sessions.find(s => s.id === selectedSessionId) || null;
  }, [sessions, selectedSessionId]);

  // Global keyboard shortcuts
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
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-zinc-50 text-zinc-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* Custom Titlebar Area (Mac-like) */}
      <div className="h-10 w-full bg-zinc-100/80 backdrop-blur border-b border-zinc-200 flex items-center px-4 justify-between select-none z-50 relative">
        <div className="flex items-center gap-4">
          {/* Mac window controls placeholder */}
          <div className="flex items-center gap-2 w-16">
            <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
          </div>
          <div className="text-xs font-medium text-zinc-500">Codex Session Manager</div>
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span>v1.0.0-beta</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          currentView={currentView} 
          onViewChange={(view) => {
            setCurrentView(view);
            // Optionally clear selection or select first item in new view
          }} 
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        
        <SessionList 
          sessions={filteredSessions} 
          selectedId={selectedSessionId} 
          onSelect={setSelectedSessionId} 
        />
        
        <SessionDetail session={selectedSession} />
      </div>

      {/* Command Palette Overlay */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
        sessions={sessions}
        onSelectSession={(id) => {
          setSelectedSessionId(id);
          // If the session isn't in the current view, we might want to switch to 'all'
          // For simplicity, we just switch to 'all' to ensure it's visible
          setCurrentView({ type: 'all' });
        }}
      />
    </div>
  );
}
