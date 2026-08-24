import re
from typing import List, Dict, Any
from schemas import ExtractedEntity, ExtractedRelationship, RelationshipType, EntityType

class RelationshipExtractor:
    """
    Extracts semantic relationships between entities from engineering documentation,
    code comments, PRs, and architectural decision records.
    """
    def __init__(self):
        pass

    def extract_relationships(self, text: str, entities: List[ExtractedEntity]) -> List[ExtractedRelationship]:
        relationships: List[ExtractedRelationship] = []
        entity_map = {e.id: e for e in entities}
        entity_ids = list(entity_map.keys())

        # Extract pairwise contextual interactions
        for i in range(len(entity_ids)):
            for j in range(len(entity_ids)):
                if i == j:
                    continue
                e1 = entity_map[entity_ids[i]]
                e2 = entity_map[entity_ids[j]]

                rel_type, context, confidence = self._infer_relationship(text, e1, e2)
                if rel_type:
                    rel_id = f"rel-{e1.id}-{rel_type.value}-{e2.id}"
                    # Avoid duplicate edge direction collisions
                    if not any(r.id == rel_id for r in relationships):
                        relationships.append(ExtractedRelationship(
                            id=rel_id,
                            source_entity_id=e1.id,
                            target_entity_id=e2.id,
                            relation_type=rel_type,
                            context=context,
                            confidence=confidence,
                            metadata={"source_name": e1.name, "target_name": e2.name}
                        ))

        return relationships

    def _infer_relationship(self, text: str, e1: ExtractedEntity, e2: ExtractedEntity) -> (RelationshipType, str, float):
        lower_text = text.lower()
        
        # 1. Person owns Service
        if e1.type == EntityType.PERSON and e2.type == EntityType.SERVICE:
            if any(term in lower_text for term in ["own", "lead", "maintain", "author", "authored"]):
                return RelationshipType.OWNS, f"{e1.name} owns and maintains {e2.name}", 0.95

        # 2. Person contributed to PR
        if e1.type == EntityType.PERSON and e2.type == EntityType.PR:
            return RelationshipType.CONTRIBUTED_TO, f"{e1.name} contributed to {e2.name}", 0.96

        # 3. Service depends on Tech or Service
        if e1.type == EntityType.SERVICE and e2.type in [EntityType.TECH, EntityType.SERVICE]:
            if any(term in lower_text for term in ["cache", "store", "database", "depend", "connect", "queue", "calls"]):
                return RelationshipType.DEPENDS_ON, f"{e1.name} depends on {e2.name}", 0.92

        # 4. Service documented by ADR / Document
        if e1.type == EntityType.SERVICE and e2.type in [EntityType.DECISION, EntityType.DOCUMENT]:
            return RelationshipType.DOCUMENTED_BY, f"{e1.name} is documented in {e2.name}", 0.94

        # 5. PR implements Tech / Feature
        if e1.type == EntityType.PR and e2.type in [EntityType.TECH, EntityType.SERVICE]:
            return RelationshipType.IMPLEMENTS, f"{e1.name} implements {e2.name}", 0.91

        # 6. Service or Incident
        if e1.type == EntityType.SERVICE and e2.type == EntityType.INCIDENT:
            return RelationshipType.CAUSED_BY, f"{e1.name} impacted by {e2.name}", 0.93

        return None, "", 0.0
