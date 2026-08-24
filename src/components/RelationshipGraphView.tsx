import React, { useState } from 'react';
import { GraphNode, GraphEdge, EntityType } from '../types/knowledge';
import { 
  User, 
  Server, 
  Database, 
  GitBranch, 
  GitPullRequest, 
  FileText, 
  AlertTriangle, 
  Layers,
  ArrowRight,
  Info,
  GitCommit,
  FolderTree,
  Code
} from 'lucide-react';

interface RelationshipGraphViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode?: (nodeId: string) => void;
}

export function RelationshipGraphView({ nodes, edges, onSelectNode }: RelationshipGraphViewProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  if (!nodes || nodes.length === 0) {
    return null;
  }

  const getNodeColor = (type: EntityType) => {
    switch (type) {
      case 'contributor':
        return {
          bg: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          icon: User
        };
      case 'component':
        return {
          bg: 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-900',
          badge: 'bg-blue-600 text-white',
          icon: Server
        };
      case 'repository':
        return {
          bg: 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-900',
          badge: 'bg-slate-900 text-white',
          icon: GitBranch
        };
      case 'file':
        return {
          bg: 'bg-sky-50 hover:bg-sky-100 border-sky-300 text-sky-900',
          badge: 'bg-sky-600 text-white',
          icon: Code
        };
      case 'directory':
        return {
          bg: 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900',
          badge: 'bg-amber-600 text-white',
          icon: FolderTree
        };
      case 'technology':
        return {
          bg: 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-900',
          badge: 'bg-purple-600 text-white',
          icon: Database
        };
      case 'pull_request':
        return {
          bg: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-900',
          badge: 'bg-rose-600 text-white',
          icon: GitPullRequest
        };
      case 'commit':
        return {
          bg: 'bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900',
          badge: 'bg-fuchsia-600 text-white',
          icon: GitCommit
        };
      case 'documentation':
        return {
          bg: 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-900',
          badge: 'bg-teal-600 text-white',
          icon: FileText
        };
      case 'issue':
        return {
          bg: 'bg-orange-50 hover:bg-orange-100 border-orange-300 text-orange-900',
          badge: 'bg-orange-600 text-white',
          icon: AlertTriangle
        };
      default:
        return {
          bg: 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-900',
          badge: 'bg-slate-600 text-white',
          icon: Layers
        };
    }
  };

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
    if (onSelectNode) {
      onSelectNode(node.id);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 border border-slate-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse"></span>
          <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-slate-300">
            Traversed Knowledge Graph & Relationships ({nodes.length} Nodes · {edges.length} Edges)
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
          Click any entity node to inspect details
        </span>
      </div>

      {/* Visual Graph Layout */}
      <div className="bg-slate-950/80 rounded-xl p-4 md:p-6 border border-slate-800/80 overflow-x-auto">
        {/* Node Cards Grid / Flow */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-2">
          {nodes.map((node) => {
            const config = getNodeColor(node.type);
            const Icon = config.icon;
            const isSelected = node.id === selectedNodeId;

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none shadow-sm
                  ${isSelected ? 'ring-2 ring-brand-400 scale-105 bg-slate-800 border-brand-400' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}
                `}
              >
                <div className={`p-2 rounded-lg ${config.badge}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-100">{node.label}</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {node.type}
                    </span>
                  </div>
                  {node.subtitle && (
                    <p className="text-[10px] text-slate-400 line-clamp-1">{node.subtitle}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explicit Directed Relationship Connections List */}
        {edges.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
              Connected Graph Relationship Edges:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
              {edges.map((edge) => {
                const sourceNode = nodes.find(n => n.id === edge.source);
                const targetNode = nodes.find(n => n.id === edge.target);

                return (
                  <div
                    key={edge.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-mono text-[11px]"
                  >
                    <span className="font-semibold text-white truncate max-w-[100px]" title={sourceNode?.label || edge.source}>
                      {sourceNode?.label || edge.source}
                    </span>
                    <div className="flex items-center gap-1 shrink-0 px-1.5 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800 text-[9px] font-bold">
                      <span>{edge.label}</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                    <span className="font-semibold text-white truncate max-w-[100px]" title={targetNode?.label || edge.target}>
                      {targetNode?.label || edge.target}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Node Details Popover / Banner */}
      {selectedNodeId && (
        <div className="p-3.5 bg-slate-800/90 border border-slate-700 rounded-xl flex items-start gap-3 animate-fade-in text-xs">
          <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white">
              Selected Entity: {nodes.find(n => n.id === selectedNodeId)?.label}
            </span>
            <p className="text-slate-300">
              {nodes.find(n => n.id === selectedNodeId)?.subtitle || 'Connected Kubernetes engineering entity.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
