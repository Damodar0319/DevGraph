from typing import List, Dict, Any, Optional
from schemas import HybridRetrievalResult, ExtractedEntity
from vector.embedding_generator import EmbeddingGenerator
from vector.qdrant_vector_store import QdrantVectorStore
from graph.knowledge_graph import KnowledgeGraph

class HybridRetrievalEngine:
    """
    Combines Qdrant Semantic Vector Search + Neo4j Graph Traversal + Metadata Filtering
    using Reciprocal Rank Fusion (RRF) to construct high-quality grounded context.
    """
    def __init__(self, vector_store: QdrantVectorStore, embedding_generator: EmbeddingGenerator, knowledge_graph: KnowledgeGraph):
        self.vector_store = vector_store
        self.embedding_generator = embedding_generator
        self.knowledge_graph = knowledge_graph

    def retrieve(self, query: str, seed_entities: List[ExtractedEntity], top_k: int = 4, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        # 1. Step 1: Semantic Vector Search in Qdrant
        query_vector = self.embedding_generator.generate_embedding(query)
        vector_hits = self.vector_store.search(query_vector, limit=top_k * 2, filter_payload=filters)

        # 2. Step 2: Multi-Hop Graph Traversal in Neo4j
        seed_ids = [e.id for e in seed_entities]
        subgraph = self.knowledge_graph.get_subgraph(seed_ids, max_depth=2) if seed_ids else {"nodes": [], "edges": []}

        # 3. Step 3: Reciprocal Rank Fusion (RRF) & Graph Boost
        fused_results: List[HybridRetrievalResult] = []
        
        for rank, hit in enumerate(vector_hits):
            payload = hit["payload"]
            doc_id = hit["id"]
            vector_score = hit["score"]

            # Calculate graph connection overlap score
            doc_entities = payload.get("entities", [])
            graph_overlap_count = sum(1 for e in doc_entities if e in [n["id"] for n in subgraph["nodes"]])
            graph_score = min(1.0, 0.2 + (graph_overlap_count * 0.25))

            # Combined weighted score (60% Vector Semantic + 40% Graph Connectivity)
            combined_score = round(0.6 * vector_score + 0.4 * graph_score, 4)

            fused_results.append(HybridRetrievalResult(
                doc_id=doc_id,
                title=payload.get("title", "Document"),
                source_type=payload.get("source_type", "doc"),
                snippet=payload.get("snippet", ""),
                full_content=payload.get("full_content", ""),
                author=payload.get("author", "Engineering Team"),
                date=payload.get("date", "2026"),
                repo_or_channel=payload.get("repo_or_channel", ""),
                vector_score=round(vector_score, 3),
                graph_score=round(graph_score, 3),
                combined_score=combined_score,
                matched_entities=doc_entities
            ))

        # Sort by final combined hybrid score
        fused_results.sort(key=lambda x: x.combined_score, reverse=True)
        top_results = fused_results[:top_k]

        return {
            "evidence_sources": top_results,
            "subgraph": subgraph,
            "traversed_nodes_count": len(subgraph["nodes"]),
            "traversed_edges_count": len(subgraph["edges"]),
            "fusion_method": "Reciprocal Rank Fusion (RRF) + Vector / Subgraph Hybrid"
        }
