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
          "w-full flex items-center justify-between px-3 py-1.5 text-[13px] rounded-lg transition-all duration-200 group relative outline-none",
          active 
            ? "text-zinc-900 font-medium" 
            : "text-zinc-500 hover:text-zinc-800 hover:bg-black/[0.03]"
        )}
      >
        {active && (
          <div className="absolute inset-0 bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] border border-black/[0.02]" />
        )}
        <div className="flex items-center gap-2.5 relative z-10">
          <Icon className={cn("w-4 h-4 transition-colors", active ? "text-[#2563EB]" : "text-zinc-400 group-hover:text-zinc-500")} />
          <span>{label}</span>
        </div>
        {badge !== undefined && (
          <span className={cn(
            "text-[11px] px-1.5 py-0.5 rounded-full relative z-10 transition-colors font-medium",
            active ? "text-[#2563EB]" : "text-zinc-400 group-hover:text-zinc-500"
          )}>
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="w-64 flex-shrink-0 bg-transparent flex flex-col h-full border-r border-black/[0.06] z-20">
      
      {/* Search / Command Trigger */}
      <div className="px-4 py-4">
        <button 
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-2 bg-black/[0.03] hover:bg-black/[0.05] border border-black/[0.04] rounded-xl text-[13px] text-zinc-500 transition-all shadow-sm outline-none focus:ring-2 focus:ring-[#2563EB]/20"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-400" />
            <span>Search...</span>
          </div>
          <kbd className="text-[10px] font-sans font-medium px-1.5 py-0.5 bg-white/60 border border-black/[0.05] rounded text-zinc-400 shadow-sm">⌘K</kbd>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-6 pb-4 no-scrollbar">
        {/* Library */}
        <div>
          <div className="px-3 mb-1.5 text-[11px] font-semibold text-zinc-400/80 tracking-wider uppercase">Library</div>
          <div className="space-y-0.5">
            <NavItem icon={Inbox} label="All Sessions" view={{ type: 'all' }} badge={124} />
            <NavItem icon={Clock} label="Recent" view={{ type: 'all' }} />
            <NavItem icon={Star} label="Starred" view={{ type: 'starred' }} badge={3} />
            <NavItem icon={Archive} label="Archived" view={{ type: 'archived' }} />
          </div>
        </div>

        {/* Scenarios (Tags) */}
        <div>
          <div className="px-3 mb-1.5 text-[11px] font-semibold text-zinc-400/80 tracking-wider uppercase">Scenarios</div>
          <div className="space-y-0.5">
            <NavItem icon={Bug} label="Troubleshooting" view={{ type: 'tag', value: '故障排查' }} />
            <NavItem icon={Code} label="Architecture" view={{ type: 'tag', value: '架构设计' }} />
            <NavItem icon={Server} label="DevOps" view={{ type: 'tag', value: '部署运维' }} />
            <NavItem icon={FlaskConical} label="Research" view={{ type: 'tag', value: '实验研究' }} />
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="px-3 mb-1.5 text-[11px] font-semibold text-zinc-400/80 tracking-wider uppercase">Projects</div>
          <div className="space-y-0.5">
            <NavItem icon={FolderGit2} label="mobile-app" view={{ type: 'project', value: 'mobile-app' }} />
            <NavItem icon={FolderGit2} label="codex-manager" view={{ type: 'project', value: 'codex-manager' }} />
            <NavItem icon={FolderGit2} label="ai-gateway" view={{ type: 'project', value: 'ai-gateway' }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 mt-auto">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-zinc-500 hover:text-zinc-800 hover:bg-black/[0.03] rounded-lg transition-colors outline-none">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
