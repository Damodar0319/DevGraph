from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from enum import Enum

class EntityType(str, Enum):
    SERVICE = "service"
    PERSON = "person"
    REPO = "repo"
    DOCUMENT = "document"
    PR = "pr"
    ISSUE = "issue"
    DECISION = "decision"
    TECH = "tech"
    INCIDENT = "incident"

class RelationshipType(str, Enum):
    OWNS = "OWNS"
    DEPENDS_ON = "DEPENDS_ON"
    CONTRIBUTED_TO = "CONTRIBUTED_TO"
    DOCUMENTED_BY = "DOCUMENTED_BY"
    DISCUSSED_IN = "DISCUSSED_IN"
    IMPLEMENTS = "IMPLEMENTS"
    CAUSED_BY = "CAUSED_BY"
    RELATED_TO = "RELATED_TO"
    CALLS = "CALLS"
    AUTHORED = "AUTHORED"

class ExtractedEntity(BaseModel):
    id: str
    name: str
    type: EntityType
    canonical_name: str
    aliases: List[str] = Field(default_factory=list)
    confidence: float = 0.95
    metadata: Dict[str, Any] = Field(default_factory=dict)

class ExtractedRelationship(BaseModel):
    id: str
    source_entity_id: str
    target_entity_id: str
    relation_type: RelationshipType
    context: str
    confidence: float = 0.92
    metadata: Dict[str, Any] = Field(default_factory=dict)

class UnifiedKnowledgeObject(BaseModel):
    doc_id: str
    title: str
    source_type: str  # pdf, docx, txt, pptx, github_pr, adr, confluence, slack
    raw_text: str
    cleaned_text: str
    entities: List[ExtractedEntity] = Field(default_factory=list)
    relationships: List[ExtractedRelationship] = Field(default_factory=list)
    visual_objects: List[Dict[str, Any]] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    provenance: Dict[str, Any] = Field(default_factory=dict)
    timestamp: str

class GraphNode(BaseModel):
    id: str
    label: str
    type: EntityType
    subtitle: Optional[str] = None
    badge: Optional[str] = None
    properties: Dict[str, Any] = Field(default_factory=dict)
    tags: List[str] = Field(default_factory=list)

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    label: RelationshipType
    description: Optional[str] = None
    weight: float = 1.0

class VectorPoint(BaseModel):
    id: str
    vector: List[float]
    payload: Dict[str, Any] = Field(default_factory=dict)

class HybridRetrievalResult(BaseModel):
    doc_id: str
    title: str
    source_type: str
    snippet: str
    full_content: Optional[str] = None
    author: Optional[str] = None
    date: Optional[str] = None
    repo_or_channel: Optional[str] = None
    vector_score: float = 0.0
    graph_score: float = 0.0
    combined_score: float = 0.0
    matched_entities: List[str] = Field(default_factory=list)

class ReasoningStep(BaseModel):
    step: int
    title: str
    detail: str
    completed: bool = True
    stage: str = "retrieval"

class QueryRequest(BaseModel):
    query: str
    top_k: int = 4
    filters: Optional[Dict[str, Any]] = None

class QueryResponse(BaseModel):
    query: str
    reasoning_steps: List[ReasoningStep]
    answer: str
    highlighted_entities: List[Dict[str, Any]]
    evidence: List[Dict[str, Any]]
    subgraph: Dict[str, Any]
    retrieval_stats: Dict[str, Any]

class IngestDocumentRequest(BaseModel):
    title: str
    content: str
    source_type: str = "document"  # "pdf", "docx", "adr", "pr", "doc", "slide"
    author: str = "Engineering Team"
    repo_or_channel: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class IngestRepoRequest(BaseModel):
    repo_url: str

class PipelineStats(BaseModel):
    total_documents: int
    total_nodes: int
    total_edges: int
    total_vectors: int
    vector_dimensions: int
    avg_latency_ms: float
    status: str = "operational"

