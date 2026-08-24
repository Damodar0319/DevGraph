export type EntityType = 
  | 'service' 
  | 'person' 
  | 'repo' 
  | 'document' 
  | 'pr' 
  | 'issue' 
  | 'decision' 
  | 'tech' 
  | 'incident';

export type RelationshipType = 
  | 'OWNS' 
  | 'DEPENDS_ON' 
  | 'CONTRIBUTED_TO' 
  | 'DOCUMENTED_BY' 
  | 'DISCUSSED_IN' 
  | 'IMPLEMENTS' 
  | 'CAUSED_BY' 
  | 'RELATED_TO'
  | 'CALLS'
  | 'AUTHORED';

export interface GraphNode {
  id: string;
  label: string;
  type: EntityType;
  subtitle?: string;
  description?: string;
  avatar?: string;
  icon?: string;
  badge?: string;
  properties?: Record<string, any>;
  tags?: string[];
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius?: number;
  group?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: RelationshipType;
  description?: string;
  weight?: number;
}

export interface EvidenceSource {
  id: string;
  type: 'github_pr' | 'adr' | 'confluence' | 'slack' | 'jira' | 'cicd' | 'datadog';
  title: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  date: string;
  repoOrChannel: string;
  snippet: string;
  fullContent?: string;
  relevanceScore: number;
  url?: string;
  tags?: string[];
  relatedEntities?: string[];
}

export interface SearchResultItem {
  id: string;
  type: 'pr' | 'code' | 'doc' | 'decision' | 'issue' | 'service' | 'person';
  title: string;
  source: string;
  author?: string;
  date?: string;
  snippet: string;
  codeSnippet?: {
    code: string;
    language: string;
    filepath: string;
    lineStart: number;
  };
  relatedEntities: string[];
  url?: string;
  badge?: string;
}

export interface AIQueryResponse {
  query: string;
  normalizedQuery: string;
  reasoningSteps: Array<{
    step: number;
    title: string;
    detail: string;
    completed: boolean;
  }>;
  answer: string;
  highlightedEntities: Array<{
    name: string;
    type: EntityType;
    id?: string;
  }>;
  evidence: EvidenceSource[];
  relatedEntities: {
    connectedChain: Array<{
      id: string;
      name: string;
      type: EntityType;
      relationship?: string;
    }>;
    people: Array<{
      id: string;
      name: string;
      role: string;
      avatar: string;
      team: string;
      owns?: string[];
    }>;
    repositories: Array<{
      id: string;
      name: string;
      description: string;
      language: string;
      stars?: number;
    }>;
    prs: Array<{
      id: string;
      number: string;
      title: string;
      status: 'merged' | 'open';
      repo: string;
      author: string;
    }>;
    decisions?: Array<{
      id: string;
      title: string;
      status: string;
      date: string;
    }>;
  };
  graphSubnodes?: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  displayName: string;
  description: string;
  owner: {
    name: string;
    role: string;
    avatar: string;
    email: string;
  };
  team: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  language: string;
  framework: string;
  repository: string;
  status: 'healthy' | 'warning' | 'degraded';
  slo: string;
  latencyP99: string;
  qps: string;
  lastDeployment: {
    version: string;
    timestamp: string;
    author: string;
    status: 'success' | 'failed';
  };
  dependencies: Array<{
    id: string;
    name: string;
    type: 'service' | 'database' | 'queue' | 'gateway';
    relationship: 'upstream' | 'downstream';
    health?: 'healthy' | 'warning' | 'degraded';
  }>;
  techStack: string[];
  prs: Array<{
    number: string;
    title: string;
    author: string;
    date: string;
    status: 'merged' | 'open';
  }>;
  issues: Array<{
    number: string;
    title: string;
    status: 'open' | 'closed';
    priority: string;
  }>;
  docs: Array<{
    title: string;
    type: string;
    url: string;
    lastUpdated: string;
  }>;
  activity: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
    user: string;
  }>;
}

export interface PersonItem {
  id: string;
  name: string;
  role: string;
  team: string;
  department: string;
  avatar: string;
  email: string;
  timezone: string;
  location: string;
  expertise: string[];
  ownedServices: Array<{
    id: string;
    name: string;
    status: 'healthy' | 'warning' | 'degraded';
  }>;
  contributions: Array<{
    prNumber: string;
    title: string;
    repo: string;
    date: string;
    additions?: number;
    deletions?: number;
  }>;
  documents: Array<{
    id: string;
    title: string;
    type: string;
    date: string;
  }>;
  activity: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
    repoOrChannel: string;
  }>;
}

export interface SourceIntegration {
  id: string;
  name: string;
  type: 'github' | 'jira' | 'slack' | 'confluence' | 'gdrive' | 'cicd' | 'adrs';
  icon: string;
  status: 'connected' | 'syncing' | 'paused';
  indexedItemsCount: number;
  indexedUnits: string;
  lastSynced: string;
  health: 'optimal' | 'warning';
  description: string;
  details: Array<{
    label: string;
    value: string;
  }>;
}

export interface ActivityItem {
  id: string;
  type: 'pr' | 'decision' | 'incident' | 'doc' | 'deployment';
  title: string;
  description?: string;
  person: {
    name: string;
    avatar: string;
    role?: string;
  };
  target: string;
  timestamp: string;
  badge: string;
  badgeColor: string;
  linkRoute?: string;
}
