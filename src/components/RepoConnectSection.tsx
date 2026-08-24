import React, { useState } from 'react';
import { AnalysisProgress, RepositoryMetadata } from '../types/knowledge';
import { 
  GitBranch, 
  CheckCircle2, 
  Loader2, 
  ExternalLink, 
  Sparkles, 
  FolderTree, 
  Users, 
  GitPullRequest, 
  FileCode,
  AlertCircle,
  Database,
  ArrowRight,
  Star,
  GitFork,
  Code2,
  ShieldCheck
} from 'lucide-react';

interface RepoConnectSectionProps {
  onAnalyze: (repoUrl: string) => Promise<void>;
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  progress: AnalysisProgress | null;
  metadata?: RepositoryMetadata | null;
}

const PRESET_REPOS = [
  { name: 'kubernetes/kubernetes', url: 'https://github.com/kubernetes/kubernetes', tag: 'Benchmark' },
  { name: 'facebook/react', url: 'https://github.com/facebook/react', tag: 'UI Engine' },
  { name: 'vercel/next.js', url: 'https://github.com/vercel/next.js', tag: 'Web Platform' },
  { name: 'torvalds/linux', url: 'https://github.com/torvalds/linux', tag: 'Kernel C' },
  { name: 'pallets/flask', url: 'https://github.com/pallets/flask', tag: 'Python Framework' }
];

export function RepoConnectSection({
  onAnalyze,
  isAnalyzing,
  isAnalyzed,
  progress,
  metadata
}: RepoConnectSectionProps) {
  const [repoUrl, setRepoUrl] = useState('https://github.com/kubernetes/kubernetes');
  const [inputError, setInputError] = useState<string | null>(null);

  const handleAnalyzeClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      setInputError('Please enter a valid GitHub repository URL.');
      return;
    }
    setInputError(null);
    onAnalyze(repoUrl.trim());
  };

  const handlePresetSelect = (url: string) => {
    setRepoUrl(url);
    setInputError(null);
    onAnalyze(url);
  };

  const activeRepoName = metadata?.fullName || 'Repository';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-brand-50/60 via-white to-slate-50/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Connect Engineering Knowledge</h2>
            <p className="text-xs text-slate-500 font-mono">Public GitHub Repository & Organization Connector</p>
          </div>
        </div>

        {isAnalyzed && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{activeRepoName} Indexed</span>
          </div>
        )}
      </div>

      {/* Main Connection Form */}
      <div className="p-6 sm:p-8 space-y-6">
        <form onSubmit={handleAnalyzeClick} className="space-y-4">
          <div>
            <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-2">
              GitHub Repository URL or <code className="text-brand-600">owner/repo</code>
            </label>
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => {
                    setRepoUrl(e.target.value);
                    if (inputError) setInputError(null);
                  }}
                  disabled={isAnalyzing}
                  placeholder="https://github.com/facebook/react or owner/repo"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-hidden focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shrink-0"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
                    <span>Analyzing Repository...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Repository</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {inputError && (
              <p className="mt-2 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{inputError}</span>
              </p>
            )}
          </div>

          {/* Quick Preset Selection Pills for Hackathon Demo */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
              Quick 1-Click Demo Repositories:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {PRESET_REPOS.map((preset) => {
                const isActive = repoUrl.toLowerCase().includes(preset.name.toLowerCase());
                return (
                  <button
                    key={preset.name}
                    type="button"
                    disabled={isAnalyzing}
                    onClick={() => handlePresetSelect(preset.url)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 border cursor-pointer ${
                      isActive 
                        ? 'bg-brand-600 text-white border-brand-600 shadow-xs scale-102' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{preset.name}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-white/20 text-white font-bold' : 'bg-slate-200/80 text-slate-600'
                    }`}>
                      {preset.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {/* Live Analysis Progress Indicator */}
        {isAnalyzing && progress && (
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 animate-slide-up">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-brand-400 flex items-center gap-2 font-bold">
                <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
                <span>STAGE {progress.step} OF {progress.totalSteps}</span>
              </span>
              <span className="text-slate-400">
                {Math.round((progress.step / progress.totalSteps) * 100)}%
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-200">
              {progress.stage}
            </p>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${(progress.step / progress.totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Ready / Analyzed Checklist & Repository Stats */}
        {isAnalyzed && !isAnalyzing && (
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-4 animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3 className="text-sm font-bold text-emerald-950">
                  {activeRepoName} Knowledge Graph Indexed & Ready
                </h3>
              </div>
              <a
                href={metadata?.url || repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 shrink-0"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Live Metadata Metrics Pills */}
            {metadata && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-200/80 flex items-center gap-2 text-emerald-950">
                  <Star className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-sans">Stars</span>
                    <span className="font-bold">{metadata.stars.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-200/80 flex items-center gap-2 text-emerald-950">
                  <GitFork className="w-4 h-4 text-blue-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-sans">Forks</span>
                    <span className="font-bold">{metadata.forks.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-200/80 flex items-center gap-2 text-emerald-950">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-sans">Open Issues</span>
                    <span className="font-bold">{metadata.openIssues.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-200/80 flex items-center gap-2 text-emerald-950">
                  <Code2 className="w-4 h-4 text-purple-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-sans">Language</span>
                    <span className="font-bold truncate max-w-[80px] block">{metadata.language}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-200/80 flex items-center gap-2 text-emerald-950 col-span-2 sm:col-span-1">
                  <GitBranch className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-sans">Branch</span>
                    <span className="font-bold">{metadata.defaultBranch || 'main'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-emerald-900 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Repository metadata & stars</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Directory & subsystem tree</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Core components & packages</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Maintainers & contributors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Recent commit history</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Open issue tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Pull Request attribution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Language & stack detection</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


