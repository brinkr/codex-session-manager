import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings2, 
  Palette, 
  Languages, 
  Cpu, 
  Database, 
  Shield,
  X,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

type SettingsTab = 'general' | 'appearance' | 'language' | 'ai' | 'data' | 'privacy';

export function SettingsModal({ isOpen, onClose, theme, setTheme }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--color-stone-panel)] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)] z-[101] flex overflow-hidden border border-white/10"
          >
            {/* Sidebar */}
            <div className="w-[220px] bg-[var(--color-stone-panel)] border-r border-black/[0.06] flex flex-col">
              <div className="h-12 flex items-center px-4 shrink-0">
                <span className="text-[13px] font-bold text-[var(--color-ink-main)]">Preferences</span>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={<Settings2 className="w-4 h-4" />} label="General" />
                <TabButton active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')} icon={<Palette className="w-4 h-4" />} label="Appearance" />
                <TabButton active={activeTab === 'language'} onClick={() => setActiveTab('language')} icon={<Languages className="w-4 h-4" />} label="Language" />
                <TabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={<Cpu className="w-4 h-4" />} label="AI Configuration" />
                <TabButton active={activeTab === 'data'} onClick={() => setActiveTab('data')} icon={<Database className="w-4 h-4" />} label="Data & Index" />
                <TabButton active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} icon={<Shield className="w-4 h-4" />} label="Storage & Privacy" />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[var(--color-stone-paper)] flex flex-col relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-md text-[var(--color-ink-muted)] hover:bg-black/[0.05] hover:text-[var(--color-ink-main)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex-1 overflow-y-auto p-10">
                {activeTab === 'appearance' && <AppearanceSettings theme={theme} setTheme={setTheme} />}
                {activeTab === 'language' && <LanguageSettings />}
                {activeTab === 'ai' && <AISettings />}
                {activeTab === 'data' && <DataSettings />}
                {activeTab === 'privacy' && <PrivacySettings />}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h2 className="text-[20px] font-bold text-[var(--color-ink-main)]">General</h2>
                    <p className="text-[13px] text-[var(--color-ink-muted)]">General application settings will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
        active 
          ? "bg-[var(--color-accent-cobalt)] text-white shadow-sm" 
          : "text-[var(--color-ink-muted)] hover:bg-black/[0.04] hover:text-[var(--color-ink-main)]"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function AppearanceSettings({ theme, setTheme }: { theme: 'light' | 'dark' | 'system', setTheme: (t: 'light' | 'dark' | 'system') => void }) {
  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h2 className="text-[20px] font-bold text-[var(--color-ink-main)] mb-1">Appearance</h2>
        <p className="text-[13px] text-[var(--color-ink-muted)]">Customize the look and feel of the workspace.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          <ThemeOption active={theme === 'light'} onClick={() => setTheme('light')} label="Light" />
          <ThemeOption active={theme === 'dark'} onClick={() => setTheme('dark')} label="Dark" />
          <ThemeOption active={theme === 'system'} onClick={() => setTheme('system')} label="System" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Density</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 rounded-lg border border-black/[0.06] bg-white/[0.5] cursor-pointer">
            <input type="radio" name="density" defaultChecked className="accent-[var(--color-accent-cobalt)]" />
            <span className="text-[13px] font-medium text-[var(--color-ink-main)]">Comfortable (Default)</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-black/[0.02] cursor-pointer">
            <input type="radio" name="density" className="accent-[var(--color-accent-cobalt)]" />
            <span className="text-[13px] font-medium text-[var(--color-ink-main)]">Compact</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function ThemeOption({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
        active ? "border-[var(--color-accent-cobalt)] bg-[var(--color-accent-cobalt)]/5" : "border-black/[0.06] hover:border-black/[0.15] bg-white/[0.5]"
      )}
    >
      <div className={cn(
        "w-12 h-8 rounded-md border shadow-sm flex overflow-hidden",
        label === 'Light' ? "bg-[#F4F4F0] border-black/10" : 
        label === 'Dark' ? "bg-[#1C1C1E] border-white/10" : 
        "bg-gradient-to-r from-[#F4F4F0] to-[#1C1C1E] border-black/10"
      )}>
        <div className={cn("w-1/3 h-full border-r", label === 'Dark' ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5')} />
      </div>
      <span className={cn("text-[13px] font-medium", active ? "text-[var(--color-accent-cobalt)]" : "text-[var(--color-ink-main)]")}>{label}</span>
    </button>
  );
}

function LanguageSettings() {
  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h2 className="text-[20px] font-bold text-[var(--color-ink-main)] mb-1">Language</h2>
        <p className="text-[13px] text-[var(--color-ink-muted)]">Configure interface and AI generation languages.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">UI Language</label>
          <select className="w-full p-2.5 bg-white/[0.5] border border-black/[0.08] rounded-lg text-[13px] text-[var(--color-ink-main)] focus:outline-none focus:border-[var(--color-accent-cobalt)]">
            <option>English</option>
            <option>简体中文</option>
          </select>
          <p className="text-[11px] text-[var(--color-ink-muted)] mt-1">The language used for the application interface.</p>
        </div>

        <div className="flex flex-col gap-1.5 mt-6">
          <label className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">AI Output Language</label>
          <select className="w-full p-2.5 bg-white/[0.5] border border-black/[0.08] rounded-lg text-[13px] text-[var(--color-ink-main)] focus:outline-none focus:border-[var(--color-accent-cobalt)]">
            <option>Same as UI Language</option>
            <option>English</option>
            <option>简体中文</option>
          </select>
          <p className="text-[11px] text-[var(--color-ink-muted)] mt-1">The preferred language for AI-generated summaries, tags, and recommendations.</p>
        </div>
      </div>
    </div>
  );
}

function AISettings() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-[20px] font-bold text-[var(--color-ink-main)] mb-1">AI Configuration</h2>
        <p className="text-[13px] text-[var(--color-ink-muted)]">AI is an enhancement layer. The app works fully locally without it.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Provider</h3>
        <select className="w-full max-w-md p-2.5 bg-white/[0.5] border border-black/[0.08] rounded-lg text-[13px] text-[var(--color-ink-main)] focus:outline-none focus:border-[var(--color-accent-cobalt)]">
          <option>Local Model (Ollama)</option>
          <option>OpenAI</option>
          <option>Company Gateway</option>
          <option>Custom Endpoint</option>
          <option>Disabled</option>
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Connection</h3>
        <div className="space-y-3 max-w-md">
          <input type="password" placeholder="API Key" value="sk-........................" readOnly className="w-full p-2.5 bg-white/[0.5] border border-black/[0.08] rounded-lg text-[13px] text-[var(--color-ink-main)] font-mono" />
          <input type="text" placeholder="Base URL" value="http://localhost:11434/v1" readOnly className="w-full p-2.5 bg-white/[0.5] border border-black/[0.08] rounded-lg text-[13px] text-[var(--color-ink-main)] font-mono" />
          <input type="text" placeholder="Model" value="llama3" readOnly className="w-full p-2.5 bg-white/[0.5] border border-black/[0.08] rounded-lg text-[13px] text-[var(--color-ink-main)] font-mono" />
          <button className="px-4 py-2 bg-black/[0.04] hover:bg-black/[0.08] text-[var(--color-ink-main)] text-[12px] font-medium rounded-lg transition-colors">
            Test Connection
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Generation Policy</h3>
        <div className="space-y-2">
          <ToggleRow label="Manual only" description="Only generate when explicitly requested" checked={false} />
          <ToggleRow label="Generate for opened sessions" description="Automatically summarize when you open a session" checked={true} />
          <ToggleRow label="Generate for starred sessions" description="Keep starred sessions up to date" checked={true} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Features</h3>
        <div className="space-y-2">
          <ToggleRow label="Generate summaries" checked={true} />
          <ToggleRow label="Generate auto tags" checked={true} />
          <ToggleRow label="Generate related sessions" checked={false} />
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h4 className="text-[12px] font-bold text-amber-800 mb-1">Privacy & Cost</h4>
        <p className="text-[12px] text-amber-700/80">Archived sessions are never processed. Bulk generation will prompt for confirmation to prevent unexpected API costs.</p>
      </div>
    </div>
  );
}

