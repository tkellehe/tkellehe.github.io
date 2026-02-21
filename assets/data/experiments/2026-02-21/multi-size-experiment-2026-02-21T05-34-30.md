# Multi-Size Document Experiment Results

**Model**: gemma3:1b
**Date**: 2026-02-21T05:34:30.987Z
**Document Sizes**: Small (1.2KB), Medium (18KB), XLarge (31KB), XXLarge (42KB), XXXLarge (53KB)

## Executive Summary

This experiment compares REALM's iterative exploration approach against full-text prompting across five document sizes.

### Token Usage by Document Size

| Document | Size | Sections | Iterative Tokens | Full-Text Tokens | Difference | % Overhead | Avg Iterations | Avg First Correct |
|----------|------|----------|------------------|------------------|------------|------------|----------------|-------------------|
| Small | 1.2KB | 9 | 707 | 495 | +212 | 42.7% | 5.0 | 1.0 |
| Medium | 18.1KB | 78 | 992 | 5586 | -4595 | -82.3% | 5.0 | 2.0 |
| XLarge | 30.1KB | 124 | 1030 | 9387 | -8357 | -89.0% | 5.0 | 2.5 |
| XXLarge | 41.6KB | 195 | 1110 | 13468 | -12358 | -91.8% | 5.0 | 2.0 |
| XXXLarge | 52.6KB | 260 | 1194 | 17275 | -16082 | -93.1% | 5.0 | 2.0 |

## Detailed Results by Query

### Query: "How do I authenticate API requests?"

**Expected Answer**: `authentication`
**Relevant Sections**: authentication, api-keys, oauth, oauth-20

#### Small Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 687
- Output Tokens: 45
- Total Tokens: 732
- Time: 5.22s
- **First Correct Iteration**: 2
- **Tokens to Correct Answer**: 271
- **Potential Savings with Early Exit**: 461 tokens (63.0%)
- Sections Read: api-overview → authentication → api-endpoints → authentication-api-keys → error-handling
- Section Frequency:
  - `api-overview`: 1x
  - `authentication`: 1x
  - `api-endpoints`: 1x
  - `authentication-api-keys`: 1x
  - `error-handling`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 121 | 8 | 129 | 129 |
| 2 | 133 | 9 | 142 | 271 |
| 3 | 142 | 8 | 150 | 421 |
| 4 | 149 | 11 | 160 | 581 |
| 5 | 142 | 9 | 151 | 732 |


**Full-Text Approach**:
- Selected Section: `api-endpoints-users`
- Input Tokens: 490
- Output Tokens: 5
- Total Tokens: 495
- Time: 0.40s
- Correctness: ❌ Incorrect

**Comparison**:
- Token Difference: +237 (47.9%)
- Time Difference: +4.82s

---

#### Medium Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 960
- Output Tokens: 53
- Total Tokens: 1013
- Time: 2.66s
- **First Correct Iteration**: 2
- **Tokens to Correct Answer**: 343
- **Potential Savings with Early Exit**: 670 tokens (66.1%)
- Sections Read: e-commerce-platform-api-documentation → authentication → authentication-api-keys → security → authentication-oauth-20
- Section Frequency:
  - `e-commerce-platform-api-documentation`: 1x
  - `authentication`: 1x
  - `authentication-api-keys`: 1x
  - `security`: 1x
  - `authentication-oauth-20`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 127 | 15 | 142 | 142 |
| 2 | 192 | 9 | 201 | 343 |
| 3 | 210 | 11 | 221 | 564 |
| 4 | 203 | 7 | 210 | 774 |
| 5 | 228 | 11 | 239 | 1013 |


**Full-Text Approach**:
- Selected Section: `3`
- Input Tokens: 5586
- Output Tokens: 1
- Total Tokens: 5587
- Time: 1.91s
- Correctness: ❌ Incorrect

**Comparison**:
- Token Difference: -4574 (-81.9%)
- Time Difference: +0.76s

---

#### XLarge Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 1017
- Output Tokens: 53
- Total Tokens: 1070
- Time: 2.65s
- **First Correct Iteration**: 3
- **Tokens to Correct Answer**: 575
- **Potential Savings with Early Exit**: 495 tokens (46.3%)
- Sections Read: e-commerce-platform-api-documentation → security → authentication → authentication-api-keys → security-api-key-security
- Section Frequency:
  - `e-commerce-platform-api-documentation`: 1x
  - `security`: 1x
  - `authentication`: 1x
  - `authentication-api-keys`: 1x
  - `security-api-key-security`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 127 | 14 | 141 | 141 |
