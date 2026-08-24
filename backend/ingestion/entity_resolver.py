import re
from typing import List, Dict, Any, Tuple
from schemas import ExtractedEntity, EntityType

class EntityResolver:
    """
    Detects, normalizes, deduplicates, and resolves entity aliases across engineering text.
    """
    def __init__(self):
        # Known canonical dictionary with alias mappings
        self.canonical_kb = {
            # Services
            "auth-service": {"name": "auth-service", "type": EntityType.SERVICE, "aliases": ["authentication service", "auth microservice", "auth-svc"]},
            "payment-service": {"name": "payment-service", "type": EntityType.SERVICE, "aliases": ["payment service", "payments engine", "billing service"]},
            "user-service": {"name": "user-service", "type": EntityType.SERVICE, "aliases": ["user profile service", "identity service", "user-svc"]},
            "order-service": {"name": "order-service", "type": EntityType.SERVICE, "aliases": ["order fulfillment service", "checkout service"]},
            "notification-service": {"name": "notification-service", "type": EntityType.SERVICE, "aliases": ["notification service", "alerts service", "messaging service"]},
            "api-gateway": {"name": "api-gateway", "type": EntityType.SERVICE, "aliases": ["gateway", "envoy gateway", "edge proxy"]},
            "analytics-service": {"name": "analytics-service", "type": EntityType.SERVICE, "aliases": ["analytics engine", "telemetry service"]},

            # People
            "rahul-sharma": {"name": "Rahul Sharma", "type": EntityType.PERSON, "aliases": ["rahul", "r. sharma", "@rahul-sharma"]},
            "ananya-rao": {"name": "Ananya Rao", "type": EntityType.PERSON, "aliases": ["ananya", "a. rao", "@ananya-rao"]},
            "arjun-mehta": {"name": "Arjun Mehta", "type": EntityType.PERSON, "aliases": ["arjun", "a. mehta", "@arjun-mehta"]},
            "priya-nair": {"name": "Priya Nair", "type": EntityType.PERSON, "aliases": ["priya", "p. nair", "@priya-nair"]},
            "karan-patel": {"name": "Karan Patel", "type": EntityType.PERSON, "aliases": ["karan", "k. patel", "@karan-patel"]},
            "marcus-vance": {"name": "Marcus Vance", "type": EntityType.PERSON, "aliases": ["marcus", "m. vance", "@marcus-vance"]},

            # Technologies
            "redis": {"name": "Redis Cluster", "type": EntityType.TECH, "aliases": ["redis", "elasticache", "redis cache", "redis cluster"]},
            "postgresql": {"name": "PostgreSQL DB", "type": EntityType.TECH, "aliases": ["postgres", "postgresql", "aurora postgres", "psql"]},
            "kafka": {"name": "Apache Kafka", "type": EntityType.TECH, "aliases": ["kafka", "kafka cluster", "event stream"]},
            "clickhouse": {"name": "ClickHouse OLAP", "type": EntityType.TECH, "aliases": ["clickhouse", "clickhouse cluster"]},
            "jwt": {"name": "JWT Validation", "type": EntityType.TECH, "aliases": ["jwt", "json web token", "rs256", "jwks"]},

            # Decisions
            "adr-024": {"name": "ADR-024: Redis Session Storage", "type": EntityType.DECISION, "aliases": ["adr-024", "adr 024", "adr24"]},
            "adr-028": {"name": "ADR-028: Event-Driven Payments", "type": EntityType.DECISION, "aliases": ["adr-028", "adr 028", "adr28"]},
            "adr-008": {"name": "ADR-008: PostgreSQL Adoption", "type": EntityType.DECISION, "aliases": ["adr-008", "adr 008", "adr8"]},

            # Incidents
            "inc-402": {"name": "INC-402: Payment Latency Spike", "type": EntityType.INCIDENT, "aliases": ["inc-402", "incident 402", "incident #402"]}
        }

    def extract_and_resolve(self, text: str) -> List[ExtractedEntity]:
        detected_entities: Dict[str, ExtractedEntity] = {}
        lower_text = text.lower()

        # 1. Search known entities and aliases
        for canonical_id, data in self.canonical_kb.items():
            patterns = [canonical_id] + [data["name"].lower()] + [alias.lower() for alias in data["aliases"]]
            matched = False
            matched_aliases = []
            
            for pat in patterns:
                # Word boundary match
                if re.search(r'\b' + re.escape(pat) + r'\b', lower_text):
                    matched = True
                    matched_aliases.append(pat)

            if matched:
                detected_entities[canonical_id] = ExtractedEntity(
                    id=canonical_id,
                    name=data["name"],
                    type=data["type"],
                    canonical_name=data["name"],
                    aliases=list(set(matched_aliases)),
                    confidence=0.98,
                    metadata={"canonical_id": canonical_id}
                )

        # 2. Extract dynamic PR mentions (#1234 or PR #1234)
        pr_matches = re.finditer(r'(?:PR\s*#?|#)(\d{3,5})\b', text, re.IGNORECASE)
        for match in pr_matches:
            pr_num = match.group(1)
            pr_id = f"pr-{pr_num}"
            if pr_id not in detected_entities:
                detected_entities[pr_id] = ExtractedEntity(
                    id=pr_id,
                    name=f"PR #{pr_num}",
                    type=EntityType.PR,
                    canonical_name=f"Pull Request #{pr_num}",
                    aliases=[f"#{pr_num}", f"PR #{pr_num}"],
                    confidence=0.95,
                    metadata={"pr_number": pr_num}
                )

        return list(detected_entities.values())
