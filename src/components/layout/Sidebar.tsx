import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Search, 
  Share2, 
  Server, 
  Users, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck,
  FolderGit2,
  Database,
  Cpu,
  Network
} from 'lucide-react';

export function Sidebar() {
  const { 
    currentRoute, 
    navigateTo, 
    sidebarCollapsed, 
    setSidebarCollapsed,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    currentWorkspace,
    setCurrentWorkspace
  } = useApp();

  const navItems = [
    { label: 'Home', icon: Home, route: '/' },
    { label: 'Search', icon: Search, route: '/search' },
    { label: 'Knowledge Graph', icon: Share2, route: '/graph', badge: 'Live' },
    { label: 'Architecture & Pipeline', icon: Network, route: '/pipeline', badge: 'Live API' },
    { label: 'Services', icon: Server, route: '/services', count: '42' },
    { label: 'People', icon: Users, route: '/people', count: '86' },
    { label: 'Sources', icon: Layers, route: '/sources', count: '6' },
  ];

  const workspaces = [
    { name: 'Engineering', icon: Cpu, badge: 'Core' },
    { name: 'Architecture', icon: Network, badge: '48 ADRs' },
    { name: 'Infrastructure', icon: Database, badge: 'EKS' },
  ];

  const isActive = (route: string) => {
    if (route === '/') return currentRoute === '/' || currentRoute === '';
    return currentRoute.startsWith(route);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileDrawerOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed md:sticky top-0 left-0 z-40 h-screen flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out select-none
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
          ${mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Brand Logo & Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <div 
            onClick={() => navigateTo('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Original DevGraph Logo */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center text-white shadow-sm group-hover:shadow-glow transition-all duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" fill="currentColor" fillOpacity="0.2" />
                <circle cx="18" cy="6" r="3" fill="currentColor" fillOpacity="0.2" />
                <circle cx="12" cy="18" r="3" fill="currentColor" fillOpacity="0.2" />
                <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
                <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
                <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
              </svg>
            </div>

            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-slate-900">DevGraph</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1 py-0.2 bg-brand-50 text-brand-700 rounded border border-brand-200/60">
                    AI
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium tracking-tight">Engineering Graph</span>
              </div>
            )}
          </div>

          {/* Collapse Toggle for Desktop */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Platform
              </div>
            )}
            {navItems.map((item) => {
              const active = isActive(item.route);
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.route)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 relative
                    ${active 
                      ? 'bg-brand-50/80 text-brand-700 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }
                    ${sidebarCollapsed ? 'justify-center px-0' : ''}
                  `}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-brand-600' : 'text-slate-400'}`} />
                  
                  {!sidebarCollapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}

                  {!sidebarCollapsed && item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                      {item.badge}
                    </span>
                  )}

                  {!sidebarCollapsed && item.count && (
                    <span className="text-[11px] font-mono text-slate-400 font-normal">
                      {item.count}
                    </span>
                  )}

                  {active && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-brand-600 rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Workspaces Section */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-3 pb-2 flex items-center justify-between text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                <span>Workspaces</span>
                <span className="text-[10px] text-brand-600 font-mono">LIVE</span>
              </div>
            )}
            {workspaces.map((ws) => {
              const selected = currentWorkspace === ws.name;
              const Icon = ws.icon;
              return (
                <button
                  key={ws.name}
                  onClick={() => setCurrentWorkspace(ws.name)}
                  title={sidebarCollapsed ? ws.name : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
                    ${selected 
                      ? 'text-slate-900 bg-slate-100/90 font-semibold' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }
                    ${sidebarCollapsed ? 'justify-center px-0' : ''}
                  `}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${selected ? 'text-brand-600' : 'text-slate-400'}`} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{ws.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{ws.badge}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <button
            onClick={() => navigateTo('/sources')}
            title={sidebarCollapsed ? 'Sync Status' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors
              ${sidebarCollapsed ? 'justify-center px-0' : ''}
            `}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex-1 text-left">
                <span className="font-medium text-slate-700">6 Sources Synced</span>
                <p className="text-[10px] text-slate-400">24,800 entities indexed</p>
              </div>
            )}
          </button>

          {/* User Profile */}
          <div className={`pt-2 mt-2 border-t border-slate-100 flex items-center gap-3 px-2
            ${sidebarCollapsed ? 'justify-center' : ''}
          `}>
            <div className="relative shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                alt="Rahul Sharma" 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">Rahul Sharma</p>
                <p className="text-[10px] text-slate-400 truncate">Platform Identity</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
