---
layout: post
title: "Writing Experiment Rerun: gemma3:1b at 82.0% Fair+Good"
description: "Rerun on 50 story scenes (2 samples each), then rescored with a keep-or-cut rubric focused on Fair+Good as the practical drafting metric."
date: 2026-02-25 17:20:00 -0500
category: experiments
tags: [realm, writing, experiments, slm, gemma3-1b, evaluation]
eyebrow: "Fifth Log - Writing Experiments"
read_time: "Estimated read: 8 min"
lede: "I reran `gemma3:1b` on 50 story scenes with 2 samples each, then rescored with a documentation-ready rubric: If I appended this sentence to the scene, would I keep it?"
excerpt: "Updated gemma3:1b writing experiment with 100 outputs, 82.0% fair+good, case-level usability rates, and the full rerun quality rubric."
quality_table:
  headers: ["Quality", "Count", "Percent"]
  rows:
    - ["Good", "5 / 100", "5.0%"]
    - ["Fair", "77 / 100", "77.0%"]
    - ["Bad", "18 / 100", "18.0%"]
    - ["Incoherent", "0 / 100", "0.0%"]
    - ["Fair + Good", "82 / 100", "82.0%"]
  footnote: "Primary decision metric in this rerun is Fair + Good (usable continuation sentence)."
comparison_table:
  headers: ["Run", "Model", "Good + Fair", "Bad", "One-Sentence Violations", "One-Sentence Compliant"]
  rows:
    - ["2026-02-23 baseline", "gemma3:1b", "7 / 24 (29.2%)", "17 / 24 (70.8%)", "15 / 24 (62.5%)", "9 / 24 (37.5%)"]
    - ["2026-02-25 rerun", "gemma3:1b", "82 / 100 (82.0%)", "18 / 100 (18.0%)", "0 / 100 (0.0%)", "100 / 100 (100.0%)"]
  footnote: "Baseline is from the previous post and uses a smaller set; the prompt setup and scoring rubric were updated in this rerun."
case_level_table:
  headers: ["Case-Level Outcome (2 samples per case)", "Count", "Percent"]
  rows:
    - ["At least 1 Fair/Good sentence", "44 / 50", "88.0%"]
    - ["Both sentences Fair/Good", "38 / 50", "76.0%"]
    - ["Exactly 1 Fair/Good sentence", "6 / 50", "12.0%"]
    - ["No usable sentence (both bad)", "6 / 50", "12.0%"]
  footnote: "This is the practical reliability view for writing flow when generating two options per scene."
reversal_table:
  headers: ["Reversal Type", "Good", "Fair", "Bad", "Fair + Good"]
  rows:
    - ["Positive (34 outputs)", "3 (8.8%)", "28 (82.4%)", "3 (8.8%)", "31 / 34 (91.2%)"]
    - ["Neutral (32 outputs)", "1 (3.1%)", "25 (78.1%)", "6 (18.8%)", "26 / 32 (81.3%)"]
    - ["Negative (34 outputs)", "1 (2.9%)", "24 (70.6%)", "9 (26.5%)", "25 / 34 (73.5%)"]
  footnote: "Negative-turn prompts are still the hardest slice in this rerun."
compounding_scene_table:
  headers: ["Sentences (N)", "P(good scene, all Fair/Good)", "P(at least 1 Bad)"]
  rows:
    - ["10", "13.74%", "86.26%"]
    - ["20", "1.89%", "98.11%"]
    - ["40", "0.036%", "99.964%"]
  footnote: "Same compounding method as the previous post, using this run's per-sentence rates: Fair+Good = 82.0%, Bad = 18.0%."
best_of_two_scene_table:
  headers: ["Sentences (N)", "P(good scene with best-of-2 each step)", "P(at least 1 Bad after best-of-2)"]
  rows:
    - ["10", "27.85%", "72.15%"]
    - ["20", "7.76%", "92.24%"]
    - ["40", "0.602%", "99.40%"]
  footnote: "Uses observed two-shot case reliability from this run: 44/50 had at least one Fair/Good, so per-step failure after best-of-2 is 6/50 = 12.0%."
---

This post is a follow-up to the earlier baseline write-up:

- [Writing Experiment: gemma3:1b vs qwen3:1.7b Quality Mix]({% post_url 2026-02-23-writing-experiment-gemma3-1b-vs-qwen3-1-7b %})

