import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Search, 
  Command, 
  Share2, 
  Bell, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export function Header() {
  const { 
    currentRoute, 
    navigateTo, 
    setMobileDrawerOpen, 
    setCommandPaletteOpen,
    currentWorkspace
  } = useApp();

  const getBreadcrumbs = () => {
    if (currentRoute === '/' || currentRoute === '') return ['DevGraph', 'Overview'];
    if (currentRoute.startsWith('/search')) return ['DevGraph', 'AI Search Results'];
    if (currentRoute.startsWith('/graph')) return ['DevGraph', 'Knowledge Graph'];
    if (currentRoute.startsWith('/services/')) {
      const id = currentRoute.replace('/services/', '');
      return ['DevGraph', 'Services', id];
    }
    if (currentRoute.startsWith('/services')) return ['DevGraph', 'Engineering Services'];
    if (currentRoute.startsWith('/people/')) {
      const id = currentRoute.replace('/people/', '');
      return ['DevGraph', 'People', id];
    }
    if (currentRoute.startsWith('/people')) return ['DevGraph', 'Engineering Directory'];
    if (currentRoute.startsWith('/sources')) return ['DevGraph', 'Connected Sources'];
    return ['DevGraph', 'Explore'];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 h-14 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
              <span className={idx === breadcrumbs.length - 1 ? 'font-semibold text-slate-900 truncate max-w-[180px] md:max-w-xs' : 'hover:text-slate-700 cursor-pointer hidden sm:inline'}
                onClick={() => {
                  if (idx === 0) navigateTo('/');
                  if (idx === 1 && crumb === 'Services') navigateTo('/services');
                  if (idx === 1 && crumb === 'People') navigateTo('/people');
                }}
              >
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: ⌘K Quick search trigger, Knowledge graph jump, Workspace */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Global ⌘K Search trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg transition-all shadow-2xs group"
          title="Search across all codebase & docs (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 transition-colors" />
          <span className="hidden sm:inline">Ask or find anything...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Quick Knowledge Graph Jump */}
        <button
          onClick={() => navigateTo('/graph')}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200/70 rounded-lg transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-brand-600" />
          <span>Graph View</span>
        </button>

        {/* Workspace indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100/70 rounded-lg border border-slate-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="font-mono text-[11px]">{currentWorkspace}</span>
        </div>

        {/* Notifications & Help */}
        <div className="flex items-center gap-1 text-slate-400">
          <button 
            onClick={() => navigateTo('/sources')}
            className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors relative"
            title="Recent activity & alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
