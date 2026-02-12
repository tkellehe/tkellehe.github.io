---
layout: experiment
title: "Context Curation: Preliminary REALM Tests"
description: "A first benchmark of REALM's read loop: iterative table-of-contents navigation versus full-text prompting across document sizes, plus what it suggests about reliable context curation."
date: 2026-02-03 04:33:52 -0500
category: experiments
eyebrow: "First Log - REALM Experiments"
read_time: "Estimated read: 5 min"
lede: "This log validates one simple idea. An agent should be able to navigate a document by reading a table of contents in small steps, instead of loading the full text into every prompt. I tested a minimal READ loop across multiple document sizes and two queries. In these runs, both cloud models reached the correct section within two iterations across sizes. That is the core signal I wanted before expanding the design into the broader REALM loop for production content curation."
excerpt: "First experiment write-up validating the baseline loop and context-size behavior."
chart_data: /assets/data/experiments/2026-02-03/multi-size-experiment-2026-02-03.json
queries:
  - "How do I authenticate API requests?"
  - "What are the rate limits?"
reliability_table:
  headers:
    - "Aspect"
    - "Full-Text"
    - "Iterative (REALM)"
  rows:
    - ["Task complexity", "Scan entire document and pick one section", "Pick from a small menu each step"]
    - ["Error recovery", "None", "Self-correcting across iterations"]
    - ["Failure predictability", "Unpredictable across docs and queries", "More predictable, because each step is constrained"]
    - ["Fix difficulty", "Hard, prompt work has diminishing returns", "Easier, mostly constraint clarity and validation"]
    - ["Production posture", "Risky", "Reliable via graceful degradation"]
  footnote: "My current view: iterative wins on operational reliability, even when it is not always the lowest-token option for very small docs."
iteration_growth_table:
  headers: ["Iter", "Input", "Output", "Total", "Cumulative"]
  rows:
    - ["1", "816", "12", "828", "828"]
    - ["2", "1,018", "7", "1,025", "1,853"]
    - ["3", "1,068", "9", "1,077", "2,930"]
    - ["4", "1,179", "9", "1,188", "4,118"]
    - ["5", "1,336", "7", "1,343", "5,461"]
  footnote: "Input grows as sections accumulate, but each step stays within a narrow band. That makes this loop easier to reason about and budget."
context_window_table:
  headers: ["Document Size", "Full-Text Input", "REALM Max Single Iteration", "Reduction"]
  rows:
    - ["Small (9 sections)", "443", "398", "10%"]
    - ["Medium (78 sections)", "5,288", "1,336", "75%"]
    - ["XLarge (124 sections)", "8,878", "1,804", "80%"]
    - ["XXLarge (195 sections)", "12,052", "2,538", "79%"]
    - ["XXXLarge (260 sections)", "15,081", "3,245", "78%"]
  footnote: "This is the practical reason this loop matters. It turns a large-document problem into a sequence of smaller, bounded calls."
---
- **Run 1:** `gpt-4o-mini` - February 3, 2026 - 04:33:52 UTC
- **Run 2:** `gpt-5-nano` - February 3, 2026 - 04:40:19 UTC
- **Scope:** READ loop only (navigate + accumulate context)
- **Queries:** Authentication and rate limiting
- **Max iterations:** 5

{% include components/figure-card.html src="/assets/images/posts/2026-02-03/realm-basic-diagram.png" alt="REALM basic loop diagram showing document, context state, prompt, and next-section selection" width="1536" height="940" caption="The baseline diagram flow used in this first experiment." %}

## REALM as Context Curation
I think of REALM as a context curation system. The model does not get everything up front. Instead, it progressively pulls in only the pieces that matter for the current question. The mechanism is deliberately boring. It is a table of contents, a small list of available next sections, and a loop that appends what was read into the working context.

This matters because the usual options all have scaling problems. Full-text prompting scales linearly with content size. Embeddings often discard the hierarchy that documentation already gives you. Manual curation does not scale when the content and the number of queries grows. REALM tries to keep the structure and still keep per-call context small.

For this first log, I am only validating navigation and context growth. The long-term plan is to expand incrementally toward the full loop and its pitfalls (stop conditions, confidence, guardrails, and eventually richer tool and document graphs).

## What I Tested
I compared two approaches across five document sizes (9 to 260 sections) and two queries, with a max of 5 iterations.

- **Iterative REALM:** pick a section, read it, and repeat until the answer is found
- **Full-text:** attempt a one-shot selection from the entire document

### Queries Used
{% for query in page.queries -%}
- `{{ query }}`
{% endfor %}

Results: [`multi-size-experiment-2026-02-03.json`]({{ '/assets/data/experiments/2026-02-03/multi-size-experiment-2026-02-03.json' | relative_url }})

Data sources:

- [`small-api-docs.md`]({{ '/assets/data/experiments/2026-02-03/small-api-docs.md' | relative_url }})
- [`large-api-docs.md`]({{ '/assets/data/experiments/2026-02-03/large-api-docs.md' | relative_url }})
- [`xlarge-api-docs.md`]({{ '/assets/data/experiments/2026-02-03/xlarge-api-docs.md' | relative_url }})
- [`xxlarge-api-docs.md`]({{ '/assets/data/experiments/2026-02-03/xxlarge-api-docs.md' | relative_url }})
- [`xxxlarge-api-docs.md`]({{ '/assets/data/experiments/2026-02-03/xxxlarge-api-docs.md' | relative_url }})

