import React from 'react';
import { AIQueryResponse } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Share2, 
  ArrowDown, 
  Users, 
  FolderGit2, 
  GitPullRequest, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { EntityBadge } from '../common/Badge';

interface RelationshipPanelProps {
  data: AIQueryResponse;
}

export function RelationshipPanel({ data }: RelationshipPanelProps) {
  const { navigateTo, setSelectedNodeId } = useApp();
  const { relatedEntities } = data;

  const handleNodeClick = (nodeId: string, nodeType?: string) => {
    if (nodeType === 'service') {
      navigateTo(`/services/${nodeId}`);
      return;
    }
    if (nodeType === 'person') {
      navigateTo(`/people/${nodeId}`);
      return;
    }
    setSelectedNodeId(nodeId);
    navigateTo('/graph');
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Related Knowledge
            </h3>
            <p className="text-[11px] text-slate-400">Graph Subgraph Traversal</p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('/graph')}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
        >
          <span>Full Graph</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Connected Entity Traversal Flow */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Dependency Chain
          </span>
          <span className="text-[10px] font-mono text-slate-400">5 Hops</span>
        </div>

        <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
          {relatedEntities.connectedChain.map((node, idx) => (
            <React.Fragment key={node.id}>
              <button
                onClick={() => handleNodeClick(node.id, node.type)}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/90 shadow-2xs hover:border-brand-300 hover:shadow-subtle transition-all text-left group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                  <span className="text-xs font-mono font-bold text-slate-900 truncate group-hover:text-brand-600">
                    {node.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {node.type}
                </span>
              </button>

              {idx < relatedEntities.connectedChain.length - 1 && (
                <div className="flex items-center justify-center py-0.5 text-slate-400">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Domain Experts & Owners */}
      {relatedEntities.people && relatedEntities.people.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Engineers & Owners
            </span>
          </div>

          <div className="space-y-2">
            {relatedEntities.people.map((person) => (
              <button
                key={person.id}
                onClick={() => navigateTo(`/people/${person.id}`)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src={person.avatar} 
                    alt={person.name} 
                    className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{person.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{person.role}</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {person.team}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Connected Repositories */}
      {relatedEntities.repositories && relatedEntities.repositories.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <FolderGit2 className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Repositories
            </span>
          </div>

          <div className="space-y-1.5">
            {relatedEntities.repositories.map((repo) => (
              <div 
                key={repo.id}
                className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-slate-800">{repo.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">{repo.language}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{repo.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Associated Pull Requests */}
      {relatedEntities.prs && relatedEntities.prs.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <GitPullRequest className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Linked PRs
            </span>
          </div>

          <div className="space-y-1.5">
            {relatedEntities.prs.map((pr) => (
              <div 
                key={pr.id}
                className="p-2.5 rounded-xl border border-slate-100 bg-white shadow-2xs hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                    {pr.number}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 truncate">{pr.title}</span>
                </div>
                <p className="text-[10px] text-slate-400">By {pr.author} · {pr.repo}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
