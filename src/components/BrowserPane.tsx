import React, { useState, useMemo } from 'react';
import { SessionRecord, ViewState } from '../types';
import { cn } from '../lib/utils';
import { 
  Search, 
  Terminal, 
  Star, 
  Archive, 
  Folder, 
  Tag,
  ChevronDown,
  ChevronRight,
  Clock,
  Sparkles,
  MessageSquare,
  Settings
} from 'lucide-react';

interface BrowserPaneProps {
  sessions: SessionRecord[];
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOpenCommandPalette: () => void;
  onOpenSettings: () => void;
}

export function BrowserPane({ 
  sessions, 
  currentView, 
  onViewChange, 
  selectedId, 
  onSelect,
  onOpenCommandPalette,
  onOpenSettings
}: BrowserPaneProps) {
  
  const [scenariosExpanded, setScenariosExpanded] = useState(true);
  const [projectsExpanded, setProjectsExpanded] = useState(true);

  // Extract unique projects and scenarios
  const projects = Array.from(new Set(sessions.map(s => s.raw.projectName)));
  const scenarios = Array.from(new Set(sessions.map(s => s.ai.tags.scenarioClassification).filter(Boolean) as string[]));

  return (
    <div className="w-[320px] flex-shrink-0 bg-[var(--color-stone-panel)] flex flex-col h-full border-r border-black/[0.06] z-10 relative">
      
      {/* Top: Search & Quick Filters */}
      <div className="p-4 border-b border-black/[0.04]">
        <button 
          onClick={onOpenCommandPalette}
          className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-black/[0.06] rounded-lg text-[13px] text-[var(--color-ink-muted)] hover:border-black/[0.15] hover:text-[var(--color-ink-main)] transition-colors shadow-sm mb-4"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search sessions...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-sans font-medium text-[var(--color-ink-faint)] bg-black/[0.03] rounded border border-black/[0.05]">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <FilterChip 
            active={currentView.type === 'all'} 
            onClick={() => onViewChange({ type: 'all' })}
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Recent"
          />
          <FilterChip 
            active={currentView.type === 'starred'} 
            onClick={() => onViewChange({ type: 'starred' })}
            icon={<Star className="w-3.5 h-3.5" />}
            label="Starred"
          />
          <FilterChip 
            active={currentView.type === 'archived'} 
            onClick={() => onViewChange({ type: 'archived' })}
            icon={<Archive className="w-3.5 h-3.5" />}
            label="Archived"
          />
        </div>
      </div>

      {/* Middle: Groups */}
      <div className="flex-shrink-0 overflow-y-auto no-scrollbar flex flex-col max-h-[30vh]">
        
        {/* Scenarios */}
        <div className="py-2 border-b border-black/[0.04]">
          <div 
            className="px-4 py-2 flex items-center justify-between group cursor-pointer hover:bg-black/[0.02]"
            onClick={() => setScenariosExpanded(!scenariosExpanded)}
          >
            <span className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Scenarios</span>
            {scenariosExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" />
            )}
          </div>
          {scenariosExpanded && (
            <div className="px-2 pb-2 space-y-0.5">
              {scenarios.slice(0, 4).map(scenario => (
                <button
                  key={scenario}
                  onClick={() => onViewChange({ type: 'scenario', value: scenario as any })}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors",
                    currentView.type === 'scenario' && currentView.value === scenario
                      ? "bg-white text-[var(--color-ink-main)] shadow-sm border border-black/[0.04]"
                      : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] border border-transparent"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5 opacity-70" />
                  <span className="truncate capitalize">{scenario}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="py-2 border-b border-black/[0.04]">
          <div 
            className="px-4 py-2 flex items-center justify-between group cursor-pointer hover:bg-black/[0.02]"
            onClick={() => setProjectsExpanded(!projectsExpanded)}
          >
            <span className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Projects</span>
            {projectsExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" />
            )}
          </div>
          {projectsExpanded && (
            <div className="px-2 pb-2 space-y-0.5">
              {projects.slice(0, 4).map(project => (
                <button
                  key={project}
                  onClick={() => onViewChange({ type: 'project', value: project })}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors",
                    currentView.type === 'project' && currentView.value === project
                      ? "bg-white text-[var(--color-ink-main)] shadow-sm border border-black/[0.04]"
                      : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] border border-transparent"
                  )}
                >
                  <Folder className="w-3.5 h-3.5 opacity-70" />
                  <span className="truncate">{project}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Session List */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 py-3 flex items-center justify-between bg-[var(--color-stone-panel)] sticky top-0 z-10 border-b border-black/[0.02]">
          <span className="text-[10px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">
            {currentView.type === 'all' ? 'All Sessions' : 
             currentView.type === 'starred' ? 'Starred' :
             currentView.type === 'archived' ? 'Archived' :
             currentView.type === 'tag' ? `#${currentView.value}` :
             currentView.type === 'scenario' ? currentView.value :
             currentView.value}
          </span>
          <span className="text-[10px] font-mono text-[var(--color-ink-faint)]">{sessions.length}</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
          {sessions.map(session => {
            const isSelected = session.raw.sessionId === selectedId;
            const title = session.user.manualTitle || session.ai.summary.aiTitle || session.derived.fallbackTitle;
            const allSessionTags = [...session.user.manualTags, ...session.ai.tags.autoTags];
            
            return (
              <button
                key={session.raw.sessionId}
                onClick={() => onSelect(session.raw.sessionId)}
                className={cn(
                  "w-full text-left p-3 rounded-xl transition-all border outline-none",
                  isSelected 
                    ? "bg-white border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)]" 
                    : "bg-transparent border-transparent hover:bg-black/[0.03]"
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    {session.user.starred && <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] flex-shrink-0" />}
                    <span className={cn(
                      "text-[13px] font-semibold truncate",
                      isSelected ? "text-[var(--color-ink-main)]" : "text-[var(--color-ink-muted)]"
                    )}>
                      {title}
                    </span>
                  </div>
                </div>
                
                <div className="text-[12px] text-[var(--color-ink-faint)] line-clamp-2 leading-relaxed mb-2.5">
                  {session.derived.snippet}
                </div>
                
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-ink-faint)]">
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate">{session.raw.projectName}</span>
                    {allSessionTags.length > 0 && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-black/10"></span>
                        <span className="truncate">{allSessionTags[0]}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1" title={`AI Summary: ${session.ai.summary.status}`}>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        session.ai.summary.status === 'completed' ? "bg-emerald-500" :
                        session.ai.summary.status === 'generating' ? "bg-blue-500 animate-pulse" :
                        session.ai.summary.status === 'failed' ? "bg-red-500" :
                        "bg-black/10"
                      )} />
                    </div>
                    <span className="ml-1">{new Date(session.raw.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer: Settings */}
      <div className="p-3 border-t border-black/[0.04] bg-[var(--color-stone-panel)] shrink-0">
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Preferences...</span>
          <span className="ml-auto text-[10px] font-mono text-[var(--color-ink-faint)] opacity-60">⌘,</span>
        </button>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-colors whitespace-nowrap border",
        active 
          ? "bg-white text-[var(--color-ink-main)] border-black/[0.06] shadow-sm" 
          : "bg-transparent text-[var(--color-ink-muted)] border-transparent hover:bg-black/[0.04]"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
