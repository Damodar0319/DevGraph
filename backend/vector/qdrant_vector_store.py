import math
from typing import List, Dict, Any, Optional
from schemas import VectorPoint

class QdrantVectorStore:
    """
    Qdrant-compatible Vector Database storing dense vectors with cosine similarity indexing
    and metadata payload filtering.
    """
    def __init__(self, collection_name: str = "engineering_knowledge", dimension: int = 64):
        self.collection_name = collection_name
        self.dimension = dimension
        self.points: Dict[str, VectorPoint] = {}

    def upsert(self, points: List[VectorPoint]) -> None:
        for pt in points:
            self.points[pt.id] = pt

    def search(self, query_vector: List[float], limit: int = 5, filter_payload: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        results = []

        for pt_id, pt in self.points.items():
            # Check payload filter if supplied
            if filter_payload:
                match = True
                for k, v in filter_payload.items():
                    if pt.payload.get(k) != v:
                        match = False
                        break
                if not match:
                    continue

            score = self._cosine_similarity(query_vector, pt.vector)
            results.append({
                "id": pt.id,
                "score": score,
                "payload": pt.payload
            })

        # Sort by similarity score descending
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:limit]

    def _cosine_similarity(self, v1: List[float], v2: List[float]) -> float:
        dot = sum(a * b for a, b in zip(v1, v2))
        norm1 = math.sqrt(sum(a * a for a in v1))
        norm2 = math.sqrt(sum(b * b for b in v2))
        if norm1 == 0 or norm2 == 0:
            return 0.0
        return dot / (norm1 * norm2)

    def count(self) -> int:
        return len(self.points)