function DataSettings() {
  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h2 className="text-[20px] font-bold text-[var(--color-ink-main)] mb-1">Data & Index</h2>
        <p className="text-[13px] text-[var(--color-ink-muted)]">Manage local session files and search indexing.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Codex Directory</h3>
        <div className="flex gap-2">
          <input type="text" value="~/.codex/sessions" readOnly className="flex-1 p-2.5 bg-white/[0.5] border border-black/[0.08] rounded-lg text-[13px] text-[var(--color-ink-main)] font-mono" />
          <button className="px-4 py-2 bg-black/[0.04] hover:bg-black/[0.08] text-[var(--color-ink-main)] text-[12px] font-medium rounded-lg transition-colors">
            Change...
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Indexing</h3>
        <div className="space-y-2">
          <ToggleRow label="Auto scan new sessions" description="Watch directory for changes" checked={true} />
          <div className="flex items-center justify-between py-2">
            <span className="text-[13px] text-[var(--color-ink-main)]">Search Mode</span>
            <select className="p-1.5 bg-white/[0.5] border border-black/[0.08] rounded-md text-[12px] text-[var(--color-ink-main)]">
              <option>Hybrid (Keyword + Vector)</option>
              <option>Keyword Only (Faster)</option>
            </select>
          </div>
          <button className="mt-2 px-4 py-2 bg-black/[0.04] hover:bg-black/[0.08] text-[var(--color-ink-main)] text-[12px] font-medium rounded-lg transition-colors w-full text-left">
            Rebuild Local Index
          </button>
        </div>
      </div>
    </div>
  );
}

