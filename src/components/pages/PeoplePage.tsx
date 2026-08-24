import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  Server, 
  Code, 
  MapPin, 
  Clock, 
  Mail, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { MOCK_PEOPLE } from '../../data/mockData';

export function PeoplePage() {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');

  const filteredPeople = MOCK_PEOPLE.filter(person => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = person.name.toLowerCase().includes(term) ||
      person.role.toLowerCase().includes(term) ||
      person.team.toLowerCase().includes(term) ||
      person.expertise.some(e => e.toLowerCase().includes(term)) ||
      person.ownedServices.some(s => s.name.toLowerCase().includes(term));

    const matchesTeam = selectedTeam === 'all' || person.team.toLowerCase().includes(selectedTeam.toLowerCase());

    return matchesSearch && matchesTeam;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-600" />
              <span>Engineering Directory</span>
            </h1>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
              86 Engineers & Leads
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Find engineers, service code owners, domain experts, and on-call leads across teams.
          </p>
        </div>

        <button
          onClick={() => navigateTo('/graph')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
        >
          <span>Team Ownership Graph</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-subtle">
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by name, expertise (e.g. Redis, Kafka, Go), or owned service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-hidden font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-hidden cursor-pointer"
          >
            <option value="all">All Teams</option>
            <option value="identity">Platform Identity</option>
            <option value="payments">Payments & Ledger</option>
            <option value="user">User Core</option>
            <option value="data">Data Platform</option>
            <option value="reliability">Reliability / SRE</option>
            <option value="edge">Edge & Network</option>
          </select>
        </div>
      </div>

      {/* Grid of Engineer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPeople.map((person) => (
          <div
            key={person.id}
            onClick={() => navigateTo(`/people/${person.id}`)}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle hover:shadow-elevated hover:border-brand-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Profile Header */}
              <div className="flex items-start gap-3.5 mb-4">
                <img 
                  src={person.avatar} 
                  alt={person.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                    {person.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">{person.role}</p>
                  <span className="text-[10px] font-mono text-brand-700 bg-brand-50 px-2 py-0.2 rounded border border-brand-200 mt-1 inline-block">
                    {person.team}
                  </span>
                </div>
              </div>

              {/* Owned Services */}
              <div className="mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Owns & Maintains
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {person.ownedServices.map((svc) => (
                    <span 
                      key={svc.id}
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[11px] font-bold rounded border border-blue-200 flex items-center gap-1"
                    >
                      <Server className="w-3 h-3" />
                      <span>{svc.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Expertise tags */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Domain Expertise
                </span>
                <div className="flex flex-wrap gap-1">
                  {person.expertise.slice(0, 4).map((exp, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded">
                      {exp}
                    </span>
                  ))}
                  {person.expertise.length > 4 && (
                    <span className="px-1.5 py-0.5 text-slate-400 text-[10px]">
                      +{person.expertise.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px] font-mono">{person.timezone}</span>
              <span className="font-semibold text-brand-600 group-hover:text-brand-700 flex items-center gap-1">
                <span>View Profile</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
