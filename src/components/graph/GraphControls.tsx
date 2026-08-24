import React from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Play, 
  Pause, 
  Search, 
  RotateCcw,
  Layers
} from 'lucide-react';

interface GraphControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  isPhysicsActive: boolean;
  onTogglePhysics: () => void;
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function GraphControls({
  onZoomIn,
  onZoomOut,
  onResetZoom,
  isPhysicsActive,
  onTogglePhysics,
  selectedFilter,
  onSelectFilter,
  searchQuery,
  onSearchChange
}: GraphControlsProps) {
  const filterTypes = [
    { id: 'all', label: 'All Entities' },
    { id: 'service', label: 'Services (7)', color: 'bg-blue-500' },
    { id: 'person', label: 'People (6)', color: 'bg-emerald-500' },
    { id: 'tech', label: 'Tech & DBs (5)', color: 'bg-sky-500' },
    { id: 'decision', label: 'ADRs & Docs (5)', color: 'bg-amber-500' },
    { id: 'pr', label: 'PRs (4)', color: 'bg-purple-500' },
  ];

  return (
    <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
      {/* Left: Filter Pills & Graph Search */}
      <div className="flex flex-wrap items-center gap-2 pointer-events-auto bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-elevated">
        {/* Search within graph */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-xl border border-slate-200">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Find node in graph..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-28 md:w-36 bg-transparent text-xs text-slate-800 placeholder:text-slate-400 outline-hidden font-medium"
          />
        </div>

        <div className="h-4 w-px bg-slate-200" />

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[50vw]">
          {filterTypes.map((f) => {
            const active = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onSelectFilter(f.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all
                  ${active 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                {f.color && <span className={`w-2 h-2 rounded-full ${f.color}`} />}
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Zoom & Physics Controls */}
      <div className="flex items-center gap-1 pointer-events-auto bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-elevated">
        <button
          onClick={onZoomIn}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={onResetZoom}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Reset layout view"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <div className="h-4 w-px bg-slate-200" />
        <button
          onClick={onTogglePhysics}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors
            ${isPhysicsActive ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:bg-slate-100'}
          `}
          title={isPhysicsActive ? 'Pause force simulation' : 'Resume simulation'}
        >
          {isPhysicsActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline font-mono">{isPhysicsActive ? 'Physics' : 'Paused'}</span>
        </button>
      </div>
    </div>
  );
}
