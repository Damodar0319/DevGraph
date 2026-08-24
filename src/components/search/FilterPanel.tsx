import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';

interface FilterPanelProps {
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedRepo: string;
  setSelectedRepo: (repo: string) => void;
  onReset: () => void;
}

export function FilterPanel({
  selectedSource,
  setSelectedSource,
  selectedType,
  setSelectedType,
  selectedRepo,
  setSelectedRepo,
  onReset
}: FilterPanelProps) {
  const sources = [
    { id: 'all', label: 'All Sources', count: 480 },
    { id: 'github', label: 'GitHub (Code & PRs)', count: 184 },
    { id: 'confluence', label: 'Confluence Docs', count: 96 },
    { id: 'slack', label: 'Slack Threads', count: 142 },
    { id: 'adrs', label: 'Architecture Decisions', count: 48 },
    { id: 'jira', label: 'Jira Issues', count: 65 },
  ];

  const types = [
    { id: 'all', label: 'All Entities' },
    { id: 'code', label: 'Code & Symbols' },
    { id: 'pr', label: 'Pull Requests' },
    { id: 'doc', label: 'Design Specs' },
    { id: 'decision', label: 'ADRs' },
    { id: 'service', label: 'Services' },
    { id: 'person', label: 'Engineers' },
  ];

  const repos = [
    { id: 'all', label: 'All Repositories' },
    { id: 'auth-service', label: 'company/auth-service' },
    { id: 'payment-service', label: 'company/payment-service' },
    { id: 'user-service', label: 'company/user-service' },
    { id: 'api-gateway', label: 'company/api-gateway' },
    { id: 'architecture', label: 'company/architecture' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-6 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
            Filters
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-slate-700 flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sources Filter */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Source Platform
        </span>
        <div className="space-y-1">
          {sources.map((src) => {
            const active = selectedSource === src.id;
            return (
              <button
                key={src.id}
                onClick={() => setSelectedSource(src.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors
                  ${active 
                    ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-200/60' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <span>{src.label}</span>
                <span className="text-[10px] font-mono text-slate-400">{src.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Entity Type Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Entity Type
        </span>
        <div className="space-y-1">
          {types.map((type) => {
            const active = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors
                  ${active 
                    ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-200/60' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <span>{type.label}</span>
                {active && <Check className="w-3.5 h-3.5 text-brand-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Repositories Filter */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Repository
        </span>
        <div className="space-y-1">
          {repos.map((repo) => {
            const active = selectedRepo === repo.id;
            return (
              <button
                key={repo.id}
                onClick={() => setSelectedRepo(repo.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left font-mono text-[11px] transition-colors truncate
                  ${active 
                    ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200/60' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <span className="truncate">{repo.label}</span>
                {active && <Check className="w-3 h-3 text-brand-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
