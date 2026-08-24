import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Network, Sparkles, Database, FileText } from 'lucide-react';

const LOADING_STAGES = [
  { id: 1, text: 'Analyzing your question...', icon: Sparkles },
  { id: 2, text: 'Finding relevant engineering knowledge...', icon: Database },
  { id: 3, text: 'Traversing relationships in knowledge graph...', icon: Network },
  { id: 4, text: 'Collecting and verifying grounded evidence...', icon: FileText },
  { id: 5, text: 'Preparing contextual answer...', icon: CheckCircle2 }
];

interface LoadingProgressProps {
  onComplete?: () => void;
}

export function LoadingProgress() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < LOADING_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-200/90 shadow-xl space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-xs">
          <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">DevGraph Knowledge Engine</h3>
          <p className="text-xs text-slate-500 font-mono">Traversing codebases, ADRs, PRs & ownership relationships...</p>
        </div>
      </div>

      {/* 5-Stage Progression List */}
      <div className="space-y-3.5 pl-2">
        {LOADING_STAGES.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isPending = idx > currentStageIndex;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3 text-xs transition-all duration-200 ${isPending ? 'opacity-35' : 'opacity-100'}`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-brand-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-brand-600' : isDone ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className={`font-semibold ${isCurrent ? 'text-brand-700 font-bold' : isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                  {stage.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