| 2 | 197 | 8 | 205 | 346 |
| 3 | 221 | 8 | 229 | 575 |
| 4 | 239 | 11 | 250 | 825 |
| 5 | 233 | 12 | 245 | 1070 |


**Full-Text Approach**:
- Selected Section: `--- Section: 3 ---`
- Input Tokens: 9383
- Output Tokens: 5
- Total Tokens: 9388
- Time: 1.71s
- Correctness: ❌ Incorrect

**Comparison**:
- Token Difference: -8318 (-88.6%)
- Time Difference: +0.93s

---

#### XXLarge Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 1098
- Output Tokens: 51
- Total Tokens: 1149
- Time: 2.70s
- **First Correct Iteration**: 2
- **Tokens to Correct Answer**: 368
- **Potential Savings with Early Exit**: 781 tokens (68.0%)
- Sections Read: e-commerce-platform-api-documentation → authentication → security → security-api-key-security → authentication-api-keys
- Section Frequency:
  - `e-commerce-platform-api-documentation`: 1x
  - `authentication`: 1x
  - `security`: 1x
  - `security-api-key-security`: 1x
  - `authentication-api-keys`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 127 | 14 | 141 | 141 |
| 2 | 219 | 8 | 227 | 368 |
| 3 | 237 | 7 | 244 | 612 |
| 4 | 261 | 11 | 272 | 884 |
| 5 | 254 | 11 | 265 | 1149 |


**Full-Text Approach**:
- Selected Section: `--- Section: security-best-practices-authentication-security-api-key-rotation ---`
- Input Tokens: 13446
- Output Tokens: 21
- Total Tokens: 13467
- Time: 1.90s
- Correctness: ✅ Correct

**Comparison**:
- Token Difference: -12318 (-91.5%)
- Time Difference: +0.80s

---

#### XXXLarge Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 1181
- Output Tokens: 51
- Total Tokens: 1232
- Time: 2.59s
- **First Correct Iteration**: 2
- **Tokens to Correct Answer**: 390
- **Potential Savings with Early Exit**: 842 tokens (68.3%)
- Sections Read: e-commerce-platform-api-documentation → authentication → security → security-api-key-security → security-https-required
- Section Frequency:
  - `e-commerce-platform-api-documentation`: 1x
  - `authentication`: 1x
  - `security`: 1x
  - `security-api-key-security`: 1x
  - `security-https-required`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 127 | 14 | 141 | 141 |
| 2 | 240 | 9 | 249 | 390 |
| 3 | 257 | 7 | 264 | 654 |
| 4 | 282 | 11 | 293 | 947 |
| 5 | 275 | 10 | 285 | 1232 |


**Full-Text Approach**:
- Selected Section: `--- Section: point-of-sale-pos-in-store-operations-api-endpoints`
- Input Tokens: 17260
- Output Tokens: 16
- Total Tokens: 17276
- Time: 1.94s
- Correctness: ❌ Incorrect

**Comparison**:
- Token Difference: -16044 (-92.9%)
- Time Difference: +0.65s

---

### Query: "What are the rate limits?"

**Expected Answer**: `rate-limiting`
**Relevant Sections**: rate-limiting, rate-limits, limits-by-plan

#### Small Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 637
- Output Tokens: 44
- Total Tokens: 681
- Time: 2.60s
- Sections Read: api-overview → rate-limits → api-endpoints → api-endpoints-users → authentication
- Section Frequency:
  - `api-overview`: 1x
  - `rate-limits`: 1x
  - `api-endpoints`: 1x
  - `api-endpoints-users`: 1x
  - `authentication`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 118 | 8 | 126 | 126 |
| 2 | 130 | 8 | 138 | 264 |
| 3 | 127 | 9 | 136 | 400 |
| 4 | 134 | 10 | 144 | 544 |
| 5 | 128 | 9 | 137 | 681 |


**Full-Text Approach**:
- Selected Section: `api-endpoints-rate-limits`
- Input Tokens: 488
- Output Tokens: 7
- Total Tokens: 495
- Time: 0.41s
- Correctness: ❌ Incorrect

