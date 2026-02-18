—
layout: post
title: “Context Compiling: ctxc and vectorless builds”
date: 2026-02-18 12:00:00 -0500
category: architecture
tags: [context, ctxc, realm, rag, compilers, rust, writing]
excerpt: “I’m building a ‘context compiler’ that walks large docs like a book and emits a tight, testable context packet—without embeddings—so even tiny models can reliably execute the task.”
—

I keep hitting the same wall with LLM systems:

> The model *can* do the task… but only if it has the right slice of the document.

“Just shove the whole doc into the prompt” doesn’t scale. It’s expensive, slow, and it still fails in the worst way: it misses *one* constraint and confidently does the wrong thing.

So I’ve been building an approach I’m calling **Context Compiling**.

The first piece of it is **`ctxc`**: a **context compiler**.

—

## Context compiling in one sentence

Given a **document** (or doc-set) and a **request**, `ctxc` **walks the document like a book**, extracts the *authoritative* rules/facts/examples you actually need, and outputs a compact **Context Packet** that an “executor” model can follow.

Think of it as taking unstructured text and producing a **compiled artifact** you can inspect, diff, cache, and test.

—

## Why I’m calling it “compiling”

This isn’t just retrieval.

A compiler doesn’t “search” It:

- **parses** structured inputs
- follows a **graph** (imports, includes, references)
- enforces **precedence rules**
- produces an intermediate representation (IR)
- emits a final artifact under constraints (size/budget)

That mental model maps surprisingly well to LLM context.

—

## Vectorless builds

A lot of RAG stacks start with embeddings + vector search. That works, but it comes with tradeoffs:

- indexing/re-indexing overhead
- “semantic drift” (good matches that aren’t authoritative)
- hard-to-debug retrieval (“why that chunk?”)

My current direction for `ctxc` is **vectorless builds**: focus on **document structure** and **explicit relationships**.

Instead of “nearest neighbor,” I want:

- headings / TOC navigation
- internal links and references
- explicit “see also” and dependency edges
- stable provenance (“this came from Section 4.2 → Example B”)

This is closer to *reading the manual* than *searching the manual*.

(Embeddings may still be useful later, but I don’t want them to be required to get reliable results.)

—

## How `ctxc` works (high level)

At a high level, `ctxc`:

1. **Ingests** docs (Markdown is a great starting point)
2. Builds a **navigation graph** (headings, links, references)
3. Uses a small model as a **policy** to decide what to pull next (“go here”, “follow that reference”, “extract this rule”)
4. Packs the result into a strict **token budget**

The output is not “a long paste.” It’s a **Context Packet**.

—

## The Context Packet (the thing that matters)

The key idea is: the context should be an *artifact*, not a blob.

A packet can be as simple as:

- **Constraints (MUST / MUST NOT)**
- **Facts / Canon (do not contradict)**
- **Procedures / Steps**
- **Definitions**
- **Examples (short, high-signal)**
- **Formatting requirements**
- **Provenance** (where each item came from)

Once you have this, you unlock a toolchain:

- `trace`: why did we include this item?
- `diff`: what changed between two compiles?
- `lint`: did the executor violate a MUST rule?
- caching: reuse packets, incrementally rebuild when docs change

—

## Where REALM fits

This work is designed around the same loop I’ve been exploring in my REALM notes:

- **Read** about what the task needs
- **Edit/Analyze** the current sections
- **Loop** and refine the context
- **Monitor** the context to ensure on track or if needs to exit

`ctxc` is the practical “compiler” implementation of that loop.

> *(If you’re reading this on my blog, see my posts on REALM / context management for the broader framing.)*

—

## Why this is exciting for coding tools

Coding assistants fail less when they have:

- the exact API contract
- the real configuration rules
- the sanctioned usage patterns
- the “do not do this” list

Instead of shipping an entire README into a prompt, `ctxc` can compile:

- auth + security rules
- endpoint shapes
- error handling expectations
- canonical examples

…and then hand a clean packet to the executor.

—

## Why this is *even more* exciting for writing books

Writing isn’t “just prose generation.” It’s constraint satisfaction over canon:

- timeline continuity
- what each character knows (knowledge boundaries)
- voice and POV rules
- delayed reveals
- promises and payoffs

A story bible is just another document—except continuity mistakes are *painful*.

A context compiler can emit a scene-ready packet like:

- “Here is who everyone is *right now*”
- “Here is what cannot be revealed yet”
- “Here are the motifs/tone constraints”
- “Here are continuity watch-outs: spellings, titles, geography”

That’s the path to making the **executor model small** too:

> the compiler carries the structure; the tiny model carries the pen.

—

## Implementation direction

I’m leaning toward building `ctxc` as:

- a **Rust library** (fast, portable, local-first)
- a **CLI** (`ctxc compile`, `ctxc trace`, `ctxc diff`, `ctxc lint`)
- later, a **GUI** for managing projects and watching compiles live

Local-first matters—especially for authors.

—

## The end goal

The goal isn’t “bigger prompts.” It’s the opposite:

> **Smaller, higher-quality prompts**—compiled, explainable, and testable.

And once the compiler is reliable, the executor can be much smaller too.

—

## What’s next

I’ll likely follow this post with:

- a concrete Context Packet schema
- how I represent document structure (headings/links/references)
- caching + incremental compilation
- a first “scene packet” prototype for writing
