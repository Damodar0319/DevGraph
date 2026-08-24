import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Server, 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronRight, 
  Layers, 
  Activity, 
  Clock,
  ArrowRight,
  GitBranch,
  ShieldCheck
} from 'lucide-react';
import { MOCK_SERVICES } from '../../data/mockData';
import { HealthBadge } from '../common/Badge';

export function ServicesPage() {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredServices = MOCK_SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.owner.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || service.status === selectedStatus;
    const matchesLang = selectedLanguage === 'all' || service.language.toLowerCase().includes(selectedLanguage.toLowerCase());

    return matchesSearch && matchesStatus && matchesLang;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Server className="w-6 h-6 text-brand-600" />
              <span>Engineering Services</span>
            </h1>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 rounded-full">
              42 Systems Indexed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore the systems that power your organization, their owners, SLOs, and live dependencies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('/graph')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
          >
            <span>Dependency Graph</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-subtle">
        {/* Search */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search services by name, owner, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-hidden font-medium"
          />
        </div>

        {/* Filters & View toggle */}
        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-hidden cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="degraded">Degraded</option>
          </select>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-hidden cursor-pointer"
          >
            <option value="all">All Stacks</option>
            <option value="typescript">TypeScript</option>
            <option value="go">Go</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="rust">Rust</option>
          </select>

          {/* View mode toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => navigateTo(`/services/${service.id}`)}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle hover:shadow-elevated hover:border-brand-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      {service.tier}
                    </span>
                    <h3 className="text-base font-bold font-mono text-slate-900 group-hover:text-brand-600 transition-colors mt-1">
                      {service.name}
                    </h3>
                  </div>
                  <HealthBadge status={service.status} />
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">P99 Latency</span>
                    <span className="text-xs font-bold font-mono text-slate-800">{service.latencyP99}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">SLO</span>
                    <span className="text-xs font-bold font-mono text-emerald-600">{service.slo}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Throughput</span>
                    <span className="text-xs font-bold font-mono text-slate-800">{service.qps}</span>
                  </div>
                </div>

                {/* Owner & Tech */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <img 
                      src={service.owner.avatar} 
                      alt={service.owner.name} 
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="text-slate-700 font-medium">{service.owner.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {service.language}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px]">
                  {service.dependencies.length} Dependencies
                </span>
                <span className="font-semibold text-brand-600 group-hover:text-brand-700 flex items-center gap-1">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Language & Framework</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">SLO / P99</th>
                  <th className="px-4 py-3">Last Deploy</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.map((service) => (
                  <tr 
                    key={service.id}
                    onClick={() => navigateTo(`/services/${service.id}`)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                      <div>
                        <span>{service.name}</span>
                        <p className="font-sans font-normal text-[11px] text-slate-400">{service.displayName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <img src={service.owner.avatar} alt={service.owner.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-medium text-slate-800">{service.owner.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px]">
                      {service.language}
                    </td>
                    <td className="px-4 py-3.5">
                      <HealthBadge status={service.status} />
                    </td>
                    <td className="px-4 py-3.5 font-mono">
                      <span className="text-emerald-600 font-bold">{service.slo}</span> / {service.latencyP99}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                      {service.lastDeployment.version} · {service.lastDeployment.timestamp}
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-brand-600">
                      View ➔
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