The goal here is practical drafting throughput. I want to know whether `gemma3:1b` can produce a usable next sentence often enough to keep momentum when writing scene-by-scene.

### Run summary
- **Run timestamp:** February 25, 2026 (`2026-02-25T02:27:32.328Z`)
- **Model:** `gemma3:1b`
- **Scope:** 50 story cases, 2 samples per case (`100` total outputs)
- **Main goal:** maximize usable continuations (`fair + good`) for next-sentence drafting

## Data
- [`writing-experiment-2026-02-25T02-27-32-328Z.json`]({{ '/assets/data/experiments/2026-02-25/writing-experiment-2026-02-25T02-27-32-328Z.json' | relative_url }})

## Main result: Fair+Good ratio
{% include components/chalk-table-panel.html
title="Quality Distribution (Rerun)"
headers=page.quality_table.headers
rows=page.quality_table.rows
footnote=page.quality_table.footnote
%}

The decision threshold for this run is simple: if a generated sentence is `fair` or `good`, it is usable in draft flow. On that measure, this rerun lands at **82.0% usable**.

## Compared with the previous gemma3:1b run
{% include components/chalk-table-panel.html
title="Baseline vs Rerun"
headers=page.comparison_table.headers
rows=page.comparison_table.rows
footnote=page.comparison_table.footnote
%}

### Visual quality mix comparison (old first-sentence vs this rerun)
This chart compares:
- **Old run:** `2026-02-23` gemma3:1b **first-sentence** quality mix
- **This run:** `2026-02-25` gemma3:1b rerun quality mix

<div class="chalk-grid writing-quality-grid">
  <div class="chalk-panel quality-column-card">
    <h3>2026-02-23 (first sentence)</h3>
    <div class="quality-column-shell">
      <div
        class="quality-column"
        role="img"
        aria-label="2026-02-23 gemma3:1b first sentence quality mix: 29.2 percent good, 37.5 percent fair, 33.3 percent bad."
      >
        <span class="quality-segment good" style="height: 29.2%"></span>
        <span class="quality-segment fair" style="height: 37.5%"></span>
        <span class="quality-segment bad" style="height: 33.3%"></span>
      </div>
    </div>
    <ul class="quality-metrics">
      <li><span class="quality-dot good"></span> Good: 7 / 24 (29.2%)</li>
      <li><span class="quality-dot fair"></span> Fair: 9 / 24 (37.5%)</li>
      <li><span class="quality-dot bad"></span> Bad: 8 / 24 (33.3%)</li>
    </ul>
  </div>

  <div class="chalk-panel quality-column-card">
    <h3>2026-02-25 rerun</h3>
    <div class="quality-column-shell">
      <div
        class="quality-column"
        role="img"
        aria-label="2026-02-25 gemma3:1b rerun quality mix: 5.0 percent good, 77.0 percent fair, 18.0 percent bad."
      >
        <span class="quality-segment good" style="height: 5.0%"></span>
        <span class="quality-segment fair" style="height: 77.0%"></span>
        <span class="quality-segment bad" style="height: 18.0%"></span>
      </div>
    </div>
    <ul class="quality-metrics">
      <li><span class="quality-dot good"></span> Good: 5 / 100 (5.0%)</li>
      <li><span class="quality-dot fair"></span> Fair: 77 / 100 (77.0%)</li>
      <li><span class="quality-dot bad"></span> Bad: 18 / 100 (18.0%)</li>
    </ul>
  </div>
</div>

<div class="chalk-panel">
  <h3>Legend</h3>
  <p class="quality-legend">
    <span><i class="quality-dot good"></i> Good = definitely should be used in the story</span>
    <span><i class="quality-dot fair"></i> Fair = could be used in the story</span>
    <span><i class="quality-dot bad"></i> Bad = definitely should not be used in the story</span>
  </p>
</div>

The baseline reference is the post linked above. This rerun expands the test suite and updates scoring, so the comparison is directional, not perfectly apples-to-apples. The deltas are still large enough to be meaningful for workflow planning:

- `fair+good`: `29.2%` -> `82.0%` (**+52.8 points**)
- `bad`: `70.8%` -> `18.0%` (**-52.8 points**)
- one-sentence violations: `62.5%` -> `0.0%` (**-62.5 points**)
- one-sentence compliance: `37.5%` -> `100.0%` (**+62.5 points**)

## Case-level reliability (2 shots per scene)
{% include components/chalk-table-panel.html
title="Case-Level Usability"
headers=page.case_level_table.headers
rows=page.case_level_table.rows
footnote=page.case_level_table.footnote
%}

