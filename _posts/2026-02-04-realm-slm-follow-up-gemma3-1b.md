---
layout: experiment
title: "REALM Continuation: Local SLM Evaluation with gemma3:1b"
description: "Follow-up to the February 3 REALM baseline. This compares gemma3:1b iterative navigation versus full-text prompting, then positions the local SLM against the earlier cloud-model runs."
date: 2026-02-04 09:15:00 -0500
category: experiments
eyebrow: "Second Log - REALM Experiments"
read_time: "Estimated read: 6 min"
lede: "This continuation tests whether a local 1B model can run the same REALM read loop effectively on larger documentation. The core result is strong: on Medium through XXXLarge documents, gemma3:1b uses fewer tokens than full-text prompting while keeping per-iteration context windows small enough for constrained hardware."
excerpt: "Continuation experiment evaluating gemma3:1b as a local SLM for REALM context curation."
chart_data: /assets/data/experiments/2026-02-04/multi-size-experiment-2026-02-04-gemma3-1b.json
queries:
  - "How do I authenticate API requests?"
  - "What are the rate limits?"
gemma_token_table:
  headers: ["Document", "Size", "Sections", "Iterative Avg Tokens", "Full-Text Avg Tokens", "Difference"]
  rows:
    - ["Medium", "18.1KB", "78", "4,260", "5,364", "-1,104 (-20.6%)"]
    - ["XLarge", "30.1KB", "124", "5,793", "8,800", "-3,008 (-34.2%)"]
    - ["XXLarge", "41.6KB", "195", "8,214", "12,327", "-4,113 (-33.4%)"]
    - ["XXXLarge", "52.6KB", "260", "10,524", "15,679", "-5,155 (-32.9%)"]
  footnote: "Average across both queries. Negative difference means iterative used fewer tokens than full-text."
cross_model_table:
  headers: ["Document", "gemma3:1b Iterative", "gpt-4o-mini Iterative", "gpt-5-nano Iterative", "gemma3:1b Position"]
  rows:
    - ["Medium", "4,260", "5,326", "8,874", "20% lower than gpt-4o-mini; 52% lower than gpt-5-nano"]
    - ["XLarge", "5,793", "7,654", "12,255", "24% lower than gpt-4o-mini; 53% lower than gpt-5-nano"]
    - ["XXLarge", "8,214", "11,275", "15,613", "27% lower than gpt-4o-mini; 47% lower than gpt-5-nano"]
    - ["XXXLarge", "10,524", "14,742", "20,515", "29% lower than gpt-4o-mini; 49% lower than gpt-5-nano"]
  footnote: "Cross-model view uses average iterative tokens across both queries on the shared size range (Medium to XXXLarge)."
model_efficiency_table:
  headers: ["Model", "Iterative Avg Tokens", "Full-Text Avg Tokens", "Iterative - Full-Text"]
  rows:
    - ["gpt-4o-mini", "9,749", "10,327", "-578 (-5.6%)"]
    - ["gpt-5-nano", "14,314", "10,646", "+3,668 (+34.5%)"]
    - ["gemma3:1b", "7,198", "10,542", "-3,344 (-31.7%)"]
  footnote: "Model-level averages across Medium to XXXLarge only."
convergence_table:
  headers: ["Model", "Avg First Correct Iteration", "Avg Tokens to Correct", "Observation"]
  rows:
    - ["gpt-4o-mini", "2.00", "3,592", "Stable and early across sizes in this range"]
    - ["gpt-5-nano", "2.00", "4,719", "Early convergence with higher token overhead"]
    - ["gemma3:1b", "2.75", "3,921", "Fast on auth; slower on rate-limit queries at larger sizes"]
  footnote: "Averages computed from iterative runs with available first-correct markers."
context_window_table:
  headers: ["Document", "Full-Text Input", "gemma3:1b Max Single Iteration Input", "Reduction"]
  rows:
    - ["Medium", "5,363", "931", "83%"]
    - ["XLarge", "8,796", "1,237", "86%"]
    - ["XXLarge", "12,318", "1,729", "86%"]
    - ["XXXLarge", "15,672", "2,199", "86%"]
  footnote: "Per-call context stays substantially smaller than full-text, which is the key SLM usability signal."
iteration_growth_table:
  headers: ["Iter", "Input", "Output", "Total", "Cumulative"]
  rows:
    - ["1", "622", "53", "675", "675"]
    - ["2", "789", "36", "825", "1,500"]
    - ["3", "825", "41", "866", "2,366"]
    - ["4", "899", "39", "938", "3,304"]
    - ["5", "931", "41", "972", "4,276"]
  footnote: "Representative run: Medium document, auth query, gemma3:1b iterative. First correct section appears at iteration 2."
fulltext_failure_table:
  headers: ["Document", "Full-Text Attempts", "Incorrect Selections", "Example Full-Text Output"]
  rows:
    - ["Medium", "2", "2", "3"]
    - ["XLarge", "2", "2", "--- Section: 1 ---"]
    - ["XXLarge", "2", "2", "--- Section: initialization ---"]
    - ["XXXLarge", "2", "2", "--- Section: data-sources"]
  footnote: "In this local SLM run set, full-text responses were incorrect for all eight attempts."
