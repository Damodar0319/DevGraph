import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GraphNode, GraphEdge, EntityType } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Server, 
  Users, 
  FolderGit2, 
  FileText, 
  GitPullRequest, 
  AlertTriangle, 
  Database,
  Cpu
} from 'lucide-react';

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedFilter: string;
  searchQuery: string;
  isPhysicsActive: boolean;
  onSelectNode: (node: GraphNode) => void;
  selectedNodeId: string | null;
}

interface SimulatedNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function GraphCanvas({
  nodes,
  edges,
  selectedFilter,
  searchQuery,
  isPhysicsActive,
  onSelectNode,
  selectedNodeId
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 700 });
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.95 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Filter nodes according to type and search
  const visibleNodes = useMemo(() => {
    return nodes.filter(node => {
      const matchesFilter = selectedFilter === 'all' || node.type === selectedFilter;
      const matchesSearch = !searchQuery || 
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (node.subtitle && node.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && (searchQuery ? matchesSearch : true);
    });
  }, [nodes, selectedFilter, searchQuery]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map(n => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() => {
    return edges.filter(
      edge => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    );
  }, [edges, visibleNodeIds]);

  // Initialize simulation positions
  const simNodesRef = useRef<Map<string, SimulatedNode>>(new Map());

  // Handle Resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Initialize node layout with circular/clustered starting positions
  useEffect(() => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const nodeCount = nodes.length;

    nodes.forEach((node, i) => {
      if (!simNodesRef.current.has(node.id)) {
        const angle = (i / nodeCount) * 2 * Math.PI;
        const radius = 220 + (node.group || 1) * 60 + (Math.random() * 40 - 20);
        simNodesRef.current.set(node.id, {
          ...node,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: node.type === 'service' ? 36 : node.type === 'person' ? 32 : 28
        });
      }
    });
  }, [nodes, dimensions]);

  // Force-directed physics animation frame
  const [, setFrame] = useState(0);

  useEffect(() => {
    if (!isPhysicsActive) return;

    let animationFrameId: number;

    const runPhysicsTick = () => {
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const simNodes = Array.from(simNodesRef.current.values()).filter(n => visibleNodeIds.has(n.id));

      // 1. Repulsion between all node pairs
      for (let i = 0; i < simNodes.length; i++) {
        for (let j = i + 1; j < simNodes.length; j++) {
          const n1 = simNodes[i];
          const n2 = simNodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);

          if (dist < 320) {
            const force = (320 - dist) / (distSq * 0.4);
            const fx = (dx / dist) * force * 15;
            const fy = (dy / dist) * force * 15;

            if (n1.id !== draggedNodeId) {
              n1.vx -= fx;
              n1.vy -= fy;
            }
            if (n2.id !== draggedNodeId) {
              n2.vx += fx;
              n2.vy += fy;
            }
          }
        }
      }

      // 2. Spring attraction along edges
      visibleEdges.forEach(edge => {
        const src = simNodesRef.current.get(edge.source);
        const tgt = simNodesRef.current.get(edge.target);
        if (src && tgt) {
          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const desiredDist = 170;
          const force = (dist - desiredDist) * 0.004;

          const fx = (dx / dist) * force * 10;
          const fy = (dy / dist) * force * 10;

          if (src.id !== draggedNodeId) {
            src.vx += fx;
            src.vy += fy;
          }
          if (tgt.id !== draggedNodeId) {
            tgt.vx -= fx;
            tgt.vy -= fy;
          }
        }
      });

      // 3. Center gravity and update positions with velocity damping
      simNodes.forEach(node => {
        if (node.id === draggedNodeId) return;

        const cDx = centerX - node.x;
        const cDy = centerY - node.y;
        node.vx += cDx * 0.0006;
        node.vy += cDy * 0.0006;

        // Damping
        node.vx *= 0.88;
        node.vy *= 0.88;

        // Apply velocity
        node.x += node.vx;
        node.y += node.vy;
      });

      setFrame(f => (f + 1) % 1000);
      animationFrameId = requestAnimationFrame(runPhysicsTick);
    };

    animationFrameId = requestAnimationFrame(runPhysicsTick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPhysicsActive, visibleEdges, visibleNodeIds, dimensions, draggedNodeId]);

  // Pan & Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      }));
    } else if (draggedNodeId) {
      const node = simNodesRef.current.get(draggedNodeId);
      if (node) {
        // Convert screen coordinates to world coordinates
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const worldX = (e.clientX - rect.left - transform.x) / transform.scale;
          const worldY = (e.clientY - rect.top - transform.y) / transform.scale;
          node.x = worldX;
          node.y = worldY;
          node.vx = 0;
          node.vy = 0;
          setFrame(f => f + 1);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedNodeId(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.92 : 1.08;
    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.4, Math.min(2.5, prev.scale * zoomFactor))
    }));
  };

  const getNodeColor = (type: EntityType) => {
    switch (type) {
      case 'service': return { bg: '#3b82f6', border: '#1d4ed8', text: '#ffffff', pill: 'bg-blue-600' };
      case 'person': return { bg: '#10b981', border: '#047857', text: '#ffffff', pill: 'bg-emerald-600' };
      case 'repo': return { bg: '#64748b', border: '#334155', text: '#ffffff', pill: 'bg-slate-700' };
      case 'decision':
      case 'document': return { bg: '#f59e0b', border: '#b45309', text: '#ffffff', pill: 'bg-amber-600' };
      case 'pr': return { bg: '#8b5cf6', border: '#6d28d9', text: '#ffffff', pill: 'bg-purple-600' };
      case 'incident': return { bg: '#ef4444', border: '#b91c1c', text: '#ffffff', pill: 'bg-rose-600' };
      case 'tech': return { bg: '#0284c7', border: '#0369a1', text: '#ffffff', pill: 'bg-sky-600' };
      default: return { bg: '#64748b', border: '#475569', text: '#ffffff', pill: 'bg-slate-600' };
    }
  };

  // Connected neighborhood highlighting
  const activeNeighbors = useMemo(() => {
    const targetId = hoveredNodeId || selectedNodeId;
    if (!targetId) return null;
    const connected = new Set<string>();
    connected.add(targetId);
    edges.forEach(e => {
      if (e.source === targetId) connected.add(e.target);
      if (e.target === targetId) connected.add(e.source);
    });
    return connected;
  }, [hoveredNodeId, selectedNodeId, edges]);

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className="relative w-full h-full min-h-[620px] bg-white rounded-2xl border border-slate-200 overflow-hidden select-none cursor-grab active:cursor-grabbing graph-grid-bg shadow-elevated"
    >
      <svg 
        className="w-full h-full"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
          transition: isPanning || draggedNodeId ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="20"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
          </marker>
          <marker
            id="arrowhead-active"
            markerWidth="10"
            markerHeight="7"
            refX="24"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
        </defs>

        {/* 1. Render Graph Edges */}
        <g className="edges">
          {visibleEdges.map(edge => {
            const src = simNodesRef.current.get(edge.source);
            const tgt = simNodesRef.current.get(edge.target);
            if (!src || !tgt) return null;

            const isHighlighted = activeNeighbors && 
              activeNeighbors.has(edge.source) && 
              activeNeighbors.has(edge.target);

            const isDimmed = activeNeighbors && !isHighlighted;

            const midX = (src.x + tgt.x) / 2;
            const midY = (src.y + tgt.y) / 2;

            return (
              <g key={edge.id} className="transition-opacity duration-200" opacity={isDimmed ? 0.15 : 1}>
                {/* Edge line */}
                <line
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={isHighlighted ? '#3b82f6' : '#cbd5e1'}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={edge.label === 'DEPENDS_ON' ? '4 3' : undefined}
                  markerEnd={isHighlighted ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                />

                {/* Relationship Pill Badge along Edge */}
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x="-34"
                    y="-9"
                    width="68"
                    height="18"
                    rx="9"
                    fill={isHighlighted ? '#1e293b' : '#f8fafc'}
                    stroke={isHighlighted ? '#3b82f6' : '#e2e8f0'}
                    strokeWidth="1"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isHighlighted ? '#ffffff' : '#64748b'}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {edge.label}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {/* 2. Render Graph Nodes */}
        <g className="nodes">
          {visibleNodes.map(node => {
            const sim = simNodesRef.current.get(node.id);
            if (!sim) return null;

            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isConnected = activeNeighbors ? activeNeighbors.has(node.id) : true;
            const isDimmed = activeNeighbors && !isConnected;

            const colors = getNodeColor(node.type);
            const radius = sim.radius || 30;

            return (
              <g
                key={node.id}
                transform={`translate(${sim.x}, ${sim.y})`}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setDraggedNodeId(node.id);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node);
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className="cursor-pointer transition-opacity duration-200"
                opacity={isDimmed ? 0.2 : 1}
              >
                {/* Outer Glow Halo if Selected or Hovered */}
                {(isSelected || isHovered) && (
                  <circle
                    r={radius + 10}
                    fill="none"
                    stroke={colors.bg}
                    strokeWidth="3"
                    strokeOpacity="0.4"
                    className="animate-ping"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  r={radius}
                  fill={isSelected ? '#1e293b' : '#ffffff'}
                  stroke={isSelected ? '#3b82f6' : colors.bg}
                  strokeWidth={isSelected ? 3.5 : 2.5}
                  className="shadow-md transition-all duration-150"
                  filter="drop-shadow(0 2px 5px rgba(0, 0, 0, 0.08))"
                />

                {/* Node Icon / Avatar */}
                {node.avatar ? (
                  <clipPath id={`clip-${node.id}`}>
                    <circle r={radius - 3} />
                  </clipPath>
                ) : null}

                {node.avatar ? (
                  <image
                    href={node.avatar}
                    x={-(radius - 3)}
                    y={-(radius - 3)}
                    width={(radius - 3) * 2}
                    height={(radius - 3) * 2}
                    clipPath={`url(#clip-${node.id})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <circle
                    r={radius - 8}
                    fill={colors.bg}
                    fillOpacity="0.15"
                  />
                )}

                {/* Entity Label Badge Below Node */}
                <g transform={`translate(0, ${radius + 14})`}>
                  <rect
                    x={-Math.max(45, (node.label.length * 4.5))}
                    y="-10"
                    width={Math.max(90, (node.label.length * 9))}
                    height="20"
                    rx="6"
                    fill={isSelected ? '#0f172a' : '#ffffff'}
                    stroke={isSelected ? '#3b82f6' : '#cbd5e1'}
                    strokeWidth="1.2"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isSelected ? '#ffffff' : '#0f172a'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="700"
                  >
                    {node.label}
                  </text>
                </g>

                {/* Entity Type Badge Tag Above Node */}
                <g transform={`translate(0, ${-(radius + 7)})`}>
                  <rect
                    x="-24"
                    y="-7"
                    width="48"
                    height="14"
                    rx="4"
                    fill={colors.bg}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    fontSize="8"
                    fontFamily="sans-serif"
                    fontWeight="700"
                    letterSpacing="0.5"
                  >
                    {node.type.toUpperCase()}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Helper floating hint at bottom */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 text-[11px] text-slate-500 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Click any node to inspect connections · Drag to rearrange · Scroll to zoom</span>
      </div>
    </div>
  );
}
