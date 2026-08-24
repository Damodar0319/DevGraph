import { IKnowledgeSource, AnalysisProgress } from '../../types/knowledge';
import { analyzeGitHubRepository, KubernetesKnowledgeBase } from '../githubService';

export abstract class BaseKnowledgeSource implements IKnowledgeSource {
  abstract id: string;
  abstract name: string;
  abstract type: 'github' | 'documentation' | 'jira' | 'slack';
  isConnected: boolean = false;

  abstract ingest(sourceUrl: string, onProgress?: (progress: AnalysisProgress) => void): Promise<boolean>;
}

export class GitHubSource extends BaseKnowledgeSource {
  id = 'github-source';
  name = 'GitHub Repository Connector';
  type = 'github' as const;
  knowledgeBase: KubernetesKnowledgeBase | null = null;

  async ingest(repoUrl: string, onProgress?: (progress: AnalysisProgress) => void): Promise<boolean> {
    try {
      this.knowledgeBase = await analyzeGitHubRepository(repoUrl, onProgress);
      this.isConnected = true;
      return true;
    } catch (e) {
      console.error('GitHubSource ingestion error:', e);
      this.isConnected = false;
      return false;
    }
  }
}

// Extensible registry for future enterprise knowledge connectors
export class KnowledgeSourceRegistry {
  private sources: Map<string, BaseKnowledgeSource> = new Map();

  constructor() {
    this.register(new GitHubSource());
  }

  register(source: BaseKnowledgeSource) {
    this.sources.set(source.id, source);
  }

  getSource(id: string): BaseKnowledgeSource | undefined {
    return this.sources.get(id);
  }

  getAllSources(): BaseKnowledgeSource[] {
    return Array.from(this.sources.values());
  }
}

export const knowledgeSourceRegistry = new KnowledgeSourceRegistry();
