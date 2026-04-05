import React, { useMemo } from 'react';
import { SessionRecord, ViewState } from '../types';
import { cn } from '../lib/utils';
import { 
  Search, 
  Folder, 
  Clock, 
  Star, 
  Archive, 
  Hash, 
  Terminal,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface BrowserPaneProps {
  sessions: SessionRecord[];
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOpenCommandPalette: () => void;
}

export function BrowserPane({ 
  sessions, 
  currentView, 
  onViewChange, 
  selectedId, 
  onSelect,
  onOpenCommandPalette
}: BrowserPaneProps) {
  
  // Extract unique projects and scenarios for navigation
  const projects = useMemo(() => Array.from(new Set(sessions.map(s => s.raw.projectName).filter(Boolean))), [sessions]);
  const scenarios = useMemo(() => Array.from(new Set(sessions.map(s => s.ai.tags.scenarioClassification).filter(Boolean))), [sessions]);

  return (
    <div className="w-[280px] shrink-0 bg-[var(--color-bg-pane)] flex flex-col h-full border-r border-[var(--color-border-subtle)] z-30">
      
      {/* Search Bar */}
      <div className="p-4 shrink-0">
        <button 
          onClick={onOpenCommandPalette}
          className="w-full flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-raised)] border border-[var(--color-border-subtle)] rounded-lg text-[13px] text-[var(--color-text-faint)] hover:border-[var(--color-border-strong)] transition-colors shadow-sm group"
        >
          <Search className="w-4 h-4 text-[var(--color-text-faint)] group-hover:text-[var(--color-text-muted)] transition-colors" />
          <span className="flex-1 text-left">Search sessions...</span>
          <div className="flex items-center gap-1">
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-bg-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">⌘</kbd>
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-bg-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]">K</kbd>
          </div>
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Sections */}
        <div className="px-3 space-y-6 shrink-0 pb-4 border-b border-[var(--color-border-subtle)]">
          
          {/* Core Views */}
          <div className="space-y-0.5">
            <NavItem 
              icon={<Clock className="w-4 h-4" />} 
              label="All Sessions" 
              count={sessions.length}
              active={currentView.type === 'all'}
              onClick={() => onViewChange({ type: 'all' })}
            />
            <NavItem 
              icon={<Star className="w-4 h-4" />} 
              label="Starred" 
              active={currentView.type === 'starred'}
              onClick={() => onViewChange({ type: 'starred' })}
            />
            <NavItem 
              icon={<Archive className="w-4 h-4" />} 
              label="Archive" 
              active={currentView.type === 'archived'}
              onClick={() => onViewChange({ type: 'archived' })}
            />
          </div>

          {/* AI Scenarios */}
          <div>
            <div className="px-3 mb-2 flex items-center gap-2 text-[11px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Scenarios
            </div>
            <div className="space-y-0.5">
              {scenarios.map(scenario => (
                <NavItem 
                  key={scenario}
                  icon={<Terminal className="w-4 h-4" />} 
                  label={scenario} 
                  active={currentView.type === 'scenario' && currentView.value === scenario}
                  onClick={() => onViewChange({ type: 'scenario', value: scenario })}
                />
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider">Projects</div>
            <div className="space-y-0.5">
              {projects.map(project => (
                <NavItem 
                  key={project}
                  icon={<Folder className="w-4 h-4" />} 
                  label={project} 
                  active={currentView.type === 'project' && currentView.value === project}
                  onClick={() => onViewChange({ type: 'project', value: project })}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Session List (Results) - Now takes remaining space */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-4 pt-4 px-3">
          <div className="px-3 mb-3 text-[11px] font-bold text-[var(--color-text-faint)] uppercase tracking-wider flex items-center justify-between">
            <span>Results</span>
            <span className="bg-[var(--color-bg-hover)] px-1.5 py-0.5 rounded text-[10px]">{sessions.length}</span>
          </div>
          <div className="space-y-1">
            {sessions.map(session => (
              <SessionItem 
                key={session.raw.sessionId}
                session={session}
                active={selectedId === session.raw.sessionId}
                onClick={() => onSelect(session.raw.sessionId)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ 
  icon, 
  label, 
  count, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  count?: number;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors group",
        active 
          ? "bg-[var(--color-bg-active)] text-[var(--color-text-main)]" 
          : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-main)]"
      )}
    >
      <span className={cn(
        "transition-colors",
        active ? "text-[var(--color-text-main)]" : "text-[var(--color-text-faint)] group-hover:text-[var(--color-text-muted)]"
      )}>
        {icon}
      </span>
      <span className="flex-1 text-left truncate">{label}</span>
      {count !== undefined && (
        <span className={cn(
          "text-[11px] px-1.5 py-0.5 rounded-md transition-colors",
          active ? "bg-[var(--color-bg-hover)] text-[var(--color-text-main)]" : "text-[var(--color-text-faint)] group-hover:text-[var(--color-text-muted)]"
        )}>
          {count}
        </span>
      )}
    </button>
  );
}

function SessionItem({ 
  session, 
  active, 
  onClick 
}: { 
  session: SessionRecord; 
  active: boolean; 
  onClick: () => void;
}) {
  const title = session.user.manualTitle || session.ai.summary.aiTitle || session.derived.fallbackTitle;
  const isAiTitled = !session.user.manualTitle && !!session.ai.summary.aiTitle;
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 rounded-xl transition-all border",
        active 
          ? "bg-[var(--color-bg-raised)] border-[var(--color-border-strong)] shadow-sm" 
          : "bg-transparent border-transparent hover:bg-[var(--color-bg-hover)]"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h4 className={cn(
          "text-[13px] font-semibold leading-tight line-clamp-2",
          active ? "text-[var(--color-text-main)]" : "text-[var(--color-text-muted)]"
        )}>
          {title}
        </h4>
        {isAiTitled && (
          <Sparkles className="w-3 h-3 text-[var(--color-accent-main)] shrink-0 mt-0.5 opacity-50" />
        )}
      </div>
      
      <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-faint)] font-mono">
        <span className="truncate">{session.raw.projectName}</span>
        <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)] shrink-0" />
        <span className="shrink-0">{new Date(session.raw.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
      </div>
    </button>
  );
}