---
- **Continuation of:** [Context Curation: Preliminary REALM Tests]({% post_url 2026-02-03-context-curation-preliminary-realm-tests %})
- **Run:** `gemma3:1b` local SLM (Ollama), executed February 3, 2026 and finalized in this write-up on February 4, 2026
- **Scope:** same read-loop benchmark shape as 02-03, focused on Medium to XXXLarge documents
- **Queries:** authentication and rate-limiting
- **Max iterations:** 5

{% include components/figure-card.html src="/assets/images/posts/2026-02-01/realm-basic-diagram.png" alt="REALM basic loop diagram showing document, context state, prompt, and next-section selection" width="1536" height="940" caption="Same baseline loop as the 02-03 experiment: constrained section selection with iterative context accumulation." %}

## Why This Follow-up
The 02-03 post established that the loop mechanics work on cloud models. This continuation asks a narrower question: can a very small local model run the same loop in a useful way for larger documents?

The answer from this first pass is yes for Medium through XXXLarge. On those sizes, `gemma3:1b` is consistently cheaper than full-text in token terms, and still follows the same constrained section-navigation pattern.

## Data for This Run
Results and extracted chart payload:

- [`multi-size-experiment-2026-02-04-gemma3-1b.json`]({{ '/assets/data/experiments/2026-02-04/multi-size-experiment-2026-02-04-gemma3-1b.json' | relative_url }})
- Baseline reference: [`multi-size-experiment-2026-02-03.json`]({{ '/assets/data/experiments/2026-02-03/multi-size-experiment-2026-02-03.json' | relative_url }})

## gemma3:1b vs Full-Text (Same Loop Setup)

{% include components/chalk-table-panel.html
title="gemma3:1b Token Usage by Document Size"
headers=page.gemma_token_table.headers
rows=page.gemma_token_table.rows
footnote=page.gemma_token_table.footnote
%}

<div class="chalk-grid">
{% include components/token-chart-panel.html
  title="gemma3:1b Token Usage by Doc Size"
  subtitle="Average <code>tokensTotal</code> across both queries."
  aria_label="gemma3 1b token growth chart"
  model="gemma3:1b"
  kind="totals"
  left_key="iterative"
  left_label="Iterative"
  left_class="iterative"
  right_key="fulltext"
  right_label="Full-text"
  right_class="fulltext"
  doc_sizes="Medium,XLarge,XXLarge,XXXLarge"
%}
{% include components/token-chart-panel.html
  title="gemma3:1b Early Stopping Savings"
  subtitle="Average full-text <code>tokensTotal</code> vs average <code>tokensToCorrect</code>."
  aria_label="gemma3 1b early stopping chart"
  model="gemma3:1b"
  kind="savings"
  left_key="fulltext"
  left_label="Full-text"
  left_class="fulltext"
  right_key="earlystop"
  right_label="Stop @ first correct"
  right_class="earlystop"
  show_note="true"
  doc_sizes="Medium,XLarge,XXLarge,XXXLarge"
%}
</div>

## Comparison with the 02-03 Models

{% include components/chalk-table-panel.html
title="Iterative Tokens: Local SLM vs Prior Cloud Runs"
headers=page.cross_model_table.headers
rows=page.cross_model_table.rows
footnote=page.cross_model_table.footnote
%}

{% include components/chalk-table-panel.html
title="Model-Level Efficiency on Shared Sizes"
headers=page.model_efficiency_table.headers
rows=page.model_efficiency_table.rows
footnote=page.model_efficiency_table.footnote
%}

This does not claim that `gemma3:1b` is stronger overall than the larger cloud models. It does show that, within this constrained navigation task, a 1B local model can be operationally useful and token-competitive when paired with the REALM loop design.

## Convergence Behavior

{% include components/chalk-table-panel.html
title="First-Correct and Early-Stop Comparison"
headers=page.convergence_table.headers
rows=page.convergence_table.rows
footnote=page.convergence_table.footnote
%}

Two patterns stand out:

1. `gemma3:1b` is very strong on the authentication query (first correct at iteration 2 across sizes).
2. It takes longer on the rate-limiting query at larger sizes (first correct at iteration 4), which lowers early-stop savings there.

## Per-Call Context Remains Small

{% include components/chalk-table-panel.html
title="Per-Call Context Window (gemma3:1b)"
headers=page.context_window_table.headers
rows=page.context_window_table.rows
footnote=page.context_window_table.footnote
%}

This is the important SLM signal. The loop keeps each call bounded, which makes CPU-local inference more practical than repeatedly sending the full document.

## Representative Iteration Growth

{% include components/chalk-table-panel.html
title="Per-Iteration Token Growth (Medium, Auth Query, gemma3:1b)"
headers=page.iteration_growth_table.headers
rows=page.iteration_growth_table.rows
footnote=page.iteration_growth_table.footnote
%}

## Known Failure Mode in This Pass
The Small document case (9 sections) was excluded from this JSON run because iterative selection failed with invalid section IDs (for example `"1.2"`). The issue appears to be prompt/schema clarity for tiny local models, not a loop design issue.

{% include components/chalk-table-panel.html
title="Full-Text Reliability in This Local SLM Run"
headers=page.fulltext_failure_table.headers
rows=page.fulltext_failure_table.rows
footnote=page.fulltext_failure_table.footnote
%}

## Next Steps from This SLM Pass

1. Tighten section-ID constraints in the prompt (explicit allowed IDs + exact-match requirement).
2. A/B test prompt variants on Small documents to recover reliability.
3. Move to next loop component: Editor/Analyzer. Can the local SLM not only pick sections but also extract and summarize them effectively for downstream use?
