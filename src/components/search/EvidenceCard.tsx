import React from 'react';
import { EvidenceSource } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  GitPullRequest, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  ExternalLink,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface EvidenceCardProps {
  source: EvidenceSource;
  index: number;
}

export function EvidenceCard({ source, index }: EvidenceCardProps) {
  const { openEvidenceModal } = useApp();

  const getSourceMeta = () => {
    switch (source.type) {
      case 'github_pr':
        return {
          icon: <GitPullRequest className="w-4 h-4 text-purple-600" />,
          label: 'GitHub Pull Request',
          badgeStyle: 'bg-purple-50 text-purple-700 border-purple-200'
        };
      case 'adr':
        return {
          icon: <FileText className="w-4 h-4 text-amber-600" />,
          label: 'Architecture Decision',
          badgeStyle: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      case 'confluence':
        return {
          icon: <BookOpen className="w-4 h-4 text-blue-600" />,
          label: 'Documentation (Confluence)',
          badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'slack':
        return {
          icon: <MessageSquare className="w-4 h-4 text-emerald-600" />,
          label: 'Slack Discussion',
          badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      default:
        return {
          icon: <FileText className="w-4 h-4 text-slate-600" />,
          label: 'Source',
          badgeStyle: 'bg-slate-50 text-slate-700 border-slate-200'
        };
    }
  };

  const meta = getSourceMeta();

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-subtle hover:shadow-elevated transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100 group-hover:bg-brand-50/50 transition-colors">
              {meta.icon}
            </div>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${meta.badgeStyle}`}>
              {meta.label}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>{source.relevanceScore}% Match</span>
          </div>
        </div>

        {/* Source Title */}
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug mb-1.5">
          {source.title}
        </h4>

        {/* Repo/Channel and Author line */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 flex-wrap">
          <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
            {source.repoOrChannel}
          </span>
          <span>·</span>
          <span>{source.author}</span>
          <span>·</span>
          <span>{source.date}</span>
        </div>

        {/* Snippet */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 bg-slate-50/80 p-3 rounded-lg border border-slate-100 font-sans">
          "{source.snippet}"
        </p>
      </div>

      {/* Footer Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">
          Source #{index + 1}
        </span>

        <button
          onClick={() => openEvidenceModal(source)}
          className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50/80 hover:bg-brand-100/80 px-3 py-1.5 rounded-lg border border-brand-200/60 transition-all"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View source</span>
        </button>
      </div>
    </div>
  );
}
