import React from 'react';
import { ViewState } from '../types';
import { cn } from '../lib/utils';
import { 
  Settings,
  Search,
  Plus
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onOpenCommandPalette: () => void;
}

export function Sidebar({ currentView, onViewChange, onOpenCommandPalette }: SidebarProps) {
  const isViewActive = (view: ViewState) => {
    if (view.type !== currentView.type) return false;
    if ('value' in view && 'value' in currentView) {
      return view.value === currentView.value;
    }
    return true;
  };

  const NavItem = ({ index, label, view, badge }: { index: string, label: string, view: ViewState, badge?: number }) => {
    const active = isViewActive(view);
    return (
      <button
        onClick={() => onViewChange(view)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-1.5 text-[12px] group relative outline-none rounded-md transition-all",
          active ? "bg-black/[0.03]" : "hover:bg-black/[0.02]"
        )}
      >
        <div className="flex items-center gap-3">
          <span className={cn(
            "text-[9px] font-mono transition-colors",
            active ? "text-[var(--color-accent-cobalt)] font-medium" : "text-[var(--color-ink-faint)] group-hover:text-[var(--color-ink-muted)]"
          )}>
            {index}
          </span>
          <span className={cn(
            "transition-colors",
            active ? "text-[var(--color-ink-main)] font-medium" : "text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink-main)]"
          )}>
            {label}
          </span>
        </div>
        {badge !== undefined && (
          <span className={cn(
            "text-[10px] font-mono transition-colors",
            active ? "text-[var(--color-ink-main)]" : "text-[var(--color-ink-faint)] group-hover:text-[var(--color-ink-muted)]"
          )}>
            {badge}
          </span>
        )}
      </button>
    );
  };

  const GroupHeader = ({ title }: { title: string }) => (
    <div className="px-3 mb-2 mt-6 flex items-center gap-2">
      <div className="w-1 h-1 rounded-full bg-[var(--color-ink-faint)]/50" />
      <div className="text-[9px] font-bold text-[var(--color-ink-faint)] tracking-[0.2em] uppercase">{title}</div>
    </div>
  );

  return (
    <div className="w-64 flex-shrink-0 bg-transparent flex flex-col h-full border-r border-black/[0.06] z-20">
      
      {/* Header / Search */}
      <div className="px-4 py-5 border-b border-black/[0.04]">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[var(--color-ink-main)] rounded-[4px] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[var(--color-stone-paper)] rounded-[1px]" />
            </div>
            <span className="text-[13px] font-bold text-[var(--color-ink-main)] tracking-tight">Codex</span>
          </div>
          <button className="w-6 h-6 rounded flex items-center justify-center text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.04] transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button 
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-2 bg-white border border-black/[0.06] hover:border-black/[0.1] rounded-lg text-[12px] text-[var(--color-ink-muted)] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none focus:ring-2 focus:ring-[var(--color-accent-cobalt)]/20"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[var(--color-ink-faint)]" />
            <span>Search index...</span>
          </div>
          <kbd className="text-[9px] font-mono font-medium px-1.5 py-0.5 bg-black/[0.03] rounded text-[var(--color-ink-faint)]">⌘K</kbd>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 no-scrollbar">
        <GroupHeader title="Primary Index" />
        <div className="space-y-0.5">
          <NavItem index="01" label="All Sessions" view={{ type: 'all' }} badge={124} />
          <NavItem index="02" label="Recent Activity" view={{ type: 'all' }} />
          <NavItem index="03" label="Starred" view={{ type: 'starred' }} badge={3} />
          <NavItem index="04" label="Archived" view={{ type: 'archived' }} />
        </div>

        <GroupHeader title="Scenarios" />
        <div className="space-y-0.5">
          <NavItem index="S1" label="Troubleshooting" view={{ type: 'tag', value: '故障排查' }} />
          <NavItem index="S2" label="Architecture" view={{ type: 'tag', value: '架构设计' }} />
          <NavItem index="S3" label="DevOps" view={{ type: 'tag', value: '部署运维' }} />
          <NavItem index="S4" label="Research" view={{ type: 'tag', value: '实验研究' }} />
        </div>

        <GroupHeader title="Workspaces" />
        <div className="space-y-0.5">
          <NavItem index="W1" label="mobile-app" view={{ type: 'project', value: 'mobile-app' }} />
          <NavItem index="W2" label="codex-manager" view={{ type: 'project', value: 'codex-manager' }} />
          <NavItem index="W3" label="ai-gateway" view={{ type: 'project', value: 'ai-gateway' }} />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 mt-auto border-t border-black/[0.04]">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-main)] hover:bg-black/[0.03] rounded-md transition-colors outline-none">
          <Settings className="w-3.5 h-3.5" />
          <span>System Preferences</span>
        </button>
      </div>
    </div>
  );
}
