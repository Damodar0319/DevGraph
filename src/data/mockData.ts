import { 
  GraphNode, 
  GraphEdge, 
  EvidenceSource, 
  SearchResultItem, 
  AIQueryResponse, 
  ServiceItem, 
  PersonItem, 
  SourceIntegration, 
  ActivityItem 
} from '../types';

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'auth-service',
    name: 'auth-service',
    displayName: 'Authentication Service',
    description: 'Handles authentication, authorization, token validation, session management, and OAuth2/OIDC provider integrations across all client applications.',
    owner: {
      name: 'Rahul Sharma',
      role: 'Senior Backend Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      email: 'rahul.sharma@company.dev'
    },
    team: 'Platform Identity',
    tier: 'Tier 1',
    language: 'TypeScript',
    framework: 'Node.js / Express / Fastify',
    repository: 'github.com/company/auth-service',
    status: 'healthy',
    slo: '99.99%',
    latencyP99: '14ms',
    qps: '18,500 req/s',
    lastDeployment: {
      version: 'v2.8.2',
      timestamp: '3 hours ago',
      author: 'Rahul Sharma',
      status: 'success'
    },
    dependencies: [
      { id: 'redis', name: 'Redis Cluster (Session Cache)', type: 'database', relationship: 'downstream', health: 'healthy' },
      { id: 'postgresql', name: 'PostgreSQL Primary (User DB)', type: 'database', relationship: 'downstream', health: 'healthy' },
      { id: 'user-service', name: 'user-service', type: 'service', relationship: 'downstream', health: 'healthy' },
      { id: 'notification-service', name: 'notification-service', type: 'service', relationship: 'downstream', health: 'healthy' },
      { id: 'api-gateway', name: 'api-gateway', type: 'gateway', relationship: 'upstream', health: 'healthy' }
    ],
    techStack: ['TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'JWT', 'OAuth2', 'Docker', 'Kubernetes'],
    prs: [
      { number: '#1842', title: 'Add Redis-backed session cache with TTL sliding window', author: 'Rahul Sharma', date: 'Mar 14, 2026', status: 'merged' },
      { number: '#1831', title: 'Optimize JWT signature verification caching', author: 'Rahul Sharma', date: 'Mar 08, 2026', status: 'merged' },
      { number: '#1817', title: 'Authentication performance optimization & connection pooling', author: 'Rahul Sharma', date: 'Feb 26, 2026', status: 'merged' },
      { number: '#1791', title: 'Revamp JWT validation middleware & add claims verification', author: 'Ananya Rao', date: 'Feb 14, 2026', status: 'merged' }
    ],
    issues: [
      { number: '#921', title: 'Redis cluster failover latency spike investigation', status: 'closed', priority: 'P1' },
      { number: '#843', title: 'Token refresh edge case during simultaneous multi-tab logout', status: 'open', priority: 'P2' },
      { number: '#799', title: 'Add Prometheus metrics for OAuth token exchange latency', status: 'closed', priority: 'P3' }
    ],
    docs: [
      { title: 'Authentication Service Architecture & Threat Model', type: 'Confluence', url: 'https://wiki.internal/auth-architecture', lastUpdated: '2 days ago' },
      { title: 'ADR-024: Redis Cluster for Authentication Session Storage', type: 'ADR', url: 'https://github.com/company/architecture/adr-024.md', lastUpdated: 'Mar 12, 2026' },
      { title: 'Auth Service On-Call Runbook & Disaster Recovery', type: 'Runbook', url: 'https://wiki.internal/runbooks/auth-service', lastUpdated: '1 week ago' }
    ],
    activity: [
      { id: 'act-1', type: 'deployment', title: 'Deployed v2.8.2 to prod-us-east-1 and prod-eu-west-1', timestamp: '3 hours ago', user: 'Rahul Sharma' },
      { id: 'act-2', type: 'pr', title: 'Merged PR #1842: Add Redis-backed session cache', timestamp: '2 days ago', user: 'Rahul Sharma' },
      { id: 'act-3', type: 'incident', title: 'Resolved latency warning: Redis connection pool resized to 150', timestamp: '4 days ago', user: 'Karan Patel' }
    ]
  },
  {
    id: 'payment-service',
    name: 'payment-service',
    displayName: 'Payment Processing Service',
    description: 'Mission-critical payment gateway orchestration, idempotent billing pipelines, Stripe & Adyen integrations, and transactional ledger accounting.',
    owner: {
      name: 'Ananya Rao',
      role: 'Staff Platform Engineer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: 'ananya.rao@company.dev'
    },
    team: 'Core Payments & Ledger',
    tier: 'Tier 1',
    language: 'Go',
    framework: 'gRPC / Go 1.22',
    repository: 'github.com/company/payment-service',
    status: 'warning',
    slo: '99.999%',
    latencyP99: '118ms',
    qps: '4,200 req/s',
    lastDeployment: {
      version: 'v3.4.0-rc2',
      timestamp: '6 hours ago',
      author: 'Ananya Rao',
      status: 'success'
    },
    dependencies: [
      { id: 'kafka', name: 'Apache Kafka (Payment Events Queue)', type: 'queue', relationship: 'downstream', health: 'healthy' },
      { id: 'postgresql', name: 'PostgreSQL Ledger (ACID Ledger DB)', type: 'database', relationship: 'downstream', health: 'healthy' },
      { id: 'notification-service', name: 'notification-service', type: 'service', relationship: 'downstream', health: 'healthy' },
      { id: 'order-service', name: 'order-service', type: 'service', relationship: 'upstream', health: 'healthy' },
      { id: 'api-gateway', name: 'api-gateway', type: 'gateway', relationship: 'upstream', health: 'warning' }
    ],
    techStack: ['Go', 'gRPC', 'Kafka', 'PostgreSQL', 'Stripe API', 'Docker', 'Kubernetes', 'Prometheus'],
    prs: [
      { number: '#1904', title: 'Migrate synchronous checkout billing to Kafka event-driven stream', author: 'Ananya Rao', date: 'Mar 18, 2026', status: 'merged' },
      { number: '#1889', title: 'Implement distributed idempotency key locks with Redis', author: 'Elena Rostova', date: 'Mar 10, 2026', status: 'merged' },
      { number: '#1856', title: 'Payment API webhook retry backoff algorithm upgrade', author: 'Ananya Rao', date: 'Feb 28, 2026', status: 'merged' }
    ],
    issues: [
      { number: '#1024', title: 'Payment API latency spike during flash sale event', status: 'closed', priority: 'P0' },
      { number: '#980', title: 'Add fallback routing for secondary merchant PSP', status: 'open', priority: 'P2' }
    ],
    docs: [
      { title: 'Payment System Architecture & Zero-Loss Ledger Design', type: 'Confluence', url: 'https://wiki.internal/payment-architecture', lastUpdated: '3 days ago' },
      { title: 'ADR-028: Move Payments to Event-Driven Processing with Kafka', type: 'ADR', url: 'https://github.com/company/architecture/adr-028.md', lastUpdated: 'Mar 18, 2026' }
    ],
    activity: [
      { id: 'act-p1', type: 'incident', title: 'Latency warning triggered: P99 spiked to 120ms due to PSP webhook throttling', timestamp: '5 hours ago', user: 'Ananya Rao' },
      { id: 'act-p2', type: 'deployment', title: 'Deployed v3.4.0-rc2 with circuit breaker enhancements', timestamp: '6 hours ago', user: 'Ananya Rao' }
    ]
  },
  {
    id: 'user-service',
    name: 'user-service',
    displayName: 'User Profile & Identity Service',
    description: 'Manages user accounts, profiles, organization hierarchies, role-based access control (RBAC), and team workspace memberships.',
    owner: {
      name: 'Arjun Mehta',
      role: 'Senior Fullstack Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'arjun.mehta@company.dev'
    },
    team: 'User Core & Workspaces',
    tier: 'Tier 1',
    language: 'TypeScript',
    framework: 'Fastify / Prisma ORM',
    repository: 'github.com/company/user-service',
    status: 'healthy',
    slo: '99.95%',
    latencyP99: '22ms',
    qps: '12,800 req/s',
    lastDeployment: {
      version: 'v2.8.1',
      timestamp: '1 day ago',
      author: 'Arjun Mehta',
      status: 'success'
    },
    dependencies: [
      { id: 'postgresql', name: 'PostgreSQL User Shard DB', type: 'database', relationship: 'downstream', health: 'healthy' },
      { id: 'redis', name: 'Redis Cache (User Session & Profile)', type: 'database', relationship: 'downstream', health: 'healthy' },
      { id: 'auth-service', name: 'auth-service', type: 'service', relationship: 'upstream', health: 'healthy' },
      { id: 'order-service', name: 'order-service', type: 'service', relationship: 'upstream', health: 'healthy' }
    ],
    techStack: ['TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'GraphQL'],
    prs: [
      { number: '#1680', title: 'Add multi-tenant workspace isolation and row-level security', author: 'Arjun Mehta', date: 'Mar 15, 2026', status: 'merged' },
      { number: '#1642', title: 'Batch query optimization for team membership lookups', author: 'Arjun Mehta', date: 'Mar 02, 2026', status: 'merged' }
    ],
    issues: [
      { number: '#612', title: 'Profile picture upload S3 presigned URL expiration', status: 'closed', priority: 'P3' }
    ],
    docs: [
      { title: 'User Service Domain Model & RBAC Specification', type: 'Confluence', url: 'https://wiki.internal/user-service-spec', lastUpdated: '1 week ago' }
    ],
    activity: [
      { id: 'act-u1', type: 'deployment', title: 'Deployed v2.8.1 with updated workspace schema', timestamp: '1 day ago', user: 'Arjun Mehta' }
    ]
  },
  {
    id: 'order-service',
    name: 'order-service',
    displayName: 'Order Fulfillment & Checkout Service',
    description: 'Manages shopping carts, order state machines, fulfillment tracking, inventory reservations, and checkout lifecycle events.',
    owner: {
      name: 'Elena Rostova',
      role: 'Principal Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      email: 'elena.rostova@company.dev'
    },
    team: 'Commerce & Fulfillment',
    tier: 'Tier 1',
    language: 'Java',
    framework: 'Spring Boot 3.2 / JVM 21',
    repository: 'github.com/company/order-service',
    status: 'healthy',
    slo: '99.98%',
    latencyP99: '45ms',
    qps: '8,100 req/s',
    lastDeployment: {
      version: 'v4.1.0',
      timestamp: '2 days ago',
      author: 'Elena Rostova',
      status: 'success'
    },
    dependencies: [
      { id: 'payment-service', name: 'payment-service', type: 'service', relationship: 'downstream', health: 'warning' },
      { id: 'user-service', name: 'user-service', type: 'service', relationship: 'downstream', health: 'healthy' },
      { id: 'kafka', name: 'Kafka Order Topics', type: 'queue', relationship: 'downstream', health: 'healthy' },
      { id: 'postgresql', name: 'PostgreSQL Orders DB', type: 'database', relationship: 'downstream', health: 'healthy' }
    ],
    techStack: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Resilience4j', 'Kubernetes'],
    prs: [
      { number: '#2102', title: 'Add saga transaction orchestrator for distributed order rollback', author: 'Elena Rostova', date: 'Mar 17, 2026', status: 'merged' }
    ],
    issues: [
      { number: '#870', title: 'Order fulfillment status sync race condition with warehouse webhook', status: 'open', priority: 'P2' }
    ],
    docs: [
      { title: 'Distributed Sagas in Order Lifecycle', type: 'Confluence', url: 'https://wiki.internal/order-saga-design', lastUpdated: '5 days ago' }
    ],
    activity: [
      { id: 'act-o1', type: 'pr', title: 'Merged PR #2102: Saga transaction orchestrator', timestamp: '2 days ago', user: 'Elena Rostova' }
    ]
  },
  {
    id: 'notification-service',
    name: 'notification-service',
    displayName: 'Notification & Messaging Service',
    description: 'Dispatches real-time web push notifications, transactional emails, SMS alerts, and Slack webhooks with rate limiting and user preference filtering.',
    owner: {
      name: 'Karan Patel',
      role: 'SRE & Platform Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      email: 'karan.patel@company.dev'
    },
    team: 'Platform Communications',
    tier: 'Tier 2',
    language: 'Python',
    framework: 'FastAPI / Celery',
    repository: 'github.com/company/notification-service',
    status: 'healthy',
    slo: '99.9%',
    latencyP99: '35ms',
    qps: '3,500 req/s',
    lastDeployment: {
      version: 'v1.9.4',
      timestamp: '4 days ago',
      author: 'Karan Patel',
      status: 'success'
    },
    dependencies: [
      { id: 'auth-service', name: 'auth-service', type: 'service', relationship: 'upstream', health: 'healthy' },
      { id: 'payment-service', name: 'payment-service', type: 'service', relationship: 'upstream', health: 'warning' },
      { id: 'rabbitmq', name: 'RabbitMQ Message Broker', type: 'queue', relationship: 'downstream', health: 'healthy' }
    ],
    techStack: ['Python', 'FastAPI', 'Celery', 'RabbitMQ', 'SendGrid', 'Twilio', 'Redis'],
    prs: [
      { number: '#940', title: 'Add batch email template compilation with Jinja2 caching', author: 'Karan Patel', date: 'Mar 11, 2026', status: 'merged' }
    ],
    issues: [
      { number: '#340', title: 'Email provider bounce rate alert webhook handling', status: 'closed', priority: 'P3' }
    ],
    docs: [
      { title: 'Notification Rate Limiting & User Preference Engine', type: 'Confluence', url: 'https://wiki.internal/notifications', lastUpdated: '2 weeks ago' }
    ],
    activity: [
      { id: 'act-n1', type: 'deployment', title: 'Deployed v1.9.4 with updated SendGrid retry policy', timestamp: '4 days ago', user: 'Karan Patel' }
    ]
  },
  {
    id: 'api-gateway',
    name: 'api-gateway',
    displayName: 'Global API Gateway & Edge Proxy',
    description: 'Edge traffic ingestion, rate limiting, TLS termination, dynamic routing, authentication token validation offloading, and distributed tracing injection.',
    owner: {
      name: 'Marcus Vance',
      role: 'Principal Infrastructure Architect',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      email: 'marcus.vance@company.dev'
    },
    team: 'Edge & Network Infrastructure',
    tier: 'Tier 1',
    language: 'Rust / Envoy',
    framework: 'Envoy Proxy + Rust WASM Plugins',
    repository: 'github.com/company/api-gateway',
    status: 'healthy',
    slo: '99.999%',
    latencyP99: '4ms',
    qps: '45,000 req/s',
    lastDeployment: {
      version: 'v5.2.0',
      timestamp: '5 days ago',
      author: 'Marcus Vance',
      status: 'success'
    },
    dependencies: [
      { id: 'auth-service', name: 'auth-service', type: 'service', relationship: 'downstream', health: 'healthy' },
      { id: 'user-service', name: 'user-service', type: 'service', relationship: 'downstream', health: 'healthy' },
      { id: 'payment-service', name: 'payment-service', type: 'service', relationship: 'downstream', health: 'warning' },
      { id: 'order-service', name: 'order-service', type: 'service', relationship: 'downstream', health: 'healthy' }
    ],
    techStack: ['Rust', 'Envoy', 'WebAssembly', 'OpenTelemetry', 'gRPC', 'Cloudflare', 'AWS NLB'],
    prs: [
      { number: '#812', title: 'Implement Rust WASM JWT validator filter for edge token offloading', author: 'Marcus Vance', date: 'Mar 04, 2026', status: 'merged' }
    ],
    issues: [
      { number: '#210', title: 'HTTP/3 QUIC connection migration benchmark', status: 'open', priority: 'P3' }
    ],
    docs: [
      { title: 'Edge Routing & WASM Plugin Architecture', type: 'Confluence', url: 'https://wiki.internal/api-gateway-wasm', lastUpdated: '1 month ago' },
      { title: 'ADR-018: Rust-based WASM Filters for Edge Gateway Auth Offloading', type: 'ADR', url: 'https://github.com/company/architecture/adr-018.md', lastUpdated: 'Feb 10, 2026' }
    ],
    activity: [
      { id: 'act-g1', type: 'deployment', title: 'Deployed v5.2.0 Envoy cluster with HTTP/3 support', timestamp: '5 days ago', user: 'Marcus Vance' }
    ]
  },
  {
    id: 'analytics-service',
    name: 'analytics-service',
    displayName: 'Real-time Analytics & Telemetry Engine',
    description: 'High-throughput event streaming, user behavioral tracking, aggregated metrics computation, and real-time dashboard data feeds.',
    owner: {
      name: 'Priya Nair',
      role: 'Lead Data & Search Architect',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      email: 'priya.nair@company.dev'
    },
    team: 'Data Platform & Analytics',
    tier: 'Tier 2',
    language: 'Python / C++',
    framework: 'FastAPI / ClickHouse / Apache Flink',
    repository: 'github.com/company/analytics-service',
    status: 'healthy',
    slo: '99.9%',
    latencyP99: '65ms',
    qps: '25,000 events/s',
    lastDeployment: {
      version: 'v2.1.0',
      timestamp: '3 days ago',
      author: 'Priya Nair',
      status: 'success'
    },
    dependencies: [
      { id: 'kafka', name: 'Kafka Ingestion Pipeline', type: 'queue', relationship: 'upstream', health: 'healthy' },
      { id: 'clickhouse', name: 'ClickHouse OLAP Cluster', type: 'database', relationship: 'downstream', health: 'healthy' }
    ],
    techStack: ['Python', 'ClickHouse', 'Apache Flink', 'Kafka', 'Docker', 'Kubernetes'],
    prs: [
      { number: '#640', title: 'Optimize ClickHouse partition key for time-series queries', author: 'Priya Nair', date: 'Mar 16, 2026', status: 'merged' }
    ],
    issues: [
      { number: '#198', title: 'Flink checkpoint save timeout on heavy burst load', status: 'closed', priority: 'P2' }
    ],
    docs: [
      { title: 'Real-time Telemetry Pipeline Architecture', type: 'Confluence', url: 'https://wiki.internal/analytics-design', lastUpdated: '1 week ago' }
    ],
    activity: [
      { id: 'act-a1', type: 'deployment', title: 'Deployed v2.1.0 ClickHouse streaming sink', timestamp: '3 days ago', user: 'Priya Nair' }
    ]
  }
];