function PrivacySettings() {
  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h2 className="text-[20px] font-bold text-[var(--color-ink-main)] mb-1">Storage & Privacy</h2>
        <p className="text-[13px] text-[var(--color-ink-muted)]">Control how your metadata and credentials are stored.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Security</h3>
        <ToggleRow label="Store API keys securely" description="Use system keychain instead of plaintext config" checked={true} />
      </div>

      <div className="space-y-4">
        <h3 className="text-[12px] font-bold text-[var(--color-ink-faint)] uppercase tracking-wider">Data Management</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 rounded-lg border border-black/[0.06] hover:bg-black/[0.02] transition-colors text-left">
            <div>
              <div className="text-[13px] font-medium text-[var(--color-ink-main)]">Export Metadata</div>
              <div className="text-[11px] text-[var(--color-ink-muted)]">Backup tags, notes, and stars as JSON</div>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors text-left">
            <div>
              <div className="text-[13px] font-medium text-red-600">Clear Generated Summaries</div>
              <div className="text-[11px] text-red-500/80">Delete all AI-generated content (can be regenerated)</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked }: { label: string, description?: string, checked: boolean }) {
  return (
    <label className="flex items-start justify-between py-2 cursor-pointer group">
      <div>
        <div className="text-[13px] font-medium text-[var(--color-ink-main)]">{label}</div>
        {description && <div className="text-[11px] text-[var(--color-ink-muted)] mt-0.5">{description}</div>}
      </div>
      <div className={cn(
        "w-8 h-4.5 rounded-full relative transition-colors mt-0.5",
        checked ? "bg-[var(--color-accent-cobalt)]" : "bg-black/20"
      )}>
        <div className={cn(
          "absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-transform shadow-sm",
          checked ? "left-[17px]" : "left-0.5"
        )} />
      </div>
    </label>
  );
}
