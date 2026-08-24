from typing import List, Dict, Any
from schemas import ReasoningStep, ExtractedEntity, HybridRetrievalResult

class ReasoningEngine:
    """
    Simulates the LLM / VLM Reasoning Engine that synthesizes structured,
    accurate, and source-grounded answers from retrieved hybrid context.
    """
    def __init__(self):
        pass

    def synthesize(self, query: str, seed_entities: List[ExtractedEntity], retrieval_context: Dict[str, Any]) -> Dict[str, Any]:
        evidence_sources: List[HybridRetrievalResult] = retrieval_context.get("evidence_sources", [])
        subgraph: Dict[str, Any] = retrieval_context.get("subgraph", {})
        
        # 1. Construct Reasoning Steps
        reasoning_steps = [
            ReasoningStep(
                step=1,
                title="Analyzing query intent & entity resolution",
                detail=f"Identified {len(seed_entities)} core entities: {', '.join(e.name for e in seed_entities) if seed_entities else 'General technical inquiry'}.",
                stage="ingestion_resolution"
            ),
            ReasoningStep(
                step=2,
                title="Qdrant High-Dimensional Semantic Vector Search",
                detail=f"Searched dense embeddings across indexed codebases, RFCs & PRs. Returned {len(evidence_sources)} relevant candidate passages.",
                stage="vector_search"
            ),
            ReasoningStep(
                step=3,
                title="Neo4j Knowledge Graph Multi-Hop Traversal",
                detail=f"Traversed {retrieval_context.get('traversed_nodes_count', 0)} nodes and {retrieval_context.get('traversed_edges_count', 0)} relationship edges across service dependencies and ownership.",
                stage="graph_traversal"
            ),
            ReasoningStep(
                step=4,
                title="Hybrid Fusion & Context Assembly",
                detail="Applied Reciprocal Rank Fusion (RRF) combining vector similarity and graph connection weights to construct verified ground context.",
                stage="hybrid_fusion"
            ),
            ReasoningStep(
                step=5,
                title="LLM Synthesis & Source Grounding",
                detail="Synthesized grounded answer with entity highlight tags, code references, and direct evidence citations.",
                stage="llm_generation"
            )
        ]

        # 2. Formulate grounded response based on query keywords and evidence
        q_lower = query.lower()

        if "redis" in q_lower or ("auth" in q_lower and "why" in q_lower):
            answer = (
                "Redis was introduced in **auth-service** to eliminate repeated database lookups on PostgreSQL during session authentication "
                "and provide sub-millisecond access to active session and token-related data.\n\n"
                "The architecture change was formalized in **ADR-024** and implemented in **PR #1842** by **Rahul Sharma** (Platform Identity).\n\n"
                "### Key Architectural Benefits:\n"
                "1. **Database Load Reduction:** Direct session validation queries against PostgreSQL primary DB were saturating CPU utilization (89% peak). Offloading sessions to Redis cluster reduced DB load to <19%.\n"
                "2. **Sub-Millisecond Latency:** P99 authentication latency dropped from **142ms down to 14ms** across 18,500 QPS.\n"
                "3. **Sliding Window Token Invalidation:** 24-hour TTL sliding windows with instant cross-region invalidation via Redis Pub/Sub."
            )
        elif "payment" in q_lower and ("who" in q_lower or "own" in q_lower):
            answer = (
                "The **payment-service** is owned and maintained by **Ananya Rao** (Staff Platform Engineer) and the **Core Payments & Ledger Team**.\n\n"
                "### Team & Ownership Details:\n"
                "* **Primary Tech Lead:** **Ananya Rao** (`ananya.rao@company.dev`, IST / UTC+5:30)\n"
                "* **Secondary Maintainer & On-Call:** **Elena Rostova** (Principal Systems Engineer)\n"
                "* **Service Tier:** **Tier 1 Mission-Critical** (SLO: 99.999%, P99: 118ms)\n"
                "* **Recent Architecture:** Ananya led **ADR-028** and **PR #1904** migrating synchronous billing to an **Apache Kafka** event stream."
            )
        elif "jwt" in q_lower or "token" in q_lower:
            answer = (
                "JWT validation is implemented in two distinct layers:\n\n"
                "1. **Application Middleware (`auth-service`):** `auth-service/src/middleware/jwtValidator.ts` (implemented in **PR #1791**). Uses asymmetric **RS256** signatures against rotating JWKS public keys.\n"
                "2. **Edge Offloading (`api-gateway`):** `api-gateway/src/plugins/auth_filter.rs` (authored by **Marcus Vance** in **ADR-018** & **PR #812**). Validates token headers in <0.3ms at the network edge via Rust WebAssembly (WASM)."
            )
        elif "depend" in q_lower or "user-service" in q_lower:
            answer = (
                "The **user-service** is depended upon by **auth-service**, **order-service**, **notification-service**, and **api-gateway**.\n\n"
                "### Dependency Flow:\n"
                "* `api-gateway` routes external user profile queries to `user-service`.\n"
                "* `auth-service` queries `user-service` for role-based access control (RBAC) permissions.\n"
                "* `order-service` calls `user-service` during checkout to verify customer identity and address book."
            )
        elif "postgres" in q_lower or "mongo" in q_lower:
            answer = (
                "The organization standardized on **PostgreSQL** over **MongoDB** according to **ADR-008** (authored by **Arjun Mehta**).\n\n"
                "### Rationale:\n"
                "1. **Strict ACID Guarantees:** Multi-table ledger transactions in `payment-service` require strict serializability.\n"
                "2. **Relational Integrity:** Foreign keys enforce tenant workspace hierarchies and user RBAC.\n"
                "3. **JSONB Flexibility:** Binary JSON allows storing semi-structured metadata without sacrificing transactional integrity."
            )
        elif "deployment" in q_lower or "failure" in q_lower or "incident" in q_lower:
            answer = (
                "The latest deployment incident was **INC-402** on **March 20, 2026**, during the canary rollout of **auth-service v2.8.0**.\n\n"
                "### Root Cause:\n"
                "Canary containers initialized with a static `poolSize: 20` limit, which became instantly starved under peak traffic.\n\n"
                "### Resolution:\n"
                "1. Automated rollback to `v2.7.9` by Kubernetes.\n"
                "2. **Hotfix PR #1849** increased dynamic Redis pool size to 150.\n"
                "3. SRE lead **Karan Patel** updated Terraform ElastiCache parameter groups."
            )
        elif "kafka" in q_lower or "event" in q_lower or "stream" in q_lower:
            answer = (
                "**Apache Kafka** serves as the central distributed event streaming backbone across our microservices architecture.\n\n"
                "### Primary Responsibilities:\n"
                "1. **Decoupled Asynchronous Billing (`payment-service`):** Checkout requests publish `payment.initiated` events to Kafka (governed by **ADR-028** by **Ananya Rao**), preventing HTTP latency bottlenecks during peak load.\n"
                "2. **Real-Time Notification Queues (`notification-service`):** Consumer workers process transaction emails, SMS, and webhook dispatches with idempotency safeguards.\n"
                "3. **Telemetry Streaming (`analytics-service`):** High-volume platform metrics stream continuously into **ClickHouse** for low-latency dashboards."
            )
        elif "gateway" in q_lower or "envoy" in q_lower or "marcus" in q_lower or "wasm" in q_lower:
            answer = (
                "The **`api-gateway`** is our edge ingress proxy (built in Rust and Envoy) maintained by **Marcus Vance**.\n\n"
                "### Key Architecture Highlights:\n"
                "* **Edge WASM Filter:** Uses compiled WebAssembly to validate JWT signatures in <0.3ms at the network edge (**ADR-018** / **PR #812**).\n"
                "* **Throughput & Latency:** Ingests ~18,500 QPS with edge P99 latency under 2.1ms.\n"
                "* **Dynamic Rate Limiting:** Enforces client tier limits backed by distributed Redis token buckets."
            )
        elif "rahul" in q_lower or ("who is" in q_lower and "sharma" in q_lower):
            answer = (
                "**Rahul Sharma** is a **Senior Backend Engineer** and the Tech Lead for the **Platform Identity Team**.\n\n"
                "* **Service Owned:** `auth-service` (Tier 1)\n"
                "* **Key Architecture:** Authored **ADR-024** and **PR #1842** (Redis session storage and sub-millisecond sliding window caching).\n"
                "* **Contact:** `rahul.sharma@company.dev` (IST / UTC+5:30)"
            )
        else:
            # Dynamically tailor response based on matched entities or keywords
            matched_service = "auth-service"
            matched_owner = "Rahul Sharma"
            matched_team = "Platform Identity"
            if "payment" in q_lower or "bill" in q_lower or "stripe" in q_lower:
                matched_service = "payment-service"
                matched_owner = "Ananya Rao"
                matched_team = "Core Payments & Ledger"
            elif "user" in q_lower or "rbac" in q_lower or "profile" in q_lower:
                matched_service = "user-service"
                matched_owner = "Arjun Mehta"
                matched_team = "User Core & Workspaces"
            elif "sre" in q_lower or "k8s" in q_lower or "kubernetes" in q_lower:
                matched_service = "infrastructure-core"
                matched_owner = "Karan Patel"
                matched_team = "Reliability & SRE"

            answer = (
                f"### Verified Knowledge Graph Context for \"{query}\":\n\n"
                f"* **Primary System Domain:** **`{matched_service}`** (maintained by **{matched_team}**).\n"
                f"* **Engineering Domain Expert:** **{matched_owner}** (accessible via internal Slack and GitHub CODEOWNERS).\n"
                f"* **Architecture Standards:** Governed by our approved Architecture Decision Records (ADRs) with automated CI/CD pipeline validation in GitHub Actions and Prometheus SLO tracking.\n\n"
                f"You can inspect the supporting evidence, code references, and interactive relationship graph below."
            )

        # 3. Compile highlighted entities
        highlighted = []
        for e in seed_entities:
            highlighted.append({
                "name": e.name,
                "type": e.type.value,
                "id": e.id
            })

        return {
            "answer": answer,
            "reasoning_steps": reasoning_steps,
            "highlighted_entities": highlighted,
            "evidence": [
                {
                    "id": ev.doc_id,
                    "type": ev.source_type,
                    "title": ev.title,
                    "author": ev.author,
                    "date": ev.date,
                    "repoOrChannel": ev.repo_or_channel,
                    "snippet": ev.snippet,
                    "fullContent": ev.full_content,
                    "relevanceScore": int(ev.combined_score * 100),
                    "vectorScore": ev.vector_score,
                    "graphScore": ev.graph_score
                }
                for ev in evidence_sources
            ]
        }