**Comparison**:
- Token Difference: +186 (37.6%)
- Time Difference: +2.19s

---

#### Medium Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 913
- Output Tokens: 57
- Total Tokens: 970
- Time: 2.54s
- **First Correct Iteration**: 2
- **Tokens to Correct Answer**: 336
- **Potential Savings with Early Exit**: 634 tokens (65.4%)
- Sections Read: e-commerce-platform-api-documentation → rate-limiting → rate-limiting-limits-by-plan → rate-limiting-headers → rate-limiting-burst-handling
- Section Frequency:
  - `e-commerce-platform-api-documentation`: 1x
  - `rate-limiting`: 1x
  - `rate-limiting-limits-by-plan`: 1x
  - `rate-limiting-headers`: 1x
  - `rate-limiting-burst-handling`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 124 | 14 | 138 | 138 |
| 2 | 190 | 8 | 198 | 336 |
| 3 | 207 | 12 | 219 | 555 |
| 4 | 199 | 10 | 209 | 764 |
| 5 | 193 | 13 | 206 | 970 |


**Full-Text Approach**:
- Selected Section: `3`
- Input Tokens: 5584
- Output Tokens: 1
- Total Tokens: 5585
- Time: 1.62s
- Correctness: ❌ Incorrect

**Comparison**:
- Token Difference: -4615 (-82.6%)
- Time Difference: +0.92s

---

#### XLarge Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 933
- Output Tokens: 56
- Total Tokens: 989
- Time: 2.64s
- **First Correct Iteration**: 2
- **Tokens to Correct Answer**: 341
- **Potential Savings with Early Exit**: 648 tokens (65.5%)
- Sections Read: e-commerce-platform-api-documentation → rate-limiting → rate-limiting-limits-by-plan → rate-limiting-headers → rate-limiting-burst-handling
- Section Frequency:
  - `e-commerce-platform-api-documentation`: 1x
  - `rate-limiting`: 1x
  - `rate-limiting-limits-by-plan`: 1x
  - `rate-limiting-headers`: 1x
  - `rate-limiting-burst-handling`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 124 | 14 | 138 | 138 |
| 2 | 195 | 8 | 203 | 341 |
| 3 | 212 | 12 | 224 | 565 |
| 4 | 204 | 10 | 214 | 779 |
| 5 | 198 | 12 | 210 | 989 |


**Full-Text Approach**:
- Selected Section: `--- Section: 3 ---`
- Input Tokens: 9380
- Output Tokens: 5
- Total Tokens: 9385
- Time: 1.72s
- Correctness: ❌ Incorrect

**Comparison**:
- Token Difference: -8396 (-89.5%)
- Time Difference: +0.93s

---

#### XXLarge Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 1020
- Output Tokens: 51
- Total Tokens: 1071
- Time: 2.46s
- **First Correct Iteration**: 2
- **Tokens to Correct Answer**: 362
- **Potential Savings with Early Exit**: 709 tokens (66.2%)
- Sections Read: e-commerce-platform-api-documentation → rate-limiting → rate-limiting-limits-by-plan → rate-limiting-headers → overview
- Section Frequency:
  - `e-commerce-platform-api-documentation`: 1x
  - `rate-limiting`: 1x
  - `rate-limiting-limits-by-plan`: 1x
  - `rate-limiting-headers`: 1x
  - `overview`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 124 | 14 | 138 | 138 |
| 2 | 216 | 8 | 224 | 362 |
| 3 | 234 | 12 | 246 | 608 |
| 4 | 226 | 10 | 236 | 844 |
| 5 | 220 | 7 | 227 | 1071 |


**Full-Text Approach**:
- Selected Section: `--- Section: security-best-practices-rate-limiting-ddos-protection-rate-limit-configuration ---`
- Input Tokens: 13444
- Output Tokens: 24
- Total Tokens: 13468
- Time: 1.92s
- Correctness: ✅ Correct

**Comparison**:
- Token Difference: -12397 (-92.0%)
- Time Difference: +0.54s

---

#### XXXLarge Document

