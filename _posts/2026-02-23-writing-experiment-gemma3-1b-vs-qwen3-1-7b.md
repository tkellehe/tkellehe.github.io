---
layout: post
title: "Writing Experiment: gemma3:1b vs qwen3:1.7b Quality Mix"
description: "A head-to-head writing experiment comparing gemma3:1b and qwen3:1.7b with Good/Fair/Bad ratings and one-sentence request compliance."
date: 2026-02-23 01:30:00 -0500
category: experiments
tags: [realm, writing, experiments, slm, gemma3-1b, qwen3-1-7b, evaluation]
eyebrow: "Fourth Log - Writing Experiments"
read_time: "Estimated read: 7 min"
lede: "This run compares `gemma3:1b` and `qwen3:1.7b` on short story continuation quality. The goal is to maximize `good` and `fair`, minimize `bad`, and keep one-sentence compliance high."
excerpt: "Head-to-head writing quality distribution with stacked percentage columns and request-compliance summary."
quality_mix_table:
  headers: ["Model", "Good", "Fair", "Bad", "Good + Fair"]
  rows:
    - ["gemma3:1b", "0 / 24 (0.0%)", "7 / 24 (29.2%)", "17 / 24 (70.8%)", "7 / 24 (29.2%)"]
    - ["qwen3:1.7b", "1 / 24 (4.2%)", "8 / 24 (33.3%)", "15 / 24 (62.5%)", "9 / 24 (37.5%)"]
  footnote: "Ratings were assigned by ChatGPT 5.2."
first_sentence_quality_table:
  headers: ["Model", "Good", "Fair", "Bad", "Good + Fair"]
  rows:
    - ["gemma3:1b", "7 / 24 (29.2%)", "9 / 24 (37.5%)", "8 / 24 (33.3%)", "16 / 24 (66.7%)"]
    - ["qwen3:1.7b", "4 / 24 (16.7%)", "11 / 24 (45.8%)", "9 / 24 (37.5%)", "15 / 24 (62.5%)"]
  footnote: "Uses the `firstSentenceQuality` field from each result row."
compliance_table:
  headers: ["Model", "One-Sentence Violations", "One-Sentence Compliant"]
  rows:
    - ["gemma3:1b", "15 / 24 (62.5%)", "9 / 24 (37.5%)"]
    - ["qwen3:1.7b", "14 / 24 (58.3%)", "10 / 24 (41.7%)"]
  footnote: "If the model went over one sentence, it was marked as a request violation."
---
- **Run timestamp:** February 23, 2026 (`2026-02-23T06:18:08.267Z`)
- **Models:** `gemma3:1b` and `qwen3:1.7b`
- **Samples:** 24 generations per model (4 cases x 6 samples)
- **Evaluator:** ChatGPT 5.2
- **Goal:** more `good` and `fair`; fewer `bad`

## Data
- [`writing-experiment-2026-02-23T06-18-08-267Z.json`]({{ '/assets/data/experiments/2026-02-23/writing-experiment-2026-02-23T06-18-08-267Z.json' | relative_url }})

## Quality Mix (Stacked Percentage Columns)
<div class="chalk-grid writing-quality-grid">
  <div class="chalk-panel quality-column-card">
    <h3>gemma3:1b</h3>
    <div class="quality-column-shell">
      <div
        class="quality-column"
        role="img"
        aria-label="gemma3:1b quality mix: 0.0 percent good, 29.2 percent fair, 70.8 percent bad."
      >
        <span class="quality-segment good" style="height: 0%"></span>
        <span class="quality-segment fair" style="height: 29.2%"></span>
        <span class="quality-segment bad" style="height: 70.8%"></span>
      </div>
    </div>
    <ul class="quality-metrics">
      <li><span class="quality-dot good"></span> Good: 0 / 24 (0.0%)</li>
      <li><span class="quality-dot fair"></span> Fair: 7 / 24 (29.2%)</li>
      <li><span class="quality-dot bad"></span> Bad: 17 / 24 (70.8%)</li>
    </ul>
  </div>

  <div class="chalk-panel quality-column-card">
    <h3>qwen3:1.7b</h3>
    <div class="quality-column-shell">
      <div
        class="quality-column"
        role="img"
        aria-label="qwen3:1.7b quality mix: 4.2 percent good, 33.3 percent fair, 62.5 percent bad."
      >
        <span class="quality-segment good" style="height: 4.2%"></span>
        <span class="quality-segment fair" style="height: 33.3%"></span>
        <span class="quality-segment bad" style="height: 62.5%"></span>
      </div>
    </div>
    <ul class="quality-metrics">
      <li><span class="quality-dot good"></span> Good: 1 / 24 (4.2%)</li>
      <li><span class="quality-dot fair"></span> Fair: 8 / 24 (33.3%)</li>
      <li><span class="quality-dot bad"></span> Bad: 15 / 24 (62.5%)</li>
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

