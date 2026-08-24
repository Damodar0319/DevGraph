import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Code, 
  FileText, 
  GitPullRequest, 
  AlertCircle, 
  Users, 
  Server, 
  Layers, 
  ExternalLink,
  Filter,
  CheckCircle2,
  Copy,
  ChevronRight,
  Eye
} from 'lucide-react';
import { SearchBar } from '../search/SearchBar';
import { AIAnswerCard } from '../search/AIAnswerCard';
import { EvidenceCard } from '../search/EvidenceCard';
import { RelationshipPanel } from '../search/RelationshipPanel';
import { FilterPanel } from '../search/FilterPanel';
import { getAIAnswerForQuery, MOCK_SEARCH_RESULTS, MOCK_SERVICES, MOCK_PEOPLE } from '../../data/mockData';
import { EntityBadge } from '../common/Badge';

export function SearchResultsPage() {
  const { 
    searchQuery, 
    activeTab, 
    setActiveTab, 
    openEvidenceModal,
    navigateTo 
  } = useApp();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRepo, setSelectedRepo] = useState('all');
  const [liveData, setLiveData] = useState<any>(null);

  // Trigger live hybrid retrieval from FastAPI backend
  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;

    async function fetchLiveQuery() {
      try {
        const res = await fetch('http://localhost:8000/api/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: searchQuery || 'Why was Redis introduced in the authentication service?',
            top_k: 4
          })
        });
        if (res.ok && isMounted) {
          const json = await res.json();
          setLiveData(json);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.log('Using local fallback for query');
      }

      if (isMounted) {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }

    fetchLiveQuery();
    return () => { isMounted = false; };
  }, [searchQuery]);

  const fallbackData = getAIAnswerForQuery(searchQuery || 'Why was Redis introduced in the authentication service?');
  const aiData = liveData || fallbackData;

  const tabs = [
    { id: 'all', label: 'All Results', count: 12 },
    { id: 'ai-answer', label: 'AI Answer', icon: Sparkles },
    { id: 'code', label: 'Code & Symbols', count: 4 },
    { id: 'docs', label: 'Documents & ADRs', count: 3 },
    { id: 'prs', label: 'Pull Requests', count: 4 },
    { id: 'issues', label: 'Issues', count: 2 },
    { id: 'people', label: 'People', count: 2 },
    { id: 'services', label: 'Services', count: 3 },
  ];

  const handleResetFilters = () => {
    setSelectedSource('all');
    setSelectedType('all');
    setSelectedRepo('all');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Search Header */}
      <div className="space-y-4 pt-2">
        <SearchBar initialValue={searchQuery} size="normal" autoFocus={false} />

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200/80 pb-px scrollbar-none">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-px
                  ${active 
                    ? 'border-brand-600 text-brand-700 font-bold bg-brand-50/40 rounded-t-lg' 
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                  }
                `}
              >
                {tab.icon && <tab.icon className="w-3.5 h-3.5 text-brand-600" />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${active ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Layout: Left Filters + Center AI & Results + Right Knowledge Graph Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Panel (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <FilterPanel
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedRepo={selectedRepo}
            setSelectedRepo={setSelectedRepo}
            onReset={handleResetFilters}
          />
        </div>

        {/* Main Content Area (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* AI Answer Card */}
          {(activeTab === 'all' || activeTab === 'ai-answer') && (
            <AIAnswerCard data={aiData} isLoading={isLoading} />
          )}

          {/* Evidence Sources Section */}
          {(activeTab === 'all' || activeTab === 'docs' || activeTab === 'prs') && !isLoading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Supporting Evidence ({aiData.evidence?.length || 0})
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    High Confidence
                  </span>
                </div>
                <span className="text-xs text-slate-400">Click card for full text</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiData.evidence && aiData.evidence.map((source: any, idx: number) => (
                  <EvidenceCard key={source.id || idx} source={source} index={idx} />
                ))}
              </div>
            </div>
          )}

          {/* Code Snippets Section */}
          {(activeTab === 'all' || activeTab === 'code') && !isLoading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Code className="w-4 h-4 text-brand-600" />
                  <span>Referenced Code Snippet</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {searchQuery?.toLowerCase().includes('jwt') ? 'auth-service (TypeScript)' :
                   searchQuery?.toLowerCase().includes('kafka') || searchQuery?.toLowerCase().includes('payment') ? 'payment-service (Go)' :
                   searchQuery?.toLowerCase().includes('postgres') || searchQuery?.toLowerCase().includes('mongo') ? 'user-service (Prisma/SQL)' :
                   searchQuery?.toLowerCase().includes('gateway') || searchQuery?.toLowerCase().includes('envoy') ? 'api-gateway (Rust WASM)' :
                   searchQuery?.toLowerCase().includes('deploy') || searchQuery?.toLowerCase().includes('incident') ? 'infrastructure (Kubernetes)' :
                   'auth-service (TypeScript)'}
                </span>
              </div>

              <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <span className="text-slate-300">
                    {searchQuery?.toLowerCase().includes('jwt') ? 'src/middleware/jwtValidator.ts' :
                     searchQuery?.toLowerCase().includes('kafka') || searchQuery?.toLowerCase().includes('payment') ? 'pkg/events/payment_event_producer.go' :
                     searchQuery?.toLowerCase().includes('postgres') || searchQuery?.toLowerCase().includes('mongo') ? 'prisma/schema.prisma' :
                     searchQuery?.toLowerCase().includes('gateway') || searchQuery?.toLowerCase().includes('envoy') ? 'plugins/auth_filter.rs' :
                     searchQuery?.toLowerCase().includes('deploy') || searchQuery?.toLowerCase().includes('incident') ? 'k8s/canary-deployment.yaml' :
                     'src/cache/RedisSessionStore.ts'}
                  </span>
                  <span className="text-[11px] text-brand-400">
                    {searchQuery?.toLowerCase().includes('jwt') ? 'TypeScript · L14-L28' :
                     searchQuery?.toLowerCase().includes('kafka') || searchQuery?.toLowerCase().includes('payment') ? 'Go · L35-L48' :
                     searchQuery?.toLowerCase().includes('postgres') || searchQuery?.toLowerCase().includes('mongo') ? 'Prisma Schema · L18-L32' :
                     searchQuery?.toLowerCase().includes('gateway') || searchQuery?.toLowerCase().includes('envoy') ? 'Rust WASM · L22-L34' :
                     searchQuery?.toLowerCase().includes('deploy') || searchQuery?.toLowerCase().includes('incident') ? 'YAML · L12-L26' :
                     'TypeScript · L42-L51'}
                  </span>
                </div>
                <div className="p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                  <pre className="text-slate-100">
                    {searchQuery?.toLowerCase().includes('jwt') ? 
`export async function validateJwtToken(req: Request, res: Response, next: NextFunction) {
  const token = extractBearerToken(req.headers.authorization);
  if (!token) return res.status(401).json({ error: 'Missing token' });
  
  // Validate RS256 signature against memory-cached JWKS public keys
  const verified = await jwtVerify(token, jwksClient.getSigningKey(), {
    issuer: 'https://auth.internal',
    audience: 'internal-mesh'
  });
  
  req.user = verified.payload;
  next();
}` :
                     searchQuery?.toLowerCase().includes('kafka') || searchQuery?.toLowerCase().includes('payment') ?
`func (p *PaymentProducer) PublishPaymentInitiated(ctx context.Context, tx *Transaction) error {
    msg := &kafka.Message{
        TopicPartition: kafka.TopicPartition{Topic: &p.Topic, Partition: kafka.PartitionAny},
        Key:            []byte(tx.IdempotencyKey),
        Value:          tx.ToJSON(),
        Headers:        []kafka.Header{{Key: "trace_id", Value: []byte(ctx.Value("trace_id").(string))}},
    }
    return p.Producer.Produce(msg, p.DeliveryChan)
}` :
                     searchQuery?.toLowerCase().includes('postgres') || searchQuery?.toLowerCase().includes('mongo') ?
`model UserWorkspaceMembership {
  id          String    @id @default(uuid())
  userId      String    @map("user_id")
  workspaceId String    @map("workspace_id")
  role        Role      @default(MEMBER)
  createdAt   DateTime  @default(now()) @map("created_at")

  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([userId, workspaceId])
  @@index([workspaceId, role])
}` :
                     searchQuery?.toLowerCase().includes('gateway') || searchQuery?.toLowerCase().includes('envoy') ?
`impl HttpContext for AuthFilter {
    fn on_http_request_headers(&mut self, _num_headers: usize, _end_of_stream: bool) -> Action {
        if let Some(auth_header) = self.get_http_request_header("Authorization") {
            if let Some(token) = parse_bearer(&auth_header) {
                return match verify_rs256_wasm(token) {
                    Ok(claims) => Action::Continue,
                    Err(_) => {
                        self.send_http_response(401, vec![], Some(b"Unauthorized"));
                        Action::Pause
                    }
                };
            }
        }
        Action::Continue
    }
}` :
                     searchQuery?.toLowerCase().includes('deploy') || searchQuery?.toLowerCase().includes('incident') ?
`apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: auth-service
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: auth-service
  analysis:
    interval: 1m
    threshold: 3
    maxWeight: 50
    metrics:
      - name: request-success-rate
        thresholdRange:
          min: 99.9` :
`export class RedisSessionStore implements ISessionStore {
  private client: RedisCluster;

  async getSession(sessionId: string): Promise<UserSession | null> {
    const raw = await this.client.get(\`session:\${sessionId}\`);
    if (!raw) return null;
    await this.client.expire(\`session:\${sessionId}\`, 86400); // 24h sliding window
    return JSON.parse(raw);
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* People Matches */}
          {(activeTab === 'all' || activeTab === 'people') && !isLoading && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Relevant Code Owners & Experts</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(aiData.relatedEntities?.people?.length ? aiData.relatedEntities.people : MOCK_PEOPLE.slice(0, 2)).map((p: any) => (
                  <div
                    key={p.id}
                    onClick={() => navigateTo(`/people/${p.id}`)}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-subtle cursor-pointer transition-all flex items-start gap-3"
                  >
                    <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{p.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{p.role}</p>
                      <span className="text-[10px] text-brand-700 bg-brand-50 px-1.5 py-0.2 rounded border border-brand-200 mt-1 inline-block">
                        {p.team}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Relationship & Connected Graph Panel (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <RelationshipPanel data={aiData} />
        </div>
      </div>
    </div>
  );
}
