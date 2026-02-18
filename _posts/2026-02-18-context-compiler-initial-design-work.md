---
layout: experiment
title: "Context Compiler: Initial Design Work"
description: "Initial design notes for ctxc, a local-first context compiler built on the full REALM architecture."
date: 2026-02-18 09:20:00 -0500
category: architectures
tags: [ctxc, realm, design, local-first, slm, ai]
eyebrow: "Design Log - ctxc"
read_time: "Estimated read: 7 min"
lede: "ctxc is a local-first context compiler that applies the full REALM architecture to turn large rule and documentation corpora into minimal, auditable task context. This post sets the initial design boundary, draft interfaces, and open questions."
excerpt: "Initial design scaffold for ctxc, a local-first context compiler built on REALM and validated by early gemma3:1b results."
design_scope_table:
  headers: ["Area", "In v0", "Deferred"]
  rows:
    - ["Input sources", "Single local markdown/text corpus", "Multi-repo ingestion and remote connectors"]
    - ["Model strategy", "Local SLM primary path", "Hybrid local + cloud fallback"]
    - ["Loop coverage", "Reader + Editor/Analyzer + Loop Controller + Monitor + Worker handoff", "Adaptive multi-monitor routing"]
    - ["Output", "Compiled context pack + trace file", "Long-running context cache service"]
pipeline_table:
  headers: ["Phase", "REALM Component", "Primary Output", "Status"]
  rows:
    - ["1. Read", "Reader", "Candidate sections ranked against task", "Drafted"]
    - ["2. Edit/Analyze", "Editor/Analyzer", "Normalized task-scoped snippets", "Drafted"]
    - ["3. Loop", "Loop Controller", "State updates and stop/budget checks", "Drafted"]
    - ["4. Monitor", "Monitor", "Quality verdict and recovery signal", "Drafted"]
    - ["5. Emit", "Worker handoff", "Final compiled context artifact", "Drafted"]
cli_table:
  headers: ["Command", "Purpose", "Current Intent"]
  rows:
    - ["ctxc init", "Create project config and defaults", "Required for v0"]
    - ["ctxc compile <task>", "Run full REALM compile loop", "Required for v0"]
    - ["ctxc trace <run-id>", "Inspect iteration decisions and monitor checks", "Required for v0"]
    - ["ctxc eval", "Run benchmark set and summary metrics", "Optional in v0"]
evaluation_table:
  headers: ["Metric", "Why it matters", "How to compute (draft)"]
  rows:
    - ["tokens_total", "Overall runtime cost", "Sum tokens across loop iterations"]
    - ["tokens_to_sufficient", "Early-stop efficiency", "Tokens used until first sufficient monitor verdict"]
    - ["first_correct_iteration", "Convergence speed", "First iteration that contains expected section"]
    - ["max_iteration_input", "Local feasibility", "Largest single prompt input in any iteration"]
    - ["compile_success_rate", "Reliability", "Successful compiles / total tasks"]
milestone_table:
  headers: ["Milestone", "Target", "Notes"]
  rows:
    - ["M1: CLI + local run skeleton", "Week 1", "Command parser, config load, dry-run trace output"]
    - ["M2: Reader + loop state engine", "Week 2", "Deterministic section IDs and bounded iteration loop"]
    - ["M3: Editor/Analyzer + monitor", "Week 3", "Structured context pack with quality gate"]
    - ["M4: Local SLM benchmark pass", "Week 4", "Compare compile metrics to full-text baseline"]
open_questions_table:
  headers: ["Question", "Current default", "To validate"]
  rows:
    - ["Canonical section IDs?", "Hierarchical string IDs from TOC", "Robustness on tiny docs and noisy headings"]
    - ["Monitor cadence?", "Every iteration for v0", "Can we skip checks without quality loss?"]
    - ["Context pack format?", "JSON with provenance metadata", "Need markdown export for manual review?"]
    - ["Recovery strategy?", "Backtrack last section + reselection", "Alternative: branch search on low confidence"]
