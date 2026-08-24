import math
import hashlib
from typing import List

class EmbeddingGenerator:
    """
    Generates high-dimensional normalized semantic vector embeddings for documents,
    entities, and search queries.
    """
    def __init__(self, dimension: int = 64):
        self.dimension = dimension

    def generate_embedding(self, text: str) -> List[float]:
        """
        Generates a normalized dense vector of length `self.dimension`.
        Combines character n-gram projections and semantic hashing with L2-normalization.
        """
        if not text:
            return [0.0] * self.dimension

        tokens = text.lower().split()
        vector = [0.0] * self.dimension

        for token in tokens:
            # Token-level hash projection
            h = int(hashlib.md5(token.encode('utf-8')).hexdigest(), 16)
            for d in range(self.dimension):
                weight = ((h >> (d % 32)) & 0xFF) / 255.0 - 0.5
                vector[d] += weight

        # Subword 3-gram feature projection
        for i in range(len(text) - 2):
            gram = text[i:i+3].lower()
            gh = int(hashlib.sha256(gram.encode('utf-8')).hexdigest(), 16)
            idx = gh % self.dimension
            vector[idx] += 0.35

        # L2-normalization
        norm = math.sqrt(sum(v * v for v in vector))
        if norm > 0:
            vector = [v / norm for v in vector]

        return vector