## Summary Table
{% include components/chalk-table-panel.html
title="Quality Distribution by Model"
headers=page.quality_mix_table.headers
rows=page.quality_mix_table.rows
footnote=page.quality_mix_table.footnote
%}

## First-Sentence Quality Stats
This is scored only on the first sentence each generation produced.

<div class="chalk-grid writing-quality-grid">
  <div class="chalk-panel quality-column-card">
    <h3>gemma3:1b</h3>
    <div class="quality-column-shell">
      <div
        class="quality-column"
        role="img"
        aria-label="gemma3:1b first sentence quality mix: 29.2 percent good, 37.5 percent fair, 33.3 percent bad."
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
    <h3>qwen3:1.7b</h3>
    <div class="quality-column-shell">
      <div
        class="quality-column"
        role="img"
        aria-label="qwen3:1.7b first sentence quality mix: 16.7 percent good, 45.8 percent fair, 37.5 percent bad."
      >
        <span class="quality-segment good" style="height: 16.7%"></span>
        <span class="quality-segment fair" style="height: 45.8%"></span>
        <span class="quality-segment bad" style="height: 37.5%"></span>
      </div>
    </div>
    <ul class="quality-metrics">
      <li><span class="quality-dot good"></span> Good: 4 / 24 (16.7%)</li>
      <li><span class="quality-dot fair"></span> Fair: 11 / 24 (45.8%)</li>
      <li><span class="quality-dot bad"></span> Bad: 9 / 24 (37.5%)</li>
    </ul>
  </div>
</div>

{% include components/chalk-table-panel.html
title="First-Sentence Quality Distribution by Model"
headers=page.first_sentence_quality_table.headers
rows=page.first_sentence_quality_table.rows
footnote=page.first_sentence_quality_table.footnote
%}

## One-Sentence Request Violations
The models were requested to add a single sentence. Going over was allowed but marked as a request violation.

{% include components/chalk-table-panel.html
title="One-Sentence Compliance"
headers=page.compliance_table.headers
rows=page.compliance_table.rows
footnote=page.compliance_table.footnote
%}

## Best Excerpts by Case
Best picks are selected by `firstSentenceQuality` for each model and case. When multiple samples have the same `firstSentenceQuality`, the lowest sample number is used.

### 1) Harbor return with optimistic turn
> **Scene**
> Fog drifted between the pilings and softened the warning lights to bruised orange smears.
> Mara counted the empty slips along the pier where the cutter should have been tied.
> At the end she found only black water, a loop of severed rope, and her own breath clouding in the cold.

<div class="chalk-grid excerpt-grid">
  <div class="chalk-panel excerpt-card">
    <h3>gemma3:1b</h3>
    <p class="panel-foot excerpt-meta">Best sample: #1 · First sentence quality: <code>fair</code></p>
    <p class="excerpt-output"><u>The salt spray tasted of iron on her lips as she scanned the water.</u></p>
  </div>
  <div class="chalk-panel excerpt-card">
    <h3>qwen3:1.7b</h3>
    <p class="panel-foot excerpt-meta">Best sample: #1 · First sentence quality: <code>good</code></p>
    <p class="excerpt-output"><u>She traced the rope's path to the dock's edge, where the ledger's leather scent clung to the wet sand.</u></p>
  </div>
</div>

### 2) Skybridge dead-drop with cautious relief
> **Scene**
> The skybridge hummed with mag-rail vibration, and the glass beneath her palm held a faint chill that smelled of ozone and disinfectant.
> Ad panels along the ceiling cycled through breakfast spots and rent-by-the-hour pods, washing the crowd in pale blues and pinks.
> Mara kept to the edge, matching the pace of commuters with lanyards and coffee bulbs, while her thumb worried the cracked corner of her old ID card.
> A maintenance drone hovered near the access hatch, its camera iris clicking as it tracked faces; she angled her chin down and let a couple arguing about surge fares drift between them.
> "If you want to file a complaint, take it up with the algorithm," one of them snapped, and Mara used the raised voices as cover to slip behind a structural rib.
> The dead-drop panel was still there, a narrow rectangle of brushed steel with a tiny service notch, and the security seal she expected to find was missing.