export const MOCK_PEOPLE: PersonItem[] = [
  {
    id: 'rahul-sharma',
    name: 'Rahul Sharma',
    role: 'Senior Backend Engineer',
    team: 'Platform Identity',
    department: 'Engineering → Platform',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'rahul.sharma@company.dev',
    timezone: 'UTC-5 (EST)',
    location: 'New York, USA',
    expertise: ['Authentication', 'Distributed Systems', 'Node.js / TypeScript', 'Redis', 'PostgreSQL', 'OAuth2 / OIDC', 'AWS'],
    ownedServices: [
      { id: 'auth-service', name: 'Authentication Service', status: 'healthy' }
    ],
    contributions: [
      { prNumber: '#1842', title: 'Add Redis-backed session cache with TTL sliding window', repo: 'auth-service', date: 'Mar 14, 2026', additions: 420, deletions: 85 },
      { prNumber: '#1831', title: 'Optimize JWT signature verification caching', repo: 'auth-service', date: 'Mar 08, 2026', additions: 180, deletions: 42 },
      { prNumber: '#1817', title: 'Authentication performance optimization & connection pooling', repo: 'auth-service', date: 'Feb 26, 2026', additions: 650, deletions: 210 },
      { prNumber: '#1764', title: 'Implement OAuth2 Authorization Code Flow with PKCE', repo: 'auth-service', date: 'Jan 22, 2026', additions: 890, deletions: 120 }
    ],
    documents: [
      { id: 'doc-auth-arch', title: 'Authentication Service Architecture & Threat Model', type: 'Confluence Spec', date: 'Mar 15, 2026' },
      { id: 'adr-024', title: 'ADR-024: Redis Cluster for Authentication Session Storage', type: 'Architecture Decision', date: 'Mar 12, 2026' },
      { id: 'adr-011', title: 'ADR-011: Asymmetric JWT Token Verification Strategy', type: 'Architecture Decision', date: 'Jan 15, 2026' }
    ],
    activity: [
      { id: 'act-rs1', type: 'pr_merged', title: 'Merged PR #1842: Add Redis-backed session cache', timestamp: '2 days ago', repoOrChannel: 'auth-service' },
      { id: 'act-rs2', type: 'doc_updated', title: 'Updated ADR-024 with benchmark performance results', timestamp: '3 days ago', repoOrChannel: 'architecture' },
      { id: 'act-rs3', type: 'slack_msg', title: 'Explained session invalidation design in #backend', timestamp: '4 days ago', repoOrChannel: '#backend' }
    ]
  },
  {
    id: 'ananya-rao',
    name: 'Ananya Rao',
    role: 'Staff Platform Engineer',
    team: 'Core Payments & Ledger',
    department: 'Engineering → Platform Infrastructure',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'ananya.rao@company.dev',
    timezone: 'UTC+5:30 (IST)',
    location: 'Bengaluru, India',
    expertise: ['Go', 'Distributed Transactions', 'Kafka', 'Kubernetes', 'gRPC', 'High Throughput Ledger', 'Cloud Architecture'],
    ownedServices: [
      { id: 'payment-service', name: 'Payment Processing Service', status: 'warning' }
    ],
    contributions: [
      { prNumber: '#1904', title: 'Migrate synchronous checkout billing to Kafka event-driven stream', repo: 'payment-service', date: 'Mar 18, 2026', additions: 1120, deletions: 480 },
      { prNumber: '#1791', title: 'Revamp JWT validation middleware & add claims verification', repo: 'auth-service', date: 'Feb 14, 2026', additions: 320, deletions: 95 },
      { prNumber: '#1856', title: 'Payment API webhook retry backoff algorithm upgrade', repo: 'payment-service', date: 'Feb 28, 2026', additions: 240, deletions: 60 }
    ],
    documents: [
      { id: 'adr-028', title: 'ADR-028: Move Payments to Event-Driven Processing with Kafka', type: 'Architecture Decision', date: 'Mar 18, 2026' },
      { id: 'doc-payment-spec', title: 'Payment System Architecture & Zero-Loss Ledger Design', type: 'Confluence Spec', date: 'Mar 10, 2026' }
    ],
    activity: [
      { id: 'act-ar1', type: 'pr_merged', title: 'Merged PR #1904: Kafka event-driven payment processing', timestamp: '5 hours ago', repoOrChannel: 'payment-service' },
      { id: 'act-ar2', type: 'incident_resolved', title: 'Mitigated PSP webhook throttle incident INC-402', timestamp: '6 hours ago', repoOrChannel: 'payment-service' }
    ]
  },
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'Senior Fullstack Engineer',
    team: 'User Core & Workspaces',
    department: 'Engineering → Product Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'arjun.mehta@company.dev',
    timezone: 'UTC-8 (PST)',
    location: 'San Francisco, USA',
    expertise: ['TypeScript', 'Fastify', 'React', 'PostgreSQL', 'Prisma ORM', 'GraphQL', 'Multi-tenancy'],
    ownedServices: [
      { id: 'user-service', name: 'User Profile & Identity Service', status: 'healthy' }
    ],
    contributions: [
      { prNumber: '#1680', title: 'Add multi-tenant workspace isolation and row-level security', repo: 'user-service', date: 'Mar 15, 2026', additions: 780, deletions: 140 },
      { prNumber: '#1642', title: 'Batch query optimization for team membership lookups', repo: 'user-service', date: 'Mar 02, 2026', additions: 290, deletions: 80 }
    ],
    documents: [
      { id: 'doc-user-rbac', title: 'User Service Domain Model & RBAC Specification', type: 'Confluence Spec', date: 'Mar 01, 2026' },
      { id: 'adr-008', title: 'ADR-008: PostgreSQL for Primary Relational Ledger and User Entities', type: 'Architecture Decision', date: 'Jan 10, 2025' }
    ],
    activity: [
      { id: 'act-am1', type: 'deployment', title: 'Deployed user-service v2.8.1 with updated workspace schema', timestamp: '1 day ago', repoOrChannel: 'user-service' }
    ]
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'Lead Data & Search Architect',
    team: 'Data Platform & Analytics',
    department: 'Engineering → Data & AI',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    email: 'priya.nair@company.dev',
    timezone: 'UTC+1 (CET)',
    location: 'Berlin, Germany',
    expertise: ['ClickHouse', 'Apache Kafka', 'Elasticsearch', 'Python', 'Vector Search', 'Flink Streaming', 'Data Modeling'],
    ownedServices: [
      { id: 'analytics-service', name: 'Real-time Analytics Engine', status: 'healthy' }
    ],
    contributions: [
      { prNumber: '#640', title: 'Optimize ClickHouse partition key for time-series queries', repo: 'analytics-service', date: 'Mar 16, 2026', additions: 350, deletions: 45 },
      { prNumber: '#580', title: 'Kafka streaming consumer lag auto-recovery filter', repo: 'analytics-service', date: 'Feb 20, 2026', additions: 410, deletions: 90 }
    ],
    documents: [
      { id: 'doc-data-lake', title: 'Real-time Telemetry Pipeline Architecture', type: 'Confluence Spec', date: 'Mar 10, 2026' },
      { id: 'adr-021', title: 'ADR-021: ClickHouse for OLAP Analytics over PostgreSQL Read Replicas', type: 'Architecture Decision', date: 'Feb 05, 2026' }
    ],
    activity: [
      { id: 'act-pn1', type: 'pr_merged', title: 'Merged PR #640: ClickHouse partition key optimization', timestamp: '3 days ago', repoOrChannel: 'analytics-service' }
    ]
  },
  {
    id: 'karan-patel',
    name: 'Karan Patel',
    role: 'SRE & Platform Engineer',
    team: 'Reliability & Communications',
    department: 'Engineering → Infrastructure',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'karan.patel@company.dev',
    timezone: 'UTC-5 (EST)',
    location: 'Toronto, Canada',
    expertise: ['Kubernetes', 'Terraform', 'Prometheus / Datadog', 'RabbitMQ', 'Celery', 'Incident Response', 'AWS EKS'],
    ownedServices: [
      { id: 'notification-service', name: 'Notification Service', status: 'healthy' }
    ],
    contributions: [
      { prNumber: '#940', title: 'Add batch email template compilation with Jinja2 caching', repo: 'notification-service', date: 'Mar 11, 2026', additions: 210, deletions: 35 },
      { prNumber: '#892', title: 'Terraform modules for Redis Cluster auto-scaling on AWS ElastiCache', repo: 'infrastructure', date: 'Mar 01, 2026', additions: 520, deletions: 80 }
    ],
    documents: [
      { id: 'doc-incident-runbook', title: 'Production Incident Response & Postmortem Runbook', type: 'Runbook', date: 'Mar 14, 2026' }
    ],
    activity: [
      { id: 'act-kp1', type: 'incident_resolved', title: 'Resolved production canary latency spike in auth-service', timestamp: '4 days ago', repoOrChannel: 'infrastructure' }
    ]
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Principal Infrastructure Architect',
    team: 'Edge & Network Infrastructure',
    department: 'Engineering → Infrastructure',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    email: 'marcus.vance@company.dev',
    timezone: 'UTC-8 (PST)',
    location: 'Seattle, USA',
    expertise: ['Rust', 'Envoy Proxy', 'WebAssembly', 'Cloudflare Workers', 'TLS & Network Security', 'gRPC Offloading'],
    ownedServices: [
      { id: 'api-gateway', name: 'Global API Gateway & Edge Proxy', status: 'healthy' }
    ],
    contributions: [
      { prNumber: '#812', title: 'Implement Rust WASM JWT validator filter for edge token offloading', repo: 'api-gateway', date: 'Mar 04, 2026', additions: 940, deletions: 110 }
    ],
    documents: [
      { id: 'adr-018', title: 'ADR-018: Rust-based WASM Filters for Edge Gateway Auth Offloading', type: 'Architecture Decision', date: 'Feb 10, 2026' }
    ],
    activity: [
      { id: 'act-mv1', type: 'deployment', title: 'Deployed Envoy API Gateway v5.2.0', timestamp: '5 days ago', repoOrChannel: 'api-gateway' }
    ]
  }
];

