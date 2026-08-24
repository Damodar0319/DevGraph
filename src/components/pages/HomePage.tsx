import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Server, 
  Users, 
  Network, 
  GitBranch, 
  Sparkles, 
  ArrowRight, 
  Share2, 
  FileText, 
  GitPullRequest, 
  AlertTriangle, 
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { SearchBar } from '../search/SearchBar';
import { EXAMPLE_QUESTIONS, MOCK_ACTIVITY_FEED } from '../../data/mockData';

export function HomePage() {
  const { executeSearch, navigateTo } = useApp();

  const discoveryCards = [
    {
      title: 'Services',
      description: 'Explore 42 microservices and their upstream & downstream dependencies.',
      icon: Server,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      route: '/services'
    },
    {
      title: 'People',
      description: 'Find engineers, code owners, on-call responders, and domain experts.',
      icon: Users,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      route: '/people'
    },
    {
      title: 'Architecture',
      description: 'Understand how your systems, message queues, and databases connect.',
      icon: Network,
      color: 'text-brand-600 bg-brand-50 border-brand-200',
      route: '/graph'
    },
    {
      title: 'Decisions',
      description: 'Discover why technical decisions, RFCs, and ADR standards were made.',
      icon: GitBranch,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      route: '/sources'
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'pr': return <GitPullRequest className="w-4 h-4 text-emerald-600" />;
      case 'decision': return <GitBranch className="w-4 h-4 text-indigo-600" />;
      case 'incident': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'doc': return <FileText className="w-4 h-4 text-sky-600" />;
      case 'deployment': return <Server className="w-4 h-4 text-purple-600" />;
      default: return <Sparkles className="w-4 h-4 text-brand-600" />;
    }
  };

  return (
    <div className="space-y-14 py-4 md:py-8 max-w-5xl mx-auto">
      {/* 1. Hero Section */}
      <section className="text-center space-y-6 pt-4 md:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>DevGraph 2.0 · AI Knowledge Engine</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Your engineering knowledge, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              connected & queryable.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Ask questions across code, architecture, documentation, incidents, pull requests, and people.
          </p>
        </div>

        {/* Big Search Bar */}
        <div className="max-w-2xl mx-auto pt-2">
          <SearchBar size="large" autoFocus />
        </div>

        {/* Example Question Chips */}
        <div className="pt-2 flex flex-col items-center gap-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Or try an engineering question
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {EXAMPLE_QUESTIONS.map((question, idx) => (
              <button
                key={idx}
                onClick={() => executeSearch(question)}
                className="text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 hover:text-brand-700 hover:border-brand-300 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs transition-all duration-150 flex items-center gap-1.5 group cursor-pointer"
              >
                <span>{question}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Value Loop Demonstration */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-brand-400 bg-brand-950 px-2 py-0.5 rounded border border-brand-800">
                  CORE VALUE LOOP
                </span>
                <span className="text-xs text-slate-400">How DevGraph Answers Complex Queries</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Beyond Chat: Semantic Search Grounded in Evidence
              </h2>
            </div>

            <button
              onClick={() => executeSearch("Why was Redis introduced in the authentication service?")}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Test Live Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4-Step Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-brand-400">STEP 01</span>
                <Sparkles className="w-4 h-4 text-brand-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Developer Query</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                "Why was Redis introduced in auth-service?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-indigo-400">STEP 02</span>
                <Network className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Graph Traversal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connects <span className="text-slate-200">auth-service</span> ➔ <span className="text-slate-200">Redis</span> ➔ <span className="text-slate-200">ADR-024</span> ➔ <span className="text-slate-200">Rahul Sharma</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-purple-400">STEP 03</span>
                <ShieldCheck className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Evidence Retrieval</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fetches verified PR #1842 diff, ADR-024 rationale, and Slack thread evidence.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400">STEP 04</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Grounded Answer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Delivers verifiable answer with click-through code references and entity cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Discovery Section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Explore your engineering knowledge
            </h2>
            <p className="text-xs text-slate-500">
              Browse structured catalogs across services, team ownership, architecture, and standards
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {discoveryCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => navigateTo(card.route)}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle hover:shadow-elevated hover:border-brand-300 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Recent Engineering Activity Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Recent engineering activity
            </h2>
            <p className="text-xs text-slate-500">
              Real-time events indexed from GitHub, Jira, Confluence, and CI/CD
            </p>
          </div>
          <button
            onClick={() => navigateTo('/sources')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View all sources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle divide-y divide-slate-100 overflow-hidden">
          {MOCK_ACTIVITY_FEED.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.linkRoute) navigateTo(item.linkRoute);
              }}
              className="p-4 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 mt-0.5 group-hover:bg-white transition-colors">
                  {getActivityIcon(item.type)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className={`text-[10px] font-semibold px-2 py-0.2 rounded border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      {item.target}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <div className="flex items-center gap-2">
                  <img
                    src={item.person.avatar}
                    alt={item.person.name}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <span className="text-xs font-medium text-slate-700 hidden sm:inline">
                    {item.person.name}
                  </span>
                </div>

                <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                  {item.timestamp}
                </span>

                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
