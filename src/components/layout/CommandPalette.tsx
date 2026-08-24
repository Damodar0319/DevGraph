import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  Sparkles, 
  Server, 
  Users, 
  Share2, 
  FileText, 
  Layers, 
  ArrowRight,
  CornerDownLeft
} from 'lucide-react';
import { EXAMPLE_QUESTIONS, MOCK_SERVICES, MOCK_PEOPLE } from '../../data/mockData';

export function CommandPalette() {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    executeSearch, 
    navigateTo 
  } = useApp();

  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch('');
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const handleSelectQuery = (q: string) => {
    setCommandPaletteOpen(false);
    executeSearch(q);
  };

  const handleSelectService = (id: string) => {
    setCommandPaletteOpen(false);
    navigateTo(`/services/${id}`);
  };

  const handleSelectPerson = (id: string) => {
    setCommandPaletteOpen(false);
    navigateTo(`/people/${id}`);
  };

  const filteredQuestions = EXAMPLE_QUESTIONS.filter(q => 
    q.toLowerCase().includes(search.toLowerCase())
  );

  const filteredServices = MOCK_SERVICES.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.displayName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPeople = MOCK_PEOPLE.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.role.toLowerCase().includes(search.toLowerCase()) ||
    p.expertise.some(e => e.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-white">
          <Search className="w-5 h-5 text-brand-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask DevGraph or jump to service, person, ADR, or page..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && search.trim()) {
                handleSelectQuery(search);
              }
              if (e.key === 'Escape') {
                setCommandPaletteOpen(false);
              }
            }}
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-hidden font-medium"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Custom Search Query option if typed */}
          {search.trim() && (
            <div>
              <button
                onClick={() => handleSelectQuery(search)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-brand-50/80 hover:bg-brand-100/80 text-brand-900 transition-colors border border-brand-200/60 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="font-semibold">Ask DevGraph AI: "{search}"</span>
                </div>
                <div className="flex items-center gap-1 text-brand-600 font-mono text-[11px]">
                  <span>Enter</span>
                  <CornerDownLeft className="w-3 h-3" />
                </div>
              </button>
            </div>
          )}

          {/* Quick Questions */}
          {filteredQuestions.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>AI Engineering Questions</span>
              </div>
              <div className="space-y-1">
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuery(q)}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors text-left group"
                  >
                    <span className="font-medium text-slate-800 group-hover:text-brand-700">{q}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {filteredServices.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-blue-600" />
                <span>Engineering Services</span>
              </div>
              <div className="space-y-1">
                {filteredServices.slice(0, 4).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectService(s.id)}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-100/80 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-slate-900">{s.name}</span>
                      <span className="text-slate-400">· {s.displayName}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">{s.language}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* People */}
          {filteredPeople.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Engineers & Owners</span>
              </div>
              <div className="space-y-1">
                {filteredPeople.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPerson(p.id)}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-100/80 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={p.avatar} alt={p.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="font-semibold text-slate-900">{p.name}</span>
                      <span className="text-slate-400">· {p.role}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{p.team}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Page Links */}
          <div>
            <div className="px-2 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Navigation</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => { setCommandPaletteOpen(false); navigateTo('/graph'); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-left font-medium"
              >
                <Share2 className="w-3.5 h-3.5 text-brand-600" />
                <span>Knowledge Graph</span>
              </button>
              <button
                onClick={() => { setCommandPaletteOpen(false); navigateTo('/services'); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-left font-medium"
              >
                <Server className="w-3.5 h-3.5 text-blue-600" />
                <span>Services Directory</span>
              </button>
              <button
                onClick={() => { setCommandPaletteOpen(false); navigateTo('/people'); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-left font-medium"
              >
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>People & Teams</span>
              </button>
              <button
                onClick={() => { setCommandPaletteOpen(false); navigateTo('/sources'); }}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-left font-medium"
              >
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                <span>Source Integrations</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Type to search across code, ADRs & people</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Navigate with</span>
            <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px] text-slate-600">↑↓</kbd>
            <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-mono text-[10px] text-slate-600">Enter</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