export const MOCK_GRAPH_NODES: GraphNode[] = [
  // Services
  { id: 'auth-service', label: 'auth-service', type: 'service', subtitle: 'Authentication & Session Engine', badge: 'Tier 1', tags: ['TypeScript', 'Node.js', 'Auth'], group: 1 },
  { id: 'payment-service', label: 'payment-service', type: 'service', subtitle: 'Payment & Billing Orchestrator', badge: 'Tier 1', tags: ['Go', 'gRPC', 'Stripe'], group: 1 },
  { id: 'user-service', label: 'user-service', type: 'service', subtitle: 'User Directory & RBAC', badge: 'Tier 1', tags: ['TypeScript', 'Fastify'], group: 1 },
  { id: 'order-service', label: 'order-service', type: 'service', subtitle: 'Checkout & Fulfillment Engine', badge: 'Tier 1', tags: ['Java', 'Spring Boot'], group: 1 },
  { id: 'notification-service', label: 'notification-service', type: 'service', subtitle: 'Push, SMS & Email Alerts', badge: 'Tier 2', tags: ['Python', 'FastAPI'], group: 1 },
  { id: 'api-gateway', label: 'api-gateway', type: 'service', subtitle: 'Edge Routing & Envoy Proxy', badge: 'Tier 1', tags: ['Rust', 'Envoy'], group: 1 },
  { id: 'analytics-service', label: 'analytics-service', type: 'service', subtitle: 'Telemetry & Stream Analytics', badge: 'Tier 2', tags: ['ClickHouse', 'Python'], group: 1 },

  // People
  { id: 'rahul-sharma', label: 'Rahul Sharma', type: 'person', subtitle: 'Senior Backend Engineer', badge: 'Platform', tags: ['Auth', 'Redis', 'Node.js'], group: 2 },
  { id: 'ananya-rao', label: 'Ananya Rao', type: 'person', subtitle: 'Staff Platform Engineer', badge: 'Core Infra', tags: ['Go', 'Kafka', 'Payments'], group: 2 },
  { id: 'arjun-mehta', label: 'Arjun Mehta', type: 'person', subtitle: 'Senior Fullstack Engineer', badge: 'Product', tags: ['React', 'TypeScript', 'Fastify'], group: 2 },
  { id: 'priya-nair', label: 'Priya Nair', type: 'person', subtitle: 'Lead Data & Search Architect', badge: 'Data/AI', tags: ['ClickHouse', 'Search'], group: 2 },
  { id: 'karan-patel', label: 'Karan Patel', type: 'person', subtitle: 'SRE & Platform Lead', badge: 'Reliability', tags: ['Kubernetes', 'Terraform'], group: 2 },
  { id: 'marcus-vance', label: 'Marcus Vance', type: 'person', subtitle: 'Principal Infra Architect', badge: 'Edge/Net', tags: ['Rust', 'Envoy'], group: 2 },

  // Technologies / Infrastructure
  { id: 'redis', label: 'Redis Cluster', type: 'tech', subtitle: 'Session Cache & Rate Limiter', badge: 'In-Memory', tags: ['Caching', 'ElastiCache'], group: 3 },
  { id: 'postgresql', label: 'PostgreSQL DB', type: 'tech', subtitle: 'Primary ACID Relational DB', badge: 'Database', tags: ['SQL', 'Storage'], group: 3 },
  { id: 'kafka', label: 'Apache Kafka', type: 'tech', subtitle: 'Distributed Event Streaming', badge: 'Broker', tags: ['Streaming', 'Events'], group: 3 },
  { id: 'clickhouse', label: 'ClickHouse OLAP', type: 'tech', subtitle: 'Columnar Analytics Engine', badge: 'Database', tags: ['OLAP', 'BigData'], group: 3 },
  { id: 'session-manager', label: 'Session Manager', type: 'tech', subtitle: 'Token & Session State Layer', badge: 'Module', tags: ['Auth', 'Security'], group: 3 },

  // Repositories
  { id: 'repo-auth-service', label: 'company/auth-service', type: 'repo', subtitle: 'Main auth codebase', badge: 'Repo', tags: ['Git', 'TypeScript'], group: 4 },
  { id: 'repo-payment-service', label: 'company/payment-service', type: 'repo', subtitle: 'Payment processing codebase', badge: 'Repo', tags: ['Git', 'Go'], group: 4 },
  { id: 'repo-architecture', label: 'company/architecture', type: 'repo', subtitle: 'ADRs and system design RFCs', badge: 'Repo', tags: ['Docs', 'Markdown'], group: 4 },

  // Documents & ADRs
  { id: 'adr-024', label: 'ADR-024: Redis Session Storage', type: 'decision', subtitle: 'Approved Architecture Decision', badge: 'ADR', tags: ['Redis', 'Auth'], group: 5 },
  { id: 'adr-028', label: 'ADR-028: Event-Driven Payments', type: 'decision', subtitle: 'Approved Architecture Decision', badge: 'ADR', tags: ['Kafka', 'Payments'], group: 5 },
  { id: 'adr-008', label: 'ADR-008: PostgreSQL Adoption', type: 'decision', subtitle: 'Relational Ledger Standard', badge: 'ADR', tags: ['Postgres', 'SQL'], group: 5 },
  { id: 'doc-auth-arch', label: 'Auth Architecture Spec', type: 'document', subtitle: 'Confluence Technical Design', badge: 'Confluence', tags: ['Security', 'OIDC'], group: 5 },
  { id: 'inc-402', label: 'INC-402: Payment Latency Spike', type: 'incident', subtitle: 'Resolved P0 Incident Postmortem', badge: 'Incident', tags: ['Latency', 'Webhook'], group: 5 },

  // PRs
  { id: 'pr-1842', label: 'PR #1842: Redis Session Cache', type: 'pr', subtitle: 'auth-service · Merged', badge: 'Merged', tags: ['Redis', 'Auth'], group: 6 },
  { id: 'pr-1817', label: 'PR #1817: Auth Perf Optimization', type: 'pr', subtitle: 'auth-service · Merged', badge: 'Merged', tags: ['Pooling', 'Perf'], group: 6 },
  { id: 'pr-1904', label: 'PR #1904: Kafka Payment Stream', type: 'pr', subtitle: 'payment-service · Merged', badge: 'Merged', tags: ['Kafka', 'Events'], group: 6 },
  { id: 'pr-1791', label: 'PR #1791: JWT Validation Revamp', type: 'pr', subtitle: 'auth-service · Merged', badge: 'Merged', tags: ['JWT', 'Security'], group: 6 }
];

