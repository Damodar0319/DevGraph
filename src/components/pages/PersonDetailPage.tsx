import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  ArrowLeft, 
  Server, 
  GitPullRequest, 
  FileText, 
  Mail, 
  MapPin, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Share2,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { MOCK_PEOPLE } from '../../data/mockData';
import { HealthBadge } from '../common/Badge';

export function PersonDetailPage() {
  const { currentRoute, navigateTo, setSelectedNodeId } = useApp();
  const personId = currentRoute.replace('/people/', '').trim() || 'rahul-sharma';
  const person = MOCK_PEOPLE.find(p => p.id === personId) || MOCK_PEOPLE[0];

  const [activeTab, setActiveTab] = useState<'contributions' | 'docs' | 'activity'>('contributions');

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Back Navigation */}
      <div>
        <button
          onClick={() => navigateTo('/people')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Engineering Directory</span>
        </button>
      </div>

      {/* Engineer Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-elevated">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <img 
              src={person.avatar} 
              alt={person.name} 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-brand-500/20 shadow-md shrink-0"
            />
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                  {person.department}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {person.location}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {person.name}
              </h1>

              <p className="text-sm font-semibold text-slate-600">
                {person.role} · <span className="text-brand-600">{person.team}</span>
              </p>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {person.timezone}
                </span>
                <span>·</span>
                <a href={`mailto:${person.email}`} className="text-brand-600 hover:underline flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {person.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Graph Action */}
          <button
            onClick={() => {
              setSelectedNodeId(person.id);
              navigateTo('/graph');
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-colors shadow-2xs shrink-0"
          >
            <Share2 className="w-4 h-4 text-brand-600" />
            <span>View in Knowledge Graph</span>
          </button>
        </div>

        {/* Domain Expertise & Owned Services Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-100">
          {/* Expertise */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Domain Expertise
            </span>
            <div className="flex flex-wrap gap-1.5">
              {person.expertise.map((exp, idx) => (
                <span key={idx} className="px-3 py-1 bg-emerald-50 text-emerald-800 font-semibold text-xs rounded-lg border border-emerald-200">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Owned Services */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Primary Owned Services
            </span>
            <div className="flex flex-wrap gap-2">
              {person.ownedServices.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => navigateTo(`/services/${svc.id}`)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-brand-50 text-slate-900 hover:text-brand-700 font-mono text-xs font-bold rounded-xl border border-slate-200 hover:border-brand-300 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Server className="w-3.5 h-3.5 text-blue-600" />
                  <span>{svc.name}</span>
                  <HealthBadge status={svc.status} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'contributions', label: `Pull Requests (${person.contributions.length})` },
          { id: 'docs', label: `Authored ADRs & Specs (${person.documents.length})` },
          { id: 'activity', label: 'Activity Timeline' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 -mb-px
              ${activeTab === tab.id 
                ? 'border-brand-600 text-brand-700 bg-brand-50/40 rounded-t-xl' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contributions Tab */}
      {activeTab === 'contributions' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle divide-y divide-slate-100">
          {person.contributions.map((contrib, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 mt-0.5 sm:mt-0">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-700">{contrib.prNumber}</span>
                    <span className="text-xs font-bold text-slate-900">{contrib.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {contrib.repo} · Merged on {contrib.date}
                  </p>
                </div>
              </div>

              {contrib.additions !== undefined && (
                <div className="flex items-center gap-2 font-mono text-xs self-end sm:self-center">
                  <span className="text-emerald-600 font-bold">+{contrib.additions}</span>
                  <span className="text-rose-600 font-bold">-{contrib.deletions}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'docs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle divide-y divide-slate-100">
          {person.documents.map((doc) => (
            <div key={doc.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{doc.type} · Published {doc.date}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-600 flex items-center gap-1">
                <span>View Spec</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Activity Timeline Tab */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle divide-y divide-slate-100">
          {person.activity.map((act) => (
            <div key={act.id} className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{act.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{act.repoOrChannel} · {act.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