## Basic Loop
```text
available_sections = toc(document)
selected_sections = []

for iteration in 1..5:
  prompt = build_prompt(query, available_sections, selected_sections)
  next_section = llm_select(prompt)
  selected_sections.append(next_section)
  available_sections.remove(next_section)

  if has_answer(selected_sections, query):
    # early-stop candidate
    record(iteration, selected_sections)
```

The entire point of this post is the selection step. Can the model reliably choose a useful next section from a small menu, and keep doing that as the document grows?

## Result Snapshot
<div class="chalk-grid">
{% include components/token-chart-panel.html
  title="gpt-4o-mini Token Usage by Doc Size"
  subtitle="Average <code>tokensTotal</code> across both queries."
  aria_label="gpt-4o-mini token growth chart"
  model="gpt-4o-mini"
  kind="totals"
  left_key="iterative"
  left_label="Iterative"
  left_class="iterative"
  right_key="fulltext"
  right_label="Full-text"
  right_class="fulltext"
%}
{% include components/token-chart-panel.html
  title="gpt-5-nano Token Usage by Doc Size"
  subtitle="Average <code>tokensTotal</code> across both queries."
  aria_label="gpt-5-nano token growth chart"
  model="gpt-5-nano"
  kind="totals"
  left_key="iterative"
  left_label="Iterative"
  left_class="iterative"
  right_key="fulltext"
  right_label="Full-text"
  right_class="fulltext"
%}
</div>

<div class="chalk-panel">
  <h3>What This Suggests</h3>
  <ul>
    <li><strong>Both approaches scale with doc size:</strong> totals rise predictably from Small to XXXLarge.</li>
    <li><strong>gpt-4o-mini converges:</strong> iterative and full-text become close at larger sizes.</li>
    <li><strong>gpt-5-nano shows a larger gap:</strong> iterative stays noticeably above full-text on total tokens.</li>
  </ul>
</div>

## Full-Text Is a Fragile Interface
Full-text prompting looks simpler, but the failure mode is ugly. You ask the model to scan thousands of tokens, pick one section, and return it in exactly the format you need. In practice, it can return the wrong thing, the wrong format, or a plausible-looking answer that points at the wrong section. Worse, it has no second chance.

{% include components/chalk-table-panel.html
  title="Reliability Comparison"
  headers=page.reliability_table.headers
  rows=page.reliability_table.rows
  footnote=page.reliability_table.footnote
%}

## Early Stopping Is the Biggest Multiplier
The clearest takeaway is not the 5-iteration totals. It is how quickly the correct section is found. If you stop as soon as you have the answer (or high confidence), token usage can collapse. To keep the comparison aligned with the earlier charts, the view below compares full-text one-shot against stop-at-first-correct, averaged across both queries.

<div class="chalk-grid">
{% include components/token-chart-panel.html
  title="gpt-4o-mini Early Stopping Savings by Doc Size"
  subtitle="Average full-text <code>tokensTotal</code> vs average <code>tokensToCorrect</code> across both queries."
  aria_label="gpt-4o-mini early stopping savings chart"
  model="gpt-4o-mini"
  kind="savings"
  left_key="fulltext"
  left_label="Full-text"
  left_class="fulltext"
  right_key="earlystop"
  right_label="Stop @ first correct"
  right_class="earlystop"
  show_note="true"
%}
{% include components/token-chart-panel.html
  title="gpt-5-nano Early Stopping Savings by Doc Size"
  subtitle="Average full-text <code>tokensTotal</code> vs average <code>tokensToCorrect</code> across both queries."
  aria_label="gpt-5-nano early stopping savings chart"
  model="gpt-5-nano"
  kind="savings"
  left_key="fulltext"
  left_label="Full-text"
  left_class="fulltext"
  right_key="earlystop"
  right_label="Stop @ first correct"
  right_class="earlystop"
  show_note="true"
%}
</div>

<div class="chalk-panel">
  <h3>What This Suggests</h3>
  <ul>
    <li><strong>Small docs can still favor full-text:</strong> one-shot can be cheaper on the smallest input sizes.</li>
    <li><strong>As docs grow, early stopping wins:</strong> stop-at-first-correct pulls token usage down sharply on larger inputs.</li>
    <li><strong>Early stopping is architectural:</strong> this should be a first-class control, not an optional optimization.</li>
  </ul>
</div>

## Per-Iteration Growth Stays Manageable
Context does grow each iteration, because previously read sections accumulate. But growth was controlled in a representative medium run, while output tokens stayed small when the model is not producing long reasoning outputs.

This is also promising for smaller local models (SLMs). Keeping each call bounded to a much smaller context window can make the loop more practical on constrained hardware, especially when stop conditions keep the number of iterations low.

{% include components/chalk-table-panel.html
  title="Per-Iteration Token Growth (Medium, Auth Query, gpt-4o-mini)"
  headers=page.iteration_growth_table.headers
  rows=page.iteration_growth_table.rows
  footnote=page.iteration_growth_table.footnote
%}

## Per-Call Context Windows Stay Small
{% include components/chalk-table-panel.html
  title="Max Single-Iteration Input (gpt-4o-mini)"
  headers=page.context_window_table.headers
  rows=page.context_window_table.rows
  footnote=page.context_window_table.footnote
%}

## Takeaways from This First Pass
- The basic diagram is valid. Iterative section selection stays stable as content grows.
- For `gpt-4o-mini`, iterative becomes token-cheaper around 30KB documents, and stays competitive beyond that.
- Full-text is operationally fragile. It has no recovery path when it picks the wrong thing.
- Early stopping is the next real improvement. It turns a 5-iteration budget into a 2-iteration budget most of the time.
- Next step: Try out a local SLM to see how it handles the same loop, and start building out the broader REALM design with confidence in the core navigation mechanism.
