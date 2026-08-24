import React, { useState, useEffect } from 'react';
import { AIQueryResponse } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { EntityBadge } from '../common/Badge';

interface AIAnswerCardProps {
  data: AIQueryResponse;
  isLoading?: boolean;
}

export function AIAnswerCard({ data, isLoading = false }: AIAnswerCardProps) {
  const { navigateTo, setSelectedNodeId } = useApp();
  const [copied, setCopied] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(true);

  // Animate multi-step reasoning progression
  useEffect(() => {
    if (isLoading) {
      setCurrentStepIndex(0);
      const interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < (data.reasoningSteps?.length || 4) - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 350);
      return () => clearInterval(interval);
    }
  }, [isLoading, data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEntityClick = (entityName: string, entityType?: string, entityId?: string) => {
    if (entityId) {
      if (entityType === 'service') {
        navigateTo(`/services/${entityId}`);
        return;
      }
      if (entityType === 'person') {
        navigateTo(`/people/${entityId}`);
        return;
      }
      setSelectedNodeId(entityId);
      navigateTo('/graph');
    } else {
      navigateTo('/graph');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-brand-200/90 shadow-elevated relative overflow-hidden animate-pulse-subtle">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600">
            <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">DevGraph AI Reasoning Engine</h3>
            <p className="text-xs text-slate-500">Traversing connected codebases, ADRs, PRs & ownership graphs...</p>
          </div>
        </div>

        {/* Reasoning Progression */}
        <div className="space-y-3 pl-2 border-l-2 border-brand-100 ml-4 py-1">
          {data.reasoningSteps.map((step, idx) => {
            const isDone = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div key={idx} className="flex items-start gap-3 transition-all duration-200">
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 bg-white" />
                  )}
                </div>
                <div>
                  <p className={`text-xs font-semibold ${isCurrent ? 'text-brand-700' : isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-slate-500">{step.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-elevated overflow-hidden transition-all duration-200">
      {/* Header */}
      <div className="p-5 pb-3 flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-brand-50/50 via-white to-slate-50/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">DevGraph Verified Answer</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                Grounded with {data.evidence?.length || 4} Sources
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Traversed 12 graph edges across services, PRs, and decisions</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Copy answer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => navigateTo('/graph')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200/80 rounded-lg transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden sm:inline">View Knowledge Graph</span>
          </button>
        </div>
      </div>

      {/* Main Answer Body */}
      <div className="p-6">
        <div className="prose prose-slate max-w-none text-sm text-slate-800 leading-relaxed space-y-3 font-sans">
          {data.answer.split('\n\n').map((paragraph, pIdx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h4 key={pIdx} className="text-xs font-bold uppercase tracking-wider text-slate-900 mt-4 mb-2">
                  {paragraph.replace('### ', '')}
                </h4>
              );
            }
            if (paragraph.startsWith('* ') || paragraph.startsWith('1. ')) {
              const lines = paragraph.split('\n');
              return (
                <ul key={pIdx} className="space-y-1.5 my-2 pl-4 list-disc text-slate-700 text-xs">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx} className="pl-1">
                      {line.replace(/^(\*|\d+\.)\s+/, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={pIdx} className="text-slate-800 text-sm leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Highlighted Entity Badges */}
        {data.highlightedEntities && data.highlightedEntities.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center flex-wrap gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1">Connected Entities:</span>
            {data.highlightedEntities.map((entity, idx) => (
              <EntityBadge
                key={idx}
                name={entity.name}
                type={entity.type}
                onClick={() => handleEntityClick(entity.name, entity.type, entity.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reasoning Steps Accordion (Collapsible) */}
      <div className="px-6 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
        <button
          onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>DevGraph Traversal Reasoning ({data.reasoningSteps.length} Steps)</span>
          {isReasoningExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <span className="text-[11px] font-mono text-slate-400">Execution time: 38ms</span>
      </div>

      {isReasoningExpanded && (
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 space-y-2">
          {data.reasoningSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">{step.title}: </span>
                <span className="text-slate-600">{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
