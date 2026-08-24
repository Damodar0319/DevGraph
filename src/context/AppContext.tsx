import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { EvidenceSource, GraphNode } from '../types';
import { MOCK_GRAPH_NODES, getAIAnswerForQuery } from '../data/mockData';

interface AppContextType {
  currentRoute: string;
  navigateTo: (route: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  executeSearch: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedNode: GraphNode | null;
  setSelectedNode: (node: GraphNode | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  activeEvidenceModal: EvidenceSource | null;
  openEvidenceModal: (source: EvidenceSource) => void;
  closeEvidenceModal: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
  currentWorkspace: string;
  setCurrentWorkspace: (ws: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Simple hash or URL path router state
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  });

  const [searchQuery, setSearchQuery] = useState<string>('Why was Redis introduced in the authentication service?');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeEvidenceModal, setActiveEvidenceModal] = useState<EvidenceSource | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<string>('Engineering');

  // Sync hash with route
  const navigateTo = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash !== currentRoute) {
        setCurrentRoute(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  // Global keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const executeSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setActiveTab('all');
    navigateTo(`/search?q=${encodeURIComponent(query)}`);
  };

  const selectedNode = selectedNodeId 
    ? MOCK_GRAPH_NODES.find(n => n.id === selectedNodeId) || null
    : null;

  const setSelectedNode = (node: GraphNode | null) => {
    setSelectedNodeId(node ? node.id : null);
  };

  const openEvidenceModal = (source: EvidenceSource) => {
    setActiveEvidenceModal(source);
  };

  const closeEvidenceModal = () => {
    setActiveEvidenceModal(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        searchQuery,
        setSearchQuery,
        executeSearch,
        activeTab,
        setActiveTab,
        selectedNode,
        setSelectedNode,
        selectedNodeId,
        setSelectedNodeId,
        activeEvidenceModal,
        openEvidenceModal,
        closeEvidenceModal,
        commandPaletteOpen,
        setCommandPaletteOpen,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileDrawerOpen,
        setMobileDrawerOpen,
        currentWorkspace,
        setCurrentWorkspace,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
