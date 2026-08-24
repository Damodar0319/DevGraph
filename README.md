# DevGraph

> AI-powered engineering knowledge graph for understanding codebases, architecture, dependencies, decisions, and engineering history.

## Overview

DevGraph is an AI-powered engineering knowledge platform designed to solve a common problem in modern software teams: engineering knowledge is scattered across code, documentation, pull requests, issues, architecture decisions, and team knowledge.

Instead of forcing developers to search through multiple sources, DevGraph creates a unified knowledge layer where developers can ask natural-language questions and receive context-aware, evidence-backed answers with the relationships behind them.

## The Problem

As software projects grow, understanding an unfamiliar codebase becomes increasingly difficult.

A developer trying to answer:

> "Why does this service use Redis?"

may need to search through:

- Source code
- GitHub repositories
- Pull requests
- Issues
- Documentation
- Architecture decisions
- Commit history
- Team knowledge

The information exists, but it is fragmented.

Traditional search can find individual pieces of information, but often fails to understand how those pieces are connected.

## Our Solution

DevGraph connects engineering knowledge into a structured graph.

Instead of treating every piece of information independently, DevGraph models relationships such as:

```text
Developer
    │
    └── CONTRIBUTED_TO
             ↓
        Pull Request
             │
             └── MODIFIES
                    ↓
                   File
                    │
                    └── PART_OF
                           ↓
                        Service
                           │
                           └── USES
                                  ↓
                                Redis