---
- **Architecture baseline:** [REALM: Read Edit/Analyze Loop Monitor]({% post_url 2026-02-01-realm-read-edit-analyze-loop-monitor %})
- **Local SLM evidence:** [REALM Continuation: Local SLM Evaluation with gemma3:1b]({% post_url 2026-02-04-realm-slm-follow-up-gemma3-1b %})
- **Working name:** `ctxc` (Context Compiler)

{% include components/figure-card.html src="/assets/images/posts/2026-02-01/realm-basic-diagram.png" alt="REALM loop diagram showing iterative document navigation and context accumulation" width="1536" height="940" caption="ctxc is intended to operationalize the full REALM loop into a local-first compiler workflow." %}

## Why ctxc, Why Now
The 02-01 post defined the full REALM architecture, and the 02-04 run showed that a local 1B model can already execute key loop behavior effectively on larger documents. That is enough signal to begin implementation design for an end-to-end tool.

This post is intentionally a scaffold: clear boundaries, draft interfaces, and concrete placeholders that can be filled with implementation details and benchmark results.

## Goal Statement (Draft)
`ctxc` should compile large local document corpora into the smallest useful, auditable context bundle for a specific task, using the full REALM architecture and staying 100% local by default.

## MVP Boundary (v0)
{% include components/chalk-table-panel.html
  title="ctxc v0 Scope"
  headers=page.design_scope_table.headers
  rows=page.design_scope_table.rows
%}

## Initial Pipeline Shape
{% include components/chalk-table-panel.html
  title="Compile Pipeline (Mapped to REALM)"
  headers=page.pipeline_table.headers
  rows=page.pipeline_table.rows
%}

Draft loop sketch:

```text
state = init(task, corpus, budget)

while not state.done and state.iters < max_iters:
  candidate = Reader.pick(state.query, state.available, state.history)
  draft = EditorAnalyze.normalize(candidate, state.query, constraints)
  state.context = merge(state.context, draft)

  verdict = Monitor.check(state.context, state.query, quality_bar)
  state = LoopController.update(state, candidate, verdict)

emit ContextPack(state.context, state.trace, state.metrics)
```

## CLI Surface (Working Draft)
{% include components/chalk-table-panel.html
  title="CLI Commands"
  headers=page.cli_table.headers
  rows=page.cli_table.rows
%}

Proposed usage examples:

```bash
ctxc init
ctxc compile "How do I authenticate API requests?" --corpus ./docs/api.md
ctxc trace run_2026_02_18_001
```

## Artifact Contract (First Pass)
Expected local outputs per compile run:

```text
.ctxc/
  runs/
    run_<id>/
      context-pack.json
      trace.json
      metrics.json
      monitor-log.md
```

`context-pack.json` should include:

1. Final selected snippets
2. Source section IDs
3. Short rationale for each inclusion
4. Compile metadata (model, timestamps, limits)

## Evaluation Plan (Draft)
{% include components/chalk-table-panel.html
  title="Metrics to Track in Early Runs"
  headers=page.evaluation_table.headers
  rows=page.evaluation_table.rows
%}

## Delivery Milestones
{% include components/chalk-table-panel.html
  title="Initial 4-Week Plan"
  headers=page.milestone_table.headers
  rows=page.milestone_table.rows
%}

## Open Questions to Resolve
{% include components/chalk-table-panel.html
  title="Design Questions"
  headers=page.open_questions_table.headers
  rows=page.open_questions_table.rows
%}

## Fill-In Sections (Author TODO)
1. Add concrete runtime assumptions (CPU, RAM, model quantization).
2. Add one worked trace from `ctxc compile` once implementation starts.
3. Add failure taxonomy (invalid section ID, loop drift, monitor false positive).
4. Add benchmark table comparing iterative compile vs full-text baseline.
5. Add a short note on when local-only should fall back to a stronger model.

## Current Position
The design direction is clear: implement `ctxc` as a local-first context compiler that operationalizes the full REALM loop, then validate with the same style of measurements used in the earlier posts.
