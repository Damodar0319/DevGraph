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
  ArrowRight
} from 'lucide-react';

interface RepoConnectSectionProps {
  onAnalyze: (repoUrl: string) => Promise<void>;
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  progress: AnalysisProgress | null;
  metadata?: RepositoryMetadata | null;
}

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
            <p className="text-xs text-slate-500 font-mono">Public GitHub Repository Connector</p>
          </div>
        </div>

        {isAnalyzed && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Repository Analyzed</span>
          </div>
        )}
      </div>

      {/* Main Connection Form */}
      <div className="p-6 sm:p-8 space-y-6">
        <form onSubmit={handleAnalyzeClick} className="space-y-4">
          <div>
            <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 mb-2">
              GitHub Repository URL
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
                  placeholder="https://github.com/kubernetes/kubernetes"
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-emerald-950">
                  Kubernetes Engineering Knowledge Indexed & Ready
                </h3>
              </div>
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Verification Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-emerald-900 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Repository metadata</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Source structure (pkg/, cmd/)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Core components & CRI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Contributors & SIG leads</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Commits history</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Issues & lock benchmarks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Pull Requests (PR #124890)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>go.mod dependencies</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
