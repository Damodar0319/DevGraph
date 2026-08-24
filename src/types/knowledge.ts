export type EntityType = 
  | 'repository' 
  | 'file' 
  | 'directory' 
  | 'contributor' 
  | 'commit' 
  | 'pull_request' 
  | 'issue' 
  | 'technology' 
  | 'component' 
  | 'documentation';

export type RelationshipType = 
  | 'CONTAINS' 
  | 'PART_OF' 
  | 'AUTHORED' 
  | 'CONTRIBUTED_TO' 
  | 'MODIFIED' 
  | 'CHANGED_BY' 
  | 'REFERENCES' 
  | 'RELATED_TO' 
  | 'DISCUSSES' 
  | 'DEPENDS_ON' 
  | 'LOCATED_IN' 
  | 'MENTIONED_IN' 
  | 'DOCUMENTED_BY' 
  | 'USES';

export type QueryIntent =
  | 'README_QUERY'
  | 'LICENSE_QUERY'
  | 'GENERAL_REPOSITORY_QUERY'
  | 'CODE_LOCATION_QUERY'
  | 'CODE_EXPLANATION_QUERY'
  | 'ARCHITECTURE_QUERY'
  | 'COMPONENT_QUERY'
  | 'DIRECTORY_QUERY'
  | 'DEPENDENCY_QUERY'
  | 'CONTRIBUTOR_QUERY'
  | 'COMMIT_QUERY'
  | 'PULL_REQUEST_QUERY'
  | 'ISSUE_QUERY'
  | 'CHANGE_HISTORY_QUERY'
  | 'RELATIONSHIP_QUERY'
  | 'BUILD_INSTALL_QUERY'
  | 'CONTRIBUTING_QUERY'
  | 'TESTING_QUERY'
  | 'SECURITY_QUERY'
  | 'NETWORKING_QUERY'
  | 'STORAGE_ETCD_QUERY'
  | 'UNKNOWN_QUERY';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  description: string;
  url?: string;
  path?: string;
  metadata?: Record<string, any>;
  tags?: string[];
}

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  description?: string;
}

export interface EvidenceItem {
  id: string;
  type: 'file' | 'commit' | 'pull_request' | 'issue' | 'doc' | 'contributor';
  title: string;
  source: string;
  path?: string;
  author?: string;
  date?: string;
  snippet: string;
  url: string;
  relevanceScore?: number;
  relevanceExplanation?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: EntityType;
  subtitle?: string;
  url?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: RelationshipType;
  description?: string;
}

export interface DocumentSection {
  title: string;
  level: number;
  content: string;
  raw: string;
}

export interface DebugRetrievalInfo {
  query: string;
  detectedIntent: QueryIntent;
  confidenceScore: number;
  sourcesSearched: string[];
  topEvidence: Array<{ id: string; title: string; score: number; type: string }>;
  entitiesDetected: string[];
  traversalPath: string[];
}

export interface QueryResult {
  query: string;
  intent: QueryIntent;
  answer: string;
  keyTakeaways: string[];
  reasoning: string[];
  evidence: EvidenceItem[];
  relatedEntities: Entity[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  confidence: 'high' | 'medium' | 'low';
  confidenceLabel?: string;
  isInsufficient?: boolean;
  debugInfo?: DebugRetrievalInfo;
}

export interface RepositoryMetadata {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
  language: string;
  topics: string[];
  url: string;
  license?: string;
  lastUpdated: string;
}

export interface AnalysisProgress {
  stage: string;
  step: number;
  totalSteps: number;
  completed: boolean;
  error?: string;
  stats?: {
    filesCount: number;
    componentsCount: number;
    contributorsCount: number;
    commitsCount: number;
    prsCount: number;
    issuesCount: number;
  };
}

export interface IKnowledgeSource {
  id: string;
  name: string;
  type: 'github' | 'documentation' | 'jira' | 'slack';
  isConnected: boolean;
  ingest(repoUrl: string, onProgress?: (progress: AnalysisProgress) => void): Promise<boolean>;
}
