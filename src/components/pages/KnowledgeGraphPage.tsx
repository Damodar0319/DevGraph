import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraphCanvas } from '../graph/GraphCanvas';
import { GraphControls } from '../graph/GraphControls';
import { NodeDetailDrawer } from '../graph/NodeDetailDrawer';
import { MOCK_GRAPH_NODES, MOCK_GRAPH_EDGES } from '../../data/mockData';
import { GraphNode } from '../../types';
import { Share2, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export function KnowledgeGraphPage() {
  const { selectedNode, setSelectedNode, selectedNodeId, setSelectedNodeId } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPhysicsActive, setIsPhysicsActive] = useState(true);

  const handleSelectNode = (node: GraphNode) => {
    setSelectedNode(node);
  };

  const handleCloseDrawer = () => {
    setSelectedNode(null);
    setSelectedNodeId(null);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8 h-[calc(100vh-5.5rem)] flex flex-col">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Share2 className="w-5 h-5 text-brand-600" />
              <span>Engineering Knowledge Graph</span>
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
              LIVE TOPOLOGY
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Traverse entities, dependencies, ownership, and architecture decisions in real-time.
          </p>
        </div>

        {/* Quick graph stats */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
            7 Services
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            6 Engineers
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            5 ADRs
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hidden sm:inline">
            32 Edges
          </span>
        </div>
      </div>

      {/* Main Graph Viewport */}
      <div className="relative flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-elevated overflow-hidden">
        {/* Floating Top Controls */}
        <GraphControls
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isPhysicsActive={isPhysicsActive}
          onTogglePhysics={() => setIsPhysicsActive(!isPhysicsActive)}
          onZoomIn={() => {}}
          onZoomOut={() => {}}
          onResetZoom={() => {}}
        />

        {/* Physics Force Graph Canvas */}
        <GraphCanvas
          nodes={MOCK_GRAPH_NODES}
          edges={MOCK_GRAPH_EDGES}
          selectedFilter={selectedFilter}
          searchQuery={searchQuery}
          isPhysicsActive={isPhysicsActive}
          onSelectNode={handleSelectNode}
          selectedNodeId={selectedNodeId}
        />

        {/* Slide-over Node Detail Sheet */}
        {selectedNode && (
          <NodeDetailDrawer
            node={selectedNode}
            onClose={handleCloseDrawer}
          />
        )}
      </div>
    </div>
  );
}
