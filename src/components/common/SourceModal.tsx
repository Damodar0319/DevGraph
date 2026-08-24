import React from 'react';
import { EvidenceSource } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, ExternalLink, GitPullRequest, FileText, MessageSquare, BookOpen, CheckCircle, Copy, Check } from 'lucide-react';

export function SourceModal() {
  const { activeEvidenceModal, closeEvidenceModal, navigateTo } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!activeEvidenceModal) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeEvidenceModal.fullContent || activeEvidenceModal.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSourceIcon = (type: EvidenceSource['type']) => {
    switch (type) {
      case 'github_pr':
        return <GitPullRequest className="w-5 h-5 text-purple-600" />;
      case 'adr':
        return <FileText className="w-5 h-5 text-amber-600" />;
      case 'confluence':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'slack':
        return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm mt-0.5">
              {getSourceIcon(activeEvidenceModal.type)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {activeEvidenceModal.repoOrChannel}
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {activeEvidenceModal.relevanceScore}% Grounded Match
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {activeEvidenceModal.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Authored by <span className="font-semibold text-slate-700">{activeEvidenceModal.author}</span> · {activeEvidenceModal.date}
              </p>
            </div>
          </div>
          <button
            onClick={closeEvidenceModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto font-sans text-sm text-slate-700 space-y-4">
          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            <pre className="whitespace-pre-wrap">
              {activeEvidenceModal.fullContent || activeEvidenceModal.snippet}
            </pre>
          </div>

          {activeEvidenceModal.tags && activeEvidenceModal.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-2">
              <span className="text-xs font-medium text-slate-400">Connected entities:</span>
              {activeEvidenceModal.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 text-xs font-mono bg-slate-100 text-slate-700 rounded border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50/80">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-200/60 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to clipboard' : 'Copy context snippet'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeEvidenceModal();
                navigateTo('/graph');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
            >
              Inspect in Knowledge Graph
            </button>
            {activeEvidenceModal.url && (
              <a
                href={activeEvidenceModal.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-sm"
              >
                <span>External Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
