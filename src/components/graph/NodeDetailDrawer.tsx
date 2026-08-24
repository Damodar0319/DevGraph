import React from 'react';
import { GraphNode } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Server, 
  Users, 
  FolderGit2, 
  FileText, 
  GitPullRequest, 
  AlertTriangle, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Database,
  Cpu
} from 'lucide-react';
import { MOCK_SERVICES, MOCK_PEOPLE, MOCK_GRAPH_EDGES, MOCK_GRAPH_NODES } from '../../data/mockData';
import { HealthBadge } from '../common/Badge';

interface NodeDetailDrawerProps {
  node: GraphNode | null;
  onClose: () => void;
}

export function NodeDetailDrawer({ node, onClose }: NodeDetailDrawerProps) {
  const { navigateTo, setSelectedNodeId } = useApp();

  if (!node) return null;

  // Find rich entity data if available
  const serviceData = node.type === 'service' ? MOCK_SERVICES.find(s => s.id === node.id) : null;
  const personData = node.type === 'person' ? MOCK_PEOPLE.find(p => p.id === node.id) : null;

  // Find connected edges and neighbors
  const connectedEdges = MOCK_GRAPH_EDGES.filter(
    e => e.source === node.id || e.target === node.id
  );

  const neighbors = connectedEdges.map(edge => {
    const isSource = edge.source === node.id;
    const neighborId = isSource ? edge.target : edge.source;
    const neighborNode = MOCK_GRAPH_NODES.find(n => n.id === neighborId);
    return {
      edge,
      direction: isSource ? 'outgoing' : 'incoming',
      relationship: edge.label,
      neighbor: neighborNode,
      description: edge.description
    };
  }).filter(n => n.neighbor !== undefined);

  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'service': return <Server className="w-5 h-5 text-blue-600" />;
      case 'person': return <Users className="w-5 h-5 text-emerald-600" />;
      case 'repo': return <FolderGit2 className="w-5 h-5 text-slate-700" />;
      case 'decision':
      case 'document': return <FileText className="w-5 h-5 text-amber-600" />;
      case 'pr': return <GitPullRequest className="w-5 h-5 text-purple-600" />;
      case 'incident': return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'tech': return <Database className="w-5 h-5 text-sky-600" />;
      default: return <Cpu className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 z-30 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-slide-up overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-start justify-between">
        <div className="flex items-start gap-3 min-w-0">
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0 mt-0.5">
            {getNodeIcon(node.type)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                {node.type}
              </span>
              {node.badge && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {node.badge}
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-slate-900 truncate font-mono">
              {node.label}
            </h2>
            {node.subtitle && (
              <p className="text-xs text-slate-500 truncate mt-0.5">{node.subtitle}</p>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-slate-700">
        {/* Service-specific Details */}
        {serviceData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Health Status</span>
                <HealthBadge status={serviceData.status} />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Latency P99</span>
                <span className="font-mono font-bold text-slate-800">{serviceData.latencyP99}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">SLO Target</span>
                <span className="font-mono font-bold text-emerald-600">{serviceData.slo}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Description
              </span>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                {serviceData.description}
              </p>
            </div>

            {/* Owner profile card */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Service Owner & Maintainer
              </span>
              <div 
                onClick={() => navigateTo(`/people/${serviceData.owner.name.toLowerCase().replace(' ', '-')}`)}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200/90 hover:border-brand-300 hover:bg-brand-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <img 
                    src={serviceData.owner.avatar} 
                    alt={serviceData.owner.name} 
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-brand-700">{serviceData.owner.name}</p>
                    <p className="text-[11px] text-slate-400">{serviceData.owner.role}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Repository & Stack */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Tech Stack & Language
              </span>
              <div className="flex flex-wrap gap-1.5">
                {serviceData.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[11px] rounded border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent PRs */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Recent Pull Requests
              </span>
              <div className="space-y-1.5">
                {serviceData.prs.slice(0, 3).map((pr, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-1.5">
                      <span className="text-purple-700 font-mono font-bold text-[11px]">{pr.number}</span>
                      <span className="font-medium text-slate-800 truncate">{pr.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">By {pr.author} · {pr.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Person-specific Details */}
        {personData && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <img 
                src={personData.avatar} 
                alt={personData.name} 
                className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900">{personData.name}</h3>
                <p className="text-xs text-slate-500">{personData.role}</p>
                <span className="text-[10px] font-mono text-brand-700 bg-brand-50 px-1.5 py-0.2 rounded border border-brand-200 mt-1 inline-block">
                  {personData.department}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Domain Expertise
              </span>
              <div className="flex flex-wrap gap-1.5">
                {personData.expertise.map((exp, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-medium text-[11px] rounded border border-emerald-200">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Owned Services
              </span>
              <div className="space-y-1.5">
                {personData.ownedServices.map((svc) => (
                  <div 
                    key={svc.id}
                    onClick={() => navigateTo(`/services/${svc.id}`)}
                    className="p-2.5 rounded-lg border border-slate-200/80 bg-white hover:border-brand-300 hover:bg-brand-50/20 cursor-pointer flex items-center justify-between"
                  >
                    <span className="font-mono font-semibold text-slate-800">{svc.name}</span>
                    <HealthBadge status={svc.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Connected Graph Relationships */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Connected Graph Edges ({neighbors.length})
            </span>
            <span className="text-[10px] font-mono text-brand-600">Live Relationships</span>
          </div>

          <div className="space-y-2">
            {neighbors.map((n, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (n.neighbor) {
                    setSelectedNodeId(n.neighbor.id);
                  }
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200/90 bg-white hover:border-brand-300 hover:shadow-2xs transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-brand-50 group-hover:text-brand-700">
                    {n.relationship}
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize">{n.direction}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 group-hover:text-brand-600 truncate">
                    {n.neighbor?.label}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">({n.neighbor?.type})</span>
                </div>
                {n.description && (
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {n.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation CTA */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
        {serviceData && (
          <button
            onClick={() => navigateTo(`/services/${serviceData.id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition-colors"
          >
            <span>Open Service Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}

        {personData && (
          <button
            onClick={() => navigateTo(`/people/${personData.id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition-colors"
          >
            <span>View Engineer Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          onClick={onClose}
          className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