export const MOCK_GRAPH_EDGES: GraphEdge[] = [
  // People Ownership
  { id: 'e1', source: 'rahul-sharma', target: 'auth-service', label: 'OWNS', description: 'Rahul Sharma is primary owner of auth-service' },
  { id: 'e2', source: 'ananya-rao', target: 'payment-service', label: 'OWNS', description: 'Ananya Rao owns payment-service' },
  { id: 'e3', source: 'arjun-mehta', target: 'user-service', label: 'OWNS', description: 'Arjun Mehta owns user-service' },
  { id: 'e4', source: 'priya-nair', target: 'analytics-service', label: 'OWNS', description: 'Priya Nair leads analytics data platform' },
  { id: 'e5', source: 'karan-patel', target: 'notification-service', label: 'OWNS', description: 'Karan Patel manages notification systems' },
  { id: 'e6', source: 'marcus-vance', target: 'api-gateway', label: 'OWNS', description: 'Marcus Vance leads edge gateway architecture' },

  // Service Dependencies
  { id: 'e7', source: 'api-gateway', target: 'auth-service', label: 'DEPENDS_ON', description: 'API Gateway verifies tokens against auth-service' },
  { id: 'e8', source: 'api-gateway', target: 'user-service', label: 'DEPENDS_ON', description: 'API Gateway routes user requests' },
  { id: 'e9', source: 'api-gateway', target: 'payment-service', label: 'DEPENDS_ON', description: 'API Gateway routes payment requests' },
  { id: 'e10', source: 'auth-service', target: 'redis', label: 'DEPENDS_ON', description: 'Fast session lookups & token caching' },
  { id: 'e11', source: 'auth-service', target: 'postgresql', label: 'DEPENDS_ON', description: 'Persistent user credentials & audit logs' },
  { id: 'e12', source: 'auth-service', target: 'user-service', label: 'DEPENDS_ON', description: 'Fetches user profiles & roles' },
  { id: 'e13', source: 'auth-service', target: 'session-manager', label: 'IMPLEMENTS', description: 'Implements in-memory session invalidation layer' },
  { id: 'e14', source: 'payment-service', target: 'kafka', label: 'DEPENDS_ON', description: 'Publishes payment.completed and payment.failed events' },
  { id: 'e15', source: 'payment-service', target: 'postgresql', label: 'DEPENDS_ON', description: 'Strict ACID ledger database' },
  { id: 'e16', source: 'order-service', target: 'payment-service', label: 'DEPENDS_ON', description: 'Calls payment checkout orchestrator' },
  { id: 'e17', source: 'order-service', target: 'kafka', label: 'DEPENDS_ON', description: 'Consumes order and payment streams' },
  { id: 'e18', source: 'analytics-service', target: 'clickhouse', label: 'DEPENDS_ON', description: 'Streams events into ClickHouse OLAP' },
  { id: 'e19', source: 'analytics-service', target: 'kafka', label: 'DEPENDS_ON', description: 'Consumes all system-wide telemetry topics' },

  // ADR & Documentation Links
  { id: 'e20', source: 'auth-service', target: 'adr-024', label: 'DOCUMENTED_BY', description: 'Redis session storage design documented in ADR-024' },
  { id: 'e21', source: 'auth-service', target: 'doc-auth-arch', label: 'DOCUMENTED_BY', description: 'System design detailed in Confluence architecture doc' },
  { id: 'e22', source: 'payment-service', target: 'adr-028', label: 'DOCUMENTED_BY', description: 'Event-driven payment architecture specified in ADR-028' },
  { id: 'e23', source: 'postgresql', target: 'adr-008', label: 'DOCUMENTED_BY', description: 'Relational DB standard documented in ADR-008' },
  { id: 'e24', source: 'payment-service', target: 'inc-402', label: 'CAUSED_BY', description: 'Webhook throttle incident INC-402 occurred during traffic surge' },

  // PR Contributions
  { id: 'e25', source: 'rahul-sharma', target: 'pr-1842', label: 'CONTRIBUTED_TO', description: 'Authored PR #1842' },
  { id: 'e26', source: 'pr-1842', target: 'auth-service', label: 'RELATED_TO', description: 'PR applied to auth-service' },
  { id: 'e27', source: 'pr-1842', target: 'redis', label: 'IMPLEMENTS', description: 'Integrates Redis caching' },
  { id: 'e28', source: 'rahul-sharma', target: 'pr-1817', label: 'CONTRIBUTED_TO', description: 'Authored PR #1817' },
  { id: 'e29', source: 'ananya-rao', target: 'pr-1904', label: 'CONTRIBUTED_TO', description: 'Authored PR #1904' },
  { id: 'e30', source: 'pr-1904', target: 'payment-service', label: 'RELATED_TO', description: 'Refactors payment-service to Kafka' },
  { id: 'e31', source: 'ananya-rao', target: 'pr-1791', label: 'CONTRIBUTED_TO', description: 'Implemented JWT claims verification' },
  { id: 'e32', source: 'pr-1791', target: 'auth-service', label: 'RELATED_TO', description: 'Updated auth-service middleware' }
];

export const MOCK_EVIDENCE_SOURCES: Record<string, EvidenceSource> = {
  'pr-1842': {
    id: 'pr-1842',
    type: 'github_pr',
    title: 'Add Redis-backed session cache with TTL sliding window (#1842)',
    author: 'Rahul Sharma',
    authorRole: 'Senior Backend Engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: 'Mar 14, 2026',
    repoOrChannel: 'github.com/company/auth-service',
    snippet: 'Introduces Redis caching for authentication sessions to reduce database reads on Postgres from 18.5k QPS to <400 QPS. Implements 24-hour TTL sliding window and cluster failover hooks.',
    fullContent: `## Summary of Changes
- Introduced \`RedisSessionStore\` adapter implementing \`ISessionManager\`.
- Set session cache TTL to 86,400s (24h) with 15-minute sliding window extension on active token exchange.
- Added circuit-breaker fallback to read-replica Postgres if Redis cluster node election occurs.
- Benchmarks: Reduced auth endpoint P99 latency from 142ms down to 14ms under 20k concurrent users.

### Reviewers
- @ananya-rao (Approved)
- @marcus-vance (Approved)`,
    relevanceScore: 98,
    url: 'https://github.com/company/auth-service/pull/1842',
    tags: ['Redis', 'Auth', 'Performance', 'Cache']
  },
  'adr-024': {
    id: 'adr-024',
    type: 'adr',
    title: 'ADR-024: Authentication Session Storage and In-Memory Caching',
    author: 'Rahul Sharma',
    authorRole: 'Senior Backend Engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: 'Mar 12, 2026',
    repoOrChannel: 'github.com/company/architecture/adr-024.md',
    snippet: 'Context: PostgreSQL primary DB was saturating CPU (89%) during peak login hours due to repetitive session validation queries. Decision: Adopt AWS ElastiCache for Redis (Cluster mode enabled).',
    fullContent: `# ADR-024: Authentication Session Storage and In-Memory Caching

## Status
**ACCEPTED** (Mar 12, 2026)

## Context
During Q1 2026 load testing, the \`auth-service\` exhibited elevated latency (P99 > 180ms) when verifying sessions for downstream requests. Direct queries to the \`user_sessions\` table in PostgreSQL caused high CPU utilization on the primary database cluster.

## Decision
We decided to adopt **AWS ElastiCache for Redis** with cluster mode enabled across 3 availability zones:
1. Active session tokens are stored in Redis as hash structures with a 24-hour TTL.
2. Invalidation broadcasts are published via Redis Pub/Sub to clear edge gateway caches instantly.
3. PostgreSQL remains the system of record for audit trails and long-term credentials.

## Consequences
- **Positive:** P99 authentication latency reduced by 90% (from 142ms to 14ms).
- **Positive:** PostgreSQL CPU utilization dropped from 89% to 19%.
- **Negative:** Added Redis infrastructure operational overhead managed by SRE team via Terraform.`,
    relevanceScore: 95,
    url: 'https://github.com/company/architecture/blob/main/adr/adr-024.md',
    tags: ['Architecture', 'ADR', 'Redis', 'Session']
  },
  'doc-auth-arch': {
    id: 'doc-auth-arch',
    type: 'confluence',
    title: 'Authentication Service Architecture & Threat Model',
    author: 'Rahul Sharma & Security Team',
    authorRole: 'Platform Identity',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: 'Mar 15, 2026',
    repoOrChannel: 'Confluence · Engineering / Platform Identity',
    snippet: 'Comprehensive specification of the auth-service token signing pipeline, asymmetric RSA key rotation, multi-region Redis session cache architecture, and OAuth2 OIDC endpoints.',
    fullContent: `# Authentication Service Architecture Spec 2026

## 1. Executive Summary
The Authentication Service (\`auth-service\`) is the single source of truth for identity authentication, JSON Web Token (JWT) issuance, and session lifecycle management across web, mobile, and API consumers.

## 2. Key Components
- **Token Issuer:** Signs RS256 JWT tokens using asymmetric private keys rotated every 30 days via AWS KMS.
- **Session Cache:** High-availability Redis Cluster storing opaque refresh tokens, IP allowlists, and device fingerprints.
- **Identity Resolver:** Queries \`user-service\` for profile metadata and permission scopes.`,
    relevanceScore: 92,
    url: 'https://wiki.internal/spaces/ENG/pages/84210/auth-architecture',
    tags: ['Architecture', 'Docs', 'Security', 'OIDC']
  },
  'slack-backend-redis': {
    id: 'slack-backend-redis',
    type: 'slack',
    title: '#backend — Discussion on Redis Session Storage & Cluster Failover',
    author: 'Rahul Sharma, Ananya Rao, Karan Patel',
    authorRole: 'Engineering Team',
    date: 'Mar 11, 2026',
    repoOrChannel: '#backend-architecture',
    snippet: 'Rahul Sharma: "Benchmarking Redis vs Memcached for auth session cache. Redis hash structures give us O(1) field updates for session TTL refresh..."',
    fullContent: `**#backend-architecture** (March 11, 2026)

**Rahul Sharma** (10:14 AM):
Hey @platform-team, we finished load testing the new Redis session cache on staging. Query latency dropped from 140ms (Postgres) down to 1.8ms (Redis ElastiCache). PR #1842 is ready for review.

**Ananya Rao** (10:22 AM):
Awesome results Rahul! How does the failover behave if a Redis primary node restarts? Does it fallback gracefully to Postgres?

**Rahul Sharma** (10:26 AM):
Yes, we wrapped the Redis client in an exponential circuit breaker. If Redis throws a timeout, it falls back to the Postgres read-replica and emits a high-priority Datadog metric.

**Karan Patel** (10:31 AM):
I have configured Terraform to provision 3 replicas across us-east-1a, 1b, and 1c for high availability.`,
    relevanceScore: 89,
    url: 'https://company.slack.com/archives/C048BACKEND/p1710168420',
    tags: ['Slack', 'Discussion', 'Redis', 'Session']
  }
};

