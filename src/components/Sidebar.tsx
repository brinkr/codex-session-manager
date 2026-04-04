import React from 'react';
import { ViewState } from '../types';
import { cn } from '../lib/utils';
import { 
  Inbox, 
  Clock, 
  Star, 
  Archive, 
  TerminalSquare, 
  Bug, 
  Code, 
  Server, 
  FlaskConical,
  FolderGit2,
  Settings,
  Search
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

  const NavItem = ({ icon: Icon, label, view, badge }: { icon: any, label: string, view: ViewState, badge?: number }) => {
    const active = isViewActive(view);
    return (
      <button
        onClick={() => onViewChange(view)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors duration-150 group",
          active 
            ? "bg-blue-50 text-blue-700 font-medium" 
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
        )}
      >
        <div className="flex items-center gap-2.5">
          <Icon className={cn("w-4 h-4", active ? "text-blue-600" : "text-zinc-400 group-hover:text-zinc-600")} />
          <span>{label}</span>
        </div>
        {badge !== undefined && (
          <span className={cn(
            "text-xs px-1.5 py-0.5 rounded-full",
            active ? "bg-blue-100 text-blue-700" : "text-zinc-400 group-hover:text-zinc-500"
          )}>
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="w-60 flex-shrink-0 bg-[#F9FAFB] border-r border-zinc-200 flex flex-col h-full">
      {/* Workspace Header */}
      <div className="h-12 flex items-center px-4 border-b border-zinc-200/50">
        <div className="flex items-center gap-2 font-medium text-zinc-800">
          <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-white text-xs">
            C
          </div>
          Codex Workspace
        </div>
      </div>

      {/* Search / Command Trigger */}
      <div className="p-3">
        <button 
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-1.5 bg-white border border-zinc-200 rounded-md text-sm text-zinc-400 hover:border-zinc-300 hover:text-zinc-600 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Search...</span>
          </div>
          <kbd className="text-[10px] font-sans px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-zinc-500">⌘K</kbd>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-3 space-y-6">
        {/* Library */}
        <div>
          <div className="px-3 mb-2 text-xs font-semibold text-zinc-400 tracking-wider uppercase">Library</div>
          <div className="space-y-0.5">
            <NavItem icon={Inbox} label="All Sessions" view={{ type: 'all' }} badge={124} />
            <NavItem icon={Clock} label="Recent" view={{ type: 'all' }} />
            <NavItem icon={Star} label="Starred" view={{ type: 'starred' }} badge={3} />
            <NavItem icon={Archive} label="Archived" view={{ type: 'archived' }} />
          </div>
        </div>

        {/* Scenarios (Tags) */}
        <div>
          <div className="px-3 mb-2 text-xs font-semibold text-zinc-400 tracking-wider uppercase">Scenarios</div>
          <div className="space-y-0.5">
            <NavItem icon={Bug} label="Troubleshooting" view={{ type: 'tag', value: '故障排查' }} />
            <NavItem icon={Code} label="Architecture" view={{ type: 'tag', value: '架构设计' }} />
            <NavItem icon={Server} label="DevOps" view={{ type: 'tag', value: '部署运维' }} />
            <NavItem icon={FlaskConical} label="Research" view={{ type: 'tag', value: '实验研究' }} />
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="px-3 mb-2 text-xs font-semibold text-zinc-400 tracking-wider uppercase">Projects</div>
          <div className="space-y-0.5">
            <NavItem icon={FolderGit2} label="mobile-app" view={{ type: 'project', value: 'mobile-app' }} />
            <NavItem icon={FolderGit2} label="codex-manager" view={{ type: 'project', value: 'codex-manager' }} />
            <NavItem icon={FolderGit2} label="ai-gateway" view={{ type: 'project', value: 'ai-gateway' }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-200/50">
        <button className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-md transition-colors">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