For story production, this is the ratio that matters most. With two attempts per scene, **44 out of 50 scenes** produced at least one usable next sentence.

## Good-scene likelihood after N sentences (same math as previous post)
Using the same compounding-risk framing from the previous write-up:

- `P(good scene after N sentences) = (0.82)^N`
- `P(at least 1 bad sentence by N) = 1 - (0.82)^N`

{% include components/chalk-table-panel.html
title="Compounding Scene Quality Over N Sentences"
headers=page.compounding_scene_table.headers
rows=page.compounding_scene_table.rows
footnote=page.compounding_scene_table.footnote
%}

Even with much better single-sentence quality, long scenes still compound failure risk if each sentence is generated independently.

## If we pick the best of two generations per sentence
This is the practical workflow version of the same question.

- observed per-step failure after best-of-2 in this run: `6/50 = 12.0%`
- `P(good scene after N sentences) = (0.88)^N`
- `P(at least 1 bad sentence that ruins the scene by N) = 1 - (0.88)^N`

{% include components/chalk-table-panel.html
title="Compounding Risk with Best-of-2 Selection"
headers=page.best_of_two_scene_table.headers
rows=page.best_of_two_scene_table.rows
footnote=page.best_of_two_scene_table.footnote
%}

Picking the better of two helps a lot versus single-shot generation, but the risk still compounds over longer scenes.

## Breakdown by reversal type
{% include components/chalk-table-panel.html
title="Quality by Reversal Type"
headers=page.reversal_table.headers
rows=page.reversal_table.rows
footnote=page.reversal_table.footnote
%}

Positive and neutral turns are performing well. Negative-turn prompts remain the main error bucket.

## Sample `good` sentences from this rerun
> **Note - Harbor return (positive)**  
> At the end she found only black water, a loop of severed rope, and her own breath pooling white in the cold. <u>The salt spray carried the faint scent of woodsmoke from a distant, abandoned shack.</u>

> **Note - Friendly dragon (positive)**  
> It stared at the cookie jar on the top shelf and made a hopeful noise. <u>It made a tiny, wheezing sound, like a rusty hinge, as it nibbled on a crumb.</u>

> **Note - Wildfire evacuation (negative)**  
> A siren wails somewhere close, then warps as the sound hits the smoke and comes back wrong. <u>The smell of burnt plastic hangs heavy, thick enough to taste, and a distant siren screams a fractured melody.</u>

## Rerun rubric for `quality`
This rerun uses a keep-or-cut standard:

> **If I appended this sentence to the scene, would I keep it?**

Rule compliance only matters when it breaks the scene.

### quality = `good`
**Meaning:** I would keep this sentence in a draft with little or no editing.

**How it was evaluated:**
- **Scene fit:** clearly continues what is happening now in the provided scene.
- **POV + tense + voice:** consistent with requested POV and tense, and the story voice.
- **Readability:** flows cleanly when appended to `sceneSoFar`.
- **Specificity:** concrete, grounded details instead of generic filler.
- **Narrative function:** adds momentum or sharpens the moment without premature resolution.

### quality = `fair`
**Meaning:** usable draft sentence; likely needs light revision or could be replaced by a stronger option.

**How it was evaluated:**
- mostly fits scene continuity, but can be generic, low-energy, or slightly off-emphasis.
- does not break POV or tense, though it may drift toward abstraction.
- reads fine appended, but does not land a strong next beat.
- any rule issues are minor and do not harm continuity.

### quality = `bad`
**Meaning:** not usable as-is because it harms scene continuity or misses prompt intent.

**How it was evaluated:**
- breaks requested POV or tense, or violates limited POV.
- contradicts scene details or introduces implausible derailments.
- voice mismatch is noticeable for the prompt.
- becomes abstract or meta instead of story continuation.
- hard rule violations that materially change story behavior.

### quality = `incoherent`
**Meaning:** completely unusable.

**How it was evaluated:**
- grammatically or logically unreadable in context.
- does not connect to the scene at all.
- contradictions are severe enough that action cannot be parsed.

Reserved for true failures, not merely weak writing.

## Notes
This rerun is designed around practical writing workflow. The question is whether `gemma3:1b` can produce a decent next sentence often enough to keep drafting momentum. On this pass, the `fair+good` ratio indicates it can in most scenes, while negative-turn scenes remain the next improvement target.
