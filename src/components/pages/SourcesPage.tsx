import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FolderGit2, 
  MessageSquare, 
  FileText, 
  GitBranch, 
  Activity,
  Server,
  ExternalLink
} from 'lucide-react';
import { MOCK_SOURCES } from '../../data/mockData';

export function SourcesPage() {
  const { navigateTo } = useApp();
  const [syncingSourceId, setSyncingSourceId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSync = (sourceId: string, name: string) => {
    setSyncingSourceId(sourceId);
    setTimeout(() => {
      setSyncingSourceId(null);
      setNotification(`Successfully synced and re-indexed ${name}. 4 new entities added.`);
      setTimeout(() => setNotification(null), 3500);
    }, 1200);
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'github': return <FolderGit2 className="w-6 h-6 text-slate-900" />;
      case 'jira': return <Layers className="w-6 h-6 text-blue-600" />;
      case 'slack': return <MessageSquare className="w-6 h-6 text-emerald-600" />;
      case 'confluence': return <FileText className="w-6 h-6 text-sky-600" />;
      case 'adrs': return <GitBranch className="w-6 h-6 text-amber-600" />;
      case 'cicd': return <Activity className="w-6 h-6 text-purple-600" />;
      default: return <Server className="w-6 h-6 text-slate-700" />;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 p-4 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-6 h-6 text-brand-600" />
              <span>Unified Source Explorer</span>
            </h1>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 rounded-full">
              6 Enterprise Integrations
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">
              Demo Data
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            DevGraph indexes code, pull requests, tickets, Slack discussions, and ADRs into a unified knowledge graph.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSync('all', 'all 6 enterprise integrations')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-subtle transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncingSourceId === 'all' ? 'animate-spin text-brand-600' : 'text-slate-500'}`} />
            <span>Sync All Sources</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Total Entities</span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">24,800+</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">100% Graph Connected</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Repositories</span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">142</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">284k files indexed</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">ADRs & Docs</span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">890</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">48 Architecture Decisions</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Slack & Issues</span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">21,661</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Real-time webhooks</span>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SOURCES.map((source) => {
          const isSyncing = syncingSourceId === source.id;
          return (
            <div
              key={source.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle hover:shadow-elevated transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Source Card Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {getSourceIcon(source.type)}
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Connected</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {source.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {source.description}
                </p>

                {/* Index breakdown metrics */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 mb-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-slate-700">Indexed Count:</span>
                    <span className="text-sm font-bold font-mono text-brand-600">
                      {source.indexedItemsCount.toLocaleString()} {source.indexedUnits}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                    {source.details.map((det, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">{det.label}</span>
                        <span className="font-mono font-medium text-slate-800">{det.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Synced {source.lastSynced}
                </span>

                <button
                  onClick={() => handleSync(source.id, source.name)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-xl border border-brand-200/80 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
