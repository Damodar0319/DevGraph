import React, { useState, useEffect } from 'react';
import { RepoConnectSection } from './components/RepoConnectSection';
import { SearchSection } from './components/SearchSection';
import { LoadingProgress } from './components/LoadingProgress';
import { AnswerCard } from './components/AnswerCard';
import { analyzeGitHubRepository, REAL_K8S_KNOWLEDGE, KubernetesKnowledgeBase } from './services/githubService';
import { answerEngineeringQuestion } from './services/k8sKnowledgeEngine';
import { QueryResult, Entity, AnalysisProgress } from './types/knowledge';
import { 
  Network, 
  Sparkles, 
  Database, 
  GitBranch, 
  Users, 
  FileText, 
  ShieldCheck, 
  X,
  Layers,
  ExternalLink
} from 'lucide-react';

export function App() {
  const [knowledgeBase, setKnowledgeBase] = useState<KubernetesKnowledgeBase>(REAL_K8S_KNOWLEDGE);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(true); // Pre-analyzed by default for instant demo
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');

  // Handle repository analysis
  const handleAnalyzeRepository = async (repoUrl: string) => {
    setIsAnalyzing(true);
    setIsAnalyzed(false);
    setResult(null);

    try {
      const kb = await analyzeGitHubRepository(repoUrl, (progress) => {
        setAnalysisProgress(progress);
      });
      setKnowledgeBase(kb);
      setIsAnalyzed(true);
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle question search
  const handleSearch = async (queryText: string) => {
    if (!queryText.trim()) return;
    setLastQuery(queryText);
    setIsLoading(true);
    setResult(null);

    // Multi-stage pipeline traversal
    setTimeout(async () => {
      try {
        const queryResult = await answerEngineeringQuestion(queryText, knowledgeBase);
        setResult(queryResult);
      } catch (err) {
        console.error('Error answering question:', err);
      } finally {
        setIsLoading(false);
      }
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-brand-500 selection:text-white flex flex-col">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-slate-900 tracking-tight">DEVGRAPH</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200/80">
                Kubernetes Knowledge Engine
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <a
            href="https://github.com/kubernetes/kubernetes"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono">kubernetes/kubernetes</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Hero Section */}
        <section className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>AI-Powered Engineering Knowledge Graph</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Your engineering knowledge, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              connected & source-grounded.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
            Connect public engineering repositories and ask complex questions across code, components, PRs, issues, commits, and contributors.
          </p>
        </section>

        {/* 1. Repository Connection Section */}
        <section>
          <RepoConnectSection
            onAnalyze={handleAnalyzeRepository}
            isAnalyzing={isAnalyzing}
            isAnalyzed={isAnalyzed}
            progress={analysisProgress}
            metadata={knowledgeBase.metadata}
          />
        </section>

        {/* 2. Main Search & Voice Interface */}
        <section>
          <SearchSection
            onSearch={handleSearch}
            isLoading={isLoading || isAnalyzing}
            isRepoAnalyzed={isAnalyzed}
          />
        </section>

        {/* 3. Multi-Stage Loading Progression */}
        {isLoading && (
          <section>
            <LoadingProgress />
          </section>
        )}

        {/* 4. Grounded Answer Card with GitHub Sources & Relationship Graph */}
        {!isLoading && result && (
          <section>
            <AnswerCard 
              result={result} 
              onSelectEntity={(entity) => setSelectedEntity(entity)} 
            />
          </section>
        )}

        {/* Initial Explanation when no query active */}
        {!isLoading && !result && (
          <section className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-elevated space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Network className="w-5 h-5 text-brand-600" />
                <span>How DevGraph Understands Kubernetes</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                DevGraph extracts entities from <code className="font-mono text-slate-700">kubernetes/kubernetes</code> and connects them via typed relationship graph edges.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="text-[10px] font-mono text-brand-600 font-bold block">01 · REPOSITORY INGESTION</span>
                <h3 className="font-bold text-slate-900">Parse GitHub Metadata</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Ingests <code className="font-mono text-slate-700">pkg/</code>, <code className="font-mono text-slate-700">cmd/</code>, contributors, commits, and PRs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="text-[10px] font-mono text-indigo-600 font-bold block">02 · GRAPH TRAVERSAL</span>
                <h3 className="font-bold text-slate-900">Map Relationships</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Connects <code className="font-mono text-slate-700">CONTAINS</code>, <code className="font-mono text-slate-700">AUTHORED</code>, and <code className="font-mono text-slate-700">MODIFIED</code> edges.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="text-[10px] font-mono text-purple-600 font-bold block">03 · EVIDENCE CITATION</span>
                <h3 className="font-bold text-slate-900">Source Grounding</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Links exact file paths, commit SHAs, and PR URLs on GitHub.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="text-[10px] font-mono text-emerald-600 font-bold block">04 · VERIFIED ANSWER</span>
                <h3 className="font-bold text-slate-900">Grounded Output</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Synthesizes factual answers without hallucination.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Entity Inspector Modal (when clicking any entity pill or graph node) */}
      {selectedEntity && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedEntity(null)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-5 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-brand-600 px-2 py-0.5 rounded-full bg-brand-50 border border-brand-200">
                  {selectedEntity.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedEntity.name}</h3>
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {selectedEntity.description}
            </p>

            {selectedEntity.url && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 truncate max-w-[280px]">{selectedEntity.url}</span>
                <a
                  href={selectedEntity.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1 shrink-0"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <button
              onClick={() => {
                const q = `Tell me about ${selectedEntity.name}`;
                setSelectedEntity(null);
                handleSearch(q);
              }}
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
            >
              Ask DevGraph about {selectedEntity.name}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400 font-mono">
        DevGraph · Real Kubernetes Engineering Knowledge Graph MVP
      </footer>
    </div>
  );
}

export default App;