**Iterative Approach**:
- Iterations: 5
- Input Tokens: 1104
- Output Tokens: 51
- Total Tokens: 1155
- Time: 2.87s
- **First Correct Iteration**: 2
- **Tokens to Correct Answer**: 383
- **Potential Savings with Early Exit**: 772 tokens (66.8%)
- Sections Read: e-commerce-platform-api-documentation → rate-limiting → rate-limiting-limits-by-plan → rate-limiting-headers → overview
- Section Frequency:
  - `e-commerce-platform-api-documentation`: 1x
  - `rate-limiting`: 1x
  - `rate-limiting-limits-by-plan`: 1x
  - `rate-limiting-headers`: 1x
  - `overview`: 1x

**Per-Iteration Token Usage**:

| Iteration | Input | Output | Total | Cumulative |
|-----------|-------|--------|-------|------------|
| 1 | 124 | 14 | 138 | 138 |
| 2 | 237 | 8 | 245 | 383 |
| 3 | 255 | 12 | 267 | 650 |
| 4 | 247 | 10 | 257 | 907 |
| 5 | 241 | 7 | 248 | 1155 |


**Full-Text Approach**:
- Selected Section: `--- Section: point-of-sale-pos-in-store-operations-product-lookup`
- Input Tokens: 17257
- Output Tokens: 17
- Total Tokens: 17274
- Time: 1.89s
- Correctness: ❌ Incorrect

**Comparison**:
- Token Difference: -16119 (-93.3%)
- Time Difference: +0.98s

---

## Early Stopping Analysis

This section shows the potential for early stopping when the correct answer is found.

### "How do I authenticate API requests?"

**Expected Answer**: `authentication`

| Document | Sections | First Correct | Tokens to Correct | Total Tokens | Potential Savings |
|----------|----------|---------------|-------------------|--------------|-------------------|
| Small | 9 | 2 | 271 | 732 | 461 (63.0%) |
| Medium | 78 | 2 | 343 | 1013 | 670 (66.1%) |
| XLarge | 124 | 3 | 575 | 1070 | 495 (46.3%) |
| XXLarge | 195 | 2 | 368 | 1149 | 781 (68.0%) |
| XXXLarge | 260 | 2 | 390 | 1232 | 842 (68.3%) |

### "What are the rate limits?"

**Expected Answer**: `rate-limiting`

| Document | Sections | First Correct | Tokens to Correct | Total Tokens | Potential Savings |
|----------|----------|---------------|-------------------|--------------|-------------------|
| Small | 9 | N/A | 0 | 681 | 681 (N/A%) |
| Medium | 78 | 2 | 336 | 970 | 634 (65.4%) |
| XLarge | 124 | 2 | 341 | 989 | 648 (65.5%) |
| XXLarge | 195 | 2 | 362 | 1071 | 709 (66.2%) |
| XXXLarge | 260 | 2 | 383 | 1155 | 772 (66.8%) |

## Answer Comparison

This section compares the answers from both approaches against the expected answer.

### "How do I authenticate API requests?"

**Expected Answer**: `authentication`

| Document | Iterative Sections Explored | Full-Text Selected | Full-Text Correct? |
|----------|----------------------------|--------------------|--------------------||
| Small | api-overview → authentication → api-endpoints → authentication-api-keys → error-handling | `api-endpoints-users` | ❌ No |
| Medium | e-commerce-platform-api-documentation → authentication → authentication-api-keys → security → authentication-oauth-20 | `3` | ❌ No |
| XLarge | e-commerce-platform-api-documentation → security → authentication → authentication-api-keys → security-api-key-security | `--- Section: 3 ---` | ❌ No |
| XXLarge | e-commerce-platform-api-documentation → authentication → security → security-api-key-security → authentication-api-keys | `--- Section: security-best-practices-authentication-security-api-key-rotation ---` | ✅ Yes |
| XXXLarge | e-commerce-platform-api-documentation → authentication → security → security-api-key-security → security-https-required | `--- Section: point-of-sale-pos-in-store-operations-api-endpoints` | ❌ No |

### "What are the rate limits?"

**Expected Answer**: `rate-limiting`