export const MOCK_AI_RESPONSES: Record<string, AIQueryResponse> = {
  'redis': {
    query: 'Why was Redis introduced in the authentication service?',
    normalizedQuery: 'Why was Redis introduced in the authentication service?',
    reasoningSteps: [
      { step: 1, title: 'Analyzing query intent', detail: 'Identified technical decision inquiry regarding Redis integration within auth-service.', completed: true },
      { step: 2, title: 'Searching 24,000+ engineering entities', detail: 'Matched GitHub PR #1842, ADR-024, Confluence architecture spec, and Slack discussions.', completed: true },
      { step: 3, title: 'Traversing knowledge graph relationships', detail: 'Connected auth-service → Redis Cluster → Session Manager → Rahul Sharma → PostgreSQL.', completed: true },
      { step: 4, title: 'Gathering & verifying evidence', detail: 'Extracted performance benchmarks, latency reduction metrics, and architectural rationale from 4 verified sources.', completed: true },
      { step: 5, title: 'Synthesizing verified answer', detail: 'Generated grounded response citing specific PRs, ADRs, and team ownership.', completed: true }
    ],
    answer: `Redis was introduced in the **auth-service** to eliminate repeated database lookups on PostgreSQL during user authentication and provide sub-millisecond access to active session and token-related data.

The decision was formalized in **ADR-024** and implemented in **PR #1842** by **Rahul Sharma** during the authentication performance optimization initiative in March 2026.

### Key Drivers for the Architecture Change:
1. **Database Load Reduction:** Direct session validation queries against the PostgreSQL primary database were saturating CPU utilization (spiking to 89% at 18,500 QPS). Offloading sessions to Redis reduced database load to under 19%.
2. **Sub-Millisecond Latency:** P99 authentication response latency dropped from **142ms down to 14ms**, providing instantaneous token verification for upstream services like the **api-gateway** and **user-service**.
3. **Sliding Window Session Management:** Implemented automatic 24-hour TTL sliding windows with instant cross-region invalidation via Redis Pub/Sub.`,
    highlightedEntities: [
      { name: 'Redis', type: 'tech', id: 'redis' },
      { name: 'auth-service', type: 'service', id: 'auth-service' },
      { name: 'session management', type: 'tech', id: 'session-manager' },
      { name: 'performance optimization', type: 'tech' },
      { name: 'Rahul Sharma', type: 'person', id: 'rahul-sharma' },
      { name: 'ADR-024', type: 'decision', id: 'adr-024' },
      { name: 'PostgreSQL', type: 'tech', id: 'postgresql' },
      { name: 'api-gateway', type: 'service', id: 'api-gateway' }
    ],
    evidence: [
      MOCK_EVIDENCE_SOURCES['pr-1842'],
      MOCK_EVIDENCE_SOURCES['adr-024'],
      MOCK_EVIDENCE_SOURCES['doc-auth-arch'],
      MOCK_EVIDENCE_SOURCES['slack-backend-redis']
    ],
    relatedEntities: {
      connectedChain: [
        { id: 'auth-service', name: 'AUTH-SERVICE', type: 'service', relationship: 'hosts' },
        { id: 'redis', name: 'Redis Cluster', type: 'tech', relationship: 'caches session data for' },
        { id: 'session-manager', name: 'Session Manager', type: 'tech', relationship: 'manages tokens in' },
        { id: 'user-service', name: 'User Service', type: 'service', relationship: 'validates profiles with' },
        { id: 'api-gateway', name: 'API Gateway', type: 'service', relationship: 'authenticates via' }
      ],
      people: [
        { id: 'rahul-sharma', name: 'Rahul Sharma', role: 'Backend Owner · Senior Backend Engineer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', team: 'Platform Identity', owns: ['auth-service'] },
        { id: 'ananya-rao', name: 'Ananya Rao', role: 'Platform Engineer · Staff Platform Engineer', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', team: 'Core Infrastructure', owns: ['payment-service'] }
      ],
      repositories: [
        { id: 'repo-auth-service', name: 'company/auth-service', description: 'Core authentication & session microservice', language: 'TypeScript', stars: 48 },
        { id: 'repo-architecture', name: 'company/architecture', description: 'Architecture Decision Records (ADRs) & RFCs', language: 'Markdown', stars: 112 }
      ],
      prs: [
        { id: 'pr-1842', number: '#1842', title: 'Add Redis-backed session cache with TTL sliding window', status: 'merged', repo: 'auth-service', author: 'Rahul Sharma' },
        { id: 'pr-1817', number: '#1817', title: 'Authentication performance optimization & connection pooling', status: 'merged', repo: 'auth-service', author: 'Rahul Sharma' }
      ],
      decisions: [
        { id: 'adr-024', title: 'ADR-024: Authentication Session Storage and In-Memory Caching', status: 'Accepted', date: 'Mar 12, 2026' }
      ]
    },
    graphSubnodes: ['auth-service', 'redis', 'session-manager', 'user-service', 'api-gateway', 'rahul-sharma', 'pr-1842', 'adr-024']
  },

  'payment-owner': {
    query: 'Who owns the payment service?',
    normalizedQuery: 'Who owns the payment service?',
    reasoningSteps: [
      { step: 1, title: 'Analyzing ownership query', detail: 'Identified service catalog ownership inquiry for payment-service.', completed: true },
      { step: 2, title: 'Searching service registry & CODEOWNERS', detail: 'Scanned github.com/company/payment-service CODEOWNERS and OpsGenie on-call schedules.', completed: true },
      { step: 3, title: 'Traversing team relationships', detail: 'Linked payment-service → Core Payments & Ledger Team → Ananya Rao (Primary) & Elena Rostova (Secondary).', completed: true },
      { step: 4, title: 'Gathering recent contribution evidence', detail: 'Found PR #1904, ADR-028, and deployment sign-offs authored by Ananya Rao.', completed: true },
      { step: 5, title: 'Synthesizing ownership profile', detail: 'Compiled primary owner, secondary maintainer, team hierarchy, and contact endpoints.', completed: true }
    ],
    answer: `The **payment-service** is owned by **Ananya Rao** (Staff Platform Engineer) and the **Core Payments & Ledger Team** within Platform Infrastructure.

### Team & Ownership Details:
* **Primary Tech Lead & Owner:** **Ananya Rao** (\`ananya.rao@company.dev\`, Timezone: IST / UTC+5:30)
* **Secondary Maintainer & On-Call:** **Elena Rostova** (Principal Systems Engineer)
* **Team:** **Core Payments & Ledger**
* **Slack Channel:** \`#team-payments\` and \`#payment-alerts\`
* **Service Tier:** **Tier 1 Mission-Critical** (SLO: 99.999%, P99: 118ms)

Ananya recently led the architectural overhaul in **ADR-028** and **PR #1904** to migrate synchronous checkout billing to an asynchronous, idempotent **Apache Kafka** event stream.`,
    highlightedEntities: [
      { name: 'payment-service', type: 'service', id: 'payment-service' },
      { name: 'Ananya Rao', type: 'person', id: 'ananya-rao' },
      { name: 'Elena Rostova', type: 'person' },
      { name: 'Core Payments & Ledger', type: 'service' },
      { name: 'Apache Kafka', type: 'tech', id: 'kafka' },
      { name: 'ADR-028', type: 'decision', id: 'adr-028' }
    ],
    evidence: [
      {
        id: 'codeowners-payment',
        type: 'github_pr',
        title: 'payment-service / CODEOWNERS & Team Registry',
        author: 'Platform Governance',
        authorRole: 'Infrastructure Ops',
        date: 'Updated Mar 18, 2026',
        repoOrChannel: 'github.com/company/payment-service/CODEOWNERS',
        snippet: '* @company/team-payments @ananya-rao\n/ledger/* @ananya-rao @elena-rostova\n/integrations/stripe/* @ananya-rao',
        relevanceScore: 99,
        url: 'https://github.com/company/payment-service/blob/main/CODEOWNERS'
      },
      {
        id: 'adr-028',
        type: 'adr',
        title: 'ADR-028: Move Payments to Event-Driven Processing with Kafka',
        author: 'Ananya Rao',
        authorRole: 'Staff Platform Engineer',
        date: 'Mar 18, 2026',
        repoOrChannel: 'github.com/company/architecture/adr-028.md',
        snippet: 'Author: Ananya Rao (Core Payments Lead). Decision: Decouple direct synchronous HTTP checkout dependencies by publishing payment initiation events to Kafka.',
        relevanceScore: 94,
        url: 'https://github.com/company/architecture/blob/main/adr/adr-028.md'
      }
    ],
    relatedEntities: {
      connectedChain: [
        { id: 'payment-service', name: 'PAYMENT-SERVICE', type: 'service', relationship: 'owned by' },
        { id: 'ananya-rao', name: 'Ananya Rao', type: 'person', relationship: 'leads' },
        { id: 'kafka', name: 'Apache Kafka', type: 'tech', relationship: 'powers event stream for' },
        { id: 'order-service', name: 'Order Service', type: 'service', relationship: 'dispatches checkouts to' },
        { id: 'postgresql', name: 'PostgreSQL Ledger', type: 'tech', relationship: 'stores ACID records for' }
      ],
      people: [
        { id: 'ananya-rao', name: 'Ananya Rao', role: 'Primary Owner · Staff Platform Engineer', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', team: 'Core Payments & Ledger', owns: ['payment-service'] }
      ],
      repositories: [
        { id: 'repo-payment-service', name: 'company/payment-service', description: 'Core payment processing & ledger engine in Go', language: 'Go', stars: 64 }
      ],
      prs: [
        { id: 'pr-1904', number: '#1904', title: 'Migrate synchronous checkout billing to Kafka event-driven stream', status: 'merged', repo: 'payment-service', author: 'Ananya Rao' },
        { id: 'pr-1856', number: '#1856', title: 'Payment API webhook retry backoff algorithm upgrade', status: 'merged', repo: 'payment-service', author: 'Ananya Rao' }
      ]
    },
    graphSubnodes: ['payment-service', 'ananya-rao', 'kafka', 'order-service', 'postgresql', 'adr-028', 'pr-1904']
  },

  'jwt': {
    query: 'Where is the JWT validation implemented?',
    normalizedQuery: 'Where is the JWT validation implemented?',
    reasoningSteps: [
      { step: 1, title: 'Searching codebase symbol index', detail: 'Scanned repository trees for jwtValidator, verifyJwtToken, and auth_filter symbols.', completed: true },
      { step: 2, title: 'Analyzing multi-tier implementation', detail: 'Found two validation layers: edge proxy offloading and service-level claims verification.', completed: true },
      { step: 3, title: 'Extracting source references', detail: 'Located auth-service/src/middleware/jwtValidator.ts and api-gateway/plugins/auth_filter.rs.', completed: true },
      { step: 4, title: 'Synthesizing implementation guide', detail: 'Mapped algorithm details, asymmetric public key retrieval, and code snippets.', completed: true }
    ],
    answer: `JWT validation is implemented in two distinct layers across the organization:

### 1. Service-Level Claims Verification (\`auth-service\`)
The primary application logic resides in:
📁 \`auth-service/src/middleware/jwtValidator.ts\` (implemented in **PR #1791**).

* **Algorithm:** Asymmetric **RS256** (RSA Signature with SHA-256).
* **Key Strategy:** Public JSON Web Key Set (JWKS) cached in memory with a 60-minute TTL, retrieved from \`https://auth.internal/.well-known/jwks.json\`.
* **Checks Performed:** Expiration (\`exp\`), Issuer (\`iss\`), Audience (\`aud\`), Subject UUID (\`sub\`), and Workspace Permissions (\`org_permissions\`).

### 2. Edge Offloading at the API Gateway (\`api-gateway\`)
For high-throughput edge filtering before requests hit internal microservices:
📁 \`api-gateway/src/plugins/auth_filter.rs\` (implemented by **Marcus Vance** in **ADR-018** & **PR #812**).
* Uses compiled WebAssembly (Rust WASM) to validate token headers and signatures in <0.3ms at the network edge.`,
    highlightedEntities: [
      { name: 'auth-service', type: 'service', id: 'auth-service' },
      { name: 'api-gateway', type: 'service', id: 'api-gateway' },
      { name: 'JWT Validation', type: 'tech' },
      { name: 'Rahul Sharma', type: 'person', id: 'rahul-sharma' },
      { name: 'Marcus Vance', type: 'person', id: 'marcus-vance' },
      { name: 'ADR-018', type: 'decision' }
    ],
    evidence: [
      {
        id: 'code-jwt-validator',
        type: 'github_pr',
        title: 'auth-service / src / middleware / jwtValidator.ts',
        author: 'Rahul Sharma & Ananya Rao',
        authorRole: 'Platform Identity',
        date: 'Feb 14, 2026',
        repoOrChannel: 'github.com/company/auth-service',
        snippet: 'export async function validateJwtToken(req: Request, res: Response, next: NextFunction) {\n  const token = extractBearerToken(req.headers.authorization);\n  const verified = await jwtVerify(token, jwksClient.getSigningKey());\n  req.user = verified.payload;\n  next();\n}',
        relevanceScore: 99,
        url: 'https://github.com/company/auth-service/blob/main/src/middleware/jwtValidator.ts'
      },
      {
        id: 'code-wasm-filter',
        type: 'github_pr',
        title: 'api-gateway / plugins / auth_filter.rs (WASM Edge Filter)',
        author: 'Marcus Vance',
        authorRole: 'Edge Infrastructure',
        date: 'Mar 04, 2026',
        repoOrChannel: 'github.com/company/api-gateway',
        snippet: 'pub fn on_http_request_headers(&mut self, _num_headers: usize) -> Action {\n  let auth_header = self.get_http_request_header("Authorization");\n  if let Some(token) = parse_bearer(auth_header) {\n    match verify_rs256_wasm(token) { ... }\n  }\n}',
        relevanceScore: 95,
        url: 'https://github.com/company/api-gateway/blob/main/plugins/auth_filter.rs'
      }
    ],
    relatedEntities: {
      connectedChain: [
        { id: 'api-gateway', name: 'API Gateway (Edge)', type: 'service', relationship: 'validates WASM token at edge' },
        { id: 'auth-service', name: 'AUTH-SERVICE', type: 'service', relationship: 'verifies claims & RBAC in' },
        { id: 'user-service', name: 'User Service', type: 'service', relationship: 'consumes user context from' }
      ],
      people: [
        { id: 'rahul-sharma', name: 'Rahul Sharma', role: 'Senior Backend Engineer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', team: 'Platform Identity' },
        { id: 'marcus-vance', name: 'Marcus Vance', role: 'Principal Infra Architect', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', team: 'Edge & Network Infrastructure' }
      ],
      repositories: [
        { id: 'repo-auth-service', name: 'company/auth-service', description: 'Authentication middleware & JWKS provider', language: 'TypeScript' },
        { id: 'repo-api-gateway', name: 'company/api-gateway', description: 'Rust Envoy edge proxy', language: 'Rust' }
      ],
      prs: [
        { id: 'pr-1791', number: '#1791', title: 'Revamp JWT validation middleware & add claims verification', status: 'merged', repo: 'auth-service', author: 'Ananya Rao' },
        { id: 'pr-812', number: '#812', title: 'Implement Rust WASM JWT validator filter for edge token offloading', status: 'merged', repo: 'api-gateway', author: 'Marcus Vance' }
      ]
    },
    graphSubnodes: ['auth-service', 'api-gateway', 'rahul-sharma', 'marcus-vance', 'pr-1791', 'pr-1842']
  },

  'auth-dependencies': {
    query: 'What depends on auth-service?',
    normalizedQuery: 'What depends on auth-service?',
    reasoningSteps: [
      { step: 1, title: 'Querying dependency graph', detail: 'Analyzed upstream service call topology and service mesh telemetry.', completed: true },
      { step: 2, title: 'Evaluating inbound RPCs and API calls', detail: 'Mapped api-gateway, order-service, user-service, and notification-service traffic flows.', completed: true },
      { step: 3, title: 'Calculating traffic distribution', detail: 'Aggregated 18.5k QPS total inbound volume.', completed: true },
      { step: 4, title: 'Synthesizing dependency topology', detail: 'Constructed directional dependency graph with critical path indicators.', completed: true }
    ],
    answer: `The **auth-service** is a core Tier-1 foundational identity provider. **5 major services and gateways** directly depend on it:

### 1. Direct Upstream Ingress Callers
* **\`api-gateway\` (Global Ingress):** Every external HTTPS request entering the platform routes through Envoy to validate session cookies or verify bearer tokens. Accounts for **~14,000 QPS (75% of auth traffic)**.
* **\`user-service\`:** Calls \`auth-service\` during organization onboarding, user impersonation sessions, and password resets (**~2,200 QPS**).
* **\`order-service\`:** Validates merchant checkout permissions and customer scopes during transaction creation (**~1,800 QPS**).
* **\`notification-service\`:** Verifies recipient security preferences and authorized broadcast scopes (**~500 QPS**).

### Downstream Infrastructure Dependencies (What auth-service depends on):
* **Redis Cluster:** High-speed in-memory session cache & token blacklist.
* **PostgreSQL Primary:** Relational credentials database and security audit log.`,
    highlightedEntities: [
      { name: 'auth-service', type: 'service', id: 'auth-service' },
      { name: 'api-gateway', type: 'service', id: 'api-gateway' },
      { name: 'user-service', type: 'service', id: 'user-service' },
      { name: 'order-service', type: 'service', id: 'order-service' },
      { name: 'notification-service', type: 'service', id: 'notification-service' },
      { name: 'Redis', type: 'tech', id: 'redis' },
      { name: 'PostgreSQL', type: 'tech', id: 'postgresql' }
    ],
    evidence: [
      MOCK_EVIDENCE_SOURCES['doc-auth-arch'],
      MOCK_EVIDENCE_SOURCES['pr-1842']
    ],
    relatedEntities: {
      connectedChain: [
        { id: 'api-gateway', name: 'API Gateway', type: 'service', relationship: 'routes all auth to' },
        { id: 'order-service', name: 'Order Service', type: 'service', relationship: 'verifies buyer identity with' },
        { id: 'user-service', name: 'User Service', type: 'service', relationship: 'delegates auth to' },
        { id: 'auth-service', name: 'AUTH-SERVICE (Core Hub)', type: 'service', relationship: 'processes tokens for' }
      ],
      people: [
        { id: 'rahul-sharma', name: 'Rahul Sharma', role: 'Auth Owner', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', team: 'Platform Identity' },
        { id: 'marcus-vance', name: 'Marcus Vance', role: 'Gateway Lead', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', team: 'Edge Infrastructure' }
      ],
      repositories: [
        { id: 'repo-auth-service', name: 'company/auth-service', description: 'Authentication microservice', language: 'TypeScript' }
      ],
      prs: [
        { id: 'pr-1842', number: '#1842', title: 'Add Redis-backed session cache with TTL sliding window', status: 'merged', repo: 'auth-service', author: 'Rahul Sharma' }
      ]
    },
    graphSubnodes: ['auth-service', 'api-gateway', 'user-service', 'order-service', 'notification-service', 'redis', 'postgresql']
  },

  'deployment-failure': {
    query: 'What caused the latest deployment failure?',
    normalizedQuery: 'What caused the latest deployment failure?',
    reasoningSteps: [
      { step: 1, title: 'Searching incident postmortems & CI/CD logs', detail: 'Scanned Datadog incident database and GitHub Actions release pipelines.', completed: true },
      { step: 2, title: 'Identifying root cause event', detail: 'Located Incident INC-402 during auth-service v2.8.0 canary rollout on March 20.', completed: true },
      { step: 3, title: 'Correlating infrastructure metrics', detail: 'Identified Redis connection pool exhaustion causing container health check timeouts.', completed: true },
      { step: 4, title: 'Synthesizing postmortem report', detail: 'Summarized timeline, mitigation hotfix PR #1849, and permanent safeguards.', completed: true }
    ],
    answer: `The latest production deployment failure was **Incident INC-402** on **March 20, 2026**, during the canary rollout of **auth-service v2.8.0**.

### Root Cause Analysis:
During the rolling update, the new pods initialized with default max connection pool limits (\`poolSize: 20\`), whereas traffic was concentrated on the 10% canary pods. Under sudden peak login traffic (18.5k QPS), the Redis connection pool became instantly exhausted.

* **Impact:** 1.2% of authentication requests experienced timeouts (>2000ms) for an 8-minute window.
* **Automated Rollback:** Kubernetes liveness probes failed after 3 consecutive health check timeouts, triggering automatic rollback to \`v2.7.9\`.
* **Mitigation:**
  1. **Hotfix PR #1849** increased Redis connection pool dynamic limits to \`poolSize: 150\` with lazy connection initialization.
  2. SRE lead **Karan Patel** updated Terraform configs for Redis ElastiCache max clients parameter group.
  3. Deployed verified release **v2.8.2** with zero errors.`,
    highlightedEntities: [
      { name: 'auth-service', type: 'service', id: 'auth-service' },
      { name: 'Incident INC-402', type: 'incident', id: 'inc-402' },
      { name: 'Redis', type: 'tech', id: 'redis' },
      { name: 'Karan Patel', type: 'person', id: 'karan-patel' },
      { name: 'Rahul Sharma', type: 'person', id: 'rahul-sharma' }
    ],
    evidence: [
      {
        id: 'incident-postmortem-402',
        type: 'jira',
        title: 'INC-402 Postmortem: Auth Service Canary Redis Pool Exhaustion',
        author: 'Karan Patel & Rahul Sharma',
        authorRole: 'SRE & Platform Identity',
        date: 'Mar 20, 2026',
        repoOrChannel: 'Jira / INCIDENTS-402',
        snippet: 'Severity: P1 · Duration: 8 mins · Root Cause: Redis connection pool starvation on canary containers due to static poolSize=20 limit under high burst load.',
        relevanceScore: 99,
        url: 'https://jira.internal/browse/INC-402'
      },
      MOCK_EVIDENCE_SOURCES['pr-1842']
    ],
    relatedEntities: {
      connectedChain: [
        { id: 'inc-402', name: 'INC-402 Postmortem', type: 'incident', relationship: 'occurred in' },
        { id: 'auth-service', name: 'AUTH-SERVICE v2.8.0', type: 'service', relationship: 'exhausted connections to' },
        { id: 'redis', name: 'Redis ElastiCache', type: 'tech', relationship: 'pool limit hit' }
      ],
      people: [
        { id: 'karan-patel', name: 'Karan Patel', role: 'SRE Incident Commander', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', team: 'Reliability Engineering' },
        { id: 'rahul-sharma', name: 'Rahul Sharma', role: 'Service Owner', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', team: 'Platform Identity' }
      ],
      repositories: [
        { id: 'repo-auth-service', name: 'company/auth-service', description: 'Authentication service', language: 'TypeScript' }
      ],
      prs: [
        { id: 'pr-1849', number: '#1849', title: 'Fix Redis connection pool sizing and dynamic allocation', status: 'merged', repo: 'auth-service', author: 'Rahul Sharma' }
      ]
    },
    graphSubnodes: ['auth-service', 'inc-402', 'redis', 'karan-patel', 'rahul-sharma']
  },

  'postgres-mongo': {
    query: 'Why did we choose PostgreSQL instead of MongoDB?',
    normalizedQuery: 'Why did we choose PostgreSQL instead of MongoDB?',
    reasoningSteps: [
      { step: 1, title: 'Searching Architecture Decision Records', detail: 'Identified ADR-008: Database Standard Selection (PostgreSQL vs Document Stores).', completed: true },
      { step: 2, title: 'Analyzing transactional ledger requirements', detail: 'Reviewed ACID compliance, financial balance consistency, and JSONB benchmarks.', completed: true },
      { step: 3, title: 'Extracting team consensus and tradeoffs', detail: 'Synthesized RFC comments from Arjun Mehta, Ananya Rao, and Architecture Council.', completed: true },
      { step: 4, title: 'Synthesizing decision rationale', detail: 'Compiled structural benefits, JSONB flexibility, and long-term tooling stability.', completed: true }
    ],
    answer: `The engineering organization standardized on **PostgreSQL** over **MongoDB** as the primary relational database according to **ADR-008** (authored by **Arjun Mehta** and the Architecture Council).

### Key Reasons for Choosing PostgreSQL:
1. **Strict ACID Guarantees for Ledger & Payments:** Financial billing, subscription states, and payment ledgers in **payment-service** require strict serializable transaction isolation to prevent double-spending and balance drift.
2. **Relational Integrity with Foreign Keys:** Multi-tenant workspace hierarchies, role-based access controls (RBAC), and team memberships in **user-service** benefit heavily from normalized schemas and enforced foreign key constraints.
3. **JSONB Hybrid Flexibility:** For semi-structured data (e.g. audit logs, notification payloads, and custom metadata), PostgreSQL's binary JSON (\`JSONB\`) with GIN indexing matches document database flexibility without sacrificing transactional integrity.
4. **Rich Ecosystem & Tooling:** Battle-tested tooling for connection pooling (PgBouncer), read-replica scaling on AWS Aurora, and point-in-time disaster recovery.`,
    highlightedEntities: [
      { name: 'PostgreSQL', type: 'tech', id: 'postgresql' },
      { name: 'ADR-008', type: 'decision', id: 'adr-008' },
      { name: 'payment-service', type: 'service', id: 'payment-service' },
      { name: 'user-service', type: 'service', id: 'user-service' },
      { name: 'Arjun Mehta', type: 'person', id: 'arjun-mehta' }
    ],
    evidence: [
      {
        id: 'adr-008',
        type: 'adr',
        title: 'ADR-008: PostgreSQL Adoption as Core Relational Store',
        author: 'Arjun Mehta & Architecture Council',
        authorRole: 'Product Engineering',
        date: 'Jan 10, 2025',
        repoOrChannel: 'github.com/company/architecture/adr-008.md',
        snippet: 'Decision: Adopt PostgreSQL on AWS Aurora as the primary database standard. Rationale: Strict ACID guarantees for billing ledger and JSONB support for flexible document storage.',
        relevanceScore: 97,
        url: 'https://github.com/company/architecture/blob/main/adr/adr-008.md'
      }
    ],
    relatedEntities: {
      connectedChain: [
        { id: 'postgresql', name: 'PostgreSQL (Aurora)', type: 'tech', relationship: 'primary datastore for' },
        { id: 'payment-service', name: 'Payment Service', type: 'service', relationship: 'stores ACID ledger in' },
        { id: 'user-service', name: 'User Service', type: 'service', relationship: 'stores user relations in' },
        { id: 'auth-service', name: 'Auth Service', type: 'service', relationship: 'stores credentials in' }
      ],
      people: [
        { id: 'arjun-mehta', name: 'Arjun Mehta', role: 'Senior Fullstack Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', team: 'User Core & Workspaces' }
      ],
      repositories: [
        { id: 'repo-architecture', name: 'company/architecture', description: 'Architecture decisions', language: 'Markdown' }
      ],
      prs: []
    },
    graphSubnodes: ['postgresql', 'adr-008', 'payment-service', 'user-service', 'auth-service', 'arjun-mehta']
  }
};

export const MOCK_SEARCH_RESULTS: Record<string, SearchResultItem[]> = {
  'redis': [
    {
      id: 'res-pr-1842',
      type: 'pr',
      title: 'Add Redis-backed session cache with TTL sliding window',
      source: 'GitHub Pull Request · auth-service',
      author: 'Rahul Sharma',
      date: 'Mar 14, 2026',
      snippet: 'Introduces Redis caching for authentication sessions to reduce database reads on Postgres from 18.5k QPS to <400 QPS. Implements 24-hour TTL sliding window and cluster failover hooks.',
      relatedEntities: ['Redis', 'Auth Service', 'Session Manager', 'Rahul Sharma'],
      url: 'https://github.com/company/auth-service/pull/1842',
      badge: 'Merged #1842'
    },
    {
      id: 'res-adr-024',
      type: 'decision',
      title: 'ADR-024: Authentication Session Storage and In-Memory Caching',
      source: 'Architecture Decision · company/architecture',
      author: 'Rahul Sharma',
      date: 'Mar 12, 2026',
      snippet: 'Context: PostgreSQL primary DB was saturating CPU (89%) during peak login hours due to repetitive session validation queries. Decision: Adopt AWS ElastiCache for Redis (Cluster mode enabled).',
      relatedEntities: ['ADR-024', 'Redis', 'PostgreSQL', 'Auth Service'],
      url: 'https://github.com/company/architecture/blob/main/adr/adr-024.md',
      badge: 'Accepted ADR'
    },
    {
      id: 'res-doc-arch',
      type: 'doc',
      title: 'Authentication Service Architecture & Threat Model',
      source: 'Confluence · Engineering / Platform Identity',
      author: 'Rahul Sharma & Security Team',
      date: 'Mar 15, 2026',
      snippet: 'Comprehensive specification of the auth-service token signing pipeline, asymmetric RSA key rotation, multi-region Redis session cache architecture, and OAuth2 OIDC endpoints.',
      relatedEntities: ['Auth Service', 'Redis', 'OAuth2', 'JWT'],
      url: 'https://wiki.internal/spaces/ENG/pages/84210/auth-architecture',
      badge: 'Confluence Doc'
    },
    {
      id: 'res-code-session',
      type: 'code',
      title: 'src / cache / RedisSessionStore.ts',
      source: 'Code · auth-service (TypeScript)',
      author: 'Rahul Sharma',
      date: 'Mar 14, 2026',
      snippet: 'Implementation of the distributed session caching layer with automatic reconnect backoff and Redis cluster pipeline execution.',
      codeSnippet: {
        filepath: 'src/cache/RedisSessionStore.ts',
        language: 'typescript',
        lineStart: 42,
        code: `export class RedisSessionStore implements ISessionStore {
  private client: RedisCluster;

  async getSession(sessionId: string): Promise<UserSession | null> {
    const raw = await this.client.get(\`session:\${sessionId}\`);
    if (!raw) return null;
    await this.client.expire(\`session:\${sessionId}\`, 86400); // 24h sliding window
    return JSON.parse(raw);
  }
}`
      },
      relatedEntities: ['Redis', 'auth-service', 'TypeScript'],
      url: 'https://github.com/company/auth-service/blob/main/src/cache/RedisSessionStore.ts'
    }
  ]
};

export const MOCK_SOURCES: SourceIntegration[] = [
  {
    id: 'github',
    name: 'GitHub Enterprise',
    type: 'github',
    icon: 'github',
    status: 'connected',
    indexedItemsCount: 142,
    indexedUnits: 'repositories indexed',
    lastSynced: '2 minutes ago',
    health: 'optimal',
    description: 'Code repositories, pull requests, issues, commits, commit history, and CODEOWNERS files indexed across all organizations.',
    details: [
      { label: 'Indexed Repositories', value: '142' },
      { label: 'Indexed Pull Requests', value: '14,890' },
      { label: 'Code Files Indexed', value: '284,500' },
      { label: 'Sync Frequency', value: 'Real-time Webhooks' }
    ]
  },
  {
    id: 'jira',
    name: 'Jira Software',
    type: 'jira',
    icon: 'trello',
    status: 'connected',
    indexedItemsCount: 3421,
    indexedUnits: 'issues & sprints indexed',
    lastSynced: '8 minutes ago',
    health: 'optimal',
    description: 'Engineering tickets, bug reports, epic roadmaps, sprint backlogs, and postmortem action items.',
    details: [
      { label: 'Indexed Projects', value: '18 boards' },
      { label: 'Open Issues Tracked', value: '842' },
      { label: 'Resolved Tickets', value: '2,579' },
      { label: 'Sync Frequency', value: 'Every 15 mins' }
    ]
  },
  {
    id: 'slack',
    name: 'Slack Enterprise Grid',
    type: 'slack',
    icon: 'message-square',
    status: 'connected',
    indexedItemsCount: 18240,
    indexedUnits: 'engineering messages indexed',
    lastSynced: 'Just now',
    health: 'optimal',
    description: 'Technical architecture discussions, on-call incident triage threads, and engineering channels.',
    details: [
      { label: 'Monitored Channels', value: '42 public channels' },
      { label: 'Incident Channels', value: '#incidents-prod, #oncall-eng' },
      { label: 'Sync Frequency', value: 'Real-time Webhooks' }
    ]
  },
  {
    id: 'confluence',
    name: 'Confluence Wiki',
    type: 'confluence',
    icon: 'file-text',
    status: 'connected',
    indexedItemsCount: 842,
    indexedUnits: 'documents & RFCs indexed',
    lastSynced: '1 hour ago',
    health: 'optimal',
    description: 'System design documents, technical RFCs, security threat models, and engineering runbooks.',
    details: [
      { label: 'Indexed Spaces', value: '8 Spaces' },
      { label: 'Technical Specs', value: '380' },
      { label: 'On-Call Runbooks', value: '94' },
      { label: 'Sync Frequency', value: 'Hourly' }
    ]
  },
  {
    id: 'adrs',
    name: 'Architecture Decisions (ADRs)',
    type: 'adrs',
    icon: 'git-branch',
    status: 'connected',
    indexedItemsCount: 48,
    indexedUnits: 'formal ADR records indexed',
    lastSynced: '4 hours ago',
    health: 'optimal',
    description: 'Version-controlled Architecture Decision Records tracking technical standards, technology adoptions, and deprecations.',
    details: [
      { label: 'Accepted Decisions', value: '42' },
      { label: 'Proposed Decisions', value: '4' },
      { label: 'Deprecated Decisions', value: '2' },
      { label: 'Repository', value: 'company/architecture' }
    ]
  },
  {
    id: 'cicd',
    name: 'CI/CD & Observability',
    type: 'cicd',
    icon: 'activity',
    status: 'connected',
    indexedItemsCount: 1230,
    indexedUnits: 'deployments & alerts indexed',
    lastSynced: '5 minutes ago',
    health: 'optimal',
    description: 'GitHub Actions deployment pipelines, Kubernetes cluster events, and Datadog incident monitors.',
    details: [
      { label: 'Deployment Environments', value: 'prod-us, prod-eu, staging' },
      { label: 'Monitored Services', value: '42 Services' },
      { label: 'Active Alerts', value: '1 Warning (payment latency)' }
    ]
  }
];

export const MOCK_ACTIVITY_FEED: ActivityItem[] = [
  {
    id: 'act-feed-1',
    type: 'pr',
    title: 'Merged PR #1842: Add Redis-backed session cache with TTL sliding window',
    description: 'Reduced auth database queries by 94% with multi-region cluster support.',
    person: {
      name: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Senior Backend Engineer'
    },
    target: 'auth-service · PR #1842',
    timestamp: '10 mins ago',
    badge: 'PR Merged',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    linkRoute: '/services/auth-service'
  },
  {
    id: 'act-feed-2',
    type: 'decision',
    title: 'Approved ADR-028: Event-Driven Payments Architecture with Apache Kafka',
    description: 'Decoupled checkout processing to achieve zero-data-loss transactions.',
    person: {
      name: 'Ananya Rao',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Staff Platform Engineer'
    },
    target: 'company/architecture · ADR-028',
    timestamp: '2 hours ago',
    badge: 'Architecture Decision',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    linkRoute: '/services/payment-service'
  },
  {
    id: 'act-feed-3',
    type: 'incident',
    title: 'INC-402: Payment API latency spike during flash checkout event',
    description: 'Resolved: Webhook retry backoff tuned and connection pool limit resized.',
    person: {
      name: 'Karan Patel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'SRE & Platform Lead'
    },
    target: 'payment-service · Incident Postmortem',
    timestamp: '5 hours ago',
    badge: 'Incident Resolved',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    linkRoute: '/services/payment-service'
  },
  {
    id: 'act-feed-4',
    type: 'doc',
    title: 'Authentication Service Architecture & Threat Model 2026',
    description: 'Published updated security spec covering asymmetric RSA key rotation and JWKS.',
    person: {
      name: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Senior Backend Engineer'
    },
    target: 'Confluence · Engineering Docs',
    timestamp: '1 day ago',
    badge: 'Documentation',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    linkRoute: '/services/auth-service'
  },
  {
    id: 'act-feed-5',
    type: 'deployment',
    title: 'user-service v2.8.1 deployed to prod-us-east-1',
    description: 'Added row-level tenant security isolation and batch membership queries.',
    person: {
      name: 'Arjun Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Senior Fullstack Engineer'
    },
    target: 'user-service · Kubernetes EKS',
    timestamp: '1 day ago',
    badge: 'Deployment',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    linkRoute: '/services/user-service'
  }
];

export const EXAMPLE_QUESTIONS = [
  "Why was Redis introduced in the authentication service?",
  "Who owns the payment service?",
  "Where is the JWT validation implemented?",
  "What services depend on the user-service?",
  "Why did we choose PostgreSQL instead of MongoDB?",
  "What caused the latest deployment failure?"
];

/**
 * Intelligent helper to resolve queries to the best mock answer or generate a smart, highly sensible domain response
 */
export function getAIAnswerForQuery(query: string): AIQueryResponse {
  const q = query.toLowerCase().trim();

  // 1. Direct key matchers
  if (q.includes('redis') || (q.includes('auth') && (q.includes('why') || q.includes('session')))) {
    return { ...MOCK_AI_RESPONSES['redis'], query };
  }
  if (q.includes('payment') && (q.includes('who') || q.includes('own') || q.includes('lead') || q.includes('maintain'))) {
    return { ...MOCK_AI_RESPONSES['payment-owner'], query };
  }
  if (q.includes('jwt') || q.includes('token') || q.includes('validation') || q.includes('rsa') || q.includes('jwks')) {
    return { ...MOCK_AI_RESPONSES['jwt'], query };
  }
  if (q.includes('depend') || (q.includes('user-service') && q.includes('service')) || q.includes('upstream') || q.includes('downstream')) {
    return { ...MOCK_AI_RESPONSES['auth-dependencies'], query };
  }
  if (q.includes('deploy') || q.includes('failure') || q.includes('incident') || q.includes('inc-402') || q.includes('crash') || q.includes('down')) {
    return { ...MOCK_AI_RESPONSES['deployment-failure'], query };
  }
  if (q.includes('postgres') || q.includes('mongo') || q.includes('database') || q.includes('sql') || q.includes('db')) {
    return { ...MOCK_AI_RESPONSES['postgres-mongo'], query };
  }
  if (q.includes('kafka') || q.includes('event') || q.includes('stream') || q.includes('message queue') || q.includes('broker')) {
    return { ...MOCK_AI_RESPONSES['kafka'], query };
  }
  if (q.includes('gateway') || q.includes('envoy') || q.includes('marcus') || q.includes('wasm') || q.includes('proxy')) {
    return { ...MOCK_AI_RESPONSES['api-gateway'], query };
  }
  if (q.includes('rahul') || (q.includes('who is') && q.includes('sharma'))) {
    return { ...MOCK_AI_RESPONSES['rahul-sharma'], query };
  }
  if (q.includes('ananya')) {
    return { ...MOCK_AI_RESPONSES['payment-owner'], query };
  }

  // 2. Intelligent dynamic synthesis for custom queries
  let matchedService = 'auth-service';
  let matchedOwner = 'Rahul Sharma';
  let matchedTeam = 'Platform Identity';
  let matchedTech = 'TypeScript & Node.js';
  let rationale = 'Ensures zero-downtime reliability and strict compliance with Tier-1 SLO benchmarks.';

  if (q.includes('payment') || q.includes('billing') || q.includes('stripe') || q.includes('checkout')) {
    matchedService = 'payment-service';
    matchedOwner = 'Ananya Rao';
    matchedTeam = 'Core Payments & Ledger';
    matchedTech = 'Go 1.22, gRPC & Kafka';
    rationale = 'Decouples synchronous checkout requests with distributed idempotency locks.';
  } else if (q.includes('user') || q.includes('profile') || q.includes('rbac') || q.includes('workspace')) {
    matchedService = 'user-service';
    matchedOwner = 'Arjun Mehta';
    matchedTeam = 'User Core & Workspaces';
    matchedTech = 'TypeScript, Fastify & PostgreSQL';
    rationale = 'Provides multi-tenant workspace isolation and enforced foreign-key referential integrity.';
  } else if (q.includes('sre') || q.includes('k8s') || q.includes('kubernetes') || q.includes('terraform') || q.includes('alert')) {
    matchedService = 'infrastructure-core';
    matchedOwner = 'Karan Patel';
    matchedTeam = 'Reliability & SRE';
    matchedTech = 'Kubernetes EKS, Terraform & Prometheus';
    rationale = 'Manages automated multi-region failovers, canary rollout thresholds, and cluster autoscaling.';
  } else if (q.includes('data') || q.includes('analytics') || q.includes('telemetry') || q.includes('clickhouse')) {
    matchedService = 'analytics-service';
    matchedOwner = 'Priya Nair';
    matchedTeam = 'Data Platform';
    matchedTech = 'ClickHouse, Kafka & Python';
    rationale = 'Powers sub-second OLAP aggregations across millions of platform events per hour.';
  }

  return {
    query,
    normalizedQuery: query,
    reasoningSteps: [
      { step: 1, title: 'Parsing engineering question intent', detail: `Analyzed query "${query}" across entity catalogs and architecture decision records.`, completed: true },
      { step: 2, title: 'Knowledge Graph Traversal', detail: `Traversed relationships connecting ${matchedService} → ${matchedOwner} → ${matchedTeam}.`, completed: true },
      { step: 3, title: 'Vector similarity search in Qdrant', detail: `Identified 4 top-ranking evidence documents with high cosine proximity.`, completed: true },
      { step: 4, title: 'Synthesizing verified engineering context', detail: `Constructed grounded response with verified service metadata and owner endpoints.`, completed: true }
    ],
    answer: `Here is the architectural and engineering context for **"${query}"**:

### Core System Context:
* **Primary Service Domain:** **\`${matchedService}\`** (maintained by **${matchedTeam}**).
* **Engineering Lead & Domain Expert:** **${matchedOwner}** (accessible via internal Slack and GitHub PR reviews).
* **Technology Stack:** **${matchedTech}**.

### Architecture & Standard:
${rationale}

All modifications to this component adhere to our standardized Architecture Decision Records (ADRs) with automated CI/CD pipeline validation in GitHub Actions and Prometheus SLO tracking.

You can explore the interactive dependency topology on the **Knowledge Graph** tab or review supporting evidence below.`,
    highlightedEntities: [
      { name: matchedService, type: 'service', id: matchedService },
      { name: matchedOwner, type: 'person', id: matchedOwner.toLowerCase().replace(' ', '-') },
      { name: matchedTeam, type: 'service' },
      { name: matchedTech.split(',')[0], type: 'tech' }
    ],
    evidence: [
      MOCK_EVIDENCE_SOURCES['doc-auth-arch'],
      MOCK_EVIDENCE_SOURCES['pr-1842'],
      MOCK_EVIDENCE_SOURCES['adr-024']
    ],
    relatedEntities: {
      connectedChain: [
        { id: matchedService, name: matchedService.toUpperCase(), type: 'service', relationship: 'maintained by' },
        { id: matchedOwner.toLowerCase().replace(' ', '-'), name: matchedOwner, type: 'person', relationship: 'leads' },
        { id: 'api-gateway', name: 'API Gateway', type: 'service', relationship: 'routes traffic to' }
      ],
      people: [
        { id: matchedOwner.toLowerCase().replace(' ', '-'), name: matchedOwner, role: `Lead Engineer · ${matchedTeam}`, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', team: matchedTeam, owns: [matchedService] }
      ],
      repositories: [
        { id: `repo-${matchedService}`, name: `company/${matchedService}`, description: `Core implementation for ${matchedService}`, language: matchedTech.split(' ')[0] }
      ],
      prs: [
        { id: 'pr-1842', number: '#1842', title: 'Add Redis-backed session cache with TTL sliding window', status: 'merged', repo: matchedService, author: matchedOwner }
      ]
    },
    graphSubnodes: [matchedService, matchedOwner.toLowerCase().replace(' ', '-'), 'api-gateway', 'adr-024']
  };
}
