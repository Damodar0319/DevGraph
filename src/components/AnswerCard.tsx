import React, { useState } from 'react';
import { QueryResult, Entity } from '../types/knowledge';
import { RelationshipGraphView } from './RelationshipGraphView';
import { FormattedAnswerView } from './FormattedAnswerView';
import { 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  GitPullRequest, 
  FileText, 
  AlertTriangle, 
  Layers, 
  Code, 
  ShieldCheck, 
  ExternalLink, 
  GitCommit, 
  User, 
  Terminal, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface AnswerCardProps {
  result: QueryResult;
  onSelectEntity?: (entity: Entity) => void;
}

export function AnswerCard({ result, onSelectEntity }: AnswerCardProps) {
  const [copied, setCopied] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'answer' | 'graph' | 'evidence'>('all');

  const handleCopy = () => {
    navigator.clipboard.writeText(result.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'file':
        return <Code className="w-4 h-4 text-blue-600" />;
      case 'pull_request':
        return <GitPullRequest className="w-4 h-4 text-emerald-600" />;
      case 'commit':
        return <GitCommit className="w-4 h-4 text-purple-600" />;
      case 'issue':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'contributor':
        return <User className="w-4 h-4 text-rose-600" />;
      case 'doc':
        return <FileText className="w-4 h-4 text-sky-600" />;
      default:
        return <Layers className="w-4 h-4 text-brand-600" />;
    }
  };

  const getEntityBadgeStyle = (type: string) => {
    switch (type) {
      case 'component':
        return 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100';
      case 'file':
        return 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100';
      case 'contributor':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
      case 'pull_request':
        return 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100';
      case 'issue':
        return 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100';
      case 'technology':
        return 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100';
      case 'documentation':
        return 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100';
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* 1. DEVGRAPH ANSWER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Card Header */}
        <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-brand-50/60 via-white to-slate-50/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">DEVGRAPH ANSWER</h2>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border flex items-center gap-1
                  ${result.isInsufficient 
                    ? 'bg-amber-50 text-amber-700 border-amber-200' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }
                `}>
                  <ShieldCheck className="w-3 h-3" />
                  {result.confidenceLabel || (result.isInsufficient ? 'Insufficient Evidence' : 'Grounded in GitHub Evidence')}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                QUESTION: "{result.query}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Developer Debug Mode Toggle */}
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Toggle Retrieval Debug Info"
            >
              <Terminal className="w-3 h-3" />
              <span>Debug</span>
              {showDebug ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all cursor-pointer"
              title="Copy answer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* View Mode Tab Selector Bar */}
        <div className="px-5 md:px-6 pt-2 pb-0 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between font-mono text-xs overflow-x-auto shrink-0">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-t-xl font-bold transition-all border-t border-x cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 border-slate-200 shadow-2xs'
                  : 'bg-transparent text-slate-500 hover:text-slate-900 border-transparent'
              }`}
            >
              <span>Full Summary</span>
            </button>
            <button
              onClick={() => setActiveTab('answer')}
              className={`px-3.5 py-2 rounded-t-xl font-bold transition-all border-t border-x cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'answer'
                  ? 'bg-white text-slate-900 border-slate-200 shadow-2xs'
                  : 'bg-transparent text-slate-500 hover:text-slate-900 border-transparent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Grounded Answer</span>
            </button>
            <button
              onClick={() => setActiveTab('graph')}
              className={`px-3.5 py-2 rounded-t-xl font-bold transition-all border-t border-x cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'graph'
                  ? 'bg-white text-slate-900 border-slate-200 shadow-2xs'
                  : 'bg-transparent text-slate-500 hover:text-slate-900 border-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Knowledge Graph ({result.graphNodes.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3.5 py-2 rounded-t-xl font-bold transition-all border-t border-x cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'evidence'
                  ? 'bg-white text-slate-900 border-slate-200 shadow-2xs'
                  : 'bg-transparent text-slate-500 hover:text-slate-900 border-transparent'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>GitHub Sources ({result.evidence.length})</span>
            </button>
          </div>
        </div>

        {/* Developer Debug Panel */}
        {showDebug && result.debugInfo && (
          <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs border-b border-slate-800 space-y-2 animate-fade-in">
            <div className="flex items-center justify-between text-brand-400 font-bold">
              <span>[RETRIEVAL DEBUG INFO]</span>
              <span>Intent: {result.debugInfo.detectedIntent}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-500">Confidence Score:</span>{' '}
                <span className="font-bold text-emerald-400">{Math.round(result.debugInfo.confidenceScore * 100)}%</span>
              </div>
              <div>
                <span className="text-slate-500">Sources Searched:</span>{' '}
                <span>{result.debugInfo.sourcesSearched.join(', ')}</span>
              </div>
            </div>
            {result.debugInfo.traversalPath.length > 0 && (
              <div className="text-[11px]">
                <span className="text-slate-500">Traversal Pipeline:</span>{' '}
                <span className="text-slate-300">{result.debugInfo.traversalPath.join(' → ')}</span>
              </div>
            )}
          </div>
        )}

        {/* Main Natural Language Answer (Formatted Typography) */}
        {(activeTab === 'all' || activeTab === 'answer') && (
          <div className="p-6 md:p-8 space-y-6">
            <FormattedAnswerView content={result.answer} />

            {/* KEY TAKEAWAYS */}
            {result.keyTakeaways && result.keyTakeaways.length > 0 && (
              <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 space-y-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-brand-900 block flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>Key Takeaways</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 pl-1">
                  {result.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* RELATED KNOWLEDGE (CONNECTED ENTITIES) */}
            {result.relatedEntities && result.relatedEntities.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-2.5">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 block">
                  RELATED KNOWLEDGE ({result.relatedEntities.length} Entities)
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {result.relatedEntities.map((entity) => (
                    <button
                      key={entity.id}
                      onClick={() => onSelectEntity && onSelectEntity(entity)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer shadow-2xs ${getEntityBadgeStyle(entity.type)}`}
                    >
                      <span className="font-bold">{entity.name}</span>
                      <span className="text-[10px] opacity-75 font-mono uppercase">({entity.type})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. RELATIONSHIP GRAPH */}
      {(activeTab === 'all' || activeTab === 'graph') && (
        <RelationshipGraphView 
          nodes={result.graphNodes} 
          edges={result.graphEdges} 
        />
      )}

      {/* 3. GROUNDED EVIDENCE & GITHUB SOURCES */}
      {(activeTab === 'all' || activeTab === 'evidence') && result.evidence && result.evidence.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              <span>Grounded Evidence & GitHub Sources ({result.evidence.length})</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Public GitHub Verified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.evidence.map((ev, idx) => (
              <div
                key={ev.id || idx}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-brand-300 hover:bg-white transition-all space-y-3 text-xs shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getEvidenceIcon(ev.type)}
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-600">
                        {ev.source}
                      </span>
                    </div>
                    {ev.date && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {ev.date}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">
                    {ev.title}
                  </h4>

                  {ev.author && (
                    <p className="text-[11px] text-slate-500">
                      Author: <span className="font-semibold text-slate-700">{ev.author}</span>
                    </p>
                  )}

                  {ev.snippet && (
                    <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap overflow-x-auto">
                      {ev.snippet}
                    </div>
                  )}

                  {ev.relevanceExplanation && (
                    <p className="text-[11px] text-slate-500 italic">
                      Why relevant: {ev.relevanceExplanation}
                    </p>
                  )}
                </div>

                {ev.url && (
                  <div className="pt-2 border-t border-slate-200/60">
                    <a
                      href={ev.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-bold shadow-xs transition-colors"
                    >
                      <span>Open on GitHub</span>
                      <ExternalLink className="w-3 h-3 text-slate-300" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