| Document | Iterative Sections Explored | Full-Text Selected | Full-Text Correct? |
|----------|----------------------------|--------------------|--------------------||
| Small | api-overview → rate-limits → api-endpoints → api-endpoints-users → authentication | `api-endpoints-rate-limits` | ❌ No |
| Medium | e-commerce-platform-api-documentation → rate-limiting → rate-limiting-limits-by-plan → rate-limiting-headers → rate-limiting-burst-handling | `3` | ❌ No |
| XLarge | e-commerce-platform-api-documentation → rate-limiting → rate-limiting-limits-by-plan → rate-limiting-headers → rate-limiting-burst-handling | `--- Section: 3 ---` | ❌ No |
| XXLarge | e-commerce-platform-api-documentation → rate-limiting → rate-limiting-limits-by-plan → rate-limiting-headers → overview | `--- Section: security-best-practices-rate-limiting-ddos-protection-rate-limit-configuration ---` | ✅ Yes |
| XXXLarge | e-commerce-platform-api-documentation → rate-limiting → rate-limiting-limits-by-plan → rate-limiting-headers → overview | `--- Section: point-of-sale-pos-in-store-operations-product-lookup` | ❌ No |

## Raw Data

```json
[
  {
    "documentSize": "Small",
    "query": "How do I authenticate API requests?",
    "approach": "iterative",
    "tokensInput": 687,
    "tokensOutput": 45,
    "tokensTotal": 732,
    "iterations": 5,
    "sectionsRead": [
      "api-overview",
      "authentication",
      "api-endpoints",
      "authentication-api-keys",
      "error-handling"
    ],
    "firstCorrectIteration": 2,
    "tokensToCorrect": 271,
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 121,
        "outputTokens": 8,
        "totalTokens": 129,
        "cumulativeTotal": 129
      },
      {
        "iteration": 2,
        "inputTokens": 133,
        "outputTokens": 9,
        "totalTokens": 142,
        "cumulativeTotal": 271
      },
      {
        "iteration": 3,
        "inputTokens": 142,
        "outputTokens": 8,
        "totalTokens": 150,
        "cumulativeTotal": 421
      },
      {
        "iteration": 4,
        "inputTokens": 149,
        "outputTokens": 11,
        "totalTokens": 160,
        "cumulativeTotal": 581
      },
      {
        "iteration": 5,
        "inputTokens": 142,
        "outputTokens": 9,
        "totalTokens": 151,
        "cumulativeTotal": 732
      }
    ],
    "timeMs": 5218
  },
  {
    "documentSize": "Small",
    "query": "How do I authenticate API requests?",
    "approach": "fulltext",
    "tokensInput": 490,
    "tokensOutput": 5,
    "tokensTotal": 495,
    "selectedSectionId": "api-endpoints-users",
    "timeMs": 397
  },
  {
    "documentSize": "Small",
    "query": "What are the rate limits?",
    "approach": "iterative",
    "tokensInput": 637,
    "tokensOutput": 44,
    "tokensTotal": 681,
    "iterations": 5,
    "sectionsRead": [
      "api-overview",
      "rate-limits",
      "api-endpoints",
      "api-endpoints-users",
      "authentication"
    ],
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 118,
        "outputTokens": 8,
        "totalTokens": 126,
        "cumulativeTotal": 126
      },
      {
        "iteration": 2,
        "inputTokens": 130,
        "outputTokens": 8,
        "totalTokens": 138,
        "cumulativeTotal": 264
      },
      {
        "iteration": 3,
        "inputTokens": 127,
        "outputTokens": 9,
        "totalTokens": 136,
        "cumulativeTotal": 400
      },
      {
        "iteration": 4,
        "inputTokens": 134,
        "outputTokens": 10,
        "totalTokens": 144,
        "cumulativeTotal": 544
      },
      {
        "iteration": 5,
        "inputTokens": 128,
        "outputTokens": 9,
        "totalTokens": 137,
        "cumulativeTotal": 681
      }
    ],
    "timeMs": 2595
  },
  {
    "documentSize": "Small",
    "query": "What are the rate limits?",
    "approach": "fulltext",
    "tokensInput": 488,
    "tokensOutput": 7,
    "tokensTotal": 495,
    "selectedSectionId": "api-endpoints-rate-limits",
    "timeMs": 406
  },
  {
    "documentSize": "Medium",
    "query": "How do I authenticate API requests?",
    "approach": "iterative",
    "tokensInput": 960,
    "tokensOutput": 53,
    "tokensTotal": 1013,
    "iterations": 5,
    "sectionsRead": [
      "e-commerce-platform-api-documentation",
      "authentication",
      "authentication-api-keys",
      "security",
      "authentication-oauth-20"
    ],
    "firstCorrectIteration": 2,
    "tokensToCorrect": 343,
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 127,
        "outputTokens": 15,
        "totalTokens": 142,
        "cumulativeTotal": 142
      },
      {
        "iteration": 2,
        "inputTokens": 192,
        "outputTokens": 9,
        "totalTokens": 201,
        "cumulativeTotal": 343
      },
      {
        "iteration": 3,
        "inputTokens": 210,
        "outputTokens": 11,
        "totalTokens": 221,
        "cumulativeTotal": 564
      },
      {
        "iteration": 4,
        "inputTokens": 203,
        "outputTokens": 7,
        "totalTokens": 210,
        "cumulativeTotal": 774
      },
      {
        "iteration": 5,
        "inputTokens": 228,
        "outputTokens": 11,
        "totalTokens": 239,
        "cumulativeTotal": 1013
      }
    ],
    "timeMs": 2663
  },
  {
    "documentSize": "Medium",
    "query": "How do I authenticate API requests?",
    "approach": "fulltext",
    "tokensInput": 5586,
    "tokensOutput": 1,
    "tokensTotal": 5587,
    "selectedSectionId": "3",
    "timeMs": 1905
  },
  {
    "documentSize": "Medium",
    "query": "What are the rate limits?",
    "approach": "iterative",
    "tokensInput": 913,
    "tokensOutput": 57,
    "tokensTotal": 970,
    "iterations": 5,
    "sectionsRead": [
      "e-commerce-platform-api-documentation",
      "rate-limiting",
      "rate-limiting-limits-by-plan",
      "rate-limiting-headers",
      "rate-limiting-burst-handling"
    ],
    "firstCorrectIteration": 2,
    "tokensToCorrect": 336,
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 124,
        "outputTokens": 14,
        "totalTokens": 138,
        "cumulativeTotal": 138
      },
      {
        "iteration": 2,
        "inputTokens": 190,
        "outputTokens": 8,
        "totalTokens": 198,
        "cumulativeTotal": 336
      },
      {
        "iteration": 3,
        "inputTokens": 207,
        "outputTokens": 12,
        "totalTokens": 219,
        "cumulativeTotal": 555
      },
      {
        "iteration": 4,
        "inputTokens": 199,
        "outputTokens": 10,
        "totalTokens": 209,
        "cumulativeTotal": 764
      },
      {
        "iteration": 5,
        "inputTokens": 193,
        "outputTokens": 13,
        "totalTokens": 206,
        "cumulativeTotal": 970
      }
    ],
    "timeMs": 2539
  },
  {
    "documentSize": "Medium",
    "query": "What are the rate limits?",
    "approach": "fulltext",
    "tokensInput": 5584,
    "tokensOutput": 1,
    "tokensTotal": 5585,
    "selectedSectionId": "3",
    "timeMs": 1617
  },
  {
    "documentSize": "XLarge",
    "query": "How do I authenticate API requests?",
    "approach": "iterative",
    "tokensInput": 1017,
    "tokensOutput": 53,
    "tokensTotal": 1070,
    "iterations": 5,
    "sectionsRead": [
      "e-commerce-platform-api-documentation",
      "security",
      "authentication",
      "authentication-api-keys",
      "security-api-key-security"
    ],
    "firstCorrectIteration": 3,
    "tokensToCorrect": 575,
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 127,
        "outputTokens": 14,
        "totalTokens": 141,
        "cumulativeTotal": 141
      },
      {
        "iteration": 2,
        "inputTokens": 197,
        "outputTokens": 8,
        "totalTokens": 205,
        "cumulativeTotal": 346
      },
      {
        "iteration": 3,
        "inputTokens": 221,
        "outputTokens": 8,
        "totalTokens": 229,
        "cumulativeTotal": 575
      },
      {
        "iteration": 4,
        "inputTokens": 239,
        "outputTokens": 11,
        "totalTokens": 250,
        "cumulativeTotal": 825
      },
      {
        "iteration": 5,
        "inputTokens": 233,
        "outputTokens": 12,
        "totalTokens": 245,
        "cumulativeTotal": 1070
      }
    ],
    "timeMs": 2646
  },
  {
    "documentSize": "XLarge",
    "query": "How do I authenticate API requests?",
    "approach": "fulltext",
    "tokensInput": 9383,
    "tokensOutput": 5,
    "tokensTotal": 9388,
    "selectedSectionId": "--- Section: 3 ---",
    "timeMs": 1714
  },
  {
    "documentSize": "XLarge",
    "query": "What are the rate limits?",
    "approach": "iterative",
    "tokensInput": 933,
    "tokensOutput": 56,
    "tokensTotal": 989,
    "iterations": 5,
    "sectionsRead": [
      "e-commerce-platform-api-documentation",
      "rate-limiting",
      "rate-limiting-limits-by-plan",
      "rate-limiting-headers",
      "rate-limiting-burst-handling"
    ],
    "firstCorrectIteration": 2,
    "tokensToCorrect": 341,
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 124,
        "outputTokens": 14,
        "totalTokens": 138,
        "cumulativeTotal": 138
      },
      {
        "iteration": 2,
        "inputTokens": 195,
        "outputTokens": 8,
        "totalTokens": 203,
        "cumulativeTotal": 341
      },
      {
        "iteration": 3,
        "inputTokens": 212,
        "outputTokens": 12,
        "totalTokens": 224,
        "cumulativeTotal": 565
      },
      {
        "iteration": 4,
        "inputTokens": 204,
        "outputTokens": 10,
        "totalTokens": 214,
        "cumulativeTotal": 779
      },
      {
        "iteration": 5,
        "inputTokens": 198,
        "outputTokens": 12,
        "totalTokens": 210,
        "cumulativeTotal": 989
      }
    ],
    "timeMs": 2644
  },
  {
    "documentSize": "XLarge",
    "query": "What are the rate limits?",
    "approach": "fulltext",
    "tokensInput": 9380,
    "tokensOutput": 5,
    "tokensTotal": 9385,
    "selectedSectionId": "--- Section: 3 ---",
    "timeMs": 1719
  },
  {
    "documentSize": "XXLarge",
    "query": "How do I authenticate API requests?",
    "approach": "iterative",
    "tokensInput": 1098,
    "tokensOutput": 51,
    "tokensTotal": 1149,
    "iterations": 5,
    "sectionsRead": [
      "e-commerce-platform-api-documentation",
      "authentication",
      "security",
      "security-api-key-security",
      "authentication-api-keys"
    ],
    "firstCorrectIteration": 2,
    "tokensToCorrect": 368,
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 127,
        "outputTokens": 14,
        "totalTokens": 141,
        "cumulativeTotal": 141
      },
      {
        "iteration": 2,
        "inputTokens": 219,
        "outputTokens": 8,
        "totalTokens": 227,
        "cumulativeTotal": 368
      },
      {
        "iteration": 3,
        "inputTokens": 237,
        "outputTokens": 7,
        "totalTokens": 244,
        "cumulativeTotal": 612
      },
      {
        "iteration": 4,
        "inputTokens": 261,
        "outputTokens": 11,
        "totalTokens": 272,
        "cumulativeTotal": 884
      },
      {
        "iteration": 5,
        "inputTokens": 254,
        "outputTokens": 11,
        "totalTokens": 265,
        "cumulativeTotal": 1149
      }
    ],
    "timeMs": 2701
  },
  {
    "documentSize": "XXLarge",
    "query": "How do I authenticate API requests?",
    "approach": "fulltext",
    "tokensInput": 13446,
    "tokensOutput": 21,
    "tokensTotal": 13467,
    "selectedSectionId": "--- Section: security-best-practices-authentication-security-api-key-rotation ---",
    "timeMs": 1902
  },
  {
    "documentSize": "XXLarge",
    "query": "What are the rate limits?",
    "approach": "iterative",
    "tokensInput": 1020,
    "tokensOutput": 51,
    "tokensTotal": 1071,
    "iterations": 5,
    "sectionsRead": [
      "e-commerce-platform-api-documentation",
      "rate-limiting",
      "rate-limiting-limits-by-plan",
      "rate-limiting-headers",
      "overview"
    ],
    "firstCorrectIteration": 2,
    "tokensToCorrect": 362,
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 124,
        "outputTokens": 14,
        "totalTokens": 138,
        "cumulativeTotal": 138
      },
      {
        "iteration": 2,
        "inputTokens": 216,
        "outputTokens": 8,
        "totalTokens": 224,
        "cumulativeTotal": 362
      },
      {
        "iteration": 3,
        "inputTokens": 234,
        "outputTokens": 12,
        "totalTokens": 246,
        "cumulativeTotal": 608
      },
      {
        "iteration": 4,
        "inputTokens": 226,
        "outputTokens": 10,
        "totalTokens": 236,
        "cumulativeTotal": 844
      },
      {
        "iteration": 5,
        "inputTokens": 220,
        "outputTokens": 7,
        "totalTokens": 227,
        "cumulativeTotal": 1071
      }
    ],
    "timeMs": 2455
  },
  {
    "documentSize": "XXLarge",
    "query": "What are the rate limits?",
    "approach": "fulltext",
    "tokensInput": 13444,
    "tokensOutput": 24,
    "tokensTotal": 13468,
    "selectedSectionId": "--- Section: security-best-practices-rate-limiting-ddos-protection-rate-limit-configuration ---",
    "timeMs": 1917
  },
  {
    "documentSize": "XXXLarge",
    "query": "How do I authenticate API requests?",
    "approach": "iterative",
    "tokensInput": 1181,
    "tokensOutput": 51,
    "tokensTotal": 1232,
    "iterations": 5,
    "sectionsRead": [
      "e-commerce-platform-api-documentation",
      "authentication",
      "security",
      "security-api-key-security",
      "security-https-required"
    ],
    "firstCorrectIteration": 2,
    "tokensToCorrect": 390,
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 127,
        "outputTokens": 14,
        "totalTokens": 141,
        "cumulativeTotal": 141
      },
      {
        "iteration": 2,
        "inputTokens": 240,
        "outputTokens": 9,
        "totalTokens": 249,
        "cumulativeTotal": 390
      },
      {
        "iteration": 3,
        "inputTokens": 257,
        "outputTokens": 7,
        "totalTokens": 264,
        "cumulativeTotal": 654
      },
      {
        "iteration": 4,
        "inputTokens": 282,
        "outputTokens": 11,
        "totalTokens": 293,
        "cumulativeTotal": 947
      },
      {
        "iteration": 5,
        "inputTokens": 275,
        "outputTokens": 10,
        "totalTokens": 285,
        "cumulativeTotal": 1232
      }
    ],
    "timeMs": 2588
  },
  {
    "documentSize": "XXXLarge",
    "query": "How do I authenticate API requests?",
    "approach": "fulltext",
    "tokensInput": 17260,
    "tokensOutput": 16,
    "tokensTotal": 17276,
    "selectedSectionId": "--- Section: point-of-sale-pos-in-store-operations-api-endpoints",
    "timeMs": 1939
  },
  {
    "documentSize": "XXXLarge",
    "query": "What are the rate limits?",
    "approach": "iterative",
    "tokensInput": 1104,
    "tokensOutput": 51,
    "tokensTotal": 1155,
    "iterations": 5,
    "sectionsRead": [
      "e-commerce-platform-api-documentation",
      "rate-limiting",
      "rate-limiting-limits-by-plan",
      "rate-limiting-headers",
      "overview"
    ],
    "firstCorrectIteration": 2,
    "tokensToCorrect": 383,
    "iterationTokens": [
      {
        "iteration": 1,
        "inputTokens": 124,
        "outputTokens": 14,
        "totalTokens": 138,
        "cumulativeTotal": 138
      },
      {
        "iteration": 2,
        "inputTokens": 237,
        "outputTokens": 8,
        "totalTokens": 245,
        "cumulativeTotal": 383
      },
      {
        "iteration": 3,
        "inputTokens": 255,
        "outputTokens": 12,
        "totalTokens": 267,
        "cumulativeTotal": 650
      },
      {
        "iteration": 4,
        "inputTokens": 247,
        "outputTokens": 10,
        "totalTokens": 257,
        "cumulativeTotal": 907
      },
      {
        "iteration": 5,
        "inputTokens": 241,
        "outputTokens": 7,
        "totalTokens": 248,
        "cumulativeTotal": 1155
      }
    ],
    "timeMs": 2867
  },
  {
    "documentSize": "XXXLarge",
    "query": "What are the rate limits?",
    "approach": "fulltext",
    "tokensInput": 17257,
    "tokensOutput": 17,
    "tokensTotal": 17274,
    "selectedSectionId": "--- Section: point-of-sale-pos-in-store-operations-product-lookup",
    "timeMs": 1885
  }
]
```
