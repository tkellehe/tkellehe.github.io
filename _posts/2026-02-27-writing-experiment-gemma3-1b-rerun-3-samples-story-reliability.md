---
layout: post
title: "Writing Experiment Rerun: gemma3:1b with 3 Samples per Story"
description: "Follow-up to the 2026-02-25 rerun, increasing samples per story from 2 to 3 and comparing output-level quality plus story-level all-bad vs at-least-one-usable rates."
date: 2026-02-27 00:30:00 -0500
category: experiments
tags: [realm, writing, experiments, slm, gemma3-1b, evaluation]
eyebrow: "Sixth Log - Writing Experiments"
read_time: "Estimated read: 7 min"
lede: "I reran the same 50-story setup with `gemma3:1b`, but moved from 2 samples per story to 3. The key question is story reliability: how often do we avoid an all-bad outcome and get at least one fair/good line to keep drafting."
excerpt: "Comparison of 2-sample vs 3-sample runs, with focus on all-bad story rate versus at-least-one fair/good story rate."
quality_table:
  headers: ["Quality", "Count", "Percent"]
  rows:
    - ["Good", "4 / 150", "2.7%"]
    - ["Fair", "137 / 150", "91.3%"]
    - ["Bad", "9 / 150", "6.0%"]
    - ["Fair + Good", "141 / 150", "94.0%"]
  footnote: "Current run: 50 stories x 3 samples = 150 outputs."
run_comparison_table:
  headers: ["Run", "Samples per Story", "Good", "Fair", "Bad", "Fair + Good"]
  rows:
    - ["2026-02-25", "2", "5.0%", "77.0%", "18.0%", "82.0%"]
    - ["2026-02-27", "3", "2.7%", "91.3%", "6.0%", "94.0%"]
  footnote: "Same case set and rubric family; only sampling strategy changed from 2 to 3 per story."
story_key_comparison_table:
  headers: ["Run", "Samples per Story", "At Least 1 Fair/Good", "All Bad", "At-Least-One : All-Bad Ratio"]
  rows:
    - ["2026-02-25", "2", "44 / 50 (88.0%)", "6 / 50 (12.0%)", "44:6 (7.33:1)"]
    - ["2026-02-27", "3", "48 / 50 (96.0%)", "2 / 50 (4.0%)", "48:2 (24.0:1)"]
  footnote: "This is the primary reliability lens for scene drafting throughput."
story_distribution_table:
  headers: ["Run", "All Fair/Good", "Exactly 2 Fair/Good", "Exactly 1 Fair/Good", "All Bad"]
  rows:
    - ["2026-02-25 (2 samples)", "38 / 50 (76.0%)", "N/A", "6 / 50 (12.0%)", "6 / 50 (12.0%)"]
    - ["2026-02-27 (3 samples)", "46 / 50 (92.0%)", "1 / 50 (2.0%)", "1 / 50 (2.0%)", "2 / 50 (4.0%)"]
  footnote: "For the 2-sample run, 'All Fair/Good' means both samples were Fair/Good."
---
This is a direct follow-up to:

- [Writing Experiment Rerun: gemma3:1b at 82.0% Fair+Good]({% post_url 2026-02-25-writing-experiment-gemma3-1b-rerun-fair-good-ratio %})

Same general setup and scoring approach, but this run uses **3 generations per story** instead of 2.

### Run summary
- **Run timestamp:** February 27, 2026 (`2026-02-27T06:26:21.050Z`)
- **Model:** `gemma3:1b`
- **Scope:** 50 story cases, 3 samples per case (`150` outputs)
- **Primary goal:** reduce story-level `all bad` outcomes and increase odds of at least one usable (`fair` or `good`) option per story step

## Data
- [`writing-experiment-2026-02-27T06-26-21-050Z.json`]({{ '/assets/data/experiments/2026-02-27/writing-experiment-2026-02-27T06-26-21-050Z.json' | relative_url }})
- Prior run for comparison: [`writing-experiment-2026-02-25T02-27-32-328Z.json`]({{ '/assets/data/experiments/2026-02-25/writing-experiment-2026-02-25T02-27-32-328Z.json' | relative_url }})

## Current run quality distribution
{% include components/chalk-table-panel.html
title="2026-02-27 Quality Distribution"
headers=page.quality_table.headers
rows=page.quality_table.rows
footnote=page.quality_table.footnote
%}

## Percentage comparison vs the previous run
{% include components/chalk-table-panel.html
title="Output-Level Quality Percentage Comparison"
headers=page.run_comparison_table.headers
rows=page.run_comparison_table.rows
footnote=page.run_comparison_table.footnote
%}

Key deltas from `2026-02-25` -> `2026-02-27`:

- `fair + good`: `82.0%` -> `94.0%` (**+12.0 points**)
- `bad`: `18.0%` -> `6.0%` (**-12.0 points**)

## Main metric: story reliability across samples
This is the main decision metric for workflow: per story step, did we get at least one usable option?

{% include components/chalk-table-panel.html
title="Story-Level Reliability (Primary Metric)"
headers=page.story_key_comparison_table.headers
rows=page.story_key_comparison_table.rows
footnote=page.story_key_comparison_table.footnote
%}

What changed with 3 samples per story:

- **At least one fair/good:** `88.0%` -> `96.0%` (**+8.0 points**)
- **All bad:** `12.0%` -> `4.0%` (**-8.0 points**)
- **All-bad relative reduction:** `6` stories -> `2` stories (**-66.7%**)
- **Usable-to-failed story ratio:** `7.33:1` -> `24.0:1` (**3.27x better**)

> This can be read as for every 24 stories where we get at least one fair/good line added, we only get 1 story where we added a bad line. In the prior run, for every 7.33 stories with at least one fair/good line added, we got 1 story where we added a bad line.

## Story outcome distribution details
{% include components/chalk-table-panel.html
title="Story-Level Outcome Breakdown"
headers=page.story_distribution_table.headers
rows=page.story_distribution_table.rows
footnote=page.story_distribution_table.footnote
%}

The 3-sample run leaves only **2 of 50** stories in the all-bad bucket. That is the practical improvement we wanted: more chances to keep moving with at least one fair/good continuation.

Remaining all-bad stories in this run:

- `loop-doorbell-negative`
- `river-bargain-mixed`

## Example kept lines (with story prefix)
> **Note - Noir alley (negative)**  
> I tried another match and listened to my own breath, counting the seconds between passing cars. <u>It felt like a shadow, a cold, wet breath on my neck, holding the echo of a single, deliberate step.</u>

> **Note - Tea shop clue (positive)**  
> On the office desk, the ledger lay open to a blank page, and the teacup beside it was still warm. <u>A faint, unfamiliar scent of sandalwood lingered near the chipped porcelain teacup, a small inconsistency amidst the usual comforting aroma of bergamot and clove.</u>

> **Note - Dinner unstated (negative)**  
> Across from me, two pairs of eyes lift and drop, lift and drop, waiting for whatever I promised I would say. <u>The fork scrapes against the porcelain, a slow, deliberate motion that amplifies the stillness of the room.</u>

## Notes
The scoring intent is unchanged from the prior rerun: `fair` and `good` are usable drafting options, `bad` is not. This 3-sample strategy materially improves the chance that each story step has at least one usable option while sharply reducing all-bad dead ends.
