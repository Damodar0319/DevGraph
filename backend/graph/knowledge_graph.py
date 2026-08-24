from typing import Dict, List, Any, Optional, Set
from collections import deque
from schemas import GraphNode, GraphEdge, EntityType, RelationshipType

class KnowledgeGraph:
    """
    Neo4j-compatible Graph Storage Engine storing Nodes, Edges, Properties, and Topology.
    Supports multi-hop graph traversal, neighborhood subgraph extraction, and shortest path queries.
    """
    def __init__(self):
        self.nodes: Dict[str, GraphNode] = {}
        self.edges: Dict[str, GraphEdge] = {}
        self.adjacency_out: Dict[str, List[str]] = {}
        self.adjacency_in: Dict[str, List[str]] = {}

    def add_node(self, node: GraphNode) -> None:
        self.nodes[node.id] = node
        if node.id not in self.adjacency_out:
            self.adjacency_out[node.id] = []
        if node.id not in self.adjacency_in:
            self.adjacency_in[node.id] = []

    def add_edge(self, edge: GraphEdge) -> None:
        self.edges[edge.id] = edge
        # Ensure endpoints exist
        if edge.source not in self.nodes:
            self.add_node(GraphNode(id=edge.source, label=edge.source, type=EntityType.TECH))
        if edge.target not in self.nodes:
            self.add_node(GraphNode(id=edge.target, label=edge.target, type=EntityType.TECH))

        if edge.id not in self.adjacency_out[edge.source]:
            self.adjacency_out[edge.source].append(edge.id)
        if edge.id not in self.adjacency_in[edge.target]:
            self.adjacency_in[edge.target].append(edge.id)

    def get_node(self, node_id: str) -> Optional[GraphNode]:
        return self.nodes.get(node_id)

    def get_all_nodes(self) -> List[GraphNode]:
        return list(self.nodes.values())

    def get_all_edges(self) -> List[GraphEdge]:
        return list(self.edges.values())

    def get_subgraph(self, start_node_ids: List[str], max_depth: int = 2) -> Dict[str, Any]:
        """
        Extracts k-hop neighborhood subgraph around seed entities.
        """
        visited_nodes: Set[str] = set()
        visited_edges: Set[str] = set()
        queue = deque([(nid, 0) for nid in start_node_ids if nid in self.nodes])

        for nid, _ in queue:
            visited_nodes.add(nid)

        while queue:
            curr_id, depth = queue.popleft()
            if depth >= max_depth:
                continue

            # Outgoing edges
            for edge_id in self.adjacency_out.get(curr_id, []):
                edge = self.edges[edge_id]
                visited_edges.add(edge_id)
                if edge.target not in visited_nodes:
                    visited_nodes.add(edge.target)
                    queue.append((edge.target, depth + 1))

            # Incoming edges
            for edge_id in self.adjacency_in.get(curr_id, []):
                edge = self.edges[edge_id]
                visited_edges.add(edge_id)
                if edge.source not in visited_nodes:
                    visited_nodes.add(edge.source)
                    queue.append((edge.source, depth + 1))

        return {
            "nodes": [self.nodes[nid].dict() for nid in visited_nodes if nid in self.nodes],
            "edges": [self.edges[eid].dict() for eid in visited_edges if eid in self.edges]
        }

    def find_path(self, source_id: str, target_id: str, max_hops: int = 4) -> List[Dict[str, Any]]:
        """
        BFS Shortest path search between two entities in the knowledge graph.
        """
        if source_id not in self.nodes or target_id not in self.nodes:
            return []

        queue = deque([([source_id], [])])
        visited = {source_id}

        while queue:
            node_path, edge_path = queue.popleft()
            curr = node_path[-1]

            if curr == target_id:
                return [{"nodes": node_path, "edges": edge_path}]

            if len(node_path) > max_hops:
                continue

            for edge_id in self.adjacency_out.get(curr, []):
                edge = self.edges[edge_id]
                if edge.target not in visited:
                    visited.add(edge.target)
                    queue.append((node_path + [edge.target], edge_path + [edge_id]))

        return []
