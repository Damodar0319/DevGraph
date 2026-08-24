import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Server, 
  ArrowLeft, 
  ExternalLink, 
  GitPullRequest, 
  FileText, 
  Users, 
  Activity, 
  ShieldCheck, 
  ArrowDown, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Database,
  Cpu,
  Share2,
  AlertTriangle
} from 'lucide-react';
import { MOCK_SERVICES } from '../../data/mockData';
import { HealthBadge } from '../common/Badge';

export function ServiceDetailPage() {
  const { currentRoute, navigateTo, setSelectedNodeId } = useApp();
  const serviceId = currentRoute.replace('/services/', '').trim() || 'auth-service';
  const service = MOCK_SERVICES.find(s => s.id === serviceId) || MOCK_SERVICES[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'dependencies' | 'prs' | 'docs' | 'activity'>('overview');

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Back Navigation */}
      <div>
        <button
          onClick={() => navigateTo('/services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services Directory</span>
        </button>
      </div>

      {/* Service Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-elevated">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                {service.tier}
              </span>
              <HealthBadge status={service.status} />
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {service.language} · {service.framework}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
              {service.name}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {service.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
              <span className="flex items-center gap-1.5 font-mono">
                <span className="font-semibold text-slate-700">Repo:</span> {service.repository}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Team:</span> {service.team}
              </span>
            </div>
          </div>

          {/* Owner Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 min-w-[220px] shrink-0 space-y-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Primary Tech Owner
            </span>
            <div 
              onClick={() => navigateTo(`/people/${service.owner.name.toLowerCase().replace(' ', '-')}`)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img 
                src={service.owner.avatar} 
                alt={service.owner.name} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {service.owner.name}
                </p>
                <p className="text-[11px] text-slate-500">{service.owner.role}</p>
              </div>
            </div>
            <a 
              href={`mailto:${service.owner.email}`}
              className="text-[11px] font-mono text-brand-600 hover:underline block pt-1"
            >
              {service.owner.email}
            </a>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-[11px] text-slate-400 block font-medium">SLO Target</span>
            <span className="text-lg font-bold font-mono text-emerald-600">{service.slo}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-[11px] text-slate-400 block font-medium">P99 Latency</span>
            <span className="text-lg font-bold font-mono text-slate-900">{service.latencyP99}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-[11px] text-slate-400 block font-medium">Average QPS</span>
            <span className="text-lg font-bold font-mono text-slate-900">{service.qps}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-[11px] text-slate-400 block font-medium">Last Deployment</span>
            <span className="text-xs font-bold font-mono text-slate-800 block truncate">
              {service.lastDeployment.version} · {service.lastDeployment.timestamp}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Architecture & Dependencies' },
          { id: 'prs', label: `Pull Requests (${service.prs.length})` },
          { id: 'docs', label: `ADRs & Docs (${service.docs.length})` },
          { id: 'activity', label: 'Deployment & Activity' },
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

      {/* Tab Content: Architecture & Dependencies */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Visual Dependency Flow Topology */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-brand-600" />
                  <span>Upstream & Downstream Dependency Flow</span>
                </h3>
                <p className="text-xs text-slate-500">Live service mesh call graph & topology</p>
              </div>

              <button
                onClick={() => {
                  setSelectedNodeId(service.id);
                  navigateTo('/graph');
                }}
                className="px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
              >
                Inspect in Knowledge Graph
              </button>
            </div>

            {/* Visual Topology Diagram */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col items-center gap-6">
              {/* Upstream Layer (Ingress Callers) */}
              <div className="w-full flex flex-col items-center">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Upstream Ingress Callers
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {service.dependencies.filter(d => d.relationship === 'upstream').map(d => (
                    <div 
                      key={d.id}
                      onClick={() => navigateTo(`/services/${d.id}`)}
                      className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs font-mono text-xs font-bold text-slate-800 hover:border-brand-300 hover:text-brand-600 cursor-pointer transition-all flex items-center gap-2"
                    >
                      <Cpu className="w-3.5 h-3.5 text-slate-500" />
                      <span>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-slate-400 flex flex-col items-center">
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </div>

              {/* Current Central Service Hub */}
              <div className="p-5 bg-brand-600 text-white rounded-2xl shadow-lg border-2 border-brand-700 w-full max-w-md text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-200 block mb-1">
                  CURRENT SERVICE HUB
                </span>
                <h4 className="text-lg font-bold font-mono">{service.name}</h4>
                <p className="text-xs text-brand-100 font-normal mt-1">{service.displayName}</p>
              </div>

              <div className="text-slate-400 flex flex-col items-center">
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </div>

              {/* Downstream Layer (Databases, Caches & Subservices) */}
              <div className="w-full flex flex-col items-center">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Downstream Services, Caches & Relational Stores
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {service.dependencies.filter(d => d.relationship === 'downstream').map(d => (
                    <div 
                      key={d.id}
                      onClick={() => {
                        if (d.type === 'service') navigateTo(`/services/${d.id}`);
                      }}
                      className={`px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs font-mono text-xs font-bold text-slate-800 transition-all flex items-center gap-2 ${d.type === 'service' ? 'hover:border-brand-300 hover:text-brand-600 cursor-pointer' : ''}`}
                    >
                      {d.type === 'database' ? <Database className="w-3.5 h-3.5 text-sky-600" /> : <Server className="w-3.5 h-3.5 text-blue-600" />}
                      <span>{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-mono text-xs font-medium border border-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Pull Requests */}
      {activeTab === 'prs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle divide-y divide-slate-100">
          {service.prs.map((pr) => (
            <div key={pr.number} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-700">{pr.number}</span>
                    <span className="text-xs font-bold text-slate-900">{pr.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Authored by {pr.author} · {pr.date}</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {pr.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Docs & ADRs */}
      {activeTab === 'docs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle divide-y divide-slate-100">
          {service.docs.map((doc, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Type: {doc.type} · Updated {doc.lastUpdated}</p>
                </div>
              </div>
              <a 
                href={doc.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>Read Doc</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Activity */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle divide-y divide-slate-100">
          {service.activity.map((act) => (
            <div key={act.id} className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{act.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">By {act.user} · {act.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