<div class="chalk-grid excerpt-grid">
  <div class="chalk-panel excerpt-card">
    <h3>gemma3:1b</h3>
    <p class="panel-foot excerpt-meta">Best sample: #1 · First sentence quality: <code>good</code></p>
    <p class="excerpt-output"><u>The metal panel yielded with a sharp groan, and Mara slid beneath it, the air immediately colder despite the mag-rail's residual warmth.</u></p>
  </div>
  <div class="chalk-panel excerpt-card">
    <h3>qwen3:1.7b</h3>
    <p class="panel-foot excerpt-meta">Best sample: #2 · First sentence quality: <code>good</code></p>
    <p class="excerpt-output"><u>She reached for the panel, her fingers brushing the cold steel, then pulled back, the scent of ozone clinging to her skin. "I'll take it, but I'll need a warrant."</u></p>
  </div>
</div>

### 3) Clocktower confession with hopeful risk
> **Scene**
> The clocktower stairs narrowed to a ribbed iron ladder, slick with condensation that left her gloves smelling of pennies.
> Above, the gears ticked and clacked like teeth, each turn sending a tremor through the stone.
> Celia paused beneath the dial face where moonlight seeped through the numerals, and she felt the draft tug at the papers inside her coat.
> Someone had been here recently; fresh boot grit freckled the landing, and a lantern-wick stink still hung in the air.

<div class="chalk-grid excerpt-grid">
  <div class="chalk-panel excerpt-card">
    <h3>gemma3:1b</h3>
    <p class="panel-foot excerpt-meta">Best sample: #1 · First sentence quality: <code>good</code></p>
    <p class="excerpt-output"><u>The air felt thick and cool against my skin as I ascended the narrow staircase, each step a muffled echo against the stone. A sudden, sharp crack from somewhere deep within the mechanism sent a ripple through the gears, a brief, unsettling pause before the rhythmic ticking resumed. I reached into my pocket, my fingers brushing against the folded note - it was still there, nestled within the shadowed space</u></p>
  </div>
  <div class="chalk-panel excerpt-card">
    <h3>qwen3:1.7b</h3>
    <p class="panel-foot excerpt-meta">Best sample: #3 · First sentence quality: <code>fair</code></p>
    <p class="excerpt-output"><u>The gears hissed like a fevered beast, and the scent of oil mixed with the tang of rust clung to the air. She reached for the note, her fingers brushing the damp paper, and the sound of a distant bell echoed through the tower. "I'll read it now," she murmured, then turned, the lantern-wick stink clinging to her coat as she vanished into the shadows.</u></p>
  </div>
</div>

### 4) Conservatory retrieval with alarmed setback
> **Scene**
> The conservatory's glass panes bead with condensation, and the air tastes like wet soil and coppery fertilizer.
> Jun moves between tall rows of citrus trees under grow lights that buzz with a faint electric heat against his cheeks.
> A maintenance cart sits abandoned beside the central fountain, its battery panel open and a coil of insulated wire spilling onto the tile.
> He reaches the propagation station where the gene-safe drawer should be sealed with a numbered tie, but the tie hangs in two clean halves.
> Inside, foam slots cradle empty vials, all except one with a white label stamped: KESTREL-03.

<div class="chalk-grid excerpt-grid">
  <div class="chalk-panel excerpt-card">
    <h3>gemma3:1b</h3>
    <p class="panel-foot excerpt-meta">Best sample: #1 · First sentence quality: <code>good</code></p>
    <p class="excerpt-output"><u>Jun runs his fingers along the cool, smooth surface of the drawer's wooden frame, the scent of stagnant water and something floral intensifying as he pulls at the tarnished metal tie. A faint, metallic click echoes as he manages to wrench it free, the movement sending a ripple across the glass. "Anything?" a voice rasped from the shadows, and Jun freezes, his hand</u></p>
  </div>
  <div class="chalk-panel excerpt-card">
    <h3>qwen3:1.7b</h3>
    <p class="panel-foot excerpt-meta">Best sample: #2 · First sentence quality: <code>good</code></p>
    <p class="excerpt-output"><u>The air sharpens with the tang of ozone, and the metal of the drawer feels cool against his palm as it slides open, revealing a vial cradled in the crook of his fingers. "What is this?" Jun whispers, his breath fogging the glass. The security system thumps, its hum swelling as Jun pushes against the barrier, the weight of the vial pressing against his chest like a silent threat.</u></p>
  </div>
</div>

## Takeaways
1. `qwen3:1.7b` leads this run on `good + fair` (37.5% vs 29.2%).
2. On first-sentence-only scoring, `gemma3:1b` leads on `good + fair` (66.7% vs 62.5%) and on `good` alone (29.2% vs 16.7%).
3. Full-output quality still has high `bad` rates for both models, so end-to-end continuation quality is not yet where we want it.
4. One-sentence violations are high for both models, which is a clear prompt-following issue to address in the next run.
